import express from "express";
import razorpayWebhook from "../Controller/RazorpayWebhook.js";


const webhookRoute = express.Router();


webhookRoute.post("/", razorpayWebhook);

export default webhookRoute;
