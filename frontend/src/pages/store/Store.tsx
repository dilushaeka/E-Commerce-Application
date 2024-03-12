import storeProducts from "../../components/data/products.json"
import {StoreProduct} from "../../components/store/StoreProduct.tsx";


function Store():JSX.Element{


    // @ts-ignore
    const idAsNumber = parseInt(storeProducts.id);
    // const originalPriceAsNumber = parseInt(storeProducts.);
    return (
        <div className={'px-2 z-[-2]   w-fit m-auto 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'}>
            <h1 className={'text-black font-bold'}>Store</h1>

            <div className={' z-[-2]'}>
                {storeProducts.map((prod)  =>(
                        <div key={prod.id}>
                            <StoreProduct
                                {...prod}  id={idAsNumber}/>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}
export default Store