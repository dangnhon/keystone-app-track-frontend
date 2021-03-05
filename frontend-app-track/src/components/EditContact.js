import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import React from 'react'

export default class EditContact extends React.Component {

    state = {
        contact: {
            name: this.props.selectedContact.name,
            phone_number: this.props.selectedContact.phone_number,
            email: this.props.selectedContact.email,
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

    handleSubmitNewEditContact = (e) => {
        e.preventDefault() 
        let editedContact = this.state.contact
        let token = sessionStorage.getItem("token")
        fetch(`http://localhost:3000/meetup_contacts/${this.props.selectedMeet.id}`, {
            method: "PATCH",
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(editedContact)
        })
        .then(reps => reps.json()) 
        .then(updatedContact => this.props.updateOldContact(updatedContact))
        .then(this.props.closeEditModal)
    }

    render() {
        return (
            <Modal 
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            size="md"
            className="new-task"
            show={this.props.openEdit} 
            onHide={this.props.closeEditModal}>


            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group >

                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="name"  defaultValue={this.props.selectedContact.name} />

                    <Form.Label>Phone Number: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="phone_number"  defaultValue={this.props.selectedContact.phone_number} />

                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="email"  defaultValue={this.props.selectedContact.email} />

                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e) => this.handleSubmitNewEditContact(e)} type="submit" >Submit</Button>
            </Modal.Footer>
        </Modal>
        )
    }
}