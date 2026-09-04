import Cart from "../Model/Cart.js";
import Product from "../Model/productModel.js";


const validateCartItems = async (userId) => {
    
    
    const userCart = await Cart.findOne({ user: userId });
    
    if (!userCart || userCart.items.length === 0) {
      
        return { isValid: false, status: 400, message: "Your cart is empty" };
    }

    const validatedItems = [];
    const productIds = userCart.items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });
    
    const productLookUp = {};
    for (const product of products) {
        productLookUp[product._id.toString()] = product;
    }

    for (const item of userCart.items) {
        const product = productLookUp[item.product.toString()];

        if (!product) {
            return { isValid: false, status: 400, message: "Product not found" };
        }

        if (product.stock < item.quantity) {
            return { isValid: false, status: 400, message: `${product.name} is out of stock` };
        }
        
        validatedItems.push({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: item.quantity
        });
    }
    
    return { isValid: true, validatedItems };
};

export default validateCartItems;
