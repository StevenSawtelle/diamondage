import React from "react";
import CloseOut from "./CloseOut.component";

export const makeColumns = (events, setEvents) => [
    {
        Header: 'Event Categorization',
        columns: [
            {
                Header: 'Domain',
                id: 'mainEvent',
                accessor: 'mainEvent',
            },
            {
                Header: 'Subdomain',
                accessor: 'subEvent',
            },
        ],
    },
    {
        Header: 'Event Info',
        columns: [
            {
                Header: 'Event ID',
                accessor: 'id',
            },
            {
                Header: 'Jobsite',
                accessor: 'jobsite',
            },
            {
                Header: 'Owners',
                accessor: 'owners',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Ongoing',
                id: 'active',
                accessor: 'active',
                Cell: ({value}) => {
                    return <p className={`${value ? 'true' : 'false'}`}>{value ? 'true' : 'false'}</p>
                },
                sortType: (a,b,id,desc) => {
                    if(a.values.active && !b.values.active){
                        return -1;
                    }
                    if(!a.values.active && b.values.active){
                        return 1;
                    }
                    return 0;
                },
            },
            {
                Header: "Toggle ongoing",
                accessor: event => event,
                Cell: ({value}) => <CloseOut value={value} setEvents={setEvents} events={events} />,
            }
        ],
    },
];