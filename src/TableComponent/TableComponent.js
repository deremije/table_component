import React from 'react'
import { Suspense, lazy } from 'react';
import { Resizable } from 're-resizable';

import './TableComponent.css'

const DataItem = lazy(() => import("./DataItem/DataItem"))

class TableComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ascending: true,
            sortBy: "",
            lines: 10,
            chunkSize: 10,
            pixelBuffer: 200,
        }
        this.element = React.createRef()
    }
    
    // override defaults via optional props, start lazy loading of data chunks
    componentDidMount() {
        if (this.props.chunksize) this.setState({chunkSize: this.props.chunkSize, lines: this.props.chunkSize})
        if (this.props.originalLines) this.setState({lines: this.props.originalLines})
        if (this.props.pixelBuffer) this.setState({pixelBuffer: this.props.pixelBuffer})
        if (this.props.sortBy) this.setState({sortBy: this.props.sortBy})
        else if (this.props.headers) this.setState({sortBy: this.props.headers[0]})
        process.nextTick(() => this.getDataChunk())
    }

    // updates sort parameters when column header is clicked
    columnSort(header) {
        if (this.state.sortBy === header) {
            this.setState({ascending: !this.state.ascending})
        } else {
            this.setState({sortBy: header, ascending: true})
        }
    }

    // adds style to carets depending on sort parameters
    caretStyle(header) {
        let style = {
            opacity: '0',
            transform: 'rotate(45deg)'
        }
        if (header === this.state.sortBy) style.opacity = '1'
        if (!this.state.ascending) style.transform = 'rotate(-135deg)'
        return style
    }
    
    // returns array based on sort parameters in state, data prop, and lazy lines
    sortData() {
        let array = [...this.props.data]
        array.sort((a,b) => {
            if (a[this.state.sortBy] > b[this.state.sortBy]) return this.state.ascending ? 1 : -1
            if (a[this.state.sortBy] < b[this.state.sortBy]) return this.state.ascending ? -1 : 1
            return 0
        })
        return array.slice(0, this.state.lines)
    }

    // check to see if user is nearing the bottom of the scroll window, and render more lines if so
    getDataChunk() {
        if (this.element.current.scrollHeight - (this.element.current.scrollTop + this.element.current.clientHeight) < this.state.pixelBuffer) {
            if (this.props.data.length > this.state.lines) {
                this.setState({ lines: this.state.lines + this.state.chunkSize })
                process.nextTick(() => this.getDataChunk())
            }
        }
    }
    
    render() {
        // check the renderable data on each render
        const sortedData = this.sortData()
        
        return (
            <div className='tableComponent' ref={this.element} onScroll={() => this.getDataChunk()}>
                <div className='tC-scrollable' >
                    {this.props.headers.map(header => 
                        <Resizable 
                            key={header}
                            defaultSize={{width:this.props.columnWidth}}
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
                            className='tC-column'>
                                <div className='tC-header' onClick={() => this.columnSort(header)}>
                                    {header} <span className='tC-caret' style={this.caretStyle(header)} />
                                </div>
                                {sortedData.map(line => 
                                    <Suspense key={line.id} fallback={<div className='tC-dataItem'>Loading {header}...</div>}>
                                        <DataItem line={line} header={header} includePhoto={this.props.includePhoto} />
                                    </Suspense>
                                )}
                        </Resizable>
                    )}
                </div>
            </div>
        )
    }
}

export default TableComponent