import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items : [],
    totalQuantity : 0,
    totalPrice : 0
}

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addToCart : (state,action) => {
            
            const newItem = action.payload
    const existingItem = state.items.find((item)=>item.id === newItem.id)
      if(!existingItem){
            state.items.push({
                id : newItem.id,
                name : newItem.name ,
                price : newItem.price,
                discountPrice : newItem.discountPrice,
                image : newItem.image ,
                quantity : 1
            })
        }else {
            existingItem.quantity++ 
        }
        state.totalQuantity++ ,
        state.totalPrice += newItem.discountPrice
        },
        removeItems : (state,action) => {
            const itemID = action.payload ;
            const existingItem = state.items.find((item) => item.id === itemID)

            if(existingItem.quantity === 1){
                state.items = state.items.filter((item)=> item.id !== newID)
            }else {
                existingItem.quantity--
            }
           state.totalQuantity--
           state.totalPrice -= existingItem.discountPrice
        },
        clearCart : (state ,action)=>{
            state.items = [] ,
            state.totalPrice = 0 ,
            state.totalQuantity = 0

        }
      
    }
})



export const {addToCart , removeItems , clearCart} = cartSlice.actions
export default cartSlice.reducer