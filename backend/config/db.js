import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

// const connection = mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
//     .then(() => console.log('Database connected'))
//     .catch((error) => console.log(error.message));

const connection = async () => {
    await mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
}

connection().then(() => console.log('Database connected')).catch((error) => console.log(error.message));
export default connection;