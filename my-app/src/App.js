import logo from './logo.svg';
import './App.css';

import {Table} from 'bootstrap'
import Classes from './Classes';
function App() {
  return (
    <div className="App">
        <div className = "mainview">
            <div className = "classes">
                <Classes></Classes>
            </div>
            <div className = "teachers">

            </div>
            <div className = "students">

            </div>
        </div>
    </div>
  );
}

export default App;
