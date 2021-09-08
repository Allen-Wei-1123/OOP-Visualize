import './App.css'
import {Table} from 'bootstrap'
import React from 'react'

class Classes extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        
    }
    
    render(){
        return(
            <table className = "table">
                <thead>
                  <tr>
                    <th scope="col">Classes</th>
                  </tr>
                  
                </thead>
                <tbody>
                    <tr>
                      <td>
                        allen
                      </td>
                    </tr>
                  </tbody>
                </table>
        )
    }
}

export default Classes;