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
    "\n  query post($id: Int!) {\n    getArticleById(id: $id) {\n      author {\n        username\n      }\n      commentCount\n      likeCount\n      comments {\n        author {\n          username\n        }\n        content\n        createdAt\n        id\n      }\n      content\n      createdAt\n      title\n      likes {\n        id\n      }\n    }\n  }\n": typeof types.PostDocument,
    "\n  query postList {\n    getArticles {\n      id\n      author {\n        id\n        username\n      }\n      title\n      likeCount\n      commentCount\n      content\n      createdAt\n    }\n  }\n": typeof types.PostListDocument,
    "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n": typeof types.LoginDocument,
};
const documents: Documents = {
    "\n  query post($id: Int!) {\n    getArticleById(id: $id) {\n      author {\n        username\n      }\n      commentCount\n      likeCount\n      comments {\n        author {\n          username\n        }\n        content\n        createdAt\n        id\n      }\n      content\n      createdAt\n      title\n      likes {\n        id\n      }\n    }\n  }\n": types.PostDocument,
    "\n  query postList {\n    getArticles {\n      id\n      author {\n        id\n        username\n      }\n      title\n      likeCount\n      commentCount\n      content\n      createdAt\n    }\n  }\n": types.PostListDocument,
    "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n": types.LoginDocument,
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
export function graphql(source: "\n  query post($id: Int!) {\n    getArticleById(id: $id) {\n      author {\n        username\n      }\n      commentCount\n      likeCount\n      comments {\n        author {\n          username\n        }\n        content\n        createdAt\n        id\n      }\n      content\n      createdAt\n      title\n      likes {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query post($id: Int!) {\n    getArticleById(id: $id) {\n      author {\n        username\n      }\n      commentCount\n      likeCount\n      comments {\n        author {\n          username\n        }\n        content\n        createdAt\n        id\n      }\n      content\n      createdAt\n      title\n      likes {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query postList {\n    getArticles {\n      id\n      author {\n        id\n        username\n      }\n      title\n      likeCount\n      commentCount\n      content\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query postList {\n    getArticles {\n      id\n      author {\n        id\n        username\n      }\n      title\n      likeCount\n      commentCount\n      content\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;