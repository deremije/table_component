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
            lines: 40,
            chunkSize: 10,
            pixelBuffer: 200,
        }
        // set ref to measure scroll height
        this.element = React.createRef()
    }
    
    // override defaults via optional props, start lazy loading of data chunks
    componentDidMount() {
        this.OverrideDefaultState()
        this.logErrors()
        setTimeout(() => { this.getDataChunk() }, 0);
    }

    OverrideDefaultState() {
        if (this.props.chunkSize && typeof this.props.chunkSize === "number") this.setState({chunkSize: this.props.chunkSize, lines: this.props.chunkSize})
        if (this.props.originalLines && typeof this.props.originalLines === "number") this.setState({lines: this.props.originalLines})
        if (this.props.pixelBuffer && typeof this.props.pixelBuffer === "number") this.setState({pixelBuffer: this.props.pixelBuffer})
        if (this.props.sortBy && typeof this.props.sortBy === "string") this.setState({sortBy: this.props.sortBy})
            else this.setState({sortBy: this.props.headers[0]})
    }

    logErrors() {
        const params = [
            { name: 'clickFunction', type: 'function' },
            { name: 'columnWidth', type: 'number' },
            { name: 'includePhoto', type: 'string' },
            { name: 'chunkSize', type: 'number' },
            { name: 'originalLines', type: 'number' },
            { name: 'pixelBuffer', type: 'number' },
            { name: 'sortBy', type: 'string' }
        ]
        params.forEach(p => {
            if (this.props[p.name] && typeof this.props[p.name] !== p.type) console.error(`TableComponent: Type error for ${p.name}`)
        })
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

    scrolledToBottom() {
        return this.element.current.scrollHeight - (this.element.current.scrollTop + this.element.current.clientHeight) < this.state.pixelBuffer
    }
    // check to see if user is nearing the bottom of the scroll window, and render more lines if so
    getDataChunk() {
        if (this.dataIsLoaded() && this.scrolledToBottom()) {
            if (this.props.data.length > this.state.lines) {
                this.setState({ lines: this.state.lines + this.state.chunkSize })
                setTimeout(() => { this.getDataChunk() }, 0);
            }
        }
    }

    // determine null states
    headersAreLoaded() {return Array.isArray(this.props.headers) && this.props.headers.length > 0}
    dataIsLoaded() {return Array.isArray(this.props.data) && this.props.data.length > 0}
    
    render() {
        // check the renderable data on each render
        const sortedData = this.dataIsLoaded() ? this.sortData() : []
        
        return (
            <div className='tableComponent' ref={this.element} onScroll={() => this.getDataChunk()}>
                { /* check null states before rendering columns */
                    !this.headersAreLoaded() ? <div className='tC-nullState'><div>Waiting for Headers...</div></div> :
                    !this.dataIsLoaded() ? <div className='tC-nullState'><div>Waiting for Data...</div></div> :
                            
                    /* if headers and data arrays have both been loaded, continue */
                    <div className='tC-scrollable' >
                        {this.props.headers.map(header => 
                            <Resizable 
                                key={header}
                                defaultSize={ 
                                    this.props.columnWidth && 
                                    typeof this.props.columnWidth === "number" && 
                                    {width: this.props.columnWidth}
                                }
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
                                            <DataItem 
                                                line={line} 
                                                header={header} 
                                                includePhoto={this.props.includePhoto && typeof this.props.includePhoto === "string" && this.props.includePhoto} 
                                                clickFunction={this.props.clickFunction}/>
                                        </Suspense>
                                    )}
                            </Resizable>
                        )}
                    </div> 
                }
            </div>
        )
    }
}

export default TableComponent