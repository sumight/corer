// import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import Data from './data/Data'
import store from './store'
import { clone } from './utils'
console.log(clone(store))
@observer
class App extends React.Component {
  public render() {
    console.log(clone(store))
    return (
      <div>
        <Data data={
          {
            Person: clone(store)
          }
        }/>
      </div>
    );
  }
}

export default App;
