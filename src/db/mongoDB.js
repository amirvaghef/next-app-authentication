import mongoose from "mongoose";

const db = {
  connect: (DB_HOST) => {
    mongoose.set("autoIndex", true);
    mongoose.set("strictQuery", true);
    mongoose.connect(DB_HOST);

    mongoose.connection.on("error", (err) => {
      console.log(err);
      process.exit();
    });
  },
  close: () => mongoose.connection.close(),
};

export default db;
