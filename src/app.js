const fs = require("fs");
const path = require("path");
const express = require("express");

// Local libraries
const data = require("./data");
const accountRoutes = require("./routes/accounts");
const servicesRoutes = require("./routes/services");

// Read the data back in and set up express
const { writeJSON, accounts, users } = data;
const app = express();

// Setup
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true })); 

// routes
app.get("/", (req, res) => res.render("index", { title: "Account Summary", accounts}));
app.get("/profile", (req,res) => res.render("profile",{ user: users[0] }));
app.use("/account", accountRoutes);
app.use("/services", servicesRoutes);

app.listen(3000, () => console.log("Server is running on port 3000"));
