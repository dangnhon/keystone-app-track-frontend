import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'

const DeleteCheck = (props) => {
    return (
        <div>
            <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            size="sm"
            className="new-task"
            show={props.openDelete} 
            onHide={props.closeDelete}
            >
                <Modal.Body>
                    Are you sure you want to delete this?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => props.handleDeleteApp()} type="submit" >Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DeleteCheck