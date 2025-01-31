const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const Task = require("./models/tasks.js");
const methodOverride = require('method-override');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));


main()
.then(()=>{
    console.log("connection Success");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/tasks');
}

const tasks = new mongoose.Schema({
    heading: String,
    task: String,
});

//inserting initial data for testing--------
// const Task = mongoose.model("Task", tasks);
// const task1 = new Task({
//     heading: "day 1",
//     task: "learning react"
// });
// task1.save();

// showing task
app.get("/", async (req, res) =>{
    let tasks = await Task.find();
    res.render("index.ejs", {tasks});
});

// new task add
app.get("/tasks/new-task", (req, res) =>{
    res.render("new-task.ejs");
});

//requesting new data
app.post("/tasks", (req, res) =>{
    const task = new Task(req.body);
    task.save();
    res.redirect("/");
});

// edit page
app.get("/tasks/:id/edit", async (req, res)=>{
    let {id} = req.params;
    let task = await Task.findById(id);
    // console.log(task);
    res.render("edit-todo.ejs", {task});
});

// task put on database 
app.put("/tasks/:id", async(req, res)=>{
    let {id} = req.params;
    let {heading: newHeading, task: newTask} = req.body;
    let updatedTask = await Task.findByIdAndUpdate(
        id, 
        {heading: newHeading, task: newTask},
        {runValidators: true, new: true});
        
        console.log(updatedTask);
        res.redirect("/");
});

// delete task
app.delete("/tasks/:id", async(req, res)=>{
    let {id} = req.params;
    let taskDelete = await Task.findByIdAndDelete(id);
    res.redirect("/");
});

// server is running at port no 8080
app.listen(8080, (req, res) =>{
    console.log("running");
});
