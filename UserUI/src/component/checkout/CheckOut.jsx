import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './checkout.scss';
import { useNavigate } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

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
    if (localStorage.getItem("auctionRegisterIds")) {
        localStorage.removeItem("auctionRegisterIds")
    }

    useEffect(() => {
        const getProducts = async () => {
            if (!currentUser) {
                navigate("/login", { state: { from: `/checkout` } })
            } else {
                memberId = currentUser.memberId;
                setIsLoading(true)
                try {
                    const data = await axios.get(`http://localhost:8080/auction-register/view-win-auction-list/${memberId}`);

                    setProducts(data.data);
                    setIsLoading(false)
                } catch (error) {
                    console.log(error);
                    setIsLoading(false)
                }
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
            <h2>Check Out List</h2>
            <p className='text-secondary'>List of jewelry that won the auction</p>
            <hr />

            {isLoading ? (
                <>
                    <LinearProgress></LinearProgress>
                </>
            ) : (
                <>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" onChange={handleSelectAll} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Select All
                        </label>
                    </div>
                    <section className='shopping-cart'>
                        <div className="">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="shopping__cart__table">
                                        <table>
                                            <thead>

                                            </thead>
                                            <tbody>
                                                {products.map((product) => (
                                                    <tr key={product.id} className={selectedProducts.includes(product) ? 'selected' : ''}>
                                                        {/* <td>{product.id}</td> */}
                                                        <td className='product__cart__item'>
                                                            <div className="product__cart__item__pic">
                                                                <img src={product.lot?.product?.productImages[0].imageUrl} alt={product.lot?.product?.name} width={'120px'} height={'120px'} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="product__cart__item__text">
                                                                <h3>{product.lot?.product?.name}</h3>
                                                                <p className='text-secondary'>{product.lot?.product?.description}</p>
                                                            </div>
                                                        </td>
                                                        <td className='cart__price'>
                                                            ${product.finalPrice}
                                                        </td>
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
                                    <div className="col-lg-4">
                                        <div className="cart__total">
                                            <h6 className='text-center'>Total</h6>
                                            <hr />
                                            <ul>
                                                <li>
                                                    <p>
                                                        {selectedProducts.length} {selectedProducts.length === 1 ? 'item' : 'items'} selected
                                                    </p>
                                                </li>
                                                <li>Subtotal <span>${totalPrice}</span></li>
                                            </ul>
                                            <button onClick={handleCheckOut}
                                                disabled={selectedProducts.length === 0}
                                                className={selectedProducts.length === 0 ? 'button-disable' : 'mx-auto primary-btn'}>
                                                CHECK OUT
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div >
    )
}

export default CheckOut
