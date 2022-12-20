import React,{ useState} from "react";
import Product,{ProductProps} from '../components/Product'
export interface ProductsProps{
  products:ProductProps[]
}
const Cart: React.FC<ProductsProps>= ({products}:ProductsProps): JSX.Element => {
  const [cart, setCart] = useState<ProductProps[]>(products)
  const removeProduct = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,_id:string):void=>{
    setCart(cart.filter(obj => obj.product._id !== _id))
  }
  return (
    <div>
    <div className="grid grid-cols-4 grid-rows-4 w-5/6">
          {cart.map(({product}, id) => {
            return (
              <>
                <Product key={id}  product={product} />
                <div>
                  <button onClick={(e)=>removeProduct(e,product._id)}>Remove</button>
                </div>
              </>
            );
          })}
      </div>
      <button>Check out</button>
    </div>
      
  );
};
export default Cart;
