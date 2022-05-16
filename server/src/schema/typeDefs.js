import user from "./user/typeDefs";
import items from "./prints/typeDefs";
import orders from "./orders/typeDefs";
import chat from './chats/typeDefs'

/**
 * Collection of type definitions
 * - Import individual typeDefs
 * - Add imported typeDefs to typeDefs array
 */
const typeDefs = [user, items, orders, chat];

export default typeDefs;
