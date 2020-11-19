import React, { Fragment, useEffect, useState } from "react"; //useEffect makes a fetch request to our restful APIs when this component is rendered

import EditTodo from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]); //setTodos is how you change the state

    //delete function called from the delete btn below
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`/todos/${id}`, { //fetches with /todos/id with DELETE method
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id)); //sets filter, if the id we deleted is not there, spit out only the ones that are there without refreshing
        } catch (err) {
            console.error(err.message);
        };
    };

    const getTodos = async () => {
        try {
            const response = await fetch("/todos"); //by default, fetch makes a GET request
            const jsonData = await response.json(); //parses the response variable's data into JSON format

            setTodos(jsonData); //changes the todos variable's state to the jsonData
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos(); //useEffect calls the getTodos function
    }, []); //empty array ensures the effect is ran once

    return (<Fragment>
        <table class="table mt-5 text-center">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {/*<tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td><EditTodo todo={todo} /></td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                        </td>
                    </tr>
                ))}


            </tbody>
        </table>
    </Fragment> //table above was formatted from w3schools bootstrap 4 table. the json data in todos is mapped to the table format
)};

export default ListTodos; // exports the return of the ListTodos variable out