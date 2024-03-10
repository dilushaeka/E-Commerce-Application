
import Card from "../card/Card.tsx";

type StoreProduct={
    id:number
    name:string
    category:string
    price:number
    imageUrl:string
}

export function  StoreProduct({id, name, category, price, imageUrl}:StoreProduct){
    return (
        <Card id={id} image={imageUrl} name={name}  category={category} price={price} />

    )

}