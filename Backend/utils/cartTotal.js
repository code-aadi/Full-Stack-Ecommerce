const cartTotal = (validatedItems)=>{
    const subTotal = validatedItems.reduce((acc,item)=> acc + item.quantity * item.price ,0)
const tax = subTotal * 18 / 100
const totalAmount = subTotal + tax
return {totalAmount, tax}
}

export default cartTotal