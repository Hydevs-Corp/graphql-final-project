import { graphql } from '../../gql';

const getCurrentUser_QUERY = graphql(`
    query GetCurrentUser {
        getCurrentUser {
            id
        }
    }
`);

export default getCurrentUser_QUERY;
