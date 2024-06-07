import axios, { toFormData } from 'axios';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './createValuation.scss';
import { FaBackward } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import ValuationInfo from '../../../info/valuation-request/ValuationInfo';

export default function CreateValuation(){
 
    const navigate = useNavigate();

    const [valuation, setValuation] = useState({
        memberId: '1',
        description: '',
        estimateMin: '',
        estimateMax: '',
        photos: [],
        photoPreview: []
    });

    const generatePhotoPreview = (files) => {
        const previews = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => resolve(reader.result)
                reader.onerror = reject
                reader.readAsDataURL(file)
            })
        })

        Promise.all(previews)
            .then(previews => {
                setValuation(preState => ({
                    ...preState,
                    photoPreview: previews
                }))
            }).catch(err => toast.error('Error generating photo previews'))
    }

    const handleInputChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'photos') {
            const selectedFiles = Array.from(files)
            setValuation({ ...valuation, photos: selectedFiles })
            generatePhotoPreview(selectedFiles)
        } else {
            setValuation({ ...valuation, [name]: value })
        }

    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        if (value.trim() === '' && name !== 'photos') {
            toast.error(`${name} is required`)
        }
    }

    async function Create (e) {
        e.defaultPrevented
        console.log(valuation.description)
        console.log(valuation.estimateMin)
        console.log(valuation.estimateMax)
        console.log(valuation.memberId)

        try{

            const formData = new FormData();
            formData.append('memberId', '1');
            formData.append('description', valuation.description);
            formData.append('estimateMin', valuation.estimateMin);
            formData.append('estimateMax', valuation.estimateMax);
            valuation.photos.forEach((photo, index) => {
                formData.append("image", photo)
            })

            const createValuation = await axios.post("http://localhost:8080/valuation/create", formData , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                // console.log(response.data)
                // alert(response.data.message)
                console.log(response.data.message)
                toast.success("Valuation Request Send Successfully!")

            }).catch(error => {
                console.log(error)
                console.log(error.response)
                toast.error("Request Failed!")
            })

            if (createValuation.status === 200) {
                toast.success('Successfully')
                toast('Sended to Manager')
                console.log(valuation)
            } else {
                toast.error("Error set request!")
            }
        }catch(error){
            console.log(error)
        }
        
        
    }

    return (
        <div className='createValuation container-fluid'>
            <ToastContainer />
            <div className="row d-flex justify-content-center mt-3">
                <h2>This is the Create Valuation Page</h2>
            </div>

            <div className="row">
                <div className="col-sm-8">

                    <form onSubmit={Create}>
                        <div className="row d-flex justify-content-center mt-3">
                            <div className="inputCol col-sm-5 px-5 py-3 mx-4">

                                {/* Estimate min */}
                                <div className="py-4">
                                    <div className="py-4">
                                        <Form.Label htmlFor="estimateMin">Estimate Minimum Price <span style={{ color: 'red' }}>*</span></Form.Label>
                                            <Form.Control
                                                type="number"
                                                id="estimateMin"
                                                aria-describedby="passwordHelpBlock"
                                                name='estimateMin'
                                                value={valuation.estimateMin}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                        />
                                    </div>
                                    
                                </div>

                                {/* Estimate max */}
                                <div className="py-3">
                                    <Form.Label htmlFor="description">Estimate Maximum Price <span style={{ color: 'red' }}>*</span></Form.Label>
                                        <Form.Control
                                            type="number"
                                            id="estimateMax"
                                            aria-describedby="passwordHelpBlock"
                                            name='estimateMax'
                                            value={valuation.estimateMax}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                    />
                                </div>
                                    
                                
                            </div>
                            <div className="inputCol col-sm-5 px-2 py-3 mx-4">

                                {/* Description */}
                                <div className="description">
                                    <Form.Label htmlFor="description">Description <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Form.Control
                                        type="text" as = "textarea"
                                        id="description"
                                        aria-describedby="passwordHelpBlock"
                                        name='description'
                                        value={valuation.description}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center mt-3">
                            <div className="col-10 border rounded-1">
                                <div className="row">
                                    <div className="col-12">

                                        {/* Get input images */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Upload your images <span style={{ color: 'red' }}>*</span></Form.Label>
                                            <Form.Control
                                                type="file"
                                                multiple
                                                id='photos'
                                                name='photos'
                                                accept="image/png, image/gif, image/jpeg"
                                                onChange={handleInputChange}
                                                onBlur={handleBlur} />
                                        </Form.Group>
                                    </div>
                                </div>
                                
                                <div className="row">  

                                    <div className="row">
                                        <label htmlFor="" className='text-secondary'>Photo preview</label>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <div className="review row">

                                                {/* Show review of images */}
                                                {valuation.photoPreview.map((preview, index) => (
                                                    <div className="col-sm-3">
                                                        <img key={index} src={preview} alt={`Preview ${index}`} className='img-fluid'/>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>     
                                    
                                    
                                </div>
                                
                                
                            </div>
                            

                        </div>
                        <div className="row d-flex justify-content-center mt-3">
                            <div className="col-10 d-flex justify-content-center">
                                <Button type="submit" className="btn btn-primary">Send Valuation Request</Button>
                            </div>
                        </div>
                                                
                    </form>


                </div>
                <div className="col-sm-4">
                    <div className="row px-3">
                        <ValuationInfo />
                    </div>
                </div>

            </div>
            
        </div>
    );
};
