import axios from 'axios'
import { action, computed, observable } from 'mobx'
import { Keys } from './Keys';
import Field from './smooth/Field'

type Optoins = Array<{text:string,value:string,active?:boolean}>

class EduField extends Field<string> {
  @observable public keyword:string;
  @observable public pending:boolean;
  @observable private innerOptions:Optoins = [];
  @computed get options() {
    return this.innerOptions.map((item, index)=>{
      if(this.value === item.value) {
        return {
          ...item,
          active: true
        }
      } else {
        return item
      }
    })
  }
  @computed get text():string {
    const actionOption = this.innerOptions.find((item)=>{
      return item.value === this.value
    })
    return actionOption?actionOption.text:''
  }
  @action.bound public search(keyword:string):void {
    this.keyword = keyword;
    if(keyword === '') {
      this.innerOptions = []
      return
    }
    this.pend();
    axios.get('http://jsonplaceholder.typicode.com/posts', {
      params: {
        _limit:5,
        _page:1,
        [Keys.TitleLike]:keyword
      }
    }).then(res=>{
      const options = res.data.map((item:{title:string, id:string})=>{
        return {
          text: item.title,
          value: item.id
        }
      })
      this.setOptoins(options)
      this.unpend();
    })
  }
  // @action.bound public searchBy(keyword:string):Promise<Optoins> {
    // TODO 添加内容
  // }
  @action.bound public select(index:number):void {
    this.value = this.options[index].value
  }
  @action.bound public pend() {
    this.pending = true;
  }
  @action.bound public unpend() {
    this.pending = false;
  }
  @action.bound public cleanKeyword() {
    this.keyword = ''
  }
  @action private setOptoins(options:Optoins) {
    this.innerOptions = options;
  }
}

export default EduField