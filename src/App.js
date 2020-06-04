import React from 'react';
import './App.scss';

import TableComponent from "./TableComponent/TableComponent"

class App extends React.Component {
  state = {
    headers: ['email', 'name', 'gender'],
    data: [
        {
            email: 'jeremydamon@gmail.com',
            name: 'Jeremy Damon',
            gender: 'male'
        },
        {
            email: 'jeremyrandall1980@gmail.com',
            name: 'Jeremy Randall',
            gender: 'male'
        },
        {
            email: 'shannou1@gmail.com',
            name: 'Shannon Randall',
            gender: 'female'
        },
        {
            email: 'zoetsarandall@gmail.com',
            name: 'Zoetsa Randall',
            gender: 'female'
        },
        
    ]
  }
  
  render() {
    return (
      <div className="App">
        <TableComponent headers={this.state.headers} data={this.state.data} />
      </div>
    )
  }
  
}

export default App;
