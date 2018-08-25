import { action, computed, observable } from 'mobx'

type Optoins<T> = Array<{text:string,value:T,active?:boolean}>

class Selector<T> {
  @observable public value:T|null = null;
  @observable protected originOptions:Optoins<T>;
  constructor (options:Optoins<T> = []) {
    this.originOptions = options;
  }
  @computed get options():Optoins<T> {
    return this.originOptions.map(op => {
      if (op.value === this.value) {
        return { ...op, active: true }
      }else {
        return { ...op, active: false }
      }
    })
  }
  @action.bound public select(index:number) {
    if (index >= this.options.length) {
      throw new Error('index greater than options length')
      return;
    }
    if (index < 0) {
      throw new Error('index less than options length')
      return;
    }
    this.value = this.options[index].value
  }
  @action.bound public clean() {
    this.value = null
  }
}

export default Selector