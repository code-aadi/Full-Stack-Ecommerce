import mongoose from "mongoose";
import csv from "csvtojson";
import path from "path";
import Product from "../Model/productModel.js";

const MONGO_URI = "mongodb://localhost:27017/practice_ecommerce";
const CSV_FILE_PATH = path.resolve("products.csv");

/* =========================================================
                    Helper Functions
========================================================= */

// Normalize Text
const normalizeText = (text = "") => {
    return text.toString().trim().replace(/\s+/g, " ");
};

// Price: "$839.99" -> 839.99
const cleanPrice = (priceStr = "") => {
    const value = parseFloat(priceStr.toString().replace(/[^0-9.]/g, ""));
    if (isNaN(value)) return 0;

    return Math.max(value, 0);
};

// Rating: 0 - 5
const cleanRating = (rating = 0) => {
    const value = parseFloat(rating);

    if (isNaN(value)) return 0;

    return Math.min(Math.max(value, 0), 5);
};

// Total Ratings
const cleanTotalRatings = (count = 0) => {
    const value = parseInt(count);

    return isNaN(value) ? 0 : Math.max(value, 0);
};

// URL Friendly Slug
const createSlug = (text = "product") => {
    return normalizeText(text)
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
};

// Generate Placeholder Image
const generateImage = (category, productName) => {
    const slug = createSlug(`${category}-${productName}`);
    return `https://picsum.photos/seed/${slug}/600/600`;
};

/* =========================================================
                        Seeder
========================================================= */

const seedFromCSV = async () => {
    try {
        console.log("🔄 Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);

        console.log("🧹 Removing old products...");
        await Product.deleteMany({});

        console.log("📄 Reading CSV...");
        const rows = await csv().fromFile(CSV_FILE_PATH);

        console.log(`📦 CSV Rows Found: ${rows.length}`);

        const products = rows.map((row) => {

            const name = normalizeText(
                row["Product Name"] ||
                row["name"] ||
                "Unnamed Product"
            );

            const category = normalizeText(
                row["Product Category"] ||
                row["category"] ||
                "General"
            );

            const subcategory = normalizeText(
                row["Product Subcategory"] ||
                row["subcategory"] ||
                "General"
            );

            const description = normalizeText(
                row["Product Description"] ||
                row["description"] ||
                "High quality product for your daily needs."
            );

            const url = normalizeText(
                row["Product URL"] ||
                row["url"] ||
                ""
            );

            const image =
                normalizeText(
                    row["Product Image"] ||
                    row["image"] ||
                    ""
                ) ||
                generateImage(category, name);

            return {
                name,
                category,
                subcategory,
                description,

                url: url.startsWith("http") ? url : "",

                image,

                price: cleanPrice(
                    row["Product Price"] ||
                    row["price"]
                ),

                rating: cleanRating(
                    row["Product Rating"] ||
                    row["rating"]
                ),

                totalRatings: cleanTotalRatings(
                    row["Total Ratings"] ||
                    row["totalRatings"]
                ),
            };
        });

        // Remove Empty Products
        const validProducts = products.filter(
            (product) =>
                product.name &&
                product.name !== "Unnamed Product"
        );

        // Remove Duplicate Products (By Name)
        const uniqueProducts = [
            ...new Map(
                validProducts.map((product) => [
                    product.name.toLowerCase(),
                    product,
                ])
            ).values(),
        ];

        // Sort Alphabetically
        uniqueProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        console.log(`🚀 Inserting ${uniqueProducts.length} products...`);

        await Product.insertMany(uniqueProducts, {
            ordered: false,
        });

        console.log(`
==================================================
🎉 Seeder Completed Successfully
==================================================
CSV Rows          : ${rows.length}
Valid Products    : ${validProducts.length}
Inserted Products : ${uniqueProducts.length}
==================================================
`);

    } catch (error) {
        console.error("❌ Seeder Error");
        console.error(error);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 MongoDB Disconnected");
        process.exit();
    }
};

seedFromCSV();