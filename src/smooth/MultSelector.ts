import { action, computed, observable } from 'mobx'

type Optoins<T> = Array<{text:string,value:T,active?:boolean}>

class Selector<T> {
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
  @action.bound public select(index:number) {
    this.values = this.values.concat(this.originOptions[index].value)
  }
  @action.bound public clean() {
    this.values = []
  }
}

export default Selector