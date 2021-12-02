import React, { useState, useEffect } from "react";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { createTodo, updateTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsExports from "./aws-exports";
 
Amplify.configure(awsExports);
 
function App() {
 const [allTodos, setAlltodos] = useState(null);
 
 useEffect(() => {
   (async () => {
     const todos = await API.graphql(graphqlOperation(listTodos));
     setAlltodos(todos.data.listTodos.items);
   })();
 }, []);
 
 const [name, setTodoName] = useState("");
 
 const changeTodoName = (e) => {
   setTodoName(e.target.value);
 };
 
 const submitAddTodo = async (e) => {
   e.preventDefault();
   if (name === "") return alert("Input field cannot be empty");
   const todo = { name, done: false };
   await API.graphql(graphqlOperation(createTodo, { input: todo }));
   allTodos === null ? setAlltodos([todo]) : setAlltodos([todo, ...allTodos]);
 };
 
 const toggleTodo = async (id) => {
   const todo = allTodos.find(({ id: _id }) => _id === id);
   let newTodo = { id, name: todo.name };
   newTodo.done = todo.done ? false : true;
   await API.graphql(graphqlOperation(updateTodo, { input: newTodo }));
 };
 
 return (
   <div className="App">
     <div className="heading">
       <h1>Amplify Todo</h1>
       <div className="sign-out">
         <AmplifySignOut />
       </div>
     </div>
     <form className="add-todo-form" onSubmit={submitAddTodo}>
       <input
         placeholder="Add Todo"
         onChange={changeTodoName}
       />
       <button type="submit">+</button>
     </form>
     {allTodos === null ? (
       <p>Loading Todos...</p>
     ) : allTodos.length === 0 ? (
       <p>No Todo available</p>
     ) : (
       <div className="todos">
         {allTodos.reverse().map(({ id, name, done },i) => (
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
   </div>
 );
}
 
export default withAuthenticator(App);