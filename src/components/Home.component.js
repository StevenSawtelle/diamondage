import EventsTable from "./table/EventsTable.component";

import './Home.styles.scss'
import React from "react";
import { makeDataHelper } from "./table/makeData.helper";
import CreationModal from "./modal/CreationModal.component";

const Home = () => {
    const [events, setEvents] = React.useState(makeDataHelper(4));

    return (<div className={'home'}>
        <h1 className="header">Diamond Age - Event Tracker</h1>
        <EventsTable key={Math.random()} events={events} setEvents={setEvents} />
        <br/>
        <CreationModal key={Math.random()} events={events} setEvents={setEvents} />
    </div>);
}

export default Home;