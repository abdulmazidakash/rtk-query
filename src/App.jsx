import { Route, Routes } from "react-router"
import Root from "./layout/Root"
import Home from "./pages/Home"
import ProductsData from "./app/components/ProductsData"
import AddProduct from "./app/components/AddProduct"
import UpdatedProductForm from "./app/components/UpdatedProductForm"


function App() {

  return (
    <>
      <Routes>
        <Route  path='/' element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products" element={<ProductsData />} />
          <Route path="/product/:id" element={<UpdatedProductForm />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
