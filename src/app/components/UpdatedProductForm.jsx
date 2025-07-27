import React, { useState } from 'react'
import { useUpdateProductMutation } from '../services/productsApi';

export default function UpdatedProductForm({editingProduct, setEditingProduct}) {
  const [updatedProduct, setUpdatedProduct]= useState(editingProduct);
  const [updateProduct] = useUpdateProductMutation();

  const handleUpdate =async (e)=>{
    e.preventDefault();

    console.log('updated product payload:--->', updatedProduct);
    try {
      await updateProduct({ id: editingProduct.id, updatedProduct: updatedProduct})
      setEditingProduct(null)
    } catch (error) {
      console.log('something went wrong', error);
    }
  }

  return (
	   <div>
      <form onSubmit={handleUpdate} action="">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box mx-auto w-md border p-4">

          <legend className="fieldset-legend">Add Product</legend>
          {/* title  */}
          <label className="label">Title</label>
          <input type="text" className="input w-full" placeholder="title" value={updatedProduct.title} name="title" onChange={(e)=> setUpdatedProduct({...updatedProduct, title:e.target.value})} />
          {/* description */}
          <label className="label">Description</label>
          <textarea rows={5} cols={5} type="text" className="textarea w-full" placeholder="description" value={updatedProduct.description} name="description" onChange={(e)=> setUpdatedProduct({...updatedProduct, description: e.target.value})} />
          {/* price  */}
          <label className="label">Price</label>
          <input type="number" className="input w-full" placeholder="price" value={updatedProduct.price} name="price" onChange={(e)=> setUpdatedProduct({...updatedProduct, price:e.target.value})} />
          {/* category  */}
          <label className="label">Category</label>
          <input type="text" className="input w-full" placeholder="category" value={updatedProduct.category} name="category" onChange={(e)=>setUpdatedProduct({...updatedProduct, category:e.target.value})} />

        <button className="btn btn-neutral mt-4 cursor-pointer">Updated Product</button>
        <button type='button' onClick={()=>setEditingProduct(null)} className="btn btn-success mt-4 cursor-pointer">Cancel</button>
      </fieldset>
      </form>
    </div>
  )
}
