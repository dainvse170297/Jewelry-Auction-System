import axios from 'axios'
import React, { useEffect } from 'react'

const ProfileDetail = ({ memberId }) => {

    const [profile, setProfile] = React.useState({})

    useEffect(() => {
        const getMemberInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/member/profile/${memberId}`)
                setProfile(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        getMemberInfo()
    }, [memberId])

    return (
        <>
            <h6>YOUR PROFILE INFORMATION</h6>
            <hr />
            <form>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        aria-describedby="fullNameHelp"
                        placeholder="Enter your fullname"
                        defaultValue={profile.fullname}
                        readOnly
                    />


                </div>
                <div className="form-group">
                    <label htmlFor="bio">Address</label>
                    <textarea
                        className="form-control autosize"
                        id="bio"
                        placeholder="Write something about you"
                        style={{
                            overflow: "hidden",
                            overflowWrap: "break-word",
                            resize: "none",
                            height: 62
                        }}
                        defaultValue={profile.address}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="url">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="url"
                        placeholder="Enter your website address"
                        defaultValue={profile.phone}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Email Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        placeholder="Enter your location"
                        defaultValue={profile.email}
                        readOnly
                    />
                </div>
                {/* <div className="mt-3">
                    <button type="button" className="btn btn-primary me-3">
                        Update Profile
                    </button>
                    <button type="reset" className="btn btn-light">
                        Reset Changes
                    </button>
                </div> */}
            </form>
            {profile.creditCard && (
                <>
                    <h6 className='mt-3'>BANK INFORMATION</h6>
                    <hr />
                    <form>
                        <div className="form-group">
                            <label htmlFor="bankName">Bank Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="bankName"
                                placeholder="Enter your location"
                                defaultValue={profile.creditCard?.bankName}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bankNumber">Bank Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="bankNumber"
                                placeholder="Enter your location"
                                defaultValue={profile.creditCard?.bankNumber}
                                readOnly
                            />
                        </div>
                    </form>
                </>
            )}

        </>
    )
}

export default ProfileDetail
