import { graphql } from '../../gql';

const unlikePost_MUTATE = graphql(`
  mutation UnlikeArticle($articleId: Int!) {
    unlikeArticle(articleId: $articleId)
  }
`);

export default unlikePost_MUTATE;
