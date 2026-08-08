import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Product name is required'],
        trim: true 
    },
    description: { 
        type: String, 
        required: [true, 'Description is required'] 
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    category: { 
        type: String, 
        required: [true, 'Category is required'] 
    },
    subcategory: { 
        type: String 
    },
    image: { 
        type: String,
        required: [true, 'Product image URL is required'] 
    },
    url: { 
        type: String // Real Amazon/Flipkart product link (optional)
    },
    rating: { 
        type: Number, 
        default: 0,
        min: 0,
        max: 5
    },
    totalRatings: { 
        type: Number, 
        default: 0 
    },
    stock: { 
        type: Number, 
        default: 50 // Practice ke liye humne default stock de diya hai
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;

