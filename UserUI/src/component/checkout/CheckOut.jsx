import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './checkout.scss';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [products, setProducts] = useState([]);

    const currentUser = JSON.parse(localStorage.getItem("account"));

    const navigate = useNavigate()
    let memberId = null;
    if (currentUser) {
        memberId = currentUser.memberId;
    } else {
        navigate("/login", { state: { from: `/checkout` } })
    }

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await axios.get(`http://localhost:8080/auction-register/view-win-auction-list/${memberId}`);
                setProducts(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, [])

    // const ProductImages = ({ data }) => {
    //     const getFirstImageUrl = (productImages) => {
    //         return productImages.length > 0 ? productImages[0].imageUrl : '';
    //     };

    //     return (
    //         <div>
    //             {data.map((item) => (
    //                 <div key={item.id}>
    //                     <img src={getFirstImageUrl(item.product.productImages)} alt={item.product.name} />
    //                 </div>
    //             ))}
    //         </div>
    //     );
    // };

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
        const total = selectedProducts.reduce((sum, product) => sum + product.finalPrice, 0);
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

    const handleCheckOut = () => {
        navigate('/checkout-detail', { state: { selectedProducts, totalPrice } });
    };

    return (
        <div className="container">
            <h2>Order Review</h2>
            <p className='text-secondary'>List of jewelry that won the auction</p>
            <hr />
            <div className="form-check">
                <input className="form-check-input" type="checkbox" onChange={handleSelectAll} />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Select All
                </label>
            </div>
            <div className="row mt-3">
                <div className="checkout-container">
                    <div className="order-review">
                        <div className="">
                            <table>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id} className={selectedProducts.includes(product) ? 'selected' : ''}>
                                            {/* <td>{product.id}</td> */}
                                            <td><img src={product.lot?.product?.productImages[0].imageUrl} alt={product.lot?.product?.name} /></td>
                                            <td>
                                                <div className="product-details">
                                                    <h3>{product.lot?.product?.name}</h3>
                                                    <p className='text-secondary'>{product.lot?.product?.description}</p>
                                                </div>
                                            </td>
                                            <td>${product.finalPrice}</td>
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
                    {selectedProducts.length > 0 && (
                        <div className="order-total shadow">
                            <h2>Order Total</h2>
                            <p>{selectedProducts.length} {selectedProducts.length === 1 ? 'item' : 'items'} selected</p>
                            <ul>

                            </ul>
                            <h3>Subtotal <span>${totalPrice}</span></h3>
                            <button onClick={handleCheckOut} disabled={selectedProducts.length === 0} className={selectedProducts.length === 0 ? 'button-disable' : 'button'}>CHECK OUT</button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default CheckOut
