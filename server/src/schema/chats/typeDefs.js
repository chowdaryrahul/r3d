import { gql } from "apollo-server-core";



const typeDefs = gql`

type Chat {
    _id:ID
    user_name:String
    message:String
    date:String
}
type Query{
    allChats:[Chat]
}

type Mutation {
    addChat(user_name:String, message:String, date:String):Chat!   
}
type Subscription{
    addedChat:Chat
}
`
export default typeDefs;