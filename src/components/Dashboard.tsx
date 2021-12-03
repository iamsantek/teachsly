//@ts-nocheck
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect, useContext } from "react";
import { createTodo } from "../graphql/mutations";
import { listTodos } from "./../graphql/queries";
import { UserDashboardContext } from "../contexts/UserDashboardContext";

const Dashboard = () => {
  const [allTodos, setAlltodos] = useState(null);
  const [name, setTodoName] = useState("");

  const user = useContext(UserDashboardContext);
  console.log(`User dashboard:`, user);

  const changeTodoName = (e) => {
    setTodoName(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const todos = await API.graphql(graphqlOperation(listTodos));
      setAlltodos(todos.data.listTodos.items);
    })();
  }, []);

  const submitAddTodo = async (e) => {
    e.preventDefault();
    if (name === "") return alert("Input field cannot be empty");
    const todo = { name, done: false };
    await API.graphql(graphqlOperation(createTodo, { input: todo }));
    allTodos === null ? setAlltodos([todo]) : setAlltodos([todo, ...allTodos]);
  };

  const toggleTodo = async (id: number) => {
    const todo = allTodos.find(({ id: _id }) => _id === id);
    let newTodo = { id, name: todo.name };
    newTodo.done = todo.done ? false : true;
    await API.graphql(graphqlOperation(updateTodo, { input: newTodo }));
  };

  return (
    <>
      <div className="heading">
        <h1>The Office English Learning</h1>
        <div className="sign-out">
          <AmplifySignOut />
        </div>
      </div>
      <form className="add-todo-form" onSubmit={submitAddTodo}>
        <input placeholder="Add Todo" onChange={changeTodoName} />
        <button type="submit">+</button>
      </form>
      {allTodos === null ? (
        <p>Loading Todos...</p>
      ) : allTodos.length === 0 ? (
        <p>No Todo available</p>
      ) : (
        <div className="todos">
          {allTodos.reverse().map(({ id, name, done }, i) => (
            <div className="todo-block" key={i}>
              <input
                onClick={() => toggleTodo(id)}
                type="checkbox"
                id={id}
                value={id}
                key={i}
                defaultChecked={done}
              />
              <label htmlFor={id}>{name}</label>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;
