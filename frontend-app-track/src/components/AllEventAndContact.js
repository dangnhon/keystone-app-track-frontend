import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card} from 'react-bootstrap'
import AddNewEvent from '../components/AddNewEvent.js'
import EditMeetViewContact from '../components/EditMeetViewContact.js'


export default class AllEventAndContact extends React.Component {

    state = {
        isEventOpen: false,
        openEdit: false,
        selectedMeet: {}
    }  

    openModal = () => this.setState({ isEventOpen: true });
    closeModal = () => this.setState({ isEventOpen: false });

    openEditModal = (e, meet) => {
        this.setState({ openEdit: true })
        this.setState({selectedMeet: meet})
    }

    closeEditModal = () => this.setState({ openEdit: false })

    getAllMeet = () => {
        return this.props.userData.meetups.map(meet => 
             <div className="job-card">
             <Card className={meet.id} onClick={(e) => this.openEditModal(e, meet)} style={{ width: '100%' }}>
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
             <Card style={{ width: '100%' }}>
                 <Card.Body>
                     <Card.Title>Event Contact(s)</Card.Title>
                     <Card.Text>{contact.name}</Card.Text>
                         <Card.Text>
                             {contact.email}<br></br>
                             {contact.phone_number}
                     </Card.Text>
                 </Card.Body>
             </Card>
             </div> 
             )
     }
    
    render() {
        return(
            <div className="job-dynamic-container">
            <div className="job-container-child left">
            <button onClick={this.openModal} className="add-new">Add New Meetup</button>

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
                userData={this.props.userData} 
                allMeets={this.props.allMeets}
                selectedMeet={this.state.selectedMeet} 
                handleDeleteMeet={this.props.handleDeleteMeet} /> : null }

            </div>

            <div className="job-container-child right">
                <h3>All Contacts</h3>
                {this.getAllContact()}
            </div>

        </div>
        )
    }
}