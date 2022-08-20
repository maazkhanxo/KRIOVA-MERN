const mongoose = require('mongoose');

let connectionToMongo = ()=>{
    mongoose.connect('mongodb+srv://maazkhanxo:maaz123@cluster0.rd0pt.mongodb.net/Kriova?retryWrites=true&w=majority',()=>{
       console.log("connected to mongoDb")
    })
}

module.exports = connectionToMongo