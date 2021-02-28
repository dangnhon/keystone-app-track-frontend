import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import React from 'react'

export default class EditMeetViewContact extends React.Component {

    state = { 
        name: this.props.selectedMeet.name,
        location: this.props.selectedMeet.location,
        date: this.props.selectedMeet.date,
        user_id: this.props.userData.id 
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmitEditMeet = (e) => {
        e.preventDefault() 
        let editedMeet = this.state
        let token = sessionStorage.getItem("token")
        fetch(`http://localhost:3000/meetups/${this.props.selectedMeet.id}`, {
            method: "PATCH",
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(editedMeet)
        })
        .then(reps => reps.json()) 
        .then(updatedMeet => this.props.updateOldMeet(updatedMeet))
        .then(this.props.closeEditModal)
    }

    render() {
        return(
            <Modal 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.props.openEdit} 
            onHide={this.props.closeEditModal}
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Edit Meetup</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group >

                    <Form.Label>meetups Name: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="name"  defaultValue={this.props.selectedMeet.name}/>

                    <Form.Label>Meetup Location: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="location"  defaultValue={this.props.selectedMeet.location}/> 

                    <Form.Label>Meetup Date: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="date"  defaultValue={this.props.selectedMeet.date}/> 

                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e) => this.handleSubmitEditMeet(e)} type="submit" >Submit</Button>
            </Modal.Footer>
        </Modal>
        )
    }
}