
import { observer } from 'mobx-react'
import * as React from 'react'
import { Keys } from './Keys'
import store from './store'
import { changeValue } from './utils'
const { user } = store

@observer
class FormTest extends React.Component {
  public render () {
    const model = (name:Keys) => {
      return {
        checked: user[name].value,
        onChange: (event:React.ChangeEvent) => {
          const target = (event.target as HTMLInputElement);
          let value;
          if (target.type === 'checkbox') {
            value = target.checked
          }else {
            value = target.value
          }
          user[name].setValue(value)
        },
        value: user[name].value||''
      }
    }
    return (
      <div>
        <h1>表单 {user.passed?'通过':'不通过'}</h1>
        <div>
          <label>{user[Keys.Name].label}：</label>
          <input type="text" {...model(Keys.Name)} />
          <span style={{color: 'red'}}>{user.name.message}</span>
        </div>
        <div>
          <label>{user[Keys.Age].label}：</label>
          <input type="text" {...model(Keys.Age)} />
          <span style={{color: 'red'}}>{user[Keys.Age].message}</span>
        </div>
        <div style={{display: 'flex'}}>
          <label>{user[Keys.Edu].label}：</label>
          <div>
            <input type="text" value={user[Keys.Edu].text} readOnly={true}/>
            <br/>
            <input type="text" onChange={changeValue(user[Keys.Edu].search)}/>
            {user[Keys.Edu].pending?<span>加载中...</span>:null}
            <ul>
              {user[Keys.Edu].options.map((item, index)=>(
                <li
                  key={index}
                  onClick={user[Keys.Edu].select.bind(user[Keys.Edu], index)}
                >
                  {
                    item.active?<span>✔️</span>:<span>○</span>
                  }
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <span style={{color: 'red'}}>{user[Keys.Edu].message}</span>
        </div>
        <div>
          <label>{user[Keys.HasDog].label}：</label>
          <input
            type="checkbox"
            checked={user[Keys.HasDog].value}
            onChange={changeValue(user.changeHasDog)}
          />
          <span style={{color: 'red'}}>{user[Keys.HasDog].message}</span>
        </div>
        {
          user[Keys.DogName].disabled?null:(
            <div>
              <label>{user[Keys.DogName].label}：</label>
              <input type="text" {...model(Keys.DogName)}/>
              <span style={{color: 'red'}}>{user[Keys.DogName].message}</span>
            </div>
          )
        }
        <button disabled={(! user.passed) || user.pending}>提交</button>
        <button onClick={user.ttt}>ttt</button>
      </div>
    );
  }
}

export default FormTest