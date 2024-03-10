
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/header/header.tsx";
import Footer from "./components/layout/footer/Footer.tsx";
import Home from "./pages/homepage/Home.tsx";
import Products from "./pages/products/Products.tsx";
import About from "./pages/about/About.tsx";
import Store from "./pages/store/Store.tsx";

function App():JSX.Element {


  return (
      <div>
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path={'home'} element={<Home/>}/>
                  <Route path={'products'} element={<Products/>}/>
                  <Route path={'about'} element={<About/>}/>
                  <Route path={'store'} element={<Store/>}/>
              </Routes>
              <Footer/>
          </BrowserRouter>
      </div>
  )
}

export default App
