import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connect  from './database/mongodb.js';
import passport from 'passport';
import passportConfig from './config/passport.js';
import * as dotenv from 'dotenv';
import routers from './routes/index.js'
dotenv.config();
const app = express();
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/', routers);
passportConfig(passport);

await connect();

app.listen(PORT, () => {
    console.log(`Server is running at localhost:${PORT}`);
})