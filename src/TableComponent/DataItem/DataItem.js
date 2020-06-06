import React from "react"

class DataItem extends React.Component {
    render() {
        return (
            <div className='dataItem'>
                {this.props.line.photo && this.props.header === "name" ? <img src={this.props.line.photo} alt={this.props.line.name} /> : ""}{this.props.line[this.props.header]}
            </div>
        )
    }
}

export default DataItem