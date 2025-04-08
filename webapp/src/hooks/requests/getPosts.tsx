import { graphql } from '../../gql';

const getPosts_REQUEST = graphql(`
  query postList {
    getArticles {
      id
      author {
        id
        username
      }
      title
      likeCount
      commentCount
      content
      createdAt
    }
  }
`);

export default getPosts_REQUEST;
