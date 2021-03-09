import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import React from 'react'

export default class AddNewEvent extends React.Component {
    
    state = { 
        name: "", 
        location: "", 
        date: "", 
        user_id: this.props.userData.id
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmitNewEvent = (e) => {
        e.preventDefault() 
        let createEvent = this.state
        let token = sessionStorage.getItem("token")
        fetch('http://localhost:3000/meetups', {
            method: "POST",
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(createEvent)
        })
        .then(reps => reps.json()) 
        .then(createdEvent => this.props.updateNewEvent(createdEvent))
        .then(this.props.closeModal)
    }

    render(){
      return(
        <Modal 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
            show={this.props.isEventOpen} 
            onHide={this.props.closeModal}>
                
            {/* <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Add a New Meetup</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                <Form.Group >

                    <Form.Label>Meetup Name: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="name"  placeholder="Enter Meetup name..."/>

                    <Form.Label>Location: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="location"  placeholder="Enter meetup location..."/> 

                    <Form.Label>Date Attended: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="date"  placeholder="MM/DD/YYYY"/> 

                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e) => this.handleSubmitNewEvent(e)} type="submit" >Submit</Button>
            </Modal.Footer>
        </Modal>
      )
    }
  }