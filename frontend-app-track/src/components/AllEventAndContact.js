import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card} from 'react-bootstrap'

export default class AllEventAndContact extends React.Component {

    getAllJob = () => {
        return this.props.userData.meetups.map(meet => 
             <div className="job-card">
             <Card style={{ width: '100%' }}>
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
 
     getAllTask = () => {
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
            <button className="add-new">Add New Meetup</button>
                {this.getAllJob()}
            </div>

            <div className="job-container-child right">
                <h3>All Contacts</h3>
                {this.getAllTask()}
            </div>

        </div>
        )
    }
}