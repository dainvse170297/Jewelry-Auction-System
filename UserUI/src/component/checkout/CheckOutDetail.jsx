import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './checkout.scss';
import PaymentCallback from './PaymentCallback';
import { CircularProgress } from '@mui/material';

const CheckOutDetail = () => {

  const location = useLocation();
  const { selectedProducts, totalPrice } = location.state;

  const [bankCode, setBankCode] = useState('')
  const [amount, setAmount] = useState(totalPrice + totalPrice * 20 / 100)

  // const [auctionRegisterIds, setAuctionRegisterIds] = useState([
  //   selectedProducts.map((product) => product.id)
  // ])
  // console.log(auctionRegisterIds);

  const auctionRegisterIds = selectedProducts.map((product) => product.id)

  // console.log(auctionRegisterIds.join(','));

  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    if (bankCode.trim() === '') {
      toast.error('Please select a bank');
    } else {
      setIsLoading(true)
      try {
        const response = await axios.get(`http://localhost:8080/api/payment/vnpay`, {
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            amount,
            bankCode,
            auctionRegisterIds: auctionRegisterIds.join(',')
          }
        })
        const data = response.data;
        setIsLoading(false)
        if (data.code === 200 && data.data.paymentUrl) {
          window.location.href = data.data.paymentUrl;
        } else {
          console.error('Payment failed or payment URL is null');
        }
      } catch (error) {
        console.error('Error processing payment:', error);
      }
    }
    // console.log(bankCode + '' + amount);
  }
  <PaymentCallback auctionRegisterIds={auctionRegisterIds} />

  return (
    <div className="container">
      <div className="row">
        <div>
          <h2>Check Out Detail</h2>
          <div className='mt-3'>

            <div className="">
              <table className="table shadow">
                <tbody className="">
                  {selectedProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img src={product.lot?.product?.productImages[0].imageUrl} alt={product.lot?.product?.name} width={'200px'} height={'100px'} />
                      </td>
                      <td>{product.lot?.product?.name}</td>
                      <td>${product.finalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5">
              <h3>Total Price: ${amount}</h3>
              <div>
                <label htmlFor="bankCode">Bank Code</label>
                <div className="col-lg-4">
                  <select id="bankCode" value={bankCode} onChange={(e) => setBankCode(e.target.value)} className='form-select'>
                    <option value="" className='text-secondary'>Select Bank</option>
                    <option value="NCB">Ngan hang NCB</option>
                  </select>
                </div>
              </div>
              <div className="">
                {!isLoading ? (
                  <button className='payment-btn mt-3' onClick={handlePayment}>Pay Now</button>
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
    </div>
  )
}

export default CheckOutDetail