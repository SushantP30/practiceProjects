const express=require('express')
const app=express()

//connection Db
const mongoose=require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/testTodos',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("Connected to mongoDb"))
.catch((err)=>console.error('failed to connect mongoDb',err))

//define a scema for todoitems
const todoSchema=new mongoose.Schema({
    title:String,
    completed:String
});

const Todo=mongoose.model('Todo',todoSchema);

//parse json request
app.use(express.json())


//create new todo item
app.post('/todos',(req,res)=>{
    const{title,completed}=req.body;
    const todo=new Todo ({title,completed});
    todo.save()
    .then((result)=>res.json(result))
    .catch((err)=>res.status(500).json({error:'Failed to create Todo item'}));
});

//Read all todos
app.get('/todos',(req,res)=>{
    Todo.find()
    .then((todos)=>res.json(todos))
    .catch((err)=>res.status(500).json({error:'Failed to load todos'}));
})

//read specific todo

app.get('/todo/:id',(req,res)=>{
    const id=req.params.id;
    Todo.findById(id)
    .then((todo)=>{
        if(!todo){
            return res.status(404).json({error:'Todo item not Found!!'});
        }
        else{
            return res.status(200).json(todo)
        }
    }).catch((err)=>{
        res.status(500).json({error:'Failed to fetch todo item!!'});
    })
})

//update todo item

app.put('todos/id',(req,res)=>{
    const id=req.params.id;
    const{title,completed}=req.body;

    Todo.findByIdAndUpdate(id,{title,completed},{new:true})
    .then((todo)=>{
        if(!todo){
            return res.status(404).json({error:'Todo item not found!!'});
        }
        else{
            return res.status(200).json(todo);
        }
    }).catch((err)=>{
        res.status(500).json({error:'failed to update!!'});
    })
})

//delete todo item

app.delete('todo/:id',(req,res)=>{
    const id=req.params.id;
    Todo.findByIdAndDelete(id)
    .then((todo)=>{
        if(!todo){
            return res.status(404).json({error:'Todo item not found!!'});
        }
        else{
            return res.status(200).json(todo);
        }
    }).catch((err)=>{
        res.status(500).json({error:'Failed to delete todo!!'});
    })
})


app.listen(3000,()=>{
    console.log('server is running on 3000')
})