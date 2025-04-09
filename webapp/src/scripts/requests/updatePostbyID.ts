import { graphql } from '../../gql';

const updatePostbyID_MUTATE = graphql(`
  mutation updateArticle($id: Int!, $title: String!, $content: String!) {
    updateArticle(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`);

export default updatePostbyID_MUTATE;
