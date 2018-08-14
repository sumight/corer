import { observer } from 'mobx-react'
import * as React from 'react'
import { Keys } from './Keys'
import store from './store'
import { keyPressOn } from './utils'

@observer
class ListTest extends React.Component {
  public render () {
    const { posts } = store;
    const { update, data, prev, next, pending } = posts
    const filter = (name:Keys) => {
      return {
        onChange: (event:React.ChangeEvent) => {
          posts[name].setValue(
            (event.target as HTMLInputElement).value
          )
        },
        onKeyDown: keyPressOn(13, update),
        placeholder: posts[name].label,
        value: posts[name].value||''
      }
    }
    
    return (
      <div>
        <input
          type="search"
          {...filter(Keys.TitleLike)}
        />
        <input
          type="search"
          {...filter(Keys.BodyLike)}
        />
        <button onClick={posts.reset}>重置</button>

        <button onClick={update} disabled={pending}>更新</button>
        <button onClick={prev} disabled={pending}>上一页</button>
        <button onClick={next} disabled={pending}>下一页</button>
        {pending && <span>加载中...</span>}
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>userId</th>
              <th>title</th>
              <th>body</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item[Keys.Id]}>
                <td>{item[Keys.Id]}</td>
                <td>{item[Keys.UserId]}</td>
                <td>{item[Keys.Title]}</td>
                <td>{item[Keys.Body]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ListTest