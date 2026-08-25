import Product from "../Model/productModel.js"



// console.log("products=",products.length)
   // console.log("pages=",products.length /20)

export const getProductsByCategory = async(req,res) =>{
    const category = req.params.category 
  let{page , limit} = req.query
  page = Number(page) || 1
  limit = Number(limit) || 40
  
  if (isNaN(page) || page < 1) {
        return res.status(400).json({ success : false, error: "page should be number or greater than 0" });
    }
  if (isNaN(limit) || limit > 100 || limit < 1) {
    return res.status(400).json({ 
        success: false, 
        error: "limit should be a number between 1 and 100" 
    });
}

try {
    const totalProducts = await Product.countDocuments({category : {$regex : category, $options : "i"}})
    const totalPages = Math.ceil(totalProducts / limit)
   

 if(page > totalPages){
   page = totalPages === 0 ? 1 : totalPages;
  
 }
 const skip = (page - 1) * 40
   

    const products = await Product.find({
        category : {$regex : category, $options : "i"}
    }).skip(skip).limit(limit)
  
    if(products.length === 0){
        return res.status(404).json({
            success : false,
            message : "No products found"
        })
    }
 
   return res.status(200).json({
        success : true,
        message : "Products Found Successfully",
        products : products,
        totalPages : totalPages,
        totalProducts : totalProducts
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
     const query = req.query.q
      if (!query) {
    return res.status(200).json([]);
  }


const filter = {}

if(query){
    filter.$or = [
        {name : {$regex : query, $options : "i"}},
        {category : {$regex : query, $options : "i"}}
    ]
}


   try {
    
 const products = await Product.find(filter)
 console.log(filter)
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


