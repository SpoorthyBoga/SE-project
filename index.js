const express=require("express");
const app=express();
const path= require("path");
const mongoose = require("mongoose");
const port=8080;
const methodOverride = require('method-override');
const Product=require("./models/product.js");
const Vendor=require("./models/vendor.js");
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

app.get("/vendors", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.render("vendors", { vendors });
  } catch (err) {
    console.error("Error fetching vendors:", err);
    res.status(500).send("Error loading vendors");
  }
});

app.post('/vendor/delete/:id', async (req, res) => {
  const vendorId = req.params.id;
  const reason = req.body.reason;

  // Find vendor, send email, log reason (mocked here)
  const vendor = await Vendor.findById(vendorId);
  if (!vendor) return res.status(404).send("Vendor not found");

  console.log(`Email sent to ${vendor.email} with reason: ${reason}`);
  await Vendor.findByIdAndDelete(vendorId);

  res.sendStatus(200);
});


app.get("/add-new", (req,res)=>{
    res.render("add.ejs");
})

app.post("/add-new", (req,res)=>{
    res.redirect("/products?category=all")
})

// app.get("/products", (req,res)=>{
//     let category= req.query.category;
//     console.log(category);
//     res.render("products.ejs", {category})
// })

app.get("/products", async (req, res) => {
  const category = req.query.category;
  const allowedCategories = ['men', 'women', 'kids'];

  try {
    if (category === 'all') {
      const products = await Product.find();
      return res.render("products.ejs", { category, products });
    } 
    else if (!allowedCategories.includes(category)) {
      return res.status(400).send("Invalid category");
    } 
    else {
      const products = await Product.find({ category });
      return res.render("products.ejs", { category, products });
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Server error");
  }
});


  app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) return res.status(404).send("Product not found");
      res.render("productDetail.ejs", { product });
    } catch (err) {
      res.status(500).send("Error fetching product details");
    }
  });
  

  app.delete("/products/:id", async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.redirect("/products?category=all&deleted=true");
    } catch (err) {
      console.error("Error deleting product:", err);
      res.status(500).send("Server error");
    }
  });
  
  app.put("/products/:id/stock", async (req, res) => {
    try {
      const { stock } = req.body;
      await Product.findByIdAndUpdate(req.params.id, { stock: Number(stock) });
      res.redirect(`/products/${req.params.id}?updated=true`);
    } catch (err) {
      console.error("Error updating stock:", err);
      res.status(500).send("Server error");
    }
  });
  
  app.get("/vendors/:id", async (req, res) => {
    const vendorId = req.params.id;
  
    try {
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) return res.status(404).send("Vendor not found");
  
      res.render("portfolio", { vendor });
    } catch (err) {
      console.error("Error loading vendor profile:", err);
      res.status(500).send("Server error");
    }
  });

  app.post("/vendors/:id/update", async (req, res) => {
    await Vendor.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/vendors/" + req.params.id);
  });
  
  app.post("/vendors/:id/delete", async (req, res) => {
    const { reason } = req.body;
    // logic to send email to vendor
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: "Vendor deleted and email sent." });
  });
  
  