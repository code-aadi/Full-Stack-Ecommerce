import { deleteFromCloudinary, uploadToCloudinary } from "../../config/cloudinary.js";
import Product from "../../Model/productModel.js";


export const getCategories = async (req,res) =>{
    try {
        const categories = await Product.distinct("category")
        
        if(!categories || categories.length === 0){
            return res.status(404).json({
                success : false,
                message : "Cateogires not found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Cateogires found successfully",
            categories
        }
        )
    } catch (error) {
return res.status(500).json({
    success : false,
    message : "Internal server error",
    error : error.message
})
    }
}




export const getAllProducts = async (req,res)=>{
  
    let {page , limit, search, category} = req.query
    
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
const filter = {isActive : true};

if (search) {
    filter.name = {
        $regex: search,
        $options: "i"
    };
}

if (category && category !== "All") {
    filter.category = {
        $regex: category,
        $options: "i"
    };
}
  try {
          const totalProducts = await Product.countDocuments(filter)
    const totalPages = Math.ceil(totalProducts / limit)
   

 if(page > totalPages){
   page = totalPages === 0 ? 1 : totalPages;
  
 }
 const skip = (page - 1) * limit
   const products = await Product.find(filter).skip(skip).limit(limit)
  
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
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}




export const createProduct = async(req,res) =>{
     const { name, description, price, category, subcategory, stock, rating, totalRatings } = req.validatedProduct;

  try {
      const cloudinaryResult = await uploadToCloudinary(req.file.buffer);

    const imageUrl = cloudinaryResult.secure_url; 
    const imagePublicId = cloudinaryResult.public_id;

    const product = await Product.create({
        name : name,
        description : description,
        price : price,
        category : category,
        image : imageUrl,
        imagePublicId : imagePublicId,
        totalRatings : totalRatings,
        rating, rating,
        subcategory : subcategory,
        stock : stock
    })
    return res.status(201).json({
      success: true,
      message: "Product created successfully!",
      product
    });
  } catch (error) {
     return res.status(500).json({ 
      success: false, 
      message: "Server error, failed to create product",
      error : error.message
    });
  }


}

export const editProduct = async (req, res) => {
    const { id } = req.params;

    try {
        
        const updateData = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            subcategory: req.body.subcategory,
            stock: req.body.stock,
            totalRatings: req.body.totalRatings,
            rating: req.body.rating,
            image: req.body.image 
        };

        const oldPublicId = req.body?.imagePublicId;
  if(req.body.url){
    updateData.url = req.body.url
  }
        if (req.file) {
            const cloudinaryResult = await uploadToCloudinary(req.file.buffer);

            
            updateData.image = cloudinaryResult.secure_url;
            updateData.imagePublicId = cloudinaryResult.public_id;

           
            if (oldPublicId) {
                await deleteFromCloudinary(oldPublicId)
            }
        } 
        

        await Product.findByIdAndUpdate(id, updateData);

        return res.status(200).json({
            success: true,
            message: 'Product successfully update ho gaya hai.'
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};




export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

   
    const updatedProduct = await Product.findByIdAndUpdate(
      id, 
      { isActive: false }, 
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success : false, message: "Product not found" });
    }

   return res.status(200).json({ success : true,  message: "Product inactivated successfully" });
  } catch (error) {
    res.status(500).json({ success : false , message: "Internal server error", error : error.message });
  }
};


export const productDetail = async (req,res)=>{
    const {id} = req.params
if(!id){
    return res.status(400).json({
        success : false,
        message : "Id not received"
    })
}
    try {
       const product = await Product.findById(id) 
       if(!product){
        return res.status(404).json({
            success : false,
            message : "Product not found"
        })
       }
       return res.status(200).json({
        success : true,
        message : "Product found successfully",
        product
       })
    } catch (error) {
       return res.status(500).json({
        success : false,
        message : "Internal server error",
        error : error.message
       }) 
    }
}

export const updateStock = async (req,res)=>{
   let {stock} = req.body
   const {id} = req.params
 stock = Number(stock)
 
 if(!stock || isNaN(stock)){
    return res.status(400).json({
        success : false,
        message : "Enter a valid stock"
    })
 }
 if(!id || id.length !== 24){
    return res.status(400).json({
        success : false,
        message : "Id not received"
    })
}
try {
   const updatedStockProduct = await Product.findByIdAndUpdate(id, {$set : {stock : stock}}, {returnDocument : "after"}) 
  if(!updatedStockProduct){
    return res.status(404).json({
        success : false,
        message : "Product not found"
    })
  }

  return res.status(201).json({
    success : true,
    message : "Product's stock updated successfully"
  })
} catch (error) {
    return res.status(500).json({
        success : false,
    message : "Internal server error",
    error : error.message
 })
}
 
}
export const updateProductStatus = async (req,res)=>{
    const {status} = req.body
   const {id} = req.params

 if(!id || id.length !== 24){
    return res.status(400).json({
        success : false,
        message : "Id not received"
    })
}
try {
   const updatedStockProduct = await Product.findByIdAndUpdate(id, {$set : {isActive : status}}, {returnDocument : "after"}) 
  if(!updatedStockProduct){
    return res.status(404).json({
        success : false,
        message : "Product not found"
    })
  }

  return res.status(201).json({
    success : true,
    message : "Product's status updated successfully"
  })
} catch (error) {
    return res.status(500).json({
        success : false,
    message : "Internal server error",
    error : error.message
 })
}
 
}