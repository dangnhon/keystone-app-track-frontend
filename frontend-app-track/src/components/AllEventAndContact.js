import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/button'
import Form from 'react-bootstrap/Form'
import AddNewEvent from '../components/AddNewEvent.js'
import EditMeetViewContact from '../components/EditMeetViewContact.js'
import ContactCard from '../components/ContactCard.js'
import EventCard from '../components/EventCard.js'

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
            return searchedName.map(contact => <ContactCard contact={contact} key={contact.id} />) 
        } else if (this.state.searchTerm === "") {
            this.setState({
                beginSearch: false 
            })
        }
    }

    getAllMeet = () => {
        return this.props.userData.meetups.map(meet => <EventCard meet={meet} key={meet.id} openEditModal={this.openEditModal} />)
    }
 
    getAllContact = () => {
        return this.props.userData.meetup_contacts.map(contact => <ContactCard contact={contact} key={contact.id} />)
    }
    
    render() {
        return(
            <div className="job-dynamic-container">
            <div className="job-container-child left">
            <Button onClick={this.openModal} className="add-new">New Meetup</Button>

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
                {this.state.beginSearch ? this.SearchContact() : this.getAllContact()}
            </div>
        </div>
        )
    }
}