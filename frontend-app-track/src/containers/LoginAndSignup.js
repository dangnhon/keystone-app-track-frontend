import React from 'react'
import Login from '../components/Login.js'
import Signup from '../components/Signup.js'


export default class LoginAndSignup extends React.Component {

    state = {
        toggle: false
    }

    toggleForm = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle
            }
        })
    }

    render() {
        return (
            <div>
                <div> 
                <h1>Welcome to App Track</h1>
                <p>Please sign in or register below</p>
                </div>

                <div> 
                {this.state.toggle === false ? <Login toggleForm={this.toggleForm} handleUserSession={this.props.handleUserSession} /> : <Signup toggleForm={this.toggleForm} handleUserSession={this.props.handleUserSession} /> }
                </div>
            </div>
        )
    }
}