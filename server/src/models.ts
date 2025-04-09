export type UserModel = {
    id: number;
    username: string;
    articles?: ArticleModel[];
    comments?: CommentModel[];
    likes?: LikeModel[];
};

export type ArticleModel = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    author: UserModel;
    comments?: CommentModel[];
    likes?: LikeModel[];
};

export type CommentModel = {
    id: number;
    content: string;
    createdAt: string;
    author: UserModel;
    article: ArticleModel;
};

export type LikeModel = {
    id: number;
    createdAt: string;
    user: UserModel;
    article: ArticleModel;
};
