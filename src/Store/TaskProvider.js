import { useState, useEffect } from "react";
import TaskContext from "./TaskContext";

const TaskProvider = (props) => {
  const [tasks, setTasks] = useState([]);

  const firebaseUrl = "https://tasks-43814-default-rtdb.firebaseio.com/";

  useEffect(() => {
    // Fetch initial data from Firebase when the component mounts
    fetchTasks();
    fetchCompletedTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${firebaseUrl}/tasks.json`);
      const data = await response.json();
      if (data) {
        const tasksArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTasks(tasksArray);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const response = await fetch(`${firebaseUrl}/tasks.json`);
      const data = await response.json();
      if (data) {
        const completedTasksArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTasks(completedTasksArray)
      }
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  };

  const AddTaskHandler = async (newTask) => {
    try {
      const response = await fetch(`${firebaseUrl}/tasks.json`, {
        method: "POST",
        body: JSON.stringify({...newTask,isTaskCompleted:false}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setTasks([...tasks, { ...newTask, id: data.name }]);
    } catch (error) {
      console.error("Error adding task:", error);
    }

  };

  const deleteTaskHandler = async (deleteTask) => {
    try {
      await fetch(`${firebaseUrl}/tasks/${deleteTask.id}.json`, {
        method: "DELETE",
      });

      const deletedTask = tasks.filter((task) => task.id !== deleteTask.id);
      setTasks(deletedTask);
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }

  };

  const taskCompletedHandler = async(completedTask) => {

    console.log(completedTask,"completed task")

    try {
            const taskIndex = tasks.findIndex(task=> task.id === completedTask.id)
            console.log(completedTask,"completed task")
            const updatedTask = {...completedTask ,isTaskCompleted:true}
            await fetch(`${firebaseUrl}/tasks/${completedTask.id}.json`, {
            method: "PUT",
            body: JSON.stringify(updatedTask),
            headers: {
                "Content-Type": "application/json",
            },
            });
            tasks[taskIndex] = updatedTask;
            const updatedTasks = [...tasks] 
            setTasks(updatedTasks)
        } catch (error) {
            console.error("Error completing task:", error);
        }
  };

  const undoneTaskHandler = async(undoneTask) => {

    try {
        const taskIndex = tasks.findIndex(task=> task.id === undoneTask.id)
        console.log(undoneTask,"completed task")
        const updatedTask = {...undoneTask ,isTaskCompleted:false}
        await fetch(`${firebaseUrl}/tasks/${undoneTask.id}.json`, {
          method: "PUT",
          body: JSON.stringify(updatedTask),
          headers: {
            "Content-Type": "application/json",
          },
          
        });
            tasks[taskIndex] = updatedTask;
            const updatedTasks = [...tasks] 
            setTasks(updatedTasks)
      } catch (error) {
        console.error("Error undoing task:", error);
      }

  };

  const obj = {
    tasks,
    AddTask: AddTaskHandler,
    deleteTask: deleteTaskHandler,
    taskCompletedHandler,
    undoneTaskHandler,
  };

  return (
    <TaskContext.Provider value={obj}>{props.children}</TaskContext.Provider>
  );
};

export default TaskProvider;
