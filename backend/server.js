import express from 'express';
import dotenv from "dotenv";
import connection from './config/db.js';
import cors from "cors";
import postRouter from './routes/posts.routes.js'

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const options = {
    origin: '*',
    credentials: true,
}

//middleware
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(options));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE ');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Accept-Encoding', "gzip");
    res.setHeader('Content-Type', 'application/json');
    next();

})
app.use('/', postRouter);
app.use('/posts', postRouter);

connection().then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})

