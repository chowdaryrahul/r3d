const items = [
  {
    _id: 1,
    title: "Wood Screw Cap",
  },
  {
    _id: 2,
    title: "Wood Screw Cap",
  },
];

const resolvers = {
  Query: {
    fetchItems: (parent, args, context, info) => items,
  },
};

export default resolvers;
