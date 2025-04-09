import { graphql } from '../../gql';

const getUserByID_QUERY = graphql(`
    query GetUserById($id: Int!) {
        getUserById(id: $id) {
            likes {
                article {
                    id
                    title
                    author {
                        username
                    }
                }
            }
            articles {
                title
                likeCount
                id
                commentCount
                createdAt
            }
            username
            id
        }
    }
`);

export default getUserByID_QUERY;
