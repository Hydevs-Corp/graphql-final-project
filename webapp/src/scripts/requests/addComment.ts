import { graphql } from '../../gql';

const addComment_MUTATE = graphql(`
    mutation AddComment($articleId: Int!, $content: String!) {
        addComment(articleId: $articleId, content: $content) {
            id
            content
            createdAt
        }
    }
`);

export default addComment_MUTATE;
