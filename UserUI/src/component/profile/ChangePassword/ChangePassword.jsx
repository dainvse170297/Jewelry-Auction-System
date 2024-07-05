import React from 'react'

const ChangePassword = () => {
    return (
        <>
            <h6>PASSWORD SETTINGS</h6>
            <hr />
            <form>
                <div className="form-group">
                    <label className="d-block">Change Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your old password"
                    />
                    <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="New password"
                    />
                    <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Confirm new password"
                    />
                </div>
                <hr />
                <div className="">
                    <button type="button" className="btn  me-3">
                        Save
                    </button>
                </div>
            </form>

        </>
    )
}

export default ChangePassword
