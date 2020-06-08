import React from "react"

const DataItem = ({line, header, includePhoto, clickFunction}) => {
    return (
        <div className='tC-dataItem' onClick={() => clickFunction && typeof clickFunction === "function" && clickFunction(line)}>
            {line.photo && header === includePhoto ? <img className="tC-image" src={line.photo} alt={line.name} /> : ""}
            {line[header]}
        </div>
    )
}

export default DataItem