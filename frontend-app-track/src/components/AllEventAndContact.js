import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card} from 'react-bootstrap'
import Button from 'react-bootstrap/button'
import Form from 'react-bootstrap/Form'
import AddNewEvent from '../components/AddNewEvent.js'
import EditMeetViewContact from '../components/EditMeetViewContact.js'


export default class AllEventAndContact extends React.Component {

    state = {
        isEventOpen: false,
        openEdit: false,
        selectedMeet: {},
        searchTerm: "",
        beginSearch: false
    }  

    openModal = () => this.setState({ isEventOpen: true });
    closeModal = () => this.setState({ isEventOpen: false });

    openEditModal = (e, meet) => {
        this.setState({ openEdit: true })
        this.setState({selectedMeet: meet})
    }

    closeEditModal = () => this.setState({ openEdit: false })

    editSearchTerm = (e) => {
        this.setState({
            searchTerm: e.target.value,
            beginSearch: true
        })
    }

    SearchContact = () => {
        if (this.state.searchTerm !== "") {
            let searchedName = this.props.userData.meetup_contacts.filter(contact => contact.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
            return searchedName.map(contact => 
                <div className="job-card">
                <Card className="contact-cards" text="black" style={{ width: '100%' }}>
                    <Card.Body>
                           <Card.Title>{contact.name}</Card.Title>
                           <Card.Text>{contact.email}</Card.Text>
                           <Card.Text>{contact.phone_number}</Card.Text>
                    </Card.Body>
                </Card>
                </div> 
            ) 
        } else if (this.state.searchTerm === "") {
            this.setState({
                beginSearch: false 
            })
        }
    }

    getAllMeet = () => {
        return this.props.userData.meetups.map(meet => 
             <div className="job-card">
             <Card text="black" className="meet-cards" onClick={(e) => this.openEditModal(e, meet)} style={{ width: '100%' }}>
                 <Card.Body>
                     <Card.Title>Meetup: {meet.name}</Card.Title>
                         <Card.Text>
                            Location: {meet.location}<br></br>
                            Date: {meet.date}
                     </Card.Text>
                 </Card.Body>
             </Card>
             </div> 
             )
     }
 
     getAllContact = () => {
         return this.props.userData.meetup_contacts.map(contact => 
             <div className="job-card">
             <Card className="contact-cards" text="black" style={{ width: '100%' }}>
                 <Card.Body>
                        <Card.Title>{contact.name}</Card.Title>
                        <Card.Text>{contact.email}</Card.Text>
                        <Card.Text>{contact.phone_number}</Card.Text>
                 </Card.Body>
             </Card>
             </div> 
             )
     }
    
    render() {
        return(
            <div className="job-dynamic-container">
            <div className="job-container-child left">
            <Button onClick={this.openModal} className="add-new">Add New Meetup</Button>

            { this.state.isEventOpen ? <AddNewEvent 
                closeModal={this.closeModal} 
                isEventOpen={this.state.isEventOpen} 
                updateNewEvent={this.props.updateNewEvent} 
                userData={this.props.userData} /> : null }   

            {this.getAllMeet()}

            { this.state.openEdit ? <EditMeetViewContact 
                closeEditModal={this.closeEditModal} 
                openEdit={this.state.openEdit} 
                updateOldMeet={this.props.updateOldMeet} 
                updateOldContact={this.props.updateOldContact}
                updateNewContact={this.props.updateNewContact}
                handleDeleteSpecificContact={this.props.handleDeleteSpecificContact}
                userData={this.props.userData} 
                allMeets={this.props.allMeets}
                selectedMeet={this.state.selectedMeet} 
                handleDeleteMeet={this.props.handleDeleteMeet} /> : null }

            </div>

            <div className="job-container-child right">

                <Form.Group className="sort" >
                    <Form.Label>Search Contact: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.editSearchTerm(e)}  value={this.state.searchTerm} placeholder="Search by name..." />
                </Form.Group>

                {/* <div className="all-contact">All Contacts</div> */}
                {this.state.beginSearch ? this.SearchContact() : this.getAllContact()}
            </div>

        </div>
        )
    }
}