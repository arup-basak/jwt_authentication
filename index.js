import express from "express";
import './libs/mongo.js' 
import loginRouter from './routes/login.js'
import signUpRouter from './routes/signup.js'

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/login', loginRouter);
app.use('/signup', signUpRouter);


app.listen(3000);
