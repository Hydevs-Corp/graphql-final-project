import { graphql } from '../../gql';

const loginUser_MUTATE = graphql(`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`);

export default loginUser_MUTATE;
