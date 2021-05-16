import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import {signin, authenticate, isAuthenticated} from '../auth'

const Signin = () => {
    const [values, setValues] = useState({
        
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToRefferer: false
    })

    const {email, password, loading, error, redirectToRefferer} = values
    const {user} = isAuthenticated() 

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    
    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            }
            else{
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToRefferer: true
                    })
                })
            }
        })

    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" value={email} className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control"/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const redirectUser = () => {
        if (redirectToRefferer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    
    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );


    return(
        <Layout title="Signin"
    description="sign in to ecommerce"
    className="container col-md-8 offset-md-2">
        {showLoading()}
        {showError()}
        {signUpForm()}
        {redirectUser()}
    </Layout>
    )
}

export default Signin;