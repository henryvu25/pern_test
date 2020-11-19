import React, {Fragment, useState} from "react"; //whats a fragment?

const InputTodo = () => {
    const [description, setDescription] = useState(""); //useState is what is in the input field of the form, saved as description

    const onSubmitForm = async e => { //e is event
        e.preventDefault(); //prevents refreshing page
        try {
            const body = { description }; //the description typed in the form is stored into the body variable

            //proxy is only used in development so it will be ignored in production
            //so if there is no http://localhost:5000 then by default it is going to use the heroku domain
            //remember this heroku app is just our server serving the build static content and also holding the restful api

            //it may look like this for example: https://pern-todo-app-demo.herokuapp.com/todos

            const response = await fetch("/todos", { //since we are Creating, the url will end in /todos with POST method. await will wait for the response before posting the console.log below
                method: "POST",
                headers: { "Content-Type": "application/json" }, //content type will be json
                body: JSON.stringify(body) //the body variable will turn into a string, and then put into JSON format
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
    <Fragment>
        <h1 className="text-center mt-5">Pern Todo List</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}> 
            <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
            <button className="btn btn-success">Add</button>
        </form>
    </Fragment>
    )
};

export default InputTodo;