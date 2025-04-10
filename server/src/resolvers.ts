import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Resolvers } from './types.js';

export const resolvers: Resolvers = {
    Article: {
        comments: async (parent, _, { dataSources }) => {
            return await dataSources.db.comment.findMany({
                where: { articleId: parent.id },
            });
        },
        likes: async (parent, _, { dataSources }) => {
            return await dataSources.db.like.findMany({
                where: { articleId: parent.id },
            });
        },
        author: async (parent, _, { dataSources }) => {
            const author = await dataSources.db.user.findUnique({
                where: { id: parent.authorId },
            });
            if (!author) {
                throw new Error('Author not found');
            }
            return author;
        },
        likeCount: async (parent, _, { dataSources }) => {
            const likes = await dataSources.db.like.count({
                where: { articleId: parent.id },
            });
            return likes;
        },
        commentCount: async (parent, _, { dataSources }) => {
            const comments = await dataSources.db.comment.count({
                where: { articleId: parent.id },
            });
            return comments;
        },
    },
    User: {
        articles: async (parent, _, { dataSources }) => {
            return await dataSources.db.article.findMany({
                where: { authorId: parent.id },
            });
        },
        comments: async (parent, _, { dataSources }) => {
            return await dataSources.db.comment.findMany({
                where: { authorId: parent.id },
            });
        },
        likes: async (parent, _, { dataSources }) => {
            return await dataSources.db.like.findMany({
                where: { userId: parent.id },
            });
        },
    },
    Like: {
        article: async (parent, _, { dataSources }) => {
            const article = await dataSources.db.article.findUnique({
                where: { id: parent.articleId },
            });
            if (!article) {
                throw new Error('Article not found');
            }
            return article;
        },
        user: async (parent, _, { dataSources }) => {
            const user = await dataSources.db.user.findUnique({
                where: { id: parent.userId },
            });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        },
    },
    Comment: {
        article: async (parent, _, { dataSources }) => {
            const article = await dataSources.db.article.findUnique({
                where: { id: parent.articleId },
            });
            if (!article) {
                throw new Error('Article not found');
            }
            return article;
        },
        author: async (parent, _, { dataSources }) => {
            const author = await dataSources.db.user.findUnique({
                where: { id: parent.authorId },
            });
            if (!author) {
                throw new Error('Author not found');
            }
            return author;
        },
    },
    Query: {
        async getArticles(
            _,
            { limit, offset, sortBy, filter },
            { dataSources, user }
        ) {
            let orderBy:
                | {
                      [key: string]: string | { [key: string]: string };
                  }
                | undefined = undefined;
            if (sortBy) {
                if (['comments', 'likes'].includes(sortBy)) {
                    orderBy = {
                        [sortBy]: {
                            _count: 'desc',
                        },
                    };
                } else if (sortBy === 'author') {
                    orderBy = {
                        [sortBy]: {
                            username: 'asc',
                        },
                    };
                } else if (sortBy === 'createdAt') {
                    orderBy = {
                        [sortBy]: 'desc',
                    };
                } else {
                    orderBy = {
                        [sortBy]: 'asc',
                    };
                }
            }
            const articles = await dataSources.db.article.findMany({
                take: limit ?? undefined,
                skip: offset ?? undefined,
                where: filter
                    ? {
                          OR: [
                              {
                                  content: {
                                      contains: filter,
                                  },
                              },
                              { title: { contains: filter } },
                              {
                                  author: {
                                      username: {
                                          contains: filter,
                                      },
                                  },
                              },
                          ],
                      }
                    : undefined,
                orderBy,
            });

            if (!articles) throw new Error('No articles found');

            return articles;
        },
        async getArticleById(_, { id }, { dataSources, user }) {
            const article = await dataSources.db.article.findUnique({
                where: { id },
            });

            if (!article) throw new Error('Article not found');

            return article;
        },
        async getUserById(_, { id }, { dataSources }) {
            const user = await dataSources.db.user.findUnique({
                where: { id },
            });
            if (!user) throw new Error('User not found');
            return user;
        },
        async getCommentsByArticleId(_, { articleId }, { dataSources }) {
            const comments = await dataSources.db.comment.findMany({
                where: { articleId },
            });

            if (!comments) throw new Error('Article not found');

            return comments;
        },
        async getCurrentUser(_, __, { user, dataSources }) {
            if (!user?.id) throw new Error('Authentication required');

            const userInDb = await dataSources.db.user.findUnique({
                where: { id: user.id },
            });

            if (!userInDb || userInDb.username !== user?.username)
                throw new Error('User not found');
            return userInDb;
        },
    },
    Mutation: {
        async createUser(_, { username, password }, { dataSources }) {
            const hashedPassword = await bcrypt.hash(password, 10);
            return dataSources.db.user.create({
                data: { username, password: hashedPassword },
            });
        },
        async login(_, { username, password }, { dataSources }) {
            const user = await dataSources.db.user.findUnique({
                where: { username },
            });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new Error('Invalid credentials');
            }
            return jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET ?? 'unset'
            );
        },
        async createArticle(_, { title, content }, { dataSources, user }) {
            if (!user?.id) throw new Error('Authentication required');

            const article = await dataSources.db.article.create({
                data: { title, content, authorId: user.id },
            });

            return article;
        },
        async updateArticle(_, { id, title, content }, { dataSources, user }) {
            const article = await dataSources.db.article.findUnique({
                where: { id },
            });
            if (!article || article.authorId !== user?.id) {
                throw new Error('Not authorized');
            }
            if (!title || !content) {
                throw new Error('No fields to update');
            }
            const updatedArticle = await dataSources.db.article.update({
                where: { id },
                data: { title, content },
            });

            return article;
        },
        async deleteArticle(_, { id }, { dataSources, user }) {
            const article = await dataSources.db.article.findUnique({
                where: { id },
            });
            if (!article || article.authorId !== user?.id) {
                throw new Error('Not authorized');
            }
            await dataSources.db.article.delete({ where: { id } });
            return true;
        },
        async addComment(_, { articleId, content }, { dataSources, user }) {
            if (!user?.id) throw new Error('Authentication required');
            const comment = await dataSources.db.comment.create({
                data: {
                    content,
                    articleId,
                    authorId: user.id,
                },
            });

            return comment;
        },
        async likeArticle(_, { articleId }, { dataSources, user }) {
            if (!user?.id) throw new Error('Authentication required');
            const like = await dataSources.db.like.create({
                data: { articleId, userId: user.id },
            });

            return like;
        },
        async unlikeArticle(_, { articleId }, { dataSources, user }) {
            if (!user?.id) throw new Error('Authentication required');
            const like = await dataSources.db.like.findFirst({
                where: { articleId, userId: user.id },
            });
            if (!like) throw new Error('Like not found');
            await dataSources.db.like.delete({ where: { id: like.id } });
            return true;
        },
    },
};
