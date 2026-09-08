


const validateForm = (formData, imageFile) => {
  let localErrors = {};

  if (!imageFile) {
    localErrors.image = "Product ki image upload karna zaroori hai!";
  }

  if (!formData.name?.trim()) {
    localErrors.name = "Product ka naam zaroori hai!";
  }
  if (!formData.description?.trim()) {
    localErrors.description = "Description khali nahi ho sakta!";
  }
  if (!formData.category?.trim()) {
    localErrors.category = "Category select karna zaroori hai!";
  }
  if (!formData.subcategory?.trim()) {
    localErrors.subcategory = "Subcategory select karna zaroori hai!";
  }
  

  if (!formData.price || Number(formData.price) <= 0) {
    localErrors.price = "Price 0 se zyada honi chahiye!";
  }
  if (formData.stock === '' || Number(formData.stock) < 0) {
    localErrors.stock = "Stock negative nahi ho sakta!";
  }
  if (formData.rating === '' || Number(formData.rating) < 0 || Number(formData.rating) > 5) {
    localErrors.rating = "Rating 0 se 5 ke beech honi chahiye!";
  }
  if (formData.totalRatings === '' || Number(formData.totalRatings) < 0) {
    localErrors.totalRatings = "Total Ratings valid number hona chahiye!";
  }

  return localErrors; 
};

export default validateForm