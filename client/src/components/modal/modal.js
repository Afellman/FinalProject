import React, {Component} from 'react';
import database from '../../utils/database';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

export default class MyModal extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    render() {
        // Attempting to add save button with properties from endpointItem.js file and have it display a modal. It does not recognize user. Don't know how to fix it.
        //I placed it in line 33, but it was giving an error even though it was commented out
        {/* <Button onClick={() => {
            let museumObj = this.props.museumObj;
            museumObj.user = this.props.user;
            database.postArticle(museumObj);
            this.toggle
            .then(res=>console.log(res))
        }}
        type="button" className="btn-primary">Save</Button> */}
        return (
            <div>
            
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        Article was successfully saved!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Close</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
