import { Resolvers } from "./types.js";
import { createUser } from "./mutations/users/createUser.js";
import { hashPassword, comparePasswords, createJWT } from "./modules/auth.js";

export const resolvers: Resolvers = {
    Query: {
        getArticles: async (_, __, { dataSources }) => {
            return dataSources.db.article.findMany({
                include: { author: true, comments: true, likes: true },
            });
        },
        getArticleById: async (_, { id }, { dataSources }) => {
            return dataSources.db.article.findUnique({
                where: { id },
                include: { author: true, comments: true, likes: true },
            });
        },
    },
    Mutation: {
        createUser: async (_, { username, password }, { dataSources }) => {
            const hashedPassword = await hashPassword(password);
            return dataSources.db.user.create({
                data: { username, password: hashedPassword },
            });
        },
        login: async (_, { username, password }, { dataSources }) => {
            const user = await dataSources.db.user.findUnique({
                where: { username },
            });
            if (!user || !(await comparePasswords(password, user.password))) {
                throw new Error("Invalid credentials");
            }
            return createJWT({ id: user.id, username: user.username });
        },
        createArticle: async (_, { title, content }, { dataSources, user }) => {
            if (!user) throw new Error("Unauthorized");
            return dataSources.db.article.create({
                data: { title, content, authorId: user.id },
            });
        },
        updateArticle: async (
            _,
            { id, title, content },
            { dataSources, user }
        ) => {
            if (!user) throw new Error("Unauthorized");
            const article = await dataSources.db.article.findUnique({
                where: { id },
            });
            if (article?.authorId !== user.id) throw new Error("Forbidden");
            return dataSources.db.article.update({
                where: { id },
                data: { title, content },
            });
        },
        deleteArticle: async (_, { id }, { dataSources, user }) => {
            if (!user) throw new Error("Unauthorized");
            const article = await dataSources.db.article.findUnique({
                where: { id },
            });
            if (article?.authorId !== user.id) throw new Error("Forbidden");
            await dataSources.db.article.delete({ where: { id } });
            return true;
        },
        addComment: async (
            _,
            { articleId, content },
            { dataSources, user }
        ) => {
            if (!user) throw new Error("Unauthorized");
            return dataSources.db.comment.create({
                data: { content, articleId, authorId: user.id },
            });
        },
        likeArticle: async (_, { articleId }, { dataSources, user }) => {
            if (!user) throw new Error("Unauthorized");
            return dataSources.db.like.create({
                data: { articleId, userId: user.id },
            });
        },
    },
};
