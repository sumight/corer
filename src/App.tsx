import * as React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import * as style from  './App.less'
import AppTest from './AppTest'
import DataShow from './DataShow'
import DFormTest from './DFormTest'
import FormTest from './FormTest'
import ListTest from './ListTest'
import Todos from './Todos'
class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className={style.app}>
          <ul>
            <li>
              <Link to="/todo">todo</Link>
            </li>
            <li>
              <Link to="/form">form</Link>
            </li>
            <li>
              <Link to="/list">list</Link>
            </li>
            <li>
              <Link to="/dform">DForm</Link>
            </li>
            <li>
              <Link to="/apptest">AppTest</Link>
              
            </li>
            <li>
              <Link to="/datashow">DataShow</Link>
            </li>
          </ul>
          <div>
            <Route path="/todo" component={Todos}/>
            <Route path="/form" component={FormTest}/>
            <Route path="/list" component={ListTest}/>
            <Route path="/dform" component={DFormTest}/>
            <Route path="/apptest" component={AppTest}/>
            <Route path="/datashow" component={DataShow}/>
          </div>
        </div>
      </Router>
      
    );
  }
}

export default App;
