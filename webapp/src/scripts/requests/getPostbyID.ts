import { graphql } from '../../gql';

const getPostByID_QUERY = graphql(`
    query post($id: Int!) {
        getArticleById(id: $id) {
            id
            author {
                username
            }
            commentCount
            likeCount
            comments {
                author {
                    username
                }
                content
                createdAt
                id
            }
            content
            createdAt
            title
            isLiked
            likes {
                id
            }
        }
    }
`);

export default getPostByID_QUERY;
