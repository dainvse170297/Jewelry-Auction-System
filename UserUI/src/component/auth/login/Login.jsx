import React from 'react'
import './login.scss'

const Login = () => {
    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <h4 className='text-center mb-5'>SIGN IN</h4>
                    <form action="" method='POST'>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="" id="username" />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="" id="password" autoComplete='off' />
                        </div>
                        <div className="form-group form-check mt-3">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" /> Remember me
                            </label>

                        </div>
                        <div className="mt-3">
                            No account yet? <a className='register' href="/sign-up">Create an account</a>
                        </div>
                        <button type="submit" className="login-btn mt-3">LOG IN</button>
                    </form>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
    )
}

export default Login