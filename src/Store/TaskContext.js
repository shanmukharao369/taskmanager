import { createContext } from "react";


const TaskContext = createContext({
    tasks : [],
    AddTask: ()=>{},
    deleteTask : ()=>{},
    taskCompletedHandler : ()=>{},
    undoneTaskHandler : () =>{}

})

export default TaskContext;