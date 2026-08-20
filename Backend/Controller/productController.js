import Product from "../Model/productModel.js"





export const getProductsByCategory = async(req,res) =>{
    const category = req.params.category 
console.log(category)
try {
    const products = await Product.find({
        category : {$regex : category, $options : "i"}
    })
    if(products.length === 0){
        return res.status(404).json({
            success : false,
            message : "No products found"
        })
    }
    res.status(200).json({
        success : true,
        message : "Products Found Successfully",
        products
    })
   
  
} catch (error) {
 res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
}
}


export const getProductsById = async(req,res) =>{
    const id = req.params.id

try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Galat Product ID format hai."
            });
        }
    const product = await Product.findById(id)
     if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product is not available."
            });
        }
   
    res.status(200).json({
            success: true,
            message: "Product details fetched successfully",
             product
        });
} catch (error) {
    res.status(500).json({
            success: false,
            message: "Server me koi dikkat aayi hai.",
            error: error.message
        });
}
}

export const getCheapProducts = async(req,res) =>{
  
try {
    const products = await Product.find({price :{$lt : 100}})
   if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Products Found."
            });
        }
   res.status(200).json({
    success : true,
    message : "Cheap Products Fetched Successfully",
    products
   })
} catch (error) {
     res.status(500).json({
            success: false,
            message: "Server me koi dikkat aayi hai.",
            error: error.message
        });
}
}


export const getTopProducts = async(req,res) =>{
 
try {
    const products = await Product.find({price : {$gt : 100}})
   if(products.length === 0){
     return res.status(404).json({
                success: false,
                message: "No Products Found."
            });
   }
  res.status(200).json({
    success : true,
    message : "Top Products Found Sucessfully",
    products
  })
} catch (error) {
  res.status(500).json({
            success: false,
            message: "Server me koi dikkat aayi hai.",
            error: error.message
        });
}
}


export const searchProducts = async (req,res) => {
   try {
     const query = req.query.query
      if (!query) {
    return res.status(200).json([]);
  }
 const products = await Product.find({
    $or : [
        {name : {$regex : query, $options : "i"}},
        {category : {$regex : query, $options : "i"}}
    ]
 })
    if(products.length === 0){
        return res.status(404).json({
            success : false,
            message : "No Products Found"
        })
    }
    res.status(200).json({
        success : true,
        message : "Search Products Found",
        products
    })
   } catch (error) {
      res.status(500).json({
            success: false,
            message: "Server me koi dikkat aayi hai.",
            error: error.message
        });
   }
}


export const getCartData = async (req,res)=>{
const {ids} = req.body
try {
    if(!ids, ids.length === 0){
   return res.status(400).json({
        success : false,
        message : "Please Send Product Ids"
    })
}
const products = await Product.find({
  _id : {$in : ids}
})
res.status(200).json({
    success : true,
    message : "Cart Data Found Successfully",
    products
})
} catch (error) {
    res.status(500).json({
        success : false,
    message : "Internal Server Error",
    error : error.message
    })
}
}
