import { find } from 'lodash'
import { action, computed, observable } from 'mobx'
type Optoins<T> = Array<{text:string,value:T,active?:boolean}>

class MultSelector<T> {
  @observable public values:T[] = [];
  @observable protected originOptions:Optoins<T>;
  constructor (options:Optoins<T> = []) {
    this.originOptions = options;
  }
  @computed get options():Optoins<T> {
    return this.originOptions.map(op => {
      if (this.values.indexOf(op.value) > -1) {
        return { ...op, active: true }
      }else {
        return { ...op, active: false }
      }
    })
  }
  public isSelected(index:number):boolean {
    return !!find(this.values, value=>value===this.options[index].value)
  }
  @action.bound public select(index:number) {
    if (this.isSelected(index)) {
      throw Error('can not select option that has been selected')
    }
    this.values = this.values.concat(this.originOptions[index].value)
  }
  @action.bound public unselect(index:number) {
    this.values = this.values.filter((value)=>{
      return value !== this.options[index].value
    })
  }
  @action.bound public toggle(index:number) {
    if (this.isSelected(index)) {
      this.unselect(index)
    } else {
      this.select(index)
    }
  }
  @action.bound public clean() {
    this.values = []
  }
}

export default MultSelector