const express=require("express");
const app=express();
const path= require("path");
const mongoose = require("mongoose");
const port=8080;
const methodOverride = require('method-override');
app.use(methodOverride('_method'))
main().then(()=>{
    console.log("Succesful!");
}).catch((err)=>
    console.log(err)
);

async function main() {
    await mongoose.connect('mongodb+srv://vnrvjiet:JeNSYBpD3d8dDfxr@telanganasarees.m4ozfy8.mongodb.net/'); 
    
}

app.set("view engine", "ejs" );
app.set("views",path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(port, ()=>{
    console.log("listening!");
});

app.get("/home", (req,res)=>{
    res.render("home.ejs");
});

app.get("/category", (req, res)=>{
    res.render("category.ejs");
} )

app.get("/vendors", (req,res)=>{
    res.send("vendors");
})

app.get("/add-new", (req,res)=>{
    res.render("add.ejs");
})

app.post("/add-new", (req,res)=>{
    res.redirect("/products?category=all")
})

app.get("/products", (req,res)=>{
    let category= req.query.category;
    console.log(category);
    res.render("products.ejs", {category})
})