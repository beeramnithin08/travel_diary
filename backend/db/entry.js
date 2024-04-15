const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    title:String,
    description:String,
    date:String,
    userId:String,
    location:String,
    imageUrl:String,
    
});

module.exports = mongoose.model('travelentries',entrySchema);

