import { gql } from "apollo-server-core";


export const typeDefs = gql`
  scalar Upload

type AllDetails{
  postId:ID!
  url:String!
  name:String
  description:String
  category:String
  username:String
  userId:String
  comments:[String]
  time:String
  lastItemId:String
}

  type Query {
    getDetails(userId:String): [AllDetails]
    getAllDetails(offset:Int, limit:Int, category:String):[AllDetails]
  }
 input Details{
     name:String!
     description:String
     category:String
     username:String!
     userId:String!
 }
 type Detail{
     name:String
     description:String
     username:String
 }
 input Comment{
   postId:String
   content:[String]
 }
  type Mutation {
    detailsUpload(file: Upload!, details:Details): Detail!
    AddComment(comment:Comment):[String]
  }
`;