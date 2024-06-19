import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './checkout.scss';

const CheckOutDetail = () => {

  const location = useLocation();
  const { selectedProducts, totalPrice } = location.state;

  const [bankCode, setBankCode] = useState('')
  const [amount, setAmount] = useState(totalPrice)



  const handlePayment = async () => {
    if (bankCode.trim() === '') {
      toast.error('Please select a bank');
    } else {
      try {
        const response = await axios.get(`http://localhost:8080/api/payment/vnpay?amount=${amount}&bankCode=${bankCode}`)
        const data = response.data;
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

  return (
    <div className="container">
      <div className="row">
        <div>
          <h2>Check Out Detail</h2>
          <div className='col-md-8 mt-3'>
            <table className="shadow">
              <tbody className="checkout-detaill-img">
                {selectedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.lot?.product?.productImages[0].imageUrl} alt={product.lot?.product?.name} />
                    </td>
                    <td>{product.lot?.product?.name} - ${product.finalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-5">
              <h3>Total Price: ${totalPrice}</h3>
              <div>
                <label htmlFor="bankCode">Bank Code</label>
                <div className="col-lg-2">
                  <select id="bankCode" value={bankCode} onChange={(e) => setBankCode(e.target.value)} className='form-select'>
                    <option value="">Select Bank</option>
                    <option value="NCB">Nhacuatui Bank</option>
                  </select>
                </div>
              </div>
              <button className='payment-btn mt-3' onClick={handlePayment}>Pay Now</button>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOutDetail