require("dotenv").config();

const express = require("express");
const cors = require('cors');


const app = express();
app.use(cors());

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");

//RUTAS
app.use(userRouter);
app.use(authRouter);

app.listen(process.env.PORT, () => {
    console.log(">>> ESCUCHANDO PUERTO EN EL 8080 <<<")
});

app.get('/', (req, res) => {
    res.send("hello world");
})