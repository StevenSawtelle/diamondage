import './CloseOut.styles.scss'

const CloseOut = ({value, setEvents, events }) => {
    return (<p className={'closeout'} onClick={() =>{
        console.log(events)
        const newEvents = JSON.parse(JSON.stringify(events)).map((datum) => {
            if(datum.id === value.id) {
                datum.active = !datum.active;
            }
            return datum;
        });
        setEvents(newEvents)
    }}>Toggle</p>);
}

export default CloseOut;
