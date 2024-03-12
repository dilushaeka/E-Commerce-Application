import {jsx} from "@emotion/react";
import JSX = jsx.JSX;

// type Props={
//     id:string,
//     name:string,
//     placeHolder?:string,
//     label?:string,
//     optional:boolean,
//     callBack?:Function
// }

function Input():JSX.Element{
    return(

            <div className="mt-1">
                {/*<input*/}
                {/*    type={} name=*/}
                {/*    autoComplete="email"*/}
                {/*    required*/}
                {/*    //value={email}*/}
                {/*    //onChange={(e) => setEmail(e.target.value)}*/}
                {/*    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"*/}
                {/*/>*/}
            </div>

    )
}
export default  Input;