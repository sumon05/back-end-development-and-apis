const express = require("express");
const {inputCleaner, inputValidator}= require("./middleware")
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", (req, res) => {
    res.redirect("/form");
});
app.get("/form", (req, res) => {
    res.sendFile("index.html", { root: "public" });
});
app.use(express.static("public"));
app.post(
    "/submit",
    inputCleaner,
    inputValidator,
    (req, res) => {
        res.send(`
            <h1>Submission received</h1>
            <p>Username: ${req.body.username}</p>
            <p>Comment: ${req.body.comment}</p>
            `);
        }
    );
app.listen(3000, ()=>{
    console.log("http://localhost:3000")
})
