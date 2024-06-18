import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './checkout.scss';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await axios.get('https://667056da0900b5f8724a471b.mockapi.io/products');
                setProducts(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, [])

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleCheckboxChange = (product) => {
        let updatedSelectedProducts;
        if (selectedProducts.includes(product)) {
            updatedSelectedProducts = selectedProducts.filter(p => p !== product);
        } else {
            updatedSelectedProducts = [...selectedProducts, product];
        }

        setSelectedProducts(updatedSelectedProducts);
        calculateTotalPrice(updatedSelectedProducts);
    };

    const calculateTotalPrice = (selectedProducts) => {
        const total = selectedProducts.reduce((sum, product) => sum + product.price, 0);
        setTotalPrice(total);
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedProducts(products);
            calculateTotalPrice(products);
        } else {
            setSelectedProducts([]);
            setTotalPrice(0);
        }
    };

    const navigate = useNavigate()

    const handleCheckOut = () => {
        navigate('/checkout-detail', { state: { selectedProducts, totalPrice } });
    };

    return (
        <div className="container">
            <h2>Order Review</h2>

            <hr />
            <div class="form-check">
                <input className="form-check-input" type="checkbox" onChange={handleSelectAll} />
                <label class="form-check-label" for="flexCheckDefault">
                    Select All
                </label>
            </div>
            <div className="row">
                <div className="checkout-container">
                    <div className="order-review">

                        <div className="">
                            <table>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id} className={selectedProducts.includes(product) ? 'selected' : ''}>
                                            <td><img src={product.image} alt={product.name} /></td>
                                            <td>
                                                <div className="product-details">
                                                    <h3>{product.name}</h3>
                                                    <p>{product.description}</p>
                                                </div>
                                            </td>
                                            <td>${product.price.toFixed(2)}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProducts.some(p => p.id === product.id)}
                                                    onChange={() => handleCheckboxChange(product)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="order-total">
                        <h2>Order Total</h2>
                        <p>{selectedProducts.length} {selectedProducts.length === 1 ? 'item' : 'items'} selected</p>
                        <ul>

                        </ul>
                        <h3>Subtotal <span>${totalPrice.toFixed(2)}</span></h3>
                        <button onClick={handleCheckOut} disabled={selectedProducts.length === 0} className={selectedProducts.length === 0 ? 'button-disable' : 'button'}>Check out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut
