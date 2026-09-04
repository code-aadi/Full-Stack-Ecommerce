import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    shippingAddress: {
      name: String,
      phone: String,
      flatNo : String,
      street : String,
      lankmark : String,
      address: String,
      city: String,
      state: String,
      addressType : String,
      pincode: String,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

paymentMethod: {
  type: String,
  enum: ["cod", "online"],
  required: true
},

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    paymentOrderId: {
      type: String,
    },

    paymentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const Order = mongoose.model("Orders",orderSchema)
export default Order