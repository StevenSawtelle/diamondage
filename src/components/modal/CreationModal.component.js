import './CreationModal.styles.scss'
import Modal from "react-modal";
import EventCreation from "../table/EventCreation.component";
import React from "react";

import './CreationModal.styles.scss'

Modal.setAppElement('#root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const CreationModal = ({ setEvents, events }) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className={'creation-modal'}>
            <button onClick={openModal}>Create new event</button>
            <br/>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>X</button><br/><br/>
                <EventCreation events={events} setEvents={setEvents} />
            </Modal>
        </div>
    );
}

export default CreationModal;
