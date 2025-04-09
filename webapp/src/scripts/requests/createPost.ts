import { graphql } from '../../gql';

const createPost_MUTATE = graphql(`
  mutation CreateArticle($title: String!, $content: String!) {
    createArticle(title: $title, content: $content) {
      id
    }
  }
`);

export default createPost_MUTATE;
