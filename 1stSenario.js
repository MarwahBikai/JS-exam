const products = [
  { id: 1, name: "Laptop", price: 1200, stock: 3 },
  { id: 2, name: "Mouse", price: 25, stock: 10 },
  { id: 3, name: "Headset", price: 100, stock: 5 }
];

let cart = [];

// add product to cart


const addToCart=(id, quantity)=>{


    //find product in array
    const product=products.find(product=>product.id===id)
    
    const stock= product.stock

    if (!product)
         return {
        success:false,
        message:"Cannot find product to add to cart"
    }

    if (quantity === 0 || quantity <0){
        return {
        success:false,
        message:"invalid quantity should be more than 1 and non-negative"}

    }
  
  
        //product available and quantity < available stock
    const productInCart= cart.find(product=>product.id===id)


//if not in cart, check quantity against stock in original products array

    if(!productInCart){

         if (quantity > stock){
        return {
        success:false,
        message:"invalid quantity larger than stock, can't add to cart"}

    }
        const newProduct={
            id:product.id,
            price:product.price * quantity ,
            stock:product.stock,
            quantity:quantity

        }
      
        cart.push(newProduct)
         return    {
        success:true,
        message:"Product added successfully to your cart"
    }
    }


//if  in cart, check quantity against stock in original products array and product's quantity in cart

        //stock 3, i have in cart 1, only 2 i can add
    const availableQuantityToAdd= product.stock - productInCart.quantity

    if (quantity > availableQuantityToAdd){
        return {
        success:false,
        message:`invalid quantity larger than available stock, can't more than ${availableQuantityToAdd}`}

    }
    //quantity :1 => 2
    productInCart.quantity += quantity
    //productInCart.quantity=2
    //1200 * 1

    console.log( product.price)
    console.log( quantity)

    productInCart.price += quantity* product.price
    


    cart[cart.findIndex(productInCart=>productInCart.id===id)]=productInCart

    return    {
        success:true,
        message:"Product added successfully to your cart"
    }


    }



    /**
     * functionalities
     * - Remove a product from the cart.
- Calculate subtotal.
- Apply 10% discount if subtotal is above 1000.
- Add 11% tax after discount.
- Return a checkout summary.

     */

    const removeProduct=(id)=>{

        //check if product is in cart
        const product = cart.find(product=>product.id===id)
        if(!product){
            return {success:false,message:"product is not in cart, can't remove product"}
        }
        const index=cart.findIndex(product=>product.id===id)
        cart.splice(index,1)

        return {success:true,message:"Removed product successfully"}
    }

const computeTotal=()=>{
    if(cart.length===0)
      return 0
    const prices= cart.map(product=>product.price)
    let subtotalWithDiscountCheck= ApplyDiscount( prices.reduce((sum,price)=>sum+price,0))
    //apply tax
    subtotalWithDiscountCheck = subtotalWithDiscountCheck + subtotalWithDiscountCheck*0.11
    return subtotalWithDiscountCheck
}
const ApplyDiscount=(subtotal)=>{
    if (subtotal> 1000)
      return subtotal = subtotal - subtotal*0.1
    return subtotal
}
const checkoutSummary=()=>{
    const total= computeTotal();
    return `Your checkout summary: , you have ${cart.length} with total of ${total} $`
}
addToCart(1,2)
addToCart(1,1)
addToCart(1,1)
console.log(cart)
console.log(checkoutSummary())



