import React from "react"

class DataItem extends React.Component {
    render() {
        return (
            <div className='dataItem'>
                {this.props.line[this.props.header]}
            </div>
        )
    }
}

export default DataItem