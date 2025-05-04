const mongoose = require("mongoose");
const Order = require("./models/order"); // Adjust the path if your model is in a different folder

// Replace with your actual MongoDB connection string
const MONGO_URI = 'mongodb+srv://vnrvjiet:JeNSYBpD3d8dDfxr@telanganasarees.m4ozfy8.mongodb.net/';

async function seedOrders() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Order.deleteMany(); // optional: clears previous records

    const sampleOrders = [];

    const productIds = [
      "66360ee43d2215171e47911a",
      "66360ee43d2215171e47911b",
      "66360ee43d2215171e47911c",
    ];
    const userIds = [
      "66360ee43d2215171e479aaa",
      "66360ee43d2215171e479aab",
      "66360ee43d2215171e479aac",
    ];
    const vendorIds = [
      "66360ee43d2215171e479ba1",
      "66360ee43d2215171e479ba2",
      "66360ee43d2215171e479ba3",
    ];

    const paymentMethods = ["COD", "Card", "UPI"];
    const statuses = ["Placed", "Processing", "Shipped", "Delivered"];

    for (let i = 0; i < 90; i++) {
      const randomItemCount = Math.floor(Math.random() * 3) + 1;

      const items = Array.from({ length: randomItemCount }, () => {
        const price = Math.floor(Math.random() * 1000 + 100);
        const quantity = Math.floor(Math.random() * 5 + 1);
        return {
          product: productIds[Math.floor(Math.random() * productIds.length)],
          quantity,
          price,
        };
      });

      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const discount = Math.floor(Math.random() * 100);
      const finalAmount = totalAmount - discount;

      sampleOrders.push({
        buyer: userIds[Math.floor(Math.random() * userIds.length)],
        vendor: vendorIds[Math.floor(Math.random() * vendorIds.length)],
        items,
        shippingAddress: {
          street: "123 Street",
          city: "Chennai",
          pincode: "600001",
          state: "Tamil Nadu",
          country: "India",
        },
        coupon: {
          code: discount > 0 ? "SAVE10" : "",
          discountAmount: discount,
        },
        totalAmount,
        finalAmount,
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        paymentStatus: "Paid",
        orderStatus: statuses[Math.floor(Math.random() * statuses.length)],
        tracking: {
          trackingId: `TRK${10000 + i}`,
          carrier: "BlueDart",
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        },
        placedAt: new Date(Date.now() - Math.random() * 1000000000),
      });
    }

    await Order.insertMany(sampleOrders);
    console.log("✅ Seeded 90 orders successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seedOrders();
