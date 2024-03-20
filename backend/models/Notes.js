import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
  title: {
    type:String,
    required: True
},

description: {
    type:String,
    required: True
},

tag: {
    type:String,
    default:"General"
},

date: {
    type:Date,
    default: Date.now
},


});

model.exports = mongoose.model('notes',NotesSchema)