import { Button, Col, Form, Row } from "react-bootstrap";
import classes from "./TaskList.module.css";
import { useContext, useRef } from "react";
import TaskContext from "../Store/TaskContext";

const TaskList = () => {
  const ctx = useContext(TaskContext);

  const taskNameRef = useRef();
  const taskDescriptionRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const taskName = taskNameRef.current.value;
    const taskDescription = taskDescriptionRef.current.value;

    const obj = {
      taskName: taskName,
      taskDescription: taskDescription,
    };

    console.log(obj);

    ctx.AddTask(obj);

    taskNameRef.current.value = "";
    taskDescriptionRef.current.value = "";
  };

  return (
    <div>
      <h1 className={classes.anim}>Task Manager</h1>
      <div className={classes.form}>
        <h1 className={classes.title}>Add Task</h1>

        <Row className="bg-warning p-3">
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Task Name:</Form.Label>
                  <Form.Control type="text" ref={taskNameRef} required />
                </Col>
                <Col>
                  <Form.Label>Task Description:</Form.Label>
                  <Form.Control type="text" ref={taskDescriptionRef} required />
                </Col>
                <Col>
                  <Button className="mt-4" type="submit">
                    Add
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Row>
      </div>
    </div>
  );
};

export default TaskList;
