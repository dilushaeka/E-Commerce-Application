import {createContext, ReactNode, useContext, useState} from "react";

type ShoppingCartProviderProps ={
    children:ReactNode
}
type ShoppingCartContext={
    getProductQuantity:(id:number)=> number
    increaseCartQuantity:(id:number)=>void
    decreaseCartQuantity:(id:number)=>void
    removeFromCart:(id:number)=>void
}
type CartProduct={
    id:number
    quantity:number
}
const ShoppingCartContext= createContext({}as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({children}:ShoppingCartProviderProps) {
    const [cartProducts,setCartProducts]= useState<CartProduct[]>([])
    function getProductQuantity(id:number){
        return cartProducts.find(product=> product.id === id)?.quantity||0
    }
    function increaseCartQuantity(id:number) {
        setCartProducts(currProducts=>{
            if (currProducts.find(product=>product.id === id) ==null){
                return[ ...currProducts,{id,quantity: 1 }]
            }else {
                return currProducts.map(product=>{
                    if (product.id === id){
                        return{ ...product,quantity: product.quantity + 1}
                    }else{
                        return product
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id:number){
        setCartProducts(currProducts=>{
            if (currProducts.find(product=>product. id === id)?.quantity === 1){
                return currProducts.filter(product=>product.id === id)
            }else {
                return currProducts.map(product=>{
                    if (product.id === id){
                        return{ ...product,quantity: product.quantity -1}
                    }else {
                        return product
                    }
                })
            }
        })
    }

    function removeFromCart(id:number){
        setCartProducts(currProducts=>{
            return currProducts.filter(product=> product.id !== id )
        })
    }
    return (
        <ShoppingCartContext.Provider value={{getProductQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}