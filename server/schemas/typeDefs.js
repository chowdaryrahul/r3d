import { gql } from "apollo-server-core";


export const typeDefs = gql`
  scalar Upload

type AllDetails{
  url:String!
  name:String
  description:String
  category:String
}
  type Query {
    getDetails: [AllDetails]
    
  }
 input Details{
     name:String
     description:String
     category:String
 }
 type Detail{
     name:String
     description:String
 }
  type Mutation {
    detailsUpload(file: Upload!, details:Details): Detail!
  }
`;