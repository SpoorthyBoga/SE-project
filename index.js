const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const Product=require("./models/product.js");
const Vendor=require("./models/vendor.js");
const Order=require("./models/order.js");

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs" );
app.set("views",path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//methodoverride
app.use(methodOverride('_method'))
main().then(()=>{
    console.log("Successfully connected!");
}).catch((err)=>
    console.log(err)
);

async function main() {
  await mongoose.connect('mongodb+srv://vnrvjiet:JeNSYBpD3d8dDfxr@telanganasarees.m4ozfy8.mongodb.net/'); 
}

//Charts.js
async function computePieData() {
  // Define your statuses in exactly the same order as used in the view
  const statuses = ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];

  // Aggregation pipeline to count orders by orderStatus
  const results = await Order.aggregate([
    {
      $group: {
        _id: "$orderStatus",
        count: { $sum: 1 }
      }
    }
  ]);

  // Map each status into its count (or 0 if none)
  const pieDataArray = statuses.map(status => {
    const found = results.find(item => item._id === status);
    return found ? found.count : 0;
  });
  return pieDataArray;
}

async function computeBarData() {
  const totalOrders = await Order.countDocuments({});
  const dispatchedOrders = await Order.countDocuments({ orderStatus: { $in: ['Processing', 'Shipped'] } });
  const cancelledOrders = await Order.countDocuments({ orderStatus: 'Cancelled' });
  const deliveredOrders = await Order.countDocuments({ orderStatus: 'Delivered' });
  
  return [totalOrders, dispatchedOrders, cancelledOrders, deliveredOrders];
}

// // Sample vendor data
// const sampleVendors = [
//   {
//     _id: '1',
//     name: 'Pochampally Handlooms',
//     area: 'Pochampally',
//     email: 'contact@pochampally.com',
//     phone: '+91 9876543210',
//     rating: 4.8,
//     joinedOn: new Date('2022-01-15'),
//     products: ['Pochampally Silk Saree', 'Ikat Cotton Saree']
//   },
//   {
//     _id: '2',
//     name: 'Gadwal Saree Emporium',
//     area: 'Gadwal',
//     email: 'info@gadwalsarees.com',
//     phone: '+91 9876543211',
//     rating: 4.5,
//     joinedOn: new Date('2022-02-20'),
//     products: ['Gadwal Silk Saree', 'Gadwal Cotton Saree']
//   },
//   {
//     _id: '3',
//     name: 'Narayanpet Handlooms',
//     area: 'Narayanpet',
//     email: 'sales@narayanpet.com',
//     phone: '+91 9876543212',
//     rating: 4.7,
//     joinedOn: new Date('2022-03-10'),
//     products: ['Narayanpet Silk Saree', 'Narayanpet Cotton Saree']
//   }
// ];


app.get("/login", (req,res)=>{
  res.render("login.ejs");
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Replace this with real user validation logic
  if (email === "admin@example.com" && password === "123456") {
    res.redirect("/home");
  } else {
    res.send("Invalid credentials");
  }
});

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/home', (req, res) => {
  res.render('home.ejs');
});

// app.get('/login', (req, res) => {
//   res.render('login');
// });

// Public routes (previously protected routes now open to all users)
app.get('/category', (req, res) => {
  res.render('category.ejs');
});

//Vendors
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
  await Vendor.findByIdAndDelete(req.params.id);
  res.json({ message: "Vendor deleted and email sent." });
});

app.get('/add-vendor', (req, res) => {
  res.render('add_vendors.ejs');
});

app.post('/vendors/add', async (req, res) => {
  try {
    const { vendorId, name, area, products, email, phone, rating, joinedOn } = req.body;

    const newVendor = new Vendor({
      vendorId,
      name,
      area,
      products: products.split(',').map(p => p.trim()), // Convert CSV to array
      email,
      phone,
      rating: parseFloat(rating),
      joinedOn: new Date(joinedOn)
    });

    await newVendor.save();
    res.redirect('/vendors'); // or wherever your vendor list/dashboard is
  } catch (err) {
    console.error('Error adding vendor:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/add-new', (req, res) => {
  res.render('add_product.ejs');
});


app.post("/add-new", (req,res)=>{
  res.redirect("/products?category=all")
})

//Stats
app.get('/stats', async (req, res) => {
  try {
    // Fetch recent orders from your MongoDB collection. Adjust the query according to your schema.
    const recentOrders = await Order.find().sort({ placedAt: -1 }).limit(5);
    
    // Compute data for charts (ensure that you compute these using your aggregation queries).
    const pieDataArray = await computePieData();       // e.g., [activeCount, returnedCount, completedCount, outForDeliveryCount]
    const barDataArray = await computeBarData();       // e.g., [totalOrders, dispatchedOrders, cancelledOrders, completedOrders]

    // Pass the variables to the view.
    res.render('stats', { recentOrders, pieDataArray, barDataArray });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//Products
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

  //orders
  app.get("/orders", async (req, res) => {
    const orders = await Order.find().lean();
    res.render("orders", { orders });
  });

  app.get("/orders/:id", async (req, res) => {
    const order = await Order.findById(req.params.id).lean();
    if (!order) return res.status(404).send("Order not found");
    res.render("orderdetail", { order });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
