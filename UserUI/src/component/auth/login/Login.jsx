import React from 'react'
import './login.scss'

const Login = () => {
    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-lg-6">
                    <h4 className='text-center mb-5'>Sign In</h4>
                    <form action="POST">
                        <div className="form-group">
                            <label for="email">Username</label>
                            <input type="email" className="form-control" id="email" />
                        </div>
                        <div className="form-group mt-3">
                            <label for="pwd">Password</label>
                            <input type="password" className="form-control" id="pwd" />
                        </div>
                        <div className="form-group form-check mt-3">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" /> Remember me
                            </label>

                        </div>
                        <div className="mt-3">
                            No account yet? <a className='register' href="/#">Create an account</a>
                        </div>
                        <button type="submit" className="login-btn mt-3">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login