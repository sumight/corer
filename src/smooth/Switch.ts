import { action, observable } from 'mobx'

class Switch {
  @observable public value:boolean = false
  @action.bound public switch():void {
    this.value = !this.value;
  }
}
export default Switch