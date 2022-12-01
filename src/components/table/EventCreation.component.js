import React, {useState} from 'react';

import './EventCreation.styles.scss'

const EventCreation = ({ setEvents, events }) => {
    const [main, setMain] = useState('');
    const [sub, setSub] = useState('');
    const [jobsite, setJobsite] = useState('');
    const [owners, setOwners] = useState('');
    const [description, setDescription] = useState('');

    const handleClick = (newEvents) => {
        setEvents(newEvents);
    }

    return (
        <div className={'event-creation'}>
            <p>Domain:</p><input onChange={(e) => setMain(e.target.value)} />
            <p> Subdomain: </p><input onChange={(e) => setSub(e.target.value)} />
            <p> Jobsite: </p><input onChange={(e) => setJobsite(e.target.value)} />
            <p> Owners: </p><input onChange={(e) => setOwners(e.target.value)} />
            <p> Description: </p><input onChange={(e) => setDescription(e.target.value)} />
            <div />
            <button onClick={() => {
                if(main && sub && jobsite && owners && description){
                    const newEvents = JSON.parse(JSON.stringify(events));
                    const newEvent = {
                        id: events.length,
                        jobsite,
                        mainEvent: main,
                        subEvent: sub,
                        owners,
                        description,
                        active: true,
                    };
                    newEvents.push(newEvent);
                    handleClick(newEvents);
                }
            }}
            >Create</button>
        </div>
    )
}

export default EventCreation;
