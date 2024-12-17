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
app.get('/tasks', async (req,res)=>{
    
    try{
        const result = await Todo.find()
      
        if (result.length===0) {
            res.send({
                success:false,
                message:'No Task Found',
                data:result
            })
        } else {
            res.send({
                success:true,
                message:'Todo List Retrived Successfully',
                data:result
            })
        }
    }catch(error){
        res.status(500).send({
            success:false,
            message:'Todo List is Not Retrived ',
            data:error.message,
        })
    }; 
});

//  =====> create task
app.post('/tasks', async (req,res)=>{
    const {title,description,status} = req.body;

    console.log(req.body);
    

    try {
        const result = await Todo.create({title,description,status})
        res.send({
            success:true,
            message:'Task is created successfully',
            data:result,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Task is Not created ',
            data:error.message,
        })
}});
 

//  =====> find single task
app.get('/tasks/:id',async (req,res)=>{
    const id =req.params.id;
   

    try {
        const result = await Todo.findById(id)
       if (!result) {
        res.send({
            success:"fetched",
            message:'Task is not present',
            data:result,
        })
       }else{
        res.send({
            success:true,
            message:'Task is fetched',
            data:result,
        })
       }

    } catch (error) {
        res.status(500).send({
            success:false,
            message:'failed to retived todo',
            data:error.message,
        })
    }

})


// update task
app.put('/tasks/:id', async (req,res)=>{
    const id = req.params.id;
    const updatedTodo= req.body;
    try {
        const result =  await Todo.findByIdAndUpdate(id,updatedTodo,{
            new:true,
            runValidators:true,
        });
        if (!result) {
            res.send({
                success:false,
                message:'Task was not found',
                data:result,
            })
        } else {
            res.send({
                success:true,
                message:'Task is updated',
                data:result,
            })
        }

    } catch (error) {
        res.status(500).send({
            success:true,
            message:'Task is not updated',
            data:error.message,
        })

    }
})


//delete
app.delete("/tasks/:id",async (req,res)=>{
    try {
        const result = await Todo.findByIdAndDelete(req.params.id)

        if (!result) {
            res.send({
                success:false,
                message:'Task does not exist',
                data:result,
            })     
        } else {
            res.send({
                success:true,
                message:'Task is deleted',
                data:result,
            })
        }
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Task cannot be deleted',
            data:error.message,
        })
    }
})









app.listen(PORT,()=>{console.log(`server started on ${PORT}`);
})