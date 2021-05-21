import React from 'react' 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import DateTimePicker from 'react-datetime-picker'
import { useState } from "react"
// import { propTypes } from 'react-bootstrap/esm/Image'


function Appointment() {

    var gapi = window.gapi
    var CLIENT_ID = "839408646035-bvg4hdjpe2rvbq0vnvdp06jjdrl57t8q.apps.googleusercontent.com"
    var API_KEY = "AIzaSyC365rxxxzoP9E-HQE_vnQA-a7APpJWs4w"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"

    const [appointment, setAppointment] = useState({
        "summary": '',
        "location": '',
        "description": '',
        "start": {
            'dateTime': '',
        },
        "end": {
            "dateTime": ''
        }
      });    

    const [value, changeStart] = useState(new Date());

    const [valueE, changeEnd] = useState(new Date());

    const handleChange = (e) => {
        setAppointment({
            ...appointment, 
            [e.target.name]: e.target.value
        })
   }

    const handleSubmit = () => {
        gapi.load('client:auth2', () => {
            console.log('loaded client')
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            })
            gapi.client.load('calendar', 'v3', () => console.log('bam!'))
            gapi.auth2.getAuthInstance().signIn() 
            .then(() => {
                var event = {
                    'summary': appointment.summary,
                    'location': appointment.location,
                    'description': appointment.description,

                    'start': {
                      'dateTime': value,
                      'timeZone': 'America/Los_Angeles'
                    },
                    'end': {
                      'dateTime': valueE,
                      'timeZone': 'America/Los_Angeles'
                    }

                  };
                  var request = gapi.client.calendar.events.insert({
                      'calendarId': 'primary',
                      'resource': event,
                  })
                  request.execute(event => {
                       window.open(event.htmlLink)
                  })
            })
        })
    }
       
    return(
        <div className="appoint"> 
            <Form.Group >

                <Form.Label>Summary: </Form.Label>
                <Form.Control type="text" onChange={(e) => handleChange(e)} name="summary"  placeholder="Enter summary..."/>

                <Form.Label>Location: </Form.Label>
                <Form.Control type="text" onChange={(e) => handleChange(e)} name="location"  placeholder="Enter location..."/> 

                <Form.Label>Description: </Form.Label>
                <Form.Control type="text" onChange={(e) => handleChange(e)} name="description"  placeholder="Enter description..."/> 
                <div className='time'>
                    <h5>Start Time and Date: </h5>
                    <DateTimePicker onChange={changeStart} name="start" value={value} />
                </div>
                
                <div className='time'>
                    <h5>End Time and Date</h5>
                    <DateTimePicker onChange={changeEnd} name="end" value={valueE} />
                </div>            
                               
            </Form.Group>
                <Button onClick={handleSubmit} className="btn btn-md btn-block" type="submit" >Submit</Button>
        </div>   
    )
}

export default Appointment