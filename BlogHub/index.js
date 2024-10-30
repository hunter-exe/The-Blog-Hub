import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 129;

let blogs = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/blog", (req, res) => {
    const action = req.body.action;
    if (action === "create") {
        res.render("create.ejs");
    } else if (action === "read") {
        res.render("read.ejs", { blogs });  
    } else if (action === "delete") {
        res.render("delete.ejs");
    } else {
        res.send("Invalid action");
    }
});


app.post("/create-blog", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;  

    const newBlog = { title, content };
    blogs.push(newBlog);
    res.send(`Blog titled "${newBlog.title}" created successfully!`);
    console.log(`Currently, ${blogs.length} blogs are present!`);
});


app.post("/delete-blog", (req, res) => {
    const titleToDelete = req.body.title;
    blogs = blogs.filter(blog => blog.title !== titleToDelete);
    res.send(`Blog titled "${titleToDelete}" deleted successfully!`);
    console.log(`Currently, ${blogs.length} blogs are present!`);
});

app.listen(port, () => {
    console.log(`Hey, your server is running on port ${port}`);
});
