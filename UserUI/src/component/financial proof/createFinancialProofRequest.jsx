import React from 'react'

export default function createFinancialProofRequest() {
    const UserId = JSON.parse(localStorage.getItem("account")).id;

    const [financialInfo, setFinancialinfo] = useState({
        memberId: UserId,
        photos: [],
    });

    async function create() {
        try {
            const formData = new FormData();
            formData.append("memberId", financialInfo.memberId);
            financialInfo.photos.forEach((photo) => {
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

            if (createValuation.status === 200) {
                toast.success("Successfully");
                toast("Sended to Manager");
                console.log(valuation);
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
                setValuation((preState) => ({
                    ...preState,
                    photoPreview: previews,
                }));
            })
            .catch((err) => toast.error("Error generating photo previews"));
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "photos") {
            const selectedFiles = Array.from(files);
            setValuation({ ...valuation, photos: selectedFiles });
            generatePhotoPreview(selectedFiles);
        } else {
            setValuation({ ...valuation, [name]: value });
        }
    };




    return (
        <>
            <form action={create}>
                
            </form>
        </>
    )
}
