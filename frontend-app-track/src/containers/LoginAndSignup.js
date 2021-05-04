import React from 'react'
import Login from '../components/Login.js'
import Signup from '../components/Signup.js'
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css"
import homeImage from '../img/homeImage.png'
import profileImage from '../img/profileImage.png'
import appointmentImage from '../img/appointmentImage.png'
import viewJobAndTask from '../img/viewJobAndTask.png'
import viewMeetupAndContact from '../img/viewMeetupAndContact.png'


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
            <div className="login-signup-container">
                <div className="title-page"> 
                    <h3>Welcome to AppTrack</h3>
                </div>

                <div> 
                    {this.state.toggle === false ? <Login toggleForm={this.toggleForm} handleUserSession={this.props.handleUserSession} /> : <Signup toggleForm={this.toggleForm} handleUserSession={this.props.handleUserSession} /> }
                </div>


                
                <AliceCarousel disableDotsControls={true} disableButtonsControls={true} infinite={true} autoPlay autoPlayInterval="3000">
                    <img src={homeImage} className="sliderimg" alt="Home Page Sample" />
                    <img src={profileImage} className="sliderimg" alt=" Profile Page Sample" />
                    <img src={appointmentImage} className="sliderimg" alt="Appointment Page Sample" />
                    <img src={viewJobAndTask} className="sliderimg" alt="Job and Task Page Sameple" />
                    <img src={viewMeetupAndContact} className="sliderimg" alt="Meetup and Contact Page Sample" />
                </AliceCarousel>
               
            </div>
        )
    }
}