const mongoose=require('mongoose');

const FavSchema=new mongoose.Schema({
    author:String,
    content:String,
})

const FavModel=mongoose.model('Quotes',FavSchema);
module.exports={FavModel};