import { debounce } from 'lodash'
import { action, observable, runInAction } from 'mobx'
type typeString = string|undefined
type typeRuleFn = (value:any, label:typeString)=>Promise<{passed:boolean, message:string}>
class Field<T> {
  @observable public name:typeString;
  @observable public label:typeString;
  @observable public value:T;
  @observable public empty:T;
  @observable public disabled:boolean = false;
  @observable public message:string = '';
  @observable public passed:boolean = false;
  @observable public pending:boolean = false;
  @observable public dirty:boolean = false;
  @observable public rule:typeRuleFn
  @action.bound public valid:()=>Promise<boolean> = debounce(async ()=>{
    runInAction(() => {
      this.pending = true
      this.message = '校验中...'
    })
    const { message, passed } = await this.rule(this.value, this.label)
    runInAction(() => {
      this.message = message
      this.passed = passed
      this.pending = false
      if (!this.dirty) {
        this.dirty = true
      } 
    })
    return passed
  }, 200)
  constructor (args:{
    name?:string,
    label?:string,
    value?:T,
    empty:T,
    disabled?:boolean,
    rule?:(value:any, label:string)=>Promise<{passed:boolean, message:string}>
  }) {
    this.name = args.name
    this.label = args.label;
    this.value = args.value || args.empty;
    this.empty = args.empty;
    this.disabled = args.disabled || false;
    if (args.rule) {
      this.rule = args.rule  
    } else {
      this.rule = (()=>Promise.resolve({message:'', passed: true}))
      this.valid()
    }
  }
  @action.bound public setValue (value:T) {
    this.value = value
    this.valid()
  }
  @action.bound public disable () {
    this.disabled = true
  }
  @action.bound public enable () {
    this.disabled = false
  }
  @action.bound public reset () {
    this.value = this.empty
    this.dirty = false
    this.message = ''
  }
  public clone () {
    const field = new Field({empty: this.empty})
    const keys:string[] = ['name', 'label', 'value', 'empty', 'message', 'passed', 'pending', 'rule']
    keys.forEach(key=>{
      field[key] = this[key]
    })
    return field
  }
}
export default Field