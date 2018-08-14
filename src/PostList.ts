import axios from 'axios'
import { InterfacePost } from './interfaces'
import { Keys } from './Keys'
import Field from './smooth/Field';
import List from './smooth/List'
export default class PostList extends List<InterfacePost> {
  public [Keys.BodyLike]:Field<string> = new Field<string>({empty: '', label: 'title'})
  public [Keys.TitleLike]:Field<string> = new Field<string>({empty: '', label: 'body'})
  protected async fetch(
    index:number,
    size:number
  ):Promise<{data:InterfacePost[], total:number}> {
    const res = await axios.get('http://jsonplaceholder.typicode.com/posts', {
      params: {
        _limit: size,
        _page: index,
        [Keys.BodyLike]: this[Keys.BodyLike].value,
        [Keys.TitleLike]: this[Keys.TitleLike].value
      }
    })
    return {
      data: res.data as InterfacePost[],
      total: res.headers['X-Total-Count'] as number
    }
  }
}

    
    