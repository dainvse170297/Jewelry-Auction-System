import React, { useEffect, useState } from 'react'
import { confirmTransfered, getMemberByProductId } from '../../../services/apiService'
import { Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { CircularProgress } from '@mui/material'

const CustomerDetail = ({ productId, transferAmount, auctionRegisterId }) => {

    const [owner, setOwner] = useState([])

    const [photos, setPhotos] = useState([])

    const [photoPreview, setPhotoPreview] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        const fetchOwner = async () => {
            try {
                const response = await getMemberByProductId(productId)
                setOwner(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchOwner()

    }, [productId])

    const generatePhotoPreview = (photos) => {
        const preview = photos.map((photo) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(photo)
                reader.onload = () => resolve(reader.result)
                reader.onerror = (error) => reject(error)
            })
        })

        Promise.all(preview).then((preview) => {
            setPhotoPreview(preview)
        }).catch((error) => console.log(error))
    }

    const handleInputChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'photos') {
            const selectedFiles = Array.from(files);
            setPhotos(selectedFiles);
            generatePhotoPreview(selectedFiles)
        }
    }

    const handleConfirmTransfered = async () => {
        try {
            setIsLoading(true)
            const response = await confirmTransfered(owner.id, auctionRegisterId, transferAmount, photos)

            if (response.status === 200) {
                toast.success('Transfered successfully')
                setIsLoading(false)
                window.location.reload()
            }


        } catch (error) {
            console.log(error)
        }
    }

    //console.log(owner.id, transferAmount, auctionRegisterId, productId)

    return (
        <>
            <h4 className='text-center'>Owner Information</h4>
            <div className="container">
                <p>Owner Name: <strong>{owner.fullname}</strong></p>
                <p>Owner Email: <strong>{owner.email}</strong></p>
                <p>Owner Phone: <strong>{owner.phone}</strong></p>
                <p>Owner Phone: <strong>{owner.address}</strong></p>
                <hr />
                <h6 className='text-center'>Bank Information</h6>
                <p>Bank Name: <strong>{owner.creditCard?.bankName}</strong></p>
                <p>Bank Number: <strong>{owner.creditCard?.bankNumber}</strong></p>
                <p>Account Holder: <strong>{owner.creditCard?.accountHolder}</strong></p>
                <p>Amount: <strong>${transferAmount}</strong></p>
            </div>
            <div className="">
                <label htmlFor="photos">
                    Transfer bill photo <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    className='form-control'
                    type="file"
                    multiple
                    id="photos"
                    name="photos"
                    onChange={handleInputChange}
                />
            </div>
            <div className="mt-3 mb-3">
                {photoPreview.map((photo, index) => (
                    <img key={index} src={photo} alt="preview" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                ))}
            </div>
            <div className="mt-3">
                {isLoading ?
                    <CircularProgress />
                    :
                    <button className="btn btn-primary" onClick={handleConfirmTransfered}>Confirm Transfered</button>
                }
                <ToastContainer />
            </div>

        </>
    )
}

export default CustomerDetail