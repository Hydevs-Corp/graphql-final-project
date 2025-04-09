import { graphql } from '../../gql';

const likePost_MUTATE = graphql(`
  mutation LikeArticle($articleId: Int!) {
    likeArticle(articleId: $articleId) {
      id
    }
  }
`);

export default likePost_MUTATE;
