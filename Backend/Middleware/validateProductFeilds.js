const validateProductFields = (req, res, next) => {
  const { name, description, price, category, subcategory, stock, rating, totalRatings } = req.body;

  const isUpdateRoute = req.params.id
  const errors = {}; 
  if (!name || name.trim() === '') {
    errors.name = 'Product ka naam zaroori hai.';
  } else if (name.trim().length < 3) {
    errors.name = 'Naam kam se kam 3 characters ka hona chahiye.';
  }

  
  if (!description || description.trim() === '') {
    errors.description = 'Description zaroori hai.';
  } else if (description.trim().length < 10) {
    errors.description = 'Description kam se kam 10 characters ka hona chahiye.';
  }


  if (!price || price.trim() === '') {
    errors.price = 'Price zaroori hai.';
  } else {
    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      errors.price = 'Price ek valid number hona chahiye jo 0 se bada ho.';
    }
  }

  
  if (!category || category.trim() === '') {
    errors.category = 'Category select karna zaroori hai.';
  }


  if (!subcategory || subcategory.trim() === '') {
    errors.subcategory = 'Subcategory select karna zaroori hai.';
  }

  
  if (!stock || stock.trim() === '') {
    errors.stock = 'Stock batana zaroori hai.';
  } else {
    const numericStock = Number(stock);
    if (isNaN(numericStock) || !Number.isInteger(numericStock) || numericStock < 0) {
      errors.stock = 'Stock ek positive integer (pura number) hona chahiye.';
    }
  }


  if (rating !== undefined && rating.trim() !== '') {
    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
      errors.rating = 'Rating 0 se 5 ke beech honi chahiye.';
    }
  }

  
  if (totalRatings !== undefined && totalRatings.trim() !== '') {
    const numericTotalRatings = Number(totalRatings);
    if (isNaN(numericTotalRatings) || !Number.isInteger(numericTotalRatings) || numericTotalRatings < 0) {
      errors.totalRatings = 'Total Ratings 0 ya usse bada number hona chahiye.';
    }
  }

  
  if (!isUpdateRoute) {
    if (!req.file) {
      errors.image = 'Product ki ek image upload karna zaroori hai.';
    }
  } else {
    const hasNewFile = req.file;
    const hasOldUrl = req.body && req.body.image;

    if (!hasNewFile && !hasOldUrl) {
      errors.image = 'Product ki image hona zaroori hai.';
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors 
    });
  }

  
  req.validatedProduct = {
    name: name.trim(),
    description: description.trim(),
    price: Number(price),
    category: category.trim(),
    subcategory: subcategory.trim(),
    stock: Number(stock),
    rating: rating ? Number(rating) : 0,
    totalRatings: totalRatings ? Number(totalRatings) : 0,
  };

  next(); // Ab bina kisi rukawat ke controller chalega
};

export default validateProductFields
