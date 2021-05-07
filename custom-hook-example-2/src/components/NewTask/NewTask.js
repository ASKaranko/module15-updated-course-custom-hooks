import { useCallback } from "react";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const addTask = (taskText, dataObj) => {
    const generatedId = dataObj.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {

    sendTaskRequest({
      url:
        "https://react-updated-course-http-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { text: taskText }
      // bind позволяет не переносить функцию addTask внутрь enterTaskHandler,
      // чтобы иметь доступ к taskText, а передать в функцию addTask taskText ПЕРВЫМ параметром
    }, addTask.bind(null, taskText));
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
