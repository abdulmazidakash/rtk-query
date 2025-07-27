import { useState } from 'react';
import { 
	useDeleteProductMutation, 
	useGetProductsQuery 
} from '../services/productsApi'
import UpdatedProductForm from './UpdatedProductForm';

export default function ProductsData() {
	
	const {data: products, isLoading, error } = useGetProductsQuery();
	console.log('product response:--->',products);
	const [editingProduct, setEditingProduct] = useState(null)

	const [deleteProduct] = useDeleteProductMutation();

	const handleDelete = async(id)=>{

		try {
			await deleteProduct(id)
		} catch (error) {
			console.log('something wrong', error);
		}
	}
	
  return (
	<div className='w-11/12 mx-auto my-8'>
		<h2 className='text-center font-bold text-2xl'>List of products: {products?.length}</h2>
		{isLoading && <p>Loading...</p>}
		{error && <p>error: {error.message}</p>}
		{!isLoading && !error && products && products.length > 0 && (
			<section className={'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-amber-50 my-8'}>
				{products.map((product)=>{
					return (
						<article key={product.id} className='shadow border border-gray-300 p-4 font-semibold rounded-lg'>
							<h3>Title: {product.title}</h3>
							<p>Description: {product.description}</p>
							<p>Price: {product.price}</p>
							<button onClick={()=>setEditingProduct(product)} className='btn btn-success mr-2 cursor-pointer my-2'>Edit</button>
							<button onClick={()=>handleDelete(product.id)} className='btn btn-error cursor-pointer my-2'>Delete</button>
						</article>
					)
				})}

				{editingProduct && (
				<UpdatedProductForm 
				editingProduct={editingProduct} 
				setEditingProduct={setEditingProduct} 
				/>)}
			</section>
		)}
	</div>
  )
}