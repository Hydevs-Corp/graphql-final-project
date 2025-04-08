import { graphql } from '../../gql';

const getPostByID_REQUEST = graphql(`
  query post($id: Int!) {
    getArticleById(id: $id) {
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
      likes {
        id
      }
    }
  }
`);

export default getPostByID_REQUEST;
