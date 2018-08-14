import { observer } from 'mobx-react'
import * as React from 'react'
import * as styles from './App.less'
import store from './store'
import { changeValue } from './utils'
const { dform } = store
@observer
export default class DFormTest extends React.Component{
  public render () {
    return (
      <div>
        <button onClick={dform.add}>添加</button>
        <button onClick={dform.clean}>清空</button>
        <button onClick={dform.valid}>校验</button>
        <ul>
          {dform.fields.map((field, index)=>(
            <li key={index}>
              <input
                type="text"
                value={field.value}
                onChange={changeValue(field.setValue)}
                className={((!field.passed) && field.dirty)?styles.error:''}/>
              <button tabIndex={-1} onClick={dform.insert.bind(dform, index+1)}>+</button>
              <button tabIndex={-1} onClick={dform.remove.bind(dform, index)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}