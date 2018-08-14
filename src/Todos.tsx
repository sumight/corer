
import { observer } from 'mobx-react'
import * as React from 'react'
import store from './store'
import { changeValue, keyPressOn } from './utils'
@observer
class Todos extends React.Component {
  public ccc (index:number) {
    console.log(index)
  }
  public render () {
    return (
      <div>
        <div>
          <input
            type="text"
            onKeyDown={keyPressOn(13, store.add)}
            value={store.message}
            onChange={changeValue(store.changeMessage)}
          />
          <button onClick={store.clean}>清空</button>
        </div>
        <p>total: {store.total}</p>
        <ul>
          {
            store.list.map((item, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={store.list[index]}
                  onChange={changeValue(store.changeItem.bind(store, index))}
                  onKeyDown={keyPressOn(13, this.ccc.bind(this, index))}
                />
                <button onClick={store.remove.bind(store, index)}>X</button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Todos