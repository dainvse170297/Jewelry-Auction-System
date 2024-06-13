import { useState } from "react";
import './register.scss';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

    const [member, setMember] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: '',
        email: '',
        address: ''
    })

    const [errorMsg, setErrorMsg] = useState(null)

    const [phoneNumberError, setPhoneNumberError] = useState('')

    const navigate = useNavigate()

    function checkPassword() {
        let password = document.getElementById("pwd").value;
        let confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            document.getElementById("msg").innerHTML = "Incorrect confirm password!";
            return false;
        } else {
            document.getElementById("msg").innerHTML = "";
            return true;
        }
    }

    const handleInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if (name === 'phone') {
            if (/^\d*$/.test(value)) { // Check if the input is a number
                setPhoneNumberError('');
            } else {
                setPhoneNumberError('Please enter a valid phone number');
            }
        }
        setMember({ ...member, [name]: value });

    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (checkPassword() === false
            || member.username.trim() === ''
            || member.password.trim() === ''
            || member.confirmPassword.trim() === ''
            || member.fullName.trim() === ''
            || member.phone.trim() === ''
            || member.email.trim() === ''
            || member.address.trim() === ''
            || phoneNumberError !== '') {
            toast.warning('Please fill in all fields');
        } else {
            const formData = new FormData();
            formData.append('username', member.username);
            formData.append('password', member.password);
            formData.append('fullName', member.fullName);
            formData.append('phone', member.phone);
            formData.append('email', member.email);
            formData.append('address', member.address);
            try {
                const response = await axios.post('http://localhost:8080/account/member/register', formData)
                toast('Account created successfully')
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
                // console.log(member);
            } catch (error) {
                if (error.response) {
                    setErrorMsg(error.response.data.message)
                } else if (error.request) {
                    setErrorMsg('')
                } else {
                    setErrorMsg('Something went wrong')
                }
            }
        }
    }

    return (
        <div className='container'>
            <div className="row mt-5">
                <h4 className='text-center mb-5'>REGISTER</h4>

                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <form action="" method="" onSubmit={handleFormSubmit}>

                        <div className="form-group">
                            <input type="text" className="" id="username" placeholder="Username" name="username" required
                                onChange={handleInputChange}
                                value={member.username}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <input type="password" className="" id="pwd" placeholder="Password" name="password" required autoComplete="off"
                                onChange={handleInputChange}
                                value={member.password}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <input type="password" className="" id="confirmPassword" placeholder="Confirm Password" name="confirmPassword" required autoComplete="off"
                                onKeyUp={checkPassword}
                                onChange={handleInputChange}
                                value={member.confirmPassword}
                            />
                            <p><span id="msg" className="msg"></span></p>
                        </div>

                        <div className="form-group mt-3">
                            <input type="text" className="" id="fullName" placeholder="Full Name" name="fullName" required
                                onChange={handleInputChange}
                                value={member.fullName}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <input type="text" className="" id="phone" placeholder="Phone Number" name="phone" required
                                onChange={handleInputChange}
                                value={member.phone}
                            />
                            {phoneNumberError && <p className="msg">{phoneNumberError}</p>}
                        </div>

                        <div className="form-group mt-3">
                            <input type="email" className="" id="email" placeholder="Email" name="email" required
                                onChange={handleInputChange}
                                value={member.email}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <input type="text" className="" id="address" placeholder="Address" name="address" required
                                onChange={handleInputChange}
                                value={member.address}
                            />
                        </div>

                        <div className="mt-3">
                            Already have an account? <a className='register' href="/login">Log in</a>
                        </div>

                        {errorMsg && <p className="msg">{errorMsg}</p>}

                        <button type="submit" className="login-btn mt-3">SIGN UP</button>
                        <ToastContainer />
                    </form>
                </div>
                <div className="col-lg-3"></div>


            </div>
        </div>

    );
}

export default Register;