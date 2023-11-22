import { useContext } from "react";
import TaskContext from "../Store/TaskContext";
import { Button } from "react-bootstrap";
import classes from "./TaskDetails.module.css";
import { NavLink } from "react-router-dom";

const TaskDetails = () => {
  const ctx = useContext(TaskContext);

  const undoneTasks = []
  const  doneTasks = []

  for(let task of ctx.tasks){
      if(task.isTaskCompleted){
        doneTasks.push(task)
      }else{
        undoneTasks.push(task)
      }
  }


  const hasTasks = undoneTasks.length > 0;
  const doneTask = doneTasks.length>0;

  console.log(ctx.tasks,"details task")

  return (
    <div>
      {hasTasks && (
        <div className={classes.container}>
        <h3 className={classes.txt}> Un Completed Tasks</h3>
          {undoneTasks.map(tasks => (<div key={tasks.id} className={classes.smallcontainer}>
              <h2>
                Task Name :{tasks.taskName} - Task Description :{tasks.taskDescription} - <Button variant="danger" onClick={ctx.deleteTask.bind(null,tasks)}>Delete</Button> - <Button variant="success" onClick={ctx.taskCompletedHandler.bind(null,tasks)}>Done</Button>
              </h2>
            </div>))}
        </div>)}
      {!hasTasks && <h4 style={{marginTop: "120px",fontFamily:"serif"}}>No Tasks Found Add something  - <NavLink to="/tasklist" className={classes.lnk}>
      Click to Add Task
    </NavLink> </h4>}

    {doneTask && (<div className={classes.newcontainer}>
        <h3 className={classes.txt}>Completed Tasks</h3>
        {doneTasks.map(tasks => (
            <div className={classes.newsmallcontainer} key={tasks.id}>
                <h2>Task Name :{tasks.taskName} - Task Description :{tasks.taskDescription} - <Button variant="danger" onClick={ctx.deleteTask.bind(null,tasks)}>Delete</Button> - <Button variant="success"  onClick={ctx.undoneTaskHandler.bind(null,tasks)}>UnDone</Button></h2>
            </div>
        ))}

        </div>)}
        {!doneTask && <h4 style={{marginTop: "10px",fontFamily:"serif"}}>No Completed Tasks</h4>}

    </div>
  );
};

export default TaskDetails;
