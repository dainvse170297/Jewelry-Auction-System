import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaBackward } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';

const ValuationRequestDetail = () => {

    const { id } = useParams()

    const [valuationRequest, setValuationRequest] = useState({
        memberId: '',
        estimatePriceMax: '',
        estimatePriceMin: '',
        valuationStatus: '',
        description: ''
    })

    const [product, setProduct] = useState({
        valuationRequestId: id,
        categoryId: '',
        name: '',
        description: '',
        estimatePriceMax: '',
        estimatePriceMin: ''
    })

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const requestData = await axios.get(`http://localhost:8080/valuation/request/status/product-received/${id}`)
                setValuationRequest(requestData.data)
            } catch (error) {
                console.log("Error ai fetchRequest: ", error)
            }
        }
        fetchRequest()
    }, [id])

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoryData = await axios.get(`http://localhost:8080/category/all`)
                setCategories(categoryData.data)
            } catch (error) {
                console.log("Error fetchCategory: ", error)
            }
        }
        fetchCategory()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        if (value.trim() === '') {
            toast.error(`${name} is required`)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (product.name.trim() === '' || product.description.trim() === '' || product.categoryId.trim() === '' || product.estimatePriceMax.trim() === '' || product.estimatePriceMin.trim() === '') {
            toast.warning('Need to fill all fields')
        } else {
            //todo
            console.log(product)
            toast.success('Add Product Information Successfully!')
            toast('Sended to Manager')
        }

    }


    return (
        <div className='container'>
            <div className="">
                <Link to={"/valuation-request"}><FaBackward /></Link>
            </div>
            <h3 className='text-center mt-5'>Valuation Request Detail</h3>
            <div className="card">
                <div className="card-body">
                    <p>Member ID: <strong>{valuationRequest.memberId}</strong></p>
                    <p>Description: <strong>{valuationRequest.description}</strong></p>
                    <p>Min Price: <strong>{valuationRequest.estimatePriceMin}</strong></p>
                    <p>Max Price: <strong>{valuationRequest.estimatePriceMax}</strong></p>
                </div>
            </div>
            <div className="mt-3">
                <form action="" onSubmit={handleFormSubmit}>
                    <div className="row">
                        <div className="col-lg-6">
                            <Form.Label htmlFor="inputPassword5">Product category <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Select size=''
                                aria-label="Default select example"
                                name='categoryId'
                                value={product.categoryId}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            >
                                <option value="" className='text-secondary'>
                                    -- Select Category --
                                </option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Label htmlFor="name">Product Name <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                id="name"
                                aria-describedby="passwordHelpBlock"
                                name='name'
                                value={product.name}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                            <Form.Label htmlFor="description">Product Description <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                id="description"
                                aria-describedby="passwordHelpBlock"
                                name='description'
                                value={product.description}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className="col-lg-6">
                            <Form.Label htmlFor="estimatePriceMin">Estimate Min Price <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                id="estimatePriceMin"
                                aria-describedby="passwordHelpBlock"
                                name='estimatePriceMin'
                                value={product.estimatePriceMin}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                            <Form.Label htmlFor="estimatePriceMax">Estimate Max Price <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                id="estimatePriceMax"
                                aria-describedby="passwordHelpBlock"
                                name='estimatePriceMax'
                                value={product.estimatePriceMax}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                            <div className="mt-4">
                                <Button variant="success" type='submit'>Submit</Button>

                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}

export default ValuationRequestDetail
