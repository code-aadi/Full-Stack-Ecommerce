import express from "express";
import razorpayWebhook from "../Controller/RazorpayWebhook.js";


const webhookRoute = express.Router();


webhookRoute.post("/", express.raw({ type: "application/json" }), razorpayWebhook);

export default webhookRoute;
