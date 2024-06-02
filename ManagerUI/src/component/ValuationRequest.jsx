import axios, { toFormData } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

class ValuationRequest extends React.Component{
 
    state = {
        memberId: '1',
        description: '',
        estimateMin: '',
        estimateMax: '',
    }

    setParams = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }

    setMemberId = (value) => {
        this.setState({
            memberId: value
        })
    }

    Create = () => {

        console.log("Valuation Request Created")
        this.setMemberId('1')

        const formData = new FormData();
        formData.append("memberId", this.state.memberId);
        formData.append("description", this.state.description);
        formData.append("estimateMin", this.state.estimateMin);
        formData.append("estimateMax", this.state.estimateMax);
        console.log(formData)
        const res = axios.post("http://localhost:8080/valuation/create", formData);

        console.log(res.data)
        // .then(response => {
        //     console.log(response.headers)
        // })
        // .catch(error => {
        //     console.log(error)
        // })

        
        console.log("Valuation Request Created")
        alert("Valuation Request Created")
        this.props.history.push('/home')
        // this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <form onSubmit={this.Create}>
                    <div className=''>
                        <label>
                            Description:
                            <input type="text" name="description" onChange={e => this.setParams(e)} required />
                        </label>
                    </div>
                    
                    <div className=''>
                        <label>
                            Estimate Min:
                            <input type="number" name="estimateMin" onChange={e => this.setParams(e)} required />
                        </label>
                    </div>
                    
                    <div className=''>
                        <label>
                            Estimate Max:
                            <input type="number" name="estimateMax" onChange={e => this.setParams(e)} required />
                        </label>
                    </div>
                    <div className=''>
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        );
    }
};

export default ValuationRequest;