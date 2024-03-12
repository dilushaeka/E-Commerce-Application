
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/header/header.tsx";
import Footer from "./components/layout/footer/Footer.tsx";
import Home from "./pages/homepage/Home.tsx";
import Products from "./pages/products/Products.tsx";
import About from "./pages/about/About.tsx";
import Store from "./pages/store/Store.tsx";
import Contact from "./pages/contact/Contact.tsx";
import {ShoppingCartProvider} from "./components/context/ShoppingCartContext.tsx";

function App():JSX.Element {


  return (
      <div>

          <BrowserRouter>
              <ShoppingCartProvider>
              <Header/>
              <Routes>
                  <Route path={''} element={<Home/>}/>
                  <Route path={'products'} element={<Products/>}/>
                  <Route path={'about'} element={<About/>}/>
                  <Route path={'store'} element={<Store/>}/>
                  <Route path={'contact'} element={<Contact/>}/>
              </Routes>
              <Footer/>
              </ShoppingCartProvider>
          </BrowserRouter>

      </div>
  )
}

export default App
