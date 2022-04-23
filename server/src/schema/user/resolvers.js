const user = {
  name: "Inscythe",
};

const resolvers = {
  Query: {
    user: (parent, args, context, info) => user,
  },
};

export default resolvers;
