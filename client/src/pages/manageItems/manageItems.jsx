import products_list from './manageArray'
import './manageItems.css'

export default function ManageItems(){
    return(
        <div className="manage-ietms">
            <span>All Products</span>

            <div className="products-list">
                <div className="header products-list-format">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Price</span>
                    <span>Status</span>
                </div>
                
                    {products_list.map((product,indx) => (
                        <div className='product products-list-format'>
                            <img src={product.product_image} alt="" />
                            <span>{product.product_name}</span>
                            <span>{product.price}</span>
                            <span className={`${product.status === 'available' ?'available':'not-available'}`}>{product.status}</span>
                        </div>
                    ))}
               
            </div>
        </div>
    )
}