const mongoConfig = {
  serverUrl: () => {
    if (process.env.DB_HOST) {
      return "mongodb://mongodb:27017/red?directConnection=true&serverSelectionTimeoutMS=2000";
    }
    return "mongodb://localhost:27017/red?directConnection=true&serverSelectionTimeoutMS=2000";
  },
};

export default mongoConfig;
