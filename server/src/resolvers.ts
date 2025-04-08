import { Resolvers } from './types.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const resolvers: Resolvers = {
  Query: {
    async getArticles(_, { limit, offset, sortBy }, { dataSources }) {
      const articles = await dataSources.db.article.findMany({
        take: limit ?? undefined,
        skip: offset ?? undefined,
        orderBy: sortBy ? { [sortBy]: 'asc' } : undefined,
        include: {
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
          author: true,
          comments: {
            include: {
              author: true,
              article: {
                include: { author: true },
              },
            },
          },
          likes: {
            include: {
              user: true,
              article: {
                include: { author: true },
              },
            },
          },
        },
      });

      if (!articles) throw new Error('No articles found');

      return articles.map((article) => ({
        ...article,
        likeCount: article._count.likes,
        commentCount: article._count.comments,
        createdAt: article.createdAt.toISOString(),
        author: {
          id: article.author.id,
          username: article.author.username,
        },
        comments: article.comments.map((comment) => ({
          ...comment,
          createdAt: comment.createdAt.toISOString(),
          author: {
            id: comment.author.id,
            username: comment.author.username,
          },
          article: {
            id: comment.article.id,
            title: comment.article.title,
            content: comment.article.content,
            createdAt: comment.article.createdAt.toISOString(),
            author: {
              id: comment.article.author.id,
              username: comment.article.author.username,
            },
          },
        })),
        likes: article.likes.map((like) => ({
          ...like,
          createdAt: like.createdAt.toISOString(),
          user: {
            id: like.user.id,
            username: like.user.username,
          },
          article: {
            id: like.article.id,
            title: like.article.title,
            content: like.article.content,
            createdAt: like.article.createdAt.toISOString(),
            author: {
              id: like.article.author.id,
              username: like.article.author.username,
            },
          },
        })),
      }));
    },
    async getArticleById(_, { id }, { dataSources }) {
      const article = await dataSources.db.article.findUnique({
        where: { id },
        include: {
          author: true,
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
          comments: {
            include: {
              author: true,
              article: { include: { author: true } },
            },
          },
          likes: {
            include: {
              user: true,
              article: { include: { author: true } },
            },
          },
        },
      });

      if (!article) throw new Error('Article not found');

      return {
        ...article,
        likeCount: article._count.likes,
        commentCount: article._count.comments,
        createdAt: article.createdAt.toISOString(),
        comments: article.comments.map((comment) => ({
          ...comment,
          createdAt: comment.createdAt.toISOString(),
          author: {
            id: comment.author.id,
            username: comment.author.username,
          },
          article: {
            id: comment.article.id,
            title: comment.article.title,
            content: comment.article.content,
            createdAt: comment.article.createdAt.toISOString(),
            author: {
              id: comment.article.author.id,
              username: comment.article.author.username,
            },
          },
        })),
        likes: article.likes.map((like) => ({
          ...like,
          createdAt: like.createdAt.toISOString(),
          user: {
            id: like.user.id,
            username: like.user.username,
          },
          article: {
            id: like.article.id,
            title: like.article.title,
            content: like.article.content,
            createdAt: like.article.createdAt.toISOString(),
            author: {
              id: like.article.author.id,
              username: like.article.author.username,
            },
          },
        })),
      };
    },
    async getUserById(_, { id }, { dataSources }) {
      const user = await dataSources.db.user.findUnique({
        where: { id },
        include: {
          articles: {
            include: { author: true },
          },
          comments: {
            include: {
              author: true,
              article: {
                include: { author: true },
              },
            },
          },
          likes: {
            include: {
              user: true,
              article: {
                include: { author: true },
              },
            },
          },
        },
      });
      if (!user) throw new Error('User not found');
      return {
        ...user,
        articles: user.articles.map((article) => ({
          ...article,
          createdAt: article.createdAt.toISOString(),
        })),
        comments: user.comments.map((comment) => ({
          ...comment,
          article: {
            ...comment.article,
            createdAt: comment.article.createdAt.toISOString(),
          },
          createdAt: comment.createdAt.toISOString(),
        })),
        likes: user.likes.map((like) => ({
          ...like,
          createdAt: like.createdAt.toISOString(),
          article: {
            ...like.article,
            createdAt: like.article.createdAt.toISOString(),
          },
        })),
      };
    },
    async getCommentsByArticleId(_, { articleId }, { dataSources }) {
      const comments = await dataSources.db.comment.findMany({
        where: { articleId },
        include: {
          author: true,
          article: {
            include: { author: true },
          },
        },
      });

      if (!comments) throw new Error('Article not found');

      return comments.map((comment) => ({
        ...comment,
        createdAt: comment.createdAt.toISOString(),
        article: {
          ...comment.article,
          createdAt: comment.article.createdAt.toISOString(),
        },
      }));
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
        include: { author: true },
      });

      return {
        ...article,
        createdAt: article.createdAt.toISOString(),
        author: {
          id: article.author.id,
          username: article.author.username,
        },
      };
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
        include: { author: true },
      });

      return {
        ...updatedArticle,
        createdAt: updatedArticle.createdAt.toISOString(),
      };
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
        include: {
          author: true,
          article: {
            include: {
              author: true,
            },
          },
        },
      });

      return {
        ...comment,
        createdAt: comment.createdAt.toISOString(),
        article: {
          ...comment.article,
          createdAt: comment.article.createdAt.toISOString(),
        },
      };
    },
    async likeArticle(_, { articleId }, { dataSources, user }) {
      if (!user?.id) throw new Error('Authentication required');
      const like = await dataSources.db.like.create({
        data: { articleId, userId: user.id },
        include: {
          user: true,
          article: {
            include: {
              author: true,
            },
          },
        },
      });

      return {
        ...like,
        createdAt: like.createdAt.toISOString(),
        article: {
          ...like.article,
          createdAt: like.article.createdAt.toISOString(),
        },
      };
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
