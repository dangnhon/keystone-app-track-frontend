import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Login extends React.Component {

    state = {
            email: "",
            password: "",
            error: "" 
    }

    handleChangeEmail = (e) => {
        this.setState({
           email: e.target.value
        })
    }

    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault() 
        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',           
            }, 
            body: JSON.stringify({
                email: this.state.email, 
                password: this.state.password
            })
        })
        .then(resp => resp.json())
        .then(user => {
            if (user.message) {
                this.setState({
                    error: user.message 
                })
            } else {
                this.props.handleUserSession(user)
            }
        })
    }

    render() {
        return (
            <div className="form-container"> 

            <h3>Sign In</h3>
            <form onSubmit={(e) => this.handleLogin(e)}>

                <div className="form-group">
                    <label>Email</label>
                    <input onChange={(e) => this.handleChangeEmail(e)} type="email" className="form-control" placeholder="Enter Email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={(e) => this.handleChangePassword(e)} type="password" className="form-control" placeholder="Enter Password" />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Log In</button><br></br>
                <button  onClick={this.props.toggleForm} className="btn btn-dark btn-lg btn-block">Create an Account?</button>

            </form>
            {this.state.error ? <h3>{this.state.error}</h3> : null}
            </div>
        );
    }

}