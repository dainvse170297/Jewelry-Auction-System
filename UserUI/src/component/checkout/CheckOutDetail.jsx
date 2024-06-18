import React from 'react'
import { useLocation } from 'react-router-dom';

const CheckOutDetail = () => {

  const location = useLocation();
  const { selectedProducts, totalPrice } = location.state;
  return (
    <div>
      CheckOutDetail Page
      <div>
        <h2>Check Out Detail</h2>
        <ul>
          {selectedProducts.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  )
}

export default CheckOutDetail