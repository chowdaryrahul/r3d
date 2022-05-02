import user from "./user/typeDefs";
import items from "./prints/typeDefs";
import orders from "./orders/typeDefs";
/**
 * Collection of type definitions
 * - Import individual typeDefs
 * - Add imported typeDefs to typeDefs array
 */
const typeDefs = [user, items, orders];

export default typeDefs;
