import { useState } from "react"
import { useAddProductMutation } from "../services/productsApi";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router";


export default function AddProduct() {
  const navigation = useNavigate();

  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: ''
  });

  const [addProduct] = useAddProductMutation();


  const handleSubmit = async e =>{
    e.preventDefault();
    console.log('submitted product:--->', {...product, id: nanoid()});
    
    try {
      await addProduct({...product, id: nanoid()})
      navigation('/products')
    } catch (error) {
      console.log('something wrong, not added product', error);
    }
  }

  const handleChange = (e)=>{
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box mx-auto w-md border p-4">

          <legend className="fieldset-legend">Add Product</legend>
          {/* title  */}
          <label className="label">Title</label>
          <input type="text" className="input w-full" placeholder="title" value={product.title} name="title" onChange={handleChange} />
          {/* description */}
          <label className="label">Description</label>
          <textarea rows={5} cols={5} type="text" className="textarea w-full" placeholder="description" value={product.description} name="description" onChange={handleChange} />
          {/* price  */}
          <label className="label">Price</label>
          <input type="number" className="input w-full" placeholder="price" value={product.price} name="price" onChange={handleChange} />
          {/* category  */}
          <label className="label">Category</label>
          <input type="text" className="input w-full" placeholder="category" value={product.category} name="category" onChange={handleChange} />

        <button className="btn btn-neutral mt-4 cursor-pointer">Add Product</button>
      </fieldset>
      </form>
    </div>
  )
}
