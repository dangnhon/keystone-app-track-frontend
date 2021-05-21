import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
// import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'

const Logout = (props) => {
    return(
        <div className="logout-container">
            <h2>Logout?</h2>
            <Button onClick={() => props.logout()} className="btn btn-secondary btn-md">Logout</Button>
        </div>
        // <Modal 
        //     aria-labelledby="contained-modal-title-vcenter"
        //     centered
        //     text="white"
        //     size="lg"
        //     show={this.props.isOpen} 
        //     onHide={this.props.closeModal}>

        //     <Modal.Body bg="info">
        //         <Button variant="primary" onClick={() => props.logout()} className="btn btn-secondary btn-md">Logout</Button>
        //     </Modal.Body>
        // </Modal>
    )
}

export default Logout  