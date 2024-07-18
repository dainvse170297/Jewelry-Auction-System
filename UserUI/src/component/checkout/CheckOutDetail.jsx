import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getCheckOut } from '../../services/apiService';
import './checkout.scss';

const CheckOutDetail = () => {

  const location = useLocation();
  const { selectedProducts, totalPrice } = location.state;

  const [bankCode, setBankCode] = useState('')
  const [amount, setAmount] = useState(totalPrice + totalPrice * 20 / 100)

  const auctionRegisterIds = selectedProducts.map((product) => product.id)
  if (auctionRegisterIds) {
    localStorage.setItem('auctionRegisterIds', auctionRegisterIds.join(','))
  }

  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    if (bankCode.trim() === '') {
      toast.error('Please select a bank');
    } else {
      setIsLoading(true)
      try {

        const response = await getCheckOut(bankCode, amount)

        setIsLoading(false)

        if (response && response.data.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          console.error('Payment failed or payment URL is null');
        }
      } catch (error) {
        console.error('Error processing payment:', error);
      }
    }
  }

  return (
    <div className="container">
      <h2>Check Out Detail</h2>
      <hr />
      <div className="row">
        <div className="col-lg-8 col-md-6">
          <table className="table">
            <tbody className="">
              {selectedProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.lot?.product?.productImages[0].imageUrl} alt={product.lot?.product?.name} width={'120px'} height={'120px'} />
                  </td>
                  <td>{product.lot?.product?.name}</td>
                  <td>${product.finalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="checkout__order">
            <h4 className='order__title'>YOUR ORDER</h4>
            <div className="checkout__order__products">Product <span>Total</span></div>
            <ul className="checkout__total__products">
              {selectedProducts.map((p) => (
                <li key={p.id}>{p.lot?.product?.name} <span>${p.finalPrice}</span></li>
              ))}
              <li className='text-secondary'>+ 20% fee for platform</li>
            </ul>
            <ul className="checkout__total__all">
              <li>Subtotal <span>${totalPrice}</span></li>
              <li>Total <span>${amount}</span></li>
            </ul>
            <div>
              <label htmlFor="bankCode">Bank Name</label>
              <div className="col-lg-6">
                <select id="bankCode" value={bankCode} onChange={(e) => setBankCode(e.target.value)} className='form-select'>
                  <option value="" className='text-secondary'>Select Bank</option>
                  <option value="NCB">Ngan hang NCB</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              {!isLoading ? (
                <button className='site-btn mx-auto' onClick={handlePayment}>ONLINE BANKING</button>
              ) : (
                <>
                  <CircularProgress />
                </>
              )}
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default CheckOutDetail