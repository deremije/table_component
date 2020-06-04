import React from 'react'
import { Suspense, lazy } from 'react';

import './TableComponent.scss'

const DataLine = lazy(() => import("./DataLine/DataLine"))

class TableComponent extends React.Component {
    state = {
        headers: ['email', 'name', 'gender'],
        data: [
            {
                email: 'jeremydamon@gmail.com',
                name: 'Jeremy Damon',
                gender: 'male'
            },
            {
                email: 'jeremyrandall1980@gmail.com',
                name: 'Jeremy Randall',
                gender: 'male'
            },
            {
                email: 'shannou1@gmail.com',
                name: 'Shannon Randall',
                gender: 'female'
            },
            {
                email: 'zoetsarandall@gmail.com',
                name: 'Zoetsa Randall',
                gender: 'female'
            },
            
        ]
    }

    render() {
        
        return (
            <div className='tableComponent'>
                <div className='headerRow'>
                    {this.state.headers.map(header => <div className='headerItem' key={header}>{header}</div>)}
                </div>
                {this.state.data.map(line => 
                    <Suspense fallback={<div className='tableRow'>Loading...</div>}>
                        <DataLine line={line} headers={this.state.headers} />
                    </Suspense>
                )}
            </div>
        )
    }
}

export default TableComponent