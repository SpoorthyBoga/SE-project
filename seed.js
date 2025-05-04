
const mongoose = require('mongoose');
const Vendor = require('./models/vendor'); // Adjust the path as needed

mongoose.connect('mongodb+srv://vnrvjiet:JeNSYBpD3d8dDfxr@telanganasarees.m4ozfy8.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const vendors = [
  {
    "vendorId": "V001",
    "name": "Vendor 1",
    "area": "Anna Nagar, Chennai",
    "products": [
      "Milk",
      "Paneer",
      "Curd",
      "Butter"
    ],
    "email": "vendor1@example.com",
    "phone": "9613708170",
    "rating": 4.3,
    "joinedOn": "2022-09-23"
  },
  {
    "vendorId": "V002",
    "name": "Vendor 2",
    "area": "T Nagar, Chennai",
    "products": [
      "Ethnic Wear",
      "Western Wear",
      "Jewelry"
    ],
    "email": "vendor2@example.com",
    "phone": "9506908215",
    "rating": 4.6,
    "joinedOn": "2023-01-20"
  },
  {
    "vendorId": "V003",
    "name": "Vendor 3",
    "area": "Park Street, Kolkata",
    "products": [
      "Men's Clothing",
      "Women's Clothing",
      "Accessories"
    ],
    "email": "vendor3@example.com",
    "phone": "9865232243",
    "rating": 4.3,
    "joinedOn": "2023-09-07"
  },
  {
    "vendorId": "V004",
    "name": "Vendor 4",
    "area": "Thane West, Mumbai",
    "products": [
      "Fruits",
      "Vegetables",
      "Organic Produce"
    ],
    "email": "vendor4@example.com",
    "phone": "9120274100",
    "rating": 3.2,
    "joinedOn": "2022-09-22"
  },
  {
    "vendorId": "V005",
    "name": "Vendor 5",
    "area": "Gariahat, Kolkata",
    "products": [
      "Ethnic Wear",
      "Western Wear",
      "Jewelry"
    ],
    "email": "vendor5@example.com",
    "phone": "9757254219",
    "rating": 4.7,
    "joinedOn": "2024-09-08"
  },
  {
    "vendorId": "V006",
    "name": "Vendor 6",
    "area": "Andheri West, Mumbai",
    "products": [
      "Men's Clothing",
      "Women's Clothing",
      "Accessories"
    ],
    "email": "vendor6@example.com",
    "phone": "9657745403",
    "rating": 3.3,
    "joinedOn": "2023-08-13"
  },
  {
    "vendorId": "V007",
    "name": "Vendor 7",
    "area": "Whitefield, Bangalore",
    "products": [
      "Milk",
      "Paneer",
      "Curd",
      "Butter"
    ],
    "email": "vendor7@example.com",
    "phone": "9831419797",
    "rating": 3.5,
    "joinedOn": "2024-04-12"
  },
  {
    "vendorId": "V008",
    "name": "Vendor 8",
    "area": "Viman Nagar, Pune",
    "products": [
      "Fiction",
      "Non-fiction",
      "Stationery"
    ],
    "email": "vendor8@example.com",
    "phone": "9329696539",
    "rating": 3.5,
    "joinedOn": "2023-10-12"
  },
  {
    "vendorId": "V009",
    "name": "Vendor 9",
    "area": "Baner, Pune",
    "products": [
      "Fruits",
      "Vegetables",
      "Organic Produce"
    ],
    "email": "vendor9@example.com",
    "phone": "9450994964",
    "rating": 3.3,
    "joinedOn": "2024-06-04"
  },
  {
    "vendorId": "V010",
    "name": "Vendor 10",
    "area": "T Nagar, Chennai",
    "products": [
      "Pet Food",
      "Accessories",
      "Pet Toys"
    ],
    "email": "vendor10@example.com",
    "phone": "9152520743",
    "rating": 3.8,
    "joinedOn": "2024-07-01"
  },
  {
    "vendorId": "V011",
    "name": "Vendor 11",
    "area": "Viman Nagar, Pune",
    "products": [
      "Smart Watches",
      "Headphones",
      "Chargers"
    ],
    "email": "vendor11@example.com",
    "phone": "9392688014",
    "rating": 4.3,
    "joinedOn": "2025-02-14"
  },
  {
    "vendorId": "V012",
    "name": "Vendor 12",
    "area": "Civil Lines, Jaipur",
    "products": [
      "Milk",
      "Paneer",
      "Curd",
      "Butter"
    ],
    "email": "vendor12@example.com",
    "phone": "9441332722",
    "rating": 4.0,
    "joinedOn": "2022-09-21"
  },
  {
    "vendorId": "V013",
    "name": "Vendor 13",
    "area": "Indiranagar, Bangalore",
    "products": [
      "Ethnic Wear",
      "Western Wear",
      "Jewelry"
    ],
    "email": "vendor13@example.com",
    "phone": "9327143794",
    "rating": 3.6,
    "joinedOn": "2024-08-29"
  },
  {
    "vendorId": "V014",
    "name": "Vendor 14",
    "area": "Jubilee Hills, Hyderabad",
    "products": [
      "Smart Watches",
      "Headphones",
      "Chargers"
    ],
    "email": "vendor14@example.com",
    "phone": "9290353919",
    "rating": 3.7,
    "joinedOn": "2024-11-03"
  },
  {
    "vendorId": "V015",
    "name": "Vendor 15",
    "area": "MG Road, Bengaluru",
    "products": [
      "Kitchen Tools",
      "Cleaning Supplies",
      "Storage"
    ],
    "email": "vendor15@example.com",
    "phone": "9143269780",
    "rating": 3.7,
    "joinedOn": "2022-12-18"
  },
  {
    "vendorId": "V016",
    "name": "Vendor 16",
    "area": "Andheri West, Mumbai",
    "products": [
      "Toys",
      "Baby Clothes",
      "School Supplies"
    ],
    "email": "vendor16@example.com",
    "phone": "9875238815",
    "rating": 4.8,
    "joinedOn": "2024-06-26"
  },
  {
    "vendorId": "V017",
    "name": "Vendor 17",
    "area": "Gariahat, Kolkata",
    "products": [
      "Men's Clothing",
      "Women's Clothing",
      "Accessories"
    ],
    "email": "vendor17@example.com",
    "phone": "9945457540",
    "rating": 3.3,
    "joinedOn": "2024-12-16"
  },
  {
    "vendorId": "V018",
    "name": "Vendor 18",
    "area": "Jubilee Hills, Hyderabad",
    "products": [
      "Kitchen Tools",
      "Cleaning Supplies",
      "Storage"
    ],
    "email": "vendor18@example.com",
    "phone": "9180009736",
    "rating": 3.5,
    "joinedOn": "2025-02-09"
  },
  {
    "vendorId": "V019",
    "name": "Vendor 19",
    "area": "Park Street, Kolkata",
    "products": [
      "Mobile Phones",
      "Laptops",
      "Accessories"
    ],
    "email": "vendor19@example.com",
    "phone": "9376277641",
    "rating": 3.4,
    "joinedOn": "2023-09-16"
  },
  {
    "vendorId": "V020",
    "name": "Vendor 20",
    "area": "Indiranagar, Bangalore",
    "products": [
      "Fruits",
      "Vegetables",
      "Organic Produce"
    ],
    "email": "vendor20@example.com",
    "phone": "9434780148",
    "rating": 4.9,
    "joinedOn": "2024-07-14"
  },
  {
    "vendorId": "V021",
    "name": "Vendor 21",
    "area": "Gariahat, Kolkata",
    "products": [
      "Toys",
      "Baby Clothes",
      "School Supplies"
    ],
    "email": "vendor21@example.com",
    "phone": "9467758632",
    "rating": 4.4,
    "joinedOn": "2024-11-23"
  },
  {
    "vendorId": "V022",
    "name": "Vendor 22",
    "area": "Banjara Hills, Hyderabad",
    "products": [
      "Ethnic Wear",
      "Western Wear",
      "Jewelry"
    ],
    "email": "vendor22@example.com",
    "phone": "9339524775",
    "rating": 4.4,
    "joinedOn": "2023-03-08"
  },
  {
    "vendorId": "V023",
    "name": "Vendor 23",
    "area": "Andheri West, Mumbai",
    "products": [
      "Ethnic Wear",
      "Western Wear",
      "Jewelry"
    ],
    "email": "vendor23@example.com",
    "phone": "9930089899",
    "rating": 4.1,
    "joinedOn": "2023-12-18"
  },
  {
    "vendorId": "V024",
    "name": "Vendor 24",
    "area": "T Nagar, Chennai",
    "products": [
      "Smart Watches",
      "Headphones",
      "Chargers"
    ],
    "email": "vendor24@example.com",
    "phone": "9840863406",
    "rating": 3.7,
    "joinedOn": "2023-07-26"
  },
  {
    "vendorId": "V025",
    "name": "Vendor 25",
    "area": "MG Road, Bengaluru",
    "products": [
      "Kitchen Tools",
      "Cleaning Supplies",
      "Storage"
    ],
    "email": "vendor25@example.com",
    "phone": "9621111457",
    "rating": 4.5,
    "joinedOn": "2024-03-18"
  },
  {
    "vendorId": "V026",
    "name": "Vendor 26",
    "area": "Indiranagar, Bangalore",
    "products": [
      "Ethnic Wear",
      "Western Wear",
      "Jewelry"
    ],
    "email": "vendor26@example.com",
    "phone": "9666249534",
    "rating": 4.2,
    "joinedOn": "2025-03-25"
  },
  {
    "vendorId": "V027",
    "name": "Vendor 27",
    "area": "Thane West, Mumbai",
    "products": [
      "Milk",
      "Paneer",
      "Curd",
      "Butter"
    ],
    "email": "vendor27@example.com",
    "phone": "9474054667",
    "rating": 4.8,
    "joinedOn": "2023-07-30"
  },
  {
    "vendorId": "V028",
    "name": "Vendor 28",
    "area": "MG Road, Bengaluru",
    "products": [
      "Kitchen Tools",
      "Cleaning Supplies",
      "Storage"
    ],
    "email": "vendor28@example.com",
    "phone": "9513939183",
    "rating": 3.4,
    "joinedOn": "2025-03-30"
  },
  {
    "vendorId": "V029",
    "name": "Vendor 29",
    "area": "MG Road, Bengaluru",
    "products": [
      "Pet Food",
      "Accessories",
      "Pet Toys"
    ],
    "email": "vendor29@example.com",
    "phone": "9371449751",
    "rating": 3.4,
    "joinedOn": "2025-02-13"
  },
  {
    "vendorId": "V030",
    "name": "Vendor 30",
    "area": "Civil Lines, Jaipur",
    "products": [
      "Mobile Phones",
      "Laptops",
      "Accessories"
    ],
    "email": "vendor30@example.com",
    "phone": "9569316217",
    "rating": 4.3,
    "joinedOn": "2024-07-10"
  },
  {
    "vendorId": "V031",
    "name": "Vendor 31",
    "area": "Bandra, Mumbai",
    "products": [
      "Toys",
      "Baby Clothes",
      "School Supplies"
    ],
    "email": "vendor31@example.com",
    "phone": "9943280825",
    "rating": 3.7,
    "joinedOn": "2023-06-19"
  },
  {
    "vendorId": "V032",
    "name": "Vendor 32",
    "area": "Koramangala, Bangalore",
    "products": [
      "Mobile Phones",
      "Laptops",
      "Accessories"
    ],
    "email": "vendor32@example.com",
    "phone": "9875196884",
    "rating": 3.0,
    "joinedOn": "2023-07-12"
  },
  {
    "vendorId": "V033",
    "name": "Vendor 33",
    "area": "Banjara Hills, Hyderabad",
    "products": [
      "Men's Clothing",
      "Women's Clothing",
      "Accessories"
    ],
    "email": "vendor33@example.com",
    "phone": "9310172290",
    "rating": 4.1,
    "joinedOn": "2023-01-23"
  },
  {
    "vendorId": "V034",
    "name": "Vendor 34",
    "area": "Jubilee Hills, Hyderabad",
    "products": [
      "Pet Food",
      "Accessories",
      "Pet Toys"
    ],
    "email": "vendor34@example.com",
    "phone": "9429241553",
    "rating": 4.8,
    "joinedOn": "2024-02-11"
  },
  {
    "vendorId": "V035",
    "name": "Vendor 35",
    "area": "Koramangala, Bangalore",
    "products": [
      "Pet Food",
      "Accessories",
      "Pet Toys"
    ],
    "email": "vendor35@example.com",
    "phone": "9585012077",
    "rating": 4.6,
    "joinedOn": "2025-02-23"
  },
  {
    "vendorId": "V036",
    "name": "Vendor 36",
    "area": "Gariahat, Kolkata",
    "products": [
      "Fruits",
      "Vegetables",
      "Organic Produce"
    ],
    "email": "vendor36@example.com",
    "phone": "9725438159",
    "rating": 4.8,
    "joinedOn": "2023-09-22"
  },
  {
    "vendorId": "V037",
    "name": "Vendor 37",
    "area": "MG Road, Bengaluru",
    "products": [
      "Mobile Phones",
      "Laptops",
      "Accessories"
    ],
    "email": "vendor37@example.com",
    "phone": "9421192018",
    "rating": 3.4,
    "joinedOn": "2023-06-18"
  },
  {
    "vendorId": "V038",
    "name": "Vendor 38",
    "area": "MG Road, Bengaluru",
    "products": [
      "Fiction",
      "Non-fiction",
      "Stationery"
    ],
    "email": "vendor38@example.com",
    "phone": "9456333208",
    "rating": 4.9,
    "joinedOn": "2023-06-06"
  },
  {
    "vendorId": "V039",
    "name": "Vendor 39",
    "area": "Andheri West, Mumbai",
    "products": [
      "Smart Watches",
      "Headphones",
      "Chargers"
    ],
    "email": "vendor39@example.com",
    "phone": "9464038864",
    "rating": 3.4,
    "joinedOn": "2022-09-01"
  },
  {
    "vendorId": "V040",
    "name": "Vendor 40",
    "area": "MG Road, Bengaluru",
    "products": [
      "Fiction",
      "Non-fiction",
      "Stationery"
    ],
    "email": "vendor40@example.com",
    "phone": "9165083092",
    "rating": 3.9,
    "joinedOn": "2024-08-27"
  },
  {
    "vendorId": "V041",
    "name": "Vendor 41",
    "area": "Park Street, Kolkata",
    "products": [
      "Pet Food",
      "Accessories",
      "Pet Toys"
    ],
    "email": "vendor41@example.com",
    "phone": "9507668562",
    "rating": 4.3,
    "joinedOn": "2023-11-14"
  },
  {
    "vendorId": "V042",
    "name": "Vendor 42",
    "area": "Banjara Hills, Hyderabad",
    "products": [
      "Men's Clothing",
      "Women's Clothing",
      "Accessories"
    ],
    "email": "vendor42@example.com",
    "phone": "9856209441",
    "rating": 4.2,
    "joinedOn": "2023-12-15"
  },
  {
    "vendorId": "V043",
    "name": "Vendor 43",
    "area": "Viman Nagar, Pune",
    "products": [
      "Smart Watches",
      "Headphones",
      "Chargers"
    ],
    "email": "vendor43@example.com",
    "phone": "9650852940",
    "rating": 4.7,
    "joinedOn": "2024-03-14"
  },
  {
    "vendorId": "V044",
    "name": "Vendor 44",
    "area": "Whitefield, Bangalore",
    "products": [
      "Milk",
      "Paneer",
      "Curd",
      "Butter"
    ],
    "email": "vendor44@example.com",
    "phone": "9609177405",
    "rating": 3.0,
    "joinedOn": "2024-02-15"
  },
  {
    "vendorId": "V045",
    "name": "Vendor 45",
    "area": "Baner, Pune",
    "products": [
      "Milk",
      "Paneer",
      "Curd",
      "Butter"
    ],
    "email": "vendor45@example.com",
    "phone": "9924940485",
    "rating": 3.2,
    "joinedOn": "2024-07-21"
  },
  {
    "vendorId": "V046",
    "name": "Vendor 46",
    "area": "Baner, Pune",
    "products": [
      "Mobile Phones",
      "Laptops",
      "Accessories"
    ],
    "email": "vendor46@example.com",
    "phone": "9764325972",
    "rating": 4.3,
    "joinedOn": "2022-10-17"
  },
  {
    "vendorId": "V047",
    "name": "Vendor 47",
    "area": "Gariahat, Kolkata",
    "products": [
      "Fiction",
      "Non-fiction",
      "Stationery"
    ],
    "email": "vendor47@example.com",
    "phone": "9952086812",
    "rating": 4.3,
    "joinedOn": "2022-08-14"
  },
  {
    "vendorId": "V048",
    "name": "Vendor 48",
    "area": "Connaught Place, Delhi",
    "products": [
      "Fiction",
      "Non-fiction",
      "Stationery"
    ],
    "email": "vendor48@example.com",
    "phone": "9469807848",
    "rating": 3.8,
    "joinedOn": "2023-03-31"
  },
  {
    "vendorId": "V049",
    "name": "Vendor 49",
    "area": "T Nagar, Chennai",
    "products": [
      "Ethnic Wear",
      "Western Wear",
      "Jewelry"
    ],
    "email": "vendor49@example.com",
    "phone": "9418943833",
    "rating": 4.0,
    "joinedOn": "2024-01-05"
  },
  {
    "vendorId": "V050",
    "name": "Vendor 50",
    "area": "Baner, Pune",
    "products": [
      "Mobile Phones",
      "Laptops",
      "Accessories"
    ],
    "email": "vendor50@example.com",
    "phone": "9110645175",
    "rating": 3.2,
    "joinedOn": "2022-08-22"
  }
];

Vendor.insertMany(vendors)
  .then(() => {
    console.log('Vendor data seeded successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error seeding vendor data:', err);
    mongoose.connection.close();
  });
