/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Article = {
  __typename?: 'Article';
  author: User;
  commentCount?: Maybe<Scalars['Int']['output']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  likeCount?: Maybe<Scalars['Int']['output']>;
  likes?: Maybe<Array<Maybe<Like>>>;
  title: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  article: Article;
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type Like = {
  __typename?: 'Like';
  article: Article;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment?: Maybe<Comment>;
  createArticle?: Maybe<Article>;
  createUser?: Maybe<User>;
  deleteArticle?: Maybe<Scalars['Boolean']['output']>;
  likeArticle?: Maybe<Like>;
  login?: Maybe<Scalars['String']['output']>;
  unlikeArticle?: Maybe<Scalars['Boolean']['output']>;
  updateArticle?: Maybe<Article>;
};


export type MutationAddCommentArgs = {
  articleId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
};


export type MutationCreateArticleArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLikeArticleArgs = {
  articleId: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUnlikeArticleArgs = {
  articleId: Scalars['Int']['input'];
};


export type MutationUpdateArticleArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getArticleById?: Maybe<Article>;
  getArticles?: Maybe<Array<Maybe<Article>>>;
  getCommentsByArticleId?: Maybe<Array<Maybe<Comment>>>;
  getUserById?: Maybe<User>;
};


export type QueryGetArticleByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetArticlesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCommentsByArticleIdArgs = {
  articleId: Scalars['Int']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  articles?: Maybe<Array<Maybe<Article>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  id: Scalars['Int']['output'];
  likes?: Maybe<Array<Maybe<Like>>>;
  username: Scalars['String']['output'];
};

export type PostQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type PostQuery = { __typename?: 'Query', getArticleById?: { __typename?: 'Article', commentCount?: number | null, likeCount?: number | null, content: string, createdAt: string, title: string, author: { __typename?: 'User', username: string }, comments?: Array<{ __typename?: 'Comment', content: string, createdAt: string, id: number, author: { __typename?: 'User', username: string } } | null> | null, likes?: Array<{ __typename?: 'Like', id: number } | null> | null } | null };

export type PostListQueryVariables = Exact<{ [key: string]: never; }>;


export type PostListQuery = { __typename?: 'Query', getArticles?: Array<{ __typename?: 'Article', id: number, title: string, likeCount?: number | null, commentCount?: number | null, content: string, createdAt: string, author: { __typename?: 'User', id: number, username: string } } | null> | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: string | null };


export const PostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"post"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getArticleById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<PostQuery, PostQueryVariables>;
export const PostListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"postList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<PostListQuery, PostListQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;