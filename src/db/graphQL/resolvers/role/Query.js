const roleQuery = {
  roles: async (parent, args, { models: contextValue }) => {
    return await contextValue.Role.find();
  },
  role: async (parent, args, { models: contextValue }) => {
    return await contextValue.Role.findById(args.id);
  },
};

export default roleQuery;
