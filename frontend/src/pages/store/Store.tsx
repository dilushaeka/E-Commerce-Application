import storeProducts from "../../components/data/products.json"
import {StoreProduct} from "../../components/store/StoreProduct.tsx";

function Store():JSX.Element{
    return (
        <div className={'px-2'}>
            <h1>Store</h1>
            <div className={'grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-fit relative m-auto z-[-2] px-2'}>
                {
                    storeProducts.map(prod=>(
                        <div key={prod.id}>
                            <StoreProduct {...prod}/>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}
export default Store