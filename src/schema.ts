import gql from "graphql-tag";

export const typeDefs = gql`
    type Doctor {
        name: String
        speciality: Speciality
    }

    type Query {
        doctors(specialities: [Speciality!]): [Doctor]
        add(number1: Float!, number2: Float!): Float
        subtract(number1: Float!, number2: Float!): Float
        multiply(number1: Float!, number2: Float!): Float
        divide(number1: Float!, number2: Float!): Float
        closestColor(color: String!): String
    }

    enum Speciality {
        PSYCHOLOGIST
        OPHTALMOLOGIST
    }
`;
