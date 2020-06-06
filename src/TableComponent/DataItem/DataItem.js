import React from "react"

const DataItem = ({line, header, includePhoto}) => {
    return (
        <div className='tC-dataItem'>
            {line.photo && header === includePhoto ? <img className="tC-image" src={line.photo} alt={line.name} /> : ""}
            {line[header]}
        </div>
    )
}

export default DataItem