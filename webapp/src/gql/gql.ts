/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    mutation AddComment($articleId: Int!, $content: String!) {\n        addComment(articleId: $articleId, content: $content) {\n            id\n            content\n            createdAt\n        }\n    }\n": typeof types.AddCommentDocument,
    "\n  mutation CreateArticle($title: String!, $content: String!) {\n    createArticle(title: $title, content: $content) {\n      id\n    }\n  }\n": typeof types.CreateArticleDocument,
    "\n    mutation DeleteArticle($deleteArticleId: Int!) {\n        deleteArticle(id: $deleteArticleId)\n    }\n": typeof types.DeleteArticleDocument,
    "\n    query post($id: Int!) {\n        getArticleById(id: $id) {\n            id\n            author {\n                username\n            }\n            commentCount\n            likeCount\n            comments {\n                author {\n                    username\n                }\n                content\n                createdAt\n                id\n            }\n            content\n            createdAt\n            title\n            isLiked\n            likes {\n                id\n            }\n        }\n    }\n": typeof types.PostDocument,
    "\n    query GetArticles($filter: String, $sortBy: String) {\n        getArticles(filter: $filter, sortBy: $sortBy) {\n            author {\n                id\n                username\n            }\n            title\n            likeCount\n            commentCount\n            content\n            createdAt\n            id\n            isLiked\n        }\n    }\n": typeof types.GetArticlesDocument,
    "\n    query GetUserById($id: Int!) {\n        getUserById(id: $id) {\n            likes {\n                article {\n                    id\n                    title\n                    author {\n                        username\n                    }\n                }\n            }\n            articles {\n                title\n                likeCount\n                id\n                commentCount\n                createdAt\n            }\n            username\n            id\n        }\n    }\n": typeof types.GetUserByIdDocument,
    "\n  mutation LikeArticle($articleId: Int!) {\n    likeArticle(articleId: $articleId) {\n      id\n    }\n  }\n": typeof types.LikeArticleDocument,
    "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n": typeof types.LoginDocument,
    "\n  mutation CreateUser($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n      username\n    }\n    login(username: $username, password: $password)\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation UnlikeArticle($articleId: Int!) {\n    unlikeArticle(articleId: $articleId)\n  }\n": typeof types.UnlikeArticleDocument,
    "\n  mutation updateArticle($id: Int!, $title: String!, $content: String!) {\n    updateArticle(id: $id, title: $title, content: $content) {\n      id\n      title\n      content\n    }\n  }\n": typeof types.UpdateArticleDocument,
};
const documents: Documents = {
    "\n    mutation AddComment($articleId: Int!, $content: String!) {\n        addComment(articleId: $articleId, content: $content) {\n            id\n            content\n            createdAt\n        }\n    }\n": types.AddCommentDocument,
    "\n  mutation CreateArticle($title: String!, $content: String!) {\n    createArticle(title: $title, content: $content) {\n      id\n    }\n  }\n": types.CreateArticleDocument,
    "\n    mutation DeleteArticle($deleteArticleId: Int!) {\n        deleteArticle(id: $deleteArticleId)\n    }\n": types.DeleteArticleDocument,
    "\n    query post($id: Int!) {\n        getArticleById(id: $id) {\n            id\n            author {\n                username\n            }\n            commentCount\n            likeCount\n            comments {\n                author {\n                    username\n                }\n                content\n                createdAt\n                id\n            }\n            content\n            createdAt\n            title\n            isLiked\n            likes {\n                id\n            }\n        }\n    }\n": types.PostDocument,
    "\n    query GetArticles($filter: String, $sortBy: String) {\n        getArticles(filter: $filter, sortBy: $sortBy) {\n            author {\n                id\n                username\n            }\n            title\n            likeCount\n            commentCount\n            content\n            createdAt\n            id\n            isLiked\n        }\n    }\n": types.GetArticlesDocument,
    "\n    query GetUserById($id: Int!) {\n        getUserById(id: $id) {\n            likes {\n                article {\n                    id\n                    title\n                    author {\n                        username\n                    }\n                }\n            }\n            articles {\n                title\n                likeCount\n                id\n                commentCount\n                createdAt\n            }\n            username\n            id\n        }\n    }\n": types.GetUserByIdDocument,
    "\n  mutation LikeArticle($articleId: Int!) {\n    likeArticle(articleId: $articleId) {\n      id\n    }\n  }\n": types.LikeArticleDocument,
    "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n": types.LoginDocument,
    "\n  mutation CreateUser($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n      username\n    }\n    login(username: $username, password: $password)\n  }\n": types.CreateUserDocument,
    "\n  mutation UnlikeArticle($articleId: Int!) {\n    unlikeArticle(articleId: $articleId)\n  }\n": types.UnlikeArticleDocument,
    "\n  mutation updateArticle($id: Int!, $title: String!, $content: String!) {\n    updateArticle(id: $id, title: $title, content: $content) {\n      id\n      title\n      content\n    }\n  }\n": types.UpdateArticleDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddComment($articleId: Int!, $content: String!) {\n        addComment(articleId: $articleId, content: $content) {\n            id\n            content\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation AddComment($articleId: Int!, $content: String!) {\n        addComment(articleId: $articleId, content: $content) {\n            id\n            content\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateArticle($title: String!, $content: String!) {\n    createArticle(title: $title, content: $content) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateArticle($title: String!, $content: String!) {\n    createArticle(title: $title, content: $content) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteArticle($deleteArticleId: Int!) {\n        deleteArticle(id: $deleteArticleId)\n    }\n"): (typeof documents)["\n    mutation DeleteArticle($deleteArticleId: Int!) {\n        deleteArticle(id: $deleteArticleId)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query post($id: Int!) {\n        getArticleById(id: $id) {\n            id\n            author {\n                username\n            }\n            commentCount\n            likeCount\n            comments {\n                author {\n                    username\n                }\n                content\n                createdAt\n                id\n            }\n            content\n            createdAt\n            title\n            isLiked\n            likes {\n                id\n            }\n        }\n    }\n"): (typeof documents)["\n    query post($id: Int!) {\n        getArticleById(id: $id) {\n            id\n            author {\n                username\n            }\n            commentCount\n            likeCount\n            comments {\n                author {\n                    username\n                }\n                content\n                createdAt\n                id\n            }\n            content\n            createdAt\n            title\n            isLiked\n            likes {\n                id\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetArticles($filter: String, $sortBy: String) {\n        getArticles(filter: $filter, sortBy: $sortBy) {\n            author {\n                id\n                username\n            }\n            title\n            likeCount\n            commentCount\n            content\n            createdAt\n            id\n            isLiked\n        }\n    }\n"): (typeof documents)["\n    query GetArticles($filter: String, $sortBy: String) {\n        getArticles(filter: $filter, sortBy: $sortBy) {\n            author {\n                id\n                username\n            }\n            title\n            likeCount\n            commentCount\n            content\n            createdAt\n            id\n            isLiked\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetUserById($id: Int!) {\n        getUserById(id: $id) {\n            likes {\n                article {\n                    id\n                    title\n                    author {\n                        username\n                    }\n                }\n            }\n            articles {\n                title\n                likeCount\n                id\n                commentCount\n                createdAt\n            }\n            username\n            id\n        }\n    }\n"): (typeof documents)["\n    query GetUserById($id: Int!) {\n        getUserById(id: $id) {\n            likes {\n                article {\n                    id\n                    title\n                    author {\n                        username\n                    }\n                }\n            }\n            articles {\n                title\n                likeCount\n                id\n                commentCount\n                createdAt\n            }\n            username\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LikeArticle($articleId: Int!) {\n    likeArticle(articleId: $articleId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation LikeArticle($articleId: Int!) {\n    likeArticle(articleId: $articleId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n      username\n    }\n    login(username: $username, password: $password)\n  }\n"): (typeof documents)["\n  mutation CreateUser($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n      username\n    }\n    login(username: $username, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnlikeArticle($articleId: Int!) {\n    unlikeArticle(articleId: $articleId)\n  }\n"): (typeof documents)["\n  mutation UnlikeArticle($articleId: Int!) {\n    unlikeArticle(articleId: $articleId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateArticle($id: Int!, $title: String!, $content: String!) {\n    updateArticle(id: $id, title: $title, content: $content) {\n      id\n      title\n      content\n    }\n  }\n"): (typeof documents)["\n  mutation updateArticle($id: Int!, $title: String!, $content: String!) {\n    updateArticle(id: $id, title: $title, content: $content) {\n      id\n      title\n      content\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;