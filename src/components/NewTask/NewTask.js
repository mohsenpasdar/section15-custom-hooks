import { useState } from "react";
import useHttp from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: createTask } = useHttp();

  const transformData = (tskTxt, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: tskTxt };
    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    const requestConfig = {
      url: "https://completeguide-http-section14-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      body: { text: taskText },
      headers: {
        "Content-Type": "application/json",
      },
    };
    createTask(requestConfig, transformData.bind(null, taskText));
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
