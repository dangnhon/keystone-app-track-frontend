import React, { Component } from "react";

export default class SignUpForm extends Component {

    state = {
        user: {
            email: "", 
            password: "", 
            name: ""
        },
        error: "" 
    }

    handleChangeEmail = (e) => {
        this.setState({
            user: {
                ...this.state.user, 
                email: e.target.value
            }
        })
    }

    handleChangePassword = (e) => {
        this.setState({
            user: {
                ...this.state.user, 
                password: e.target.value
            }
        })
    }

    handleChangeName = (e) => {
        this.setState({
            user: {
                ...this.state.user, 
                name: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault() 
        let newUser = this.state.user
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(newUser)
        })
        .then(resp => resp.json())
        .then(user => {
            if (user.error) {
                this.setState({
                    error: user.error 
                })
            } else {
                this.props.handleUserSession(user)
            }
        })
    }
    render() {
        return (
            <div className="form-container">

                <h3>Sign Up</h3>

                <form onSubmit={(e) => this.handleSubmit(e)} >

                    <div className="form-group">
                        <label>Email</label>
                        <input onChange={(e) => this.handleChangeEmail(e)} type="email" className="form-control" placeholder="Enter Email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input onChange={(e) => this.handleChangePassword(e)} type="password" className="form-control" placeholder="Enter Password" />
                    </div>

                    <div className="form-group">
                        <label>Name</label>
                        <input onChange={(e) => this.handleChangeName(e)} type="name" className="form-control" placeholder="Enter  Full Name" />
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Sign Up</button><br></br>
                    <button  onClick={this.props.toggleForm} className="btn btn-dark btn-lg btn-block">Already registered?</button>

                </form> 
                {this.state.error ? <h3>{this.state.error}</h3> : null}           
            </div> 
        );
    }
}