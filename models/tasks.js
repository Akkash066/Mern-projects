const mongoose = require("mongoose");

//inserting random data --------
// const Task = mongoose.model("Task", tasks);
// const task1 = new Task({
//     heading: "day 1",
//     task: "learning react"
// });
// task1.save();

const taskSchema = new mongoose.Schema({
    heading:{
        type: String,
    },
    task:{
        type: String,
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;