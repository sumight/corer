import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import Data from './data/Data'
import store from './store'
@observer
class App extends React.Component {
  public render() {
    return (
      <div>
        <Data data={
          {
            Person: toJS(store)
          }
        }/>
      </div>
    );
  }
}

export default App;
