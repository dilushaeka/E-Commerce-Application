
import styles from "../../styles/styles.ts";
import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
import Card from "../card/Card.tsx";


type StoreProducts={
    id:number
    name?:string
    category?:string
    originalPrice?:number
    imageUrl?:string
}

export function  StoreProduct({id, name, category, originalPrice, imageUrl}:StoreProducts):JSX.Element{
    const {getProductQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart}=useShoppingCart();
    const quantity=getProductQuantity(id)



return (
        <div>

            <Card id={id} image={imageUrl} name={name}  category={category} price={originalPrice}/>
            <div className={'flex justify-center  pt-0 pb-3 my-2'}>
                {/*<button className={'bg-red-700 hover:bg-fuchsia-400'}>hii</button>*/}
                {quantity === 0 ?(
                    <button type="button" className={`${styles.button} bg-fuchsia-400 p-0 hover:bg-red-700`} onClick={()=>alert("hello")}> + Add To Cart</button>
                    //
                ):(
                    <div >
                        <button className={'hover:bg-fuchsia-400'}>hiii</button>
                        <div className={'flex align-middle gap-4 justify-center'}>
                            <button className={'bg-blue-600 px-3 rounded '} onClick={()=> decreaseCartQuantity(id)}>-</button>
                            <div >
                                <span className={'text-black font-bold mr-1'}>{quantity}</span> Items In Cart
                            </div>
                            <button className={'bg-blue-600 px-3 rounded'} onClick={()=>increaseCartQuantity(id)}>+</button>

                        </div>
                        <button className={'relative left-16 bg-red-600 p-1 rounded'} onClick={()=>removeFromCart(id)}>Remove</button>
                    </div>
                )}
            </div>
        </div>


    )

}