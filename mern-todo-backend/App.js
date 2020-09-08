const express = require("express");
const mongoose = require("mongoose");
const Todos = require("./dbModel");

//app config
const app = express();
const port = process.env.PORT || 9000;

//couple of middleware --- setup your security, and also be able to read JSON file
//heroku.com ---- Heroku is a online server somewhere... in Canada or Europe...
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // we will define from where the request will come from
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

//DB config ---- before we connect to our Database we need to fix the middleware...
//database connection
mongoose.connect(
  "mongodb+srv://todoclient:DpOQECdVNnmCwgUI@cluster0.ktzi2.mongodb.net/todos?retryWrites=true&w=majority",
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

//this line is just to check/test, if the connection is working....
mongoose.connection.once("open", () => console.log("DB connected..."));

//api route --- POSTMAN
app.get("/", (req, res) => res.status(200).send("hello world of Ayesha--MERN"));

//GET-- Gets the data from the server
app.get("/gettodos", (req, res) => {
  Todos.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/todos", (req, res) => {
  const dbTodo = req.body;

  Todos.create(dbTodo, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.delete("/deletetodos/:id", (req, res) => {
  Todos.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send({ status: "success", msg: "Deleted..." });
      console.log("Deleted");
    }
  });
});

//Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
