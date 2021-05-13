import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import {Card} from 'react-bootstrap'
import NewContact from '../components/NewContact.js'
import EditContact from '../components/EditContact.js'
import React from 'react'

export default class EditMeetViewContact extends React.Component {

    state = { 
        meetupData: {
            name: this.props.selectedMeet.name,
            location: this.props.selectedMeet.location,
            date: this.props.selectedMeet.date,
            user_id: this.props.userData.id 
        },
        isOpen: false,
        openEdit: false,
        selectedContact: {} 
    }

    openModal = () => this.setState({ isOpen: true })

    closeModal = () => this.setState({ isOpen: false })

    openEditModal = (e, contact) => {
        this.setState({ openEdit: true })
        this.setState({selectedContact: contact}) 
    }

    closeEditModal = () => this.setState({ openEdit: false })

    handleChange = (e) => {
        this.setState({
            meetupData: {
                ...this.state.meetupData, 
                [e.target.name]: e.target.value
            }
        })
    }

    getAllMeetContacts = () => {
        let matchMeets = this.props.allMeets.find(meet => meet.id === this.props.selectedMeet.id)
        if (matchMeets.meetup_contacts.length !== 0) {
            
            return matchMeets.meetup_contacts.map(contact =>  
                <div className="job-card">
                    <Card className="contact-cards" text="black" style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Title>{contact.name}</Card.Title>
                                <Card.Text>
                                    {contact.email}<br></br>
                                    {contact.phone_number}
                                </Card.Text>
                                <Modal.Footer>
                                    <Button onClick={(e) => this.openEditModal(e, contact)} variant="primary">Edit</Button>
                                    <Button onClick={(e) => this.handleDeleteContact(e, contact)} variant="primary">Delete</Button>
                                </Modal.Footer>
                        </Card.Body>
                    </Card>
                </div> 
            )
        } else {
            return <p>Please create some contacts</p>
        }
    }

    handleSubmitEditMeet = (e) => {
        e.preventDefault() 
        let editedMeet = this.state.meetupData
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

    handleDeleteMeet = () => {
        let meet = this.props.selectedMeet
        this.props.handleDeleteMeet(meet)
        this.props.closeEditModal()
    }

    handleDeleteContact = (e, contact) => {
        let selectedMeet = this.props.selectedMeet
        this.props.handleDeleteSpecificContact(contact, selectedMeet)
    }

    render() {
        return(
            <Modal 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
            show={this.props.openEdit} 
            onHide={this.props.closeEditModal}>

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
            <Modal.Footer >
                <Button variant="primary" onClick={(e) => this.handleSubmitEditMeet(e)} type="submit" >Submit Edit</Button>
                <Button variant="primary" onClick={() => this.handleDeleteMeet()} >Delete Meetup</Button>
                <Button variant="primary" onClick={this.openModal} >New Contact</Button>
            </Modal.Footer>
                <div className="contact-container-child right" >

                { this.state.isOpen ? <NewContact
                    updateNewContact={this.props.updateNewContact} 
                    closeModal={this.closeModal} 
                    isOpen={this.state.isOpen} 
                    selectedMeet={this.props.selectedMeet} /> : null }

                { this.state.openEdit ? <EditContact
                    closeEditModal={this.closeEditModal} 
                    openEdit={this.state.openEdit}
                    updateOldContact={this.props.updateOldContact}
                    selectedMeet={this.props.selectedMeet}
                    selectedContact={this.state.selectedContact} /> : null }

                </div>
                
                <div className="contact-card-container">
                {this.getAllMeetContacts()}
                </div>
        </Modal>
        )
    }
}