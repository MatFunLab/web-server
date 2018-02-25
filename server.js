const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

var app = express();


app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});



app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} , ${req.originalUrl}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", (err) => {
    if(err) {
      console.log("Unable to write file");
    }
  });
  next();
});

//app.use((req, res, next) => {
//    res.render("maintenence.hbs");
//});

app.use(express.static(__dirname + "/public")); //middleware to use static html page

var date = new Date().getDate();
var text = "This is a home page on February " + date;

app.get("/", (req, res) => {
//  res.send("<h1>hello express</h1>");
res.render("home.hbs", {
  pageTitle: "Home page",
  pageText: text
});
});

app.get("/about", (req, res) => {
res.render("about.hbs", {
  pageTitle: "About page"
});
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "bad request"
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects page",
    pageText: "This is my portfolio"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
