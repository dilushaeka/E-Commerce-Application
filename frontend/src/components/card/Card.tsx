// import {formatCurrency} from "../../utilities/formatCurrency.ts";

type Props = {
    id?:number,
    name?:string,
    price?:number,
    image?:string,
    category?:string;
}
function Card({id,name,image,category,price}:Props){
    return (
        <div className={'border-s-black bg-indigo-200 p-8 m-5 w-72 h-70 rounded-3xl pb-2 mb-0 -z-20'}>
            <h1>{id}</h1>
            <img className={'h-40 rounded-full bg-fuchsia-400'} src={image}   alt={name}/>
            <h1 className={'text-2xl font-bold mb-2'}>{name}</h1>
            <div className={'flex justify-between'}>
                <span >{category}</span>
                <span>{price}</span>
            </div>
            <button type={"button"} className={'main-btn flex hover:bg-fuchsia-400 cursor-pointer'} onClick={()=>alert("hello")}>Read More...</button>
        </div>
    )
}
export default Card