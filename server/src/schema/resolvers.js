import merge from "lodash/merge";
import user from "./user/resolvers";
import items from "./prints/resolvers";
import orders from "./orders/resolvers";
import chat from './chats/resolvers'


/**
 * Merge all resolvers
 *
 * - Import resolvers for different functionalities
 * - Add imported resolver to resolvers array
 */
const resolvers = merge(user, items, orders, chat);

export default resolvers;
