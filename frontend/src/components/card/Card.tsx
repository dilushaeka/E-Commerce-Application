type Props = {
    id?:number,
    name?:string,
    price?:number,
    image?:string,
    category?:string;
}
function Card({id,name,image,category}:Props){
    return (
        <div className={'border-s-black bg-indigo-200 p-8 m-5 w-72 h-70 rounded-3xl'}>
            <img className={'h-40 rounded-full'} src={image}   alt={name}/>
            <h1 className={'text-2xl font-bold mb-2'}>{id}</h1>
            <p className={'my-5'}>{category}</p>
            <button className={'main-btn flex '} >Read More...</button>
        </div>
    )
}
export default Card