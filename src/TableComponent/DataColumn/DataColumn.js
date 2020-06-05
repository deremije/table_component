import React from 'react'
import { Suspense, lazy } from 'react';
import { Resizable } from 're-resizable';

const DataItem = lazy(() => import("../DataItem/DataItem"))

class DataLine extends React.Component {
    render() {
        return (
            <Resizable 
                enable={{ 
                    top:false, 
                    right:true, 
                    bottom:false, 
                    left:false, 
                    topRight:false, 
                    bottomRight:false, 
                    bottomLeft:false, 
                    topLeft:false 
                }} 
                className='column'>
                    <div className='header' onClick={() => this.props.columnSort(this.props.header)}>
                        {this.props.header} <span className='caret' style={this.props.caretStyle} />
                    </div>
                    {this.props.sortedData.map(line => 
                        <Suspense key={line.id} fallback={<div className='dataItem'>Loading {this.props.header}...</div>}>
                            {this.props.header === "photo" ?
                            <div className='imgWrapper'><img src={line.photo} alt={line.name} /></div> :
                            <DataItem line={line} header={this.props.header} />}
                        </Suspense>
                    )}
            </Resizable>
        )
    }
}

export default DataLine