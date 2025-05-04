const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    }
  ],
  shippingAddress: {
    street: String,
    city: String,
    pincode: String,
    state: String,
    country: String,
  },
  coupon: {
    code: String,
    discountAmount: {
      type: Number,
      default: 0,
    },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  finalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Card", "UPI", "NetBanking"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed", "Refunded"],
    default: "Pending",
  },
  paymentDetails: {
    transactionId: String,
    paymentGateway: String,
    paidAt: Date,
  },
  orderStatus: {
    type: String,
    enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"],
    default: "Placed",
  },
  tracking: {
    trackingId: String,
    carrier: String,
    estimatedDelivery: Date,
  },
  returnDetails: {
    isReturned: { type: Boolean, default: false },
    returnReason: String,
    returnedAt: Date,
    refundProcessed: { type: Boolean, default: false }
  },
  placedAt: {
    type: Date,
    default: Date.now,
  },
  deliveredAt: Date,
}, {
  timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
