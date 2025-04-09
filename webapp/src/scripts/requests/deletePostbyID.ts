import { graphql } from '../../gql';

const deletePostByID_MUTATE = graphql(`
    mutation DeleteArticle($deleteArticleId: Int!) {
        deleteArticle(id: $deleteArticleId)
    }
`);

export default deletePostByID_MUTATE;
