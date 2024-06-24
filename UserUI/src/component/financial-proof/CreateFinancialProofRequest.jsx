import React from 'react'
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import PhotoUploadIcon from '@mui/icons-material/Backup';

export default function CreateFinancialProofRequest() {
    const UserId = useState(1);
    // const UserId = JSON.parse(localStorage.getItem("account")).id;

    const [financialInfo, setFinancialinfo] = useState({
        memberId: UserId,
        financialProofImages: [],
    });

    const [available, setAvailable] = useState(false);

    async function checkAvailable() {
        try {
            const response = await axios.get(`http://localhost:8080/financial-proof/check-available`)

            if (response.status === 200) {
                setAvailable(true)
                toast.success("Successfully");
                console.log(available);
            } else {
                toast.error("Error set request!");
            }
        }
        catch (error) {
            console.log("Error: ", error);
        }
    }

    async function create() {
        try {
            const formData = new FormData();
            formData.append("memberId", financialInfo.memberId);
            financialInfo.financialProofImages.forEach((photo) => {
                formData.append("photos", photo);
            });

            const response = await axios
                .post(`http://localhost:8080/financial-proof/create`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data.message);
                    toast.success("Create Financial Proof Request Successfully!");
                })
                .catch((error) => {
                    console.log(error);
                    console.log(error.response);
                    toast.error("Create Financial Proof Request Failed!");
                });

            if (response.status === 200) {
                toast.success("Successfully");
                toast("Sended to Manager");
                console.log(financialInfo);
            } else {
                toast.error("Error set request!");
            }
        }
        catch (error) {
            console.log("Error: ", error);
        }
    }

    const generatePhotoPreview = (files) => {
        const previews = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(previews)
            .then((previews) => {
                setFinancialinfo((preState) => ({
                    ...preState,
                    financialProofImages: previews,
                }));
            })
            .catch((err) => toast.error("Error generating photo previews"));
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "photos") {
            const selectedFiles = Array.from(files);
            setFinancialinfo({ ...financialInfo, financialProofImages: selectedFiles });
            generatePhotoPreview(selectedFiles);
        } else {
            setFinancialinfo({ ...financialInfo, [name]: value });
        }
    };

    return (
        <>
            {available ?
                <h1 className="text-center py-4">You have already sent a request</h1>
                :
                <div className="createValuation container-fluid">
                    <h1 className="text-center py-4">Send Financial Proof Request</h1>

                    <form onSubmit={create}>
                        <div className="row d-flex justify-content-center mt-3">
                            <div className="col-sm-8">
                                <div className="row">
                                    <div className="col-sm-6 px-5 mx-0">
                                        {/* Get photo from member */}
                                        <div className="row p-2 justify-content-center">
                                            <div className="col text-center px-4 pb-4 border">
                                                <p className="upload-title mt-4 mb-01">Photos</p>
                                                <hr />
                                                <div className="col upload-box rounded-5 mx-2 py-4 mt-3">
                                                    <div className="row mb-3">
                                                        <span>
                                                            <strong>
                                                                Choose a file or drag & drop it here
                                                            </strong>
                                                        </span>
                                                    </div>
                                                    <div className="row d-flex justify-content-center pb-4">
                                                        <div>
                                                            <PhotoUploadIcon
                                                                style={{
                                                                    fontSize: "400%",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <input
                                                        type="file"
                                                        multiple
                                                        id="photos"
                                                        name="photos"
                                                        accept="image/png, image/gif, image/jpeg"
                                                        onChange={handleInputChange}
                                                        style={{ display: "none" }}
                                                    />
                                                    <label
                                                        htmlFor="photos"
                                                        className="custom-file-upload mb-3"
                                                    >
                                                        <div className="p-2 border border-3 rounded-pill ">
                                                            <span style={{ fontSize: "90%" }}>Browse File</span>
                                                        </div>
                                                    </label>
                                                    <p className="file-formats">JPEG, PNG, PDG</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            {/* Show review of images */}
                                            <div className="row">
                                                <span className="text-center">Photos preview</span>
                                            </div>
                                            <div className="review row">
                                                {financialInfo.financialProofImages.map((preview, index) => (
                                                    <div className="col-4 p-3">
                                                        <img
                                                            key={index}
                                                            src={preview}
                                                            alt={`Preview ${index}`}
                                                            className="img-fluid"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 px-2 mx-0">
                                        <div className="row mx-0">
                                            <h4 className="pb">
                                                Guidelines
                                            </h4>
                                            <hr />
                                        </div>
                                        {/* Description */}
                                        <div className="row description p-3 mx-0">
                                            1. FinCEN (Financial Crimes Enforcement Network): FinCEN has issued guidelines regarding anti-money laundering programs for dealers in precious metals, stones, or jewels. These guidelines aim to protect businesses dealing with jewels, precious metals, and precious stones from potential abuse by criminals and terrorists. The USA PATRIOT Act mandates that dealers in these commodities establish anti-money laundering programs.
                                            <br /><br />
                                            2. FTC (Federal Trade Commission) Jewelry Guides: The FTC provides guidelines for consumers and businesses related to jewelry. These guides cover topics such as gemstones, laboratory-created substitutes, natural and cultured pearls, precious metals (like gold, silver, and platinum), and other types of jewelry products. If you manufacture or sell jewelry, these guides can help you comply with regulations.
                                            <br /><br />
                                            3. FTC’s Jewelry Guides for Precious Metals, Gemstones, and Pearls: These guides apply to various jewelry industry products, including gemstones, pearls, and metallic watch bands. They provide information on marking, advertising, and disclosures for different types of jewelry.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="row d-flex justify-content-center px-5 mx-3 my-3">
                                            <button type="submit"> Submit Financial Proof Request</button>
                                            <ToastContainer />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </>
    );

}
