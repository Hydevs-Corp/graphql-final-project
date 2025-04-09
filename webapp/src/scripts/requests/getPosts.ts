import { graphql } from '../../gql';

const getPosts_QUERY = graphql(`
    query GetArticles($filter: String, $sortBy: String) {
        getArticles(filter: $filter, sortBy: $sortBy) {
            author {
                id
                username
            }
            title
            likeCount
            commentCount
            content
            createdAt
            id
            isLiked
        }
    }
`);

export default getPosts_QUERY;
