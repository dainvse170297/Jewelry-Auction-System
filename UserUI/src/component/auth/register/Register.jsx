const Register = () => {
    return (
        <div className='container'>
            <div className="row mt-5">
                <h4 className='text-center mb-5'>REGISTER</h4>

                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <form action="" method="POST">
                        <div className="form-group">
                            <input type="text" className="" id="username" placeholder="Username" required />
                        </div>
                        <div className="form-group mt-3">
                            <input type="password" className="" id="pwd" placeholder="Password" required />
                        </div>
                        <div className="form-group mt-3">
                            <input type="text" className="" id="cfmpwd" placeholder="Confirm Password" required />
                        </div>

                        <div className="form-group mt-3">
                            <input type="text" className="" id="fullName" placeholder="Full Name" required />
                        </div>
                        <div className="form-group mt-3">
                            <input type="text" className="" id="phone" placeholder="Phone Number" required />
                        </div>
                        <div className="form-group mt-3">
                            <input type="email" className="" id="email" placeholder="Email" required />
                        </div>
                        <div className="form-group mt-3">
                            <input type="text" className="" id="address" placeholder="Address" required />
                        </div>
                        <div className="mt-3">
                            Already have an account? <a className='register' href="/login">Log in</a>
                        </div>
                        <button type="submit" className="login-btn mt-3">SIGN UP</button>
                    </form>
                </div>
                <div className="col-lg-3"></div>


            </div>
        </div>

    );
}

export default Register;