import React from 'react'
import { Suspense, lazy } from 'react';
import { Resizable } from 're-resizable';


import './TableComponent.scss'

const DataItem = lazy(() => import("./DataItem/DataItem"))

class TableComponent extends React.Component {
    state = {
        ascending: true,
        sortBy: ""
    }

    componentDidMount() {
        if (this.props.headers) this.setState({sortBy: this.props.headers[0]})
    }

    columnSort(header) {
        if (this.state.sortBy === header) {
            this.setState({ascending: !this.state.ascending})
        } else {
            this.setState({sortBy: header, ascending: true})
        }
    }

    caretStyle(header) {
        let style = {
            opacity: '0',
            transform: 'rotate(45deg)'
        }
        
        if (header === this.state.sortBy) style.opacity = '1'
        if (!this.state.ascending) style.transform = 'rotate(-135deg)'

        return style
    }
    
    sortData() {
        let array = [...this.props.data]
        array.sort((a,b) => {
            if (a[this.state.sortBy] > b[this.state.sortBy]) return this.state.ascending ? 1 : -1
            if (a[this.state.sortBy] < b[this.state.sortBy]) return this.state.ascending ? -1 : 1
            return 0
        })
        return array
    }
    
    render() {
        const sortedData = this.sortData()

        return (
            <div className='tableComponent'>
                
                {this.props.headers.map(header => 
                    <Resizable 
                        key={header}
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
                            <div className='header' onClick={() => this.columnSort(header)}>
                                {header} <span className='caret' style={this.caretStyle(header)} />
                            </div>
                            {sortedData.map(line => 
                                <Suspense key={line.id} fallback={<div className='dataItem'>Loading {header}...</div>}>
                                    {header === "photo" ?
                                        <div className='imgWrapper'><img src={line.photo} alt={line.name} /></div> :
                                        <DataItem line={line} header={header} />}
                                </Suspense>
                            )}
                    </Resizable>
                )}
            </div>
        )
    }
}

export default TableComponent