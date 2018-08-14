import { action, observable } from 'mobx'
import EduField from './EduField'
import { Keys } from './Keys'
import { doubled, isNumber, required } from './rules'
import Field from './smooth/Field'
import Form from './smooth/Form'
function dtest(target:any, name:string, descriptor:any){
  console.log(name, target, descriptor)
  const fn = descriptor.value
  descriptor.value = function(...args:any[]) {
    console.log('params', args[0])
    return fn.apply(this, args)
  }
  return descriptor;
}
function handleDescriptor(target:any, key:any) {
  console.log(target)
  console.log(key)
}

class UserForm extends Form{
  @handleDescriptor @observable public ccc:any = ''
  @observable public [Keys.Name]:Field<string> = new Field<string>(
    { empty: '', label: '姓名', rule:doubled }
  )

  @observable public [Keys.Age]:Field<string> = new Field<string>(
    { empty: '', label: '年龄', rule:isNumber }
  )
  @observable public [Keys.Edu]:EduField = new EduField(
    { empty: '', label: '教育背景', rule: required }
  )
  @observable public [Keys.HasDog]:Field<boolean> = new Field<boolean>(
    { empty: false, label: '是否养狗' }
  )

  @observable public [Keys.DogName]:Field<string> = new Field<string>(
    { empty: '', label: '狗名', rule:required, disabled:true }
  )
  @action.bound
  @dtest
  public changeHasDog(value:boolean):void {
    this[Keys.HasDog].setValue(value)
    if (value) {
      this[Keys.DogName].reset()
      this[Keys.DogName].enable()
    }else {
      this[Keys.DogName].disable()
    }
  }
  
  public ttt() {
    console.log('ttt')
  }
}

export default UserForm