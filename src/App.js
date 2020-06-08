import React from 'react';
import './App.css';

import TableComponent from "./TableComponent/TableComponent"

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      headers: ['name', 'email', 'cell', 'gender', 'nationality'],
      data: null
    }
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/?results=500")
      .then(response => response.json())
      .then(response => response.results.map(entry => {
        return {
          photo: entry.picture.thumbnail,
          name: `${entry.name.last}, ${entry.name.first}`,
          email: entry.email,
          cell: entry.cell,
          gender: entry.gender,
          nationality: entry.nat,
          id: entry.login.uuid
        }
      }))
      .then(results => this.setState({ data: results }))
      .catch(error => console.log(error))
  }

//   DEMO: Comment in and out params to try out different parameters.  
//   See README for notes on full functionality.
  render() {
    return (
      <div className="App" ref={this.element}>
          <TableComponent  
            clickFunction={obj => console.log(obj)}
            // pixelBuffer={10}
            // chunkSize={1}
            // originalLines={500}
            // columnWidth={200}
            // sortBy="email"
            includePhoto="name"
            headers={this.state.headers}
            data={this.state.data}  /> 
      </div>
    )
  }
}

export default App;
