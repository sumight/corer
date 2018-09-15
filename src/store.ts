import { action, computed, configure, observable } from 'mobx'
configure({ enforceActions: true })

declare const window:{store:Store}

class Store {
  @observable public list:string[] = [];
  @observable public message:string = 'xxxxx';
  @observable public gender:string = '';
  
  @computed get total () {
    return this.list.length
  }
  @action.bound public add () {
    if (this.message === '') {
      return
    }
    this.list.push(this.message)
    this.message = ''
  }
  @action.bound public changeMessage (message:string) {
    this.message = message || 'xx'
  }
  @action.bound public remove (index:number) {
    this.list = this.list.filter((item, i) => i!==index)
  }
  @action.bound public clean () {
    this.list = []
  }
  @action.bound public changeItem (index:number, message:string) {
    this.list[index] = message
  }
}

const store = new Store()
window.store = store
export default store