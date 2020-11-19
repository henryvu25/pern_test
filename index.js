const express = require("express"); // gets express library
const app = express(); //uses that express library
const cors = require("cors"); //cross origin resource sharing - using different ports for localhost and react
const pool = require("./db"); //by using the pool, we can run queries with postgres
const path = require("path"); //allows us to work with directory paths
const PORT = process.env.PORT || 5000;


//process.env.PORT this is an object that contains our environment variables which describes the env our app will run in (heroku's port)
//process.env.NODE_ENV => return production or undefined (indicates whether our app is in production or not)

// middleware
app.use(cors());
app.use(express.json()); //gives us access to req.body to get json data
//app.use(express.static(path.join(__dirname, "client/build")));

if(process.env.NODE_ENV === "production"){
    //serve static content
    //npm run build (a build folder will be made)
    app.use(express.static(path.join(__dirname, "client/build"))); //__dirname is just the path of the folder that index.js is in. path.join adds "client/build" to the path
}


//ROUTES//

//create a todo

app.post("/todos", async (req, res) => { //post is for adding data. named route as "todos". req-uest from the client side, then res-ponse back to the client. async is bc it takes time to get or create data so async provides "await" to wait for the function to complete before continuing
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]); //$1 allows you to use data from the variable in the array. RETURNING returns data 

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
//get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo"); //don't need RETURNING * because this query already returns data
        
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo

app.get("/todos/:id", async (req, res) => { //:id is the key (it can be named anything) and the value is whatever is put into the end of the url
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
})

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json("Todo was deleted!")
    } catch (err) {
        console.error(err.message);
    }
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
});

app.listen(PORT, () => { //express has a listen function that takes arguments: (port number, callback function)
    console.log(`Server has started on port ${PORT}`);
});