
import { isObject, keys } from 'lodash'
import { observer } from 'mobx-react'
import * as React from 'react'
import store from './store'
@observer
class FormTest extends React.Component {
  public render () {
    return (
      <ul>
        {renderNode(store)}
      </ul>
    )
  }
}

function renderNode (item:any):JSX.Element[] {
    return keys(item).map(key=>{
      if ( isObject(item[key]) ) {
        return (
          <li key={key}>
              <div>{key}</div>
              <ul>
                {renderNode(item[key])}
              </ul>
          </li>
        )
      } else {
        return (
          <li key={key}>{key}:{item[key]}</li>
        )
      }
    })
}

export default FormTest