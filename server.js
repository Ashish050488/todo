import express from "express";
import dotenv from "dotenv";
import connectToDb  from './database/db.js'
import {Todo} from './models/todo.model.js'


const app = express();

dotenv.config()
const PORT = process.env.PORT




//  Middlewares
app.use(express.json())
connectToDb()



//  Todo Api

//  =====> fetch all task 
app.get('/task', async (req,res)=>{
    try{
        const result = await Todo.find()
        res.send({
            success:true,
            message:'Todo List Retrived Successfully',
            data:result
        })
    }catch(error){
        res.send({
            success:false,
            message:'Todo List is Not Retrived ',
            data:result
        })
    }; 
});

//  =====> create task
app.post('/create-todo', async (req,res)=>{
    const todoDetails = req.body;
    try {
        const result = await Todo.create(todoDetails)
        res.send({
            success:true,
            message:'Task is created successfully',
            data:result,
        })
    } catch (error) {
        res.send({
            success:false,
            message:'Task is Not created ',
            data:result,
        })
}});
 

//  =====> find single task
app.get('/:todoId',async (req,res)=>{
    const todoId =req.params.todoId;
   

    try {
        const result = await Todo.findById(todoId)
        res.send({
            success:true,
            message:'Task is fetched',
            data:result,
        })

    } catch (error) {
        res.send({
            success:false,
            message:'failed to retived todo',
            data:result,
        })
    }

})


// update task
app.patch('/:todoId', async (req,res)=>{
    const todoId = req.params.todoId;
    const updatedTodo= req.body;
    try {
        const result =  await Todo.findByIdAndUpdate(todoId,updatedTodo,{
            new:true
        });
        res.send({
            success:true,
            message:'Task is updated',
            data:result,
        })

    } catch (error) {
        res.send({
            success:true,
            message:'Task is not updated',
            data:result,
        })

    }
})


//delete
app.delete("/delete/:todo",async (req,res)=>{
    try {
        const result = await Todo.findByIdAndDelete(req.params.todo)
        res.send({
            success:true,
            message:'Task is deleted',
            data:result,
        })
    } catch (error) {
        res.send({
            success:false,
            message:'Task cannot be deleted',
            data:result,
        })
    }


})







app.listen(PORT,()=>{console.log(`server started on ${PORT}`);
})