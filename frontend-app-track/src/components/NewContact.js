import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import React from 'react'

export default class NewContact extends React.Component {

    state = {
        contact: {
            name: "",
            phone_number: "",
            email: "",
            meetup_id: this.props.selectedMeet.id
        }
    }

    handleChange = (e) => {
        this.setState({
            contact: {
                ...this.state.contact, 
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmitNewTask = (e) => {
        e.preventDefault() 
        let createContact = this.state.contact
        let token = sessionStorage.getItem("token")
        fetch('http://localhost:3000/meetup_contacts', {
            method: "POST",
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(createContact)
        })
        .then(reps => reps.json()) 
        .then(createdContact => this.props.updateNewContact(createdContact))
        .then(this.props.closeModal)
    }

    render() {
        return(
            <Modal 
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            size="md"
            className="new-task"
            show={this.props.isOpen} 
            onHide={this.props.closeModal}>

            <Modal.Body>
                <Form.Group >

                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="name"  placeholder="Enter name..."/>

                    <Form.Label>Phone Number: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="phone_number"  placeholder="Enter phone number..."/>

                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="email"  placeholder="Enter email..."/>

                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e) => this.handleSubmitNewTask(e)} type="submit" >Submit</Button>
            </Modal.Footer>
        </Modal>
        )
    }
}