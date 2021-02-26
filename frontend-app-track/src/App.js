import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import SuperContainer from './containers/SuperContainer.js'
import LoginAndSignup from './containers/LoginAndSignup.js'

export default class App extends React.Component{

  state = {
    userData: {
      email: null,
      name: null,
      jobs: [], 
      meetup_contacts: [], 
      meetups: [], 
      tasks: []
    },
    logout: false
}

// this is to grab the same user each time the page refreshes so they don't have to re login
componentDidMount() {
  let token = sessionStorage.getItem('token')
  if (token) {
    fetch('http://localhost:3000/profile', {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
      }, 
    })
    .then(resp => resp.json())
    .then(user => {
      this.setState({
      userData: user.user
    })}
    )
  }
}

deleteUser = () => {
  let token = sessionStorage.getItem('token')
  fetch(`http://localhost:3000/users/${this.state.userData.id}`, {
          method: "DELETE",
          headers: {
              Authorization: `bearer ${token}`,           
          },
      })
      .then(resp => resp.json())
      .then(alertMessage => alert('Your account has been successfully deleted'));

      sessionStorage.clear() 
      this.setState({
        logout: true
      })
}

logout = () => {
  alert("Come back soon!")
  sessionStorage.clear() 
  this.setState({
    logout: true 
  })
}

// if you're using sessionStorage as a conditional in the render, have to set it before setting state to get it to be truthy and re render after state updates.
handleUserSession = (user) => {
  sessionStorage.setItem('token', user.jwt)
  this.setState({
    userData: user.user,
  })
}

  render() {
    return (
    <div className="App">
     {sessionStorage.getItem('token') !== null ? <SuperContainer logout={this.logout} deleteUser={this.deleteUser} userData={this.state.userData} /> : <LoginAndSignup handleUserSession={this.handleUserSession} /> }    
    </div>
    )}
  }

  // ADD A GIF DEMO VIDEO TO PLAY ON THE LOGIN AND SIGN UP PAGE SO USERS CAN SEE WHAT THE APP IS LIKE


