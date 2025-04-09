import { graphql } from '../../gql';

const registerUser_MUTATE = graphql(`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      username
    }
    login(username: $username, password: $password)
  }
`);

export default registerUser_MUTATE;
