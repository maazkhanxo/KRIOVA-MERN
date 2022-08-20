const connectionToMongo = require("./db");
const express = require("express");
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 8000;
connectionToMongo();
app.use(cors())
app.use(express.json())

app.use(require('./routes/useroutes'))

app.get('/',(req,res)=>{
    res.send("I AM AT HOME PAGE")
})

app.listen(PORT,()=>{
    console.log("Kriova database is listening at 8000");
})