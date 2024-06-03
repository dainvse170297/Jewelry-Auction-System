import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaBackward } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ValuationRequestDetail = () => {

    const { id } = useParams()

    const [valuationRequest, setValuationRequest] = useState({
        memberId: '',
        estimatePriceMax: '',
        estimatePriceMin: '',
        valuationStatus: '',
        description: ''
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
                <form action="">
                    <div className="row">
                        <div className="col-lg-6">
                            <Form.Label htmlFor="inputPassword5">Product category</Form.Label>
                            <Form.Select size='' aria-label="Default select example">
                                <option value=""><p className='text-secondary'>Select Category</p></option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </Form.Select>
                            <Form.Label htmlFor="inputPassword5">Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                            />
                            <Form.Label htmlFor="inputPassword5">Product Description</Form.Label>
                            <Form.Control
                                type="text"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                            />
                        </div>
                        <div className="col-lg-6">
                            <Form.Label htmlFor="inputPassword5">Estimate Min Price</Form.Label>
                            <Form.Control
                                type="text"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                            />
                            <Form.Label htmlFor="inputPassword5">Estimate Max Price</Form.Label>
                            <Form.Control
                                type="text"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                            />
                            <div className="mt-4">
                                <Button variant="success">Submit</Button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default ValuationRequestDetail
