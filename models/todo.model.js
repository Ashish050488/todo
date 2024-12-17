import mongoose, { model, Schema } from "mongoose";

const todoSchema = new Schema ({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","in-progress","completed"],
        trim:true
    }
});

export const Todo = mongoose.models.Todo ||new model('Todo',todoSchema ) 