import React from 'react'

class DataLine extends React.Component {
    componentDidMount() {
        console.log(this.props.headers, this.props.line)
    }
    
    render() {
        const divs = this.props.headers.map(header => <div>{this.props.line[header]}</div>)
        return (
            <div className='tableRow'>
                {divs}
            </div>
        )
    }
}

export default DataLine