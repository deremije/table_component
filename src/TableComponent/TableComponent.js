import React from 'react'
import { Suspense, lazy } from 'react';

import './TableComponent.scss'

const DataItem = lazy(() => import("./DataItem/DataItem"))

class TableComponent extends React.Component {
    render() {
        
        return (
            <div className='tableComponent'>
                {this.props.headers.map(header => 
                    <div className='column'>
                        <div className='header'>
                            {header}
                        </div>
                        {this.props.data.map(line => 
                            <Suspense fallback={<div className='tableRow'>Loading...</div>}>
                                <DataItem line={line} header={header} />
                            </Suspense>
                        )}
                    </div>
                )}
            </div>
        )

        // return (
        //     <div className='tableComponent'>
        //         <div className='headerRow'>
        //             {this.state.headers.map(header => <div className='headerItem' key={header}>{header}</div>)}
        //         </div>
        //         {this.state.data.map(line => 
        //             <Suspense fallback={<div className='tableRow'>Loading...</div>}>
        //                 <DataLine line={line} headers={this.state.headers} />
        //             </Suspense>
        //         )}
        //     </div>
        // )
    }
}

export default TableComponent