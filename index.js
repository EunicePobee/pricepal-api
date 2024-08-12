import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import 'dotenv/config';
import { dbConnection } from "./config/db.js";
import errorHandler from "errorhandler";
import { userRouter } from "./routes/user_route.js";
import { categoryRouter } from "./routes/category_route.js";
import { companyRouter } from "./routes/company_route.js";
import { productRouter } from "./routes/product_route.js";
// import {restartServer} from "./restart_server.js"


// Create Express app
const app = express();

expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth', 'categories', 'companies', 'products'],
    mongooseModels: mongoose.modelNames(),
});



// Apply middlewares
app.use(express.json());
app.use(cors({credentials: true, origin: '*'}));
app.use(errorHandler({log: false}));


// Connect to database
dbConnection();


// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     // cookie: { secure: true}
//     // Store session
//     store: MongoStore.create({
//         mongoUrl: process.env.MONGO_URL
//     })
// }));


// Use routes
app.use('/api/v1', userRouter);
app.use('/api/v1', categoryRouter);
app.use('/api/v1', companyRouter);
app.use('/api/v1', productRouter);


expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));







// Listen for incoming requests
const port = process.env.PORT || 5200;
app.listen(port, () => {
    // reboot().then(() => {
    //     console.log('Server restarted');
    // })
    console.log(`App is listening on port ${port}`);
});