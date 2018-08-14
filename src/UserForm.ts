import { action, observable } from 'mobx'
import EduField from './EduField'
import { Keys } from './Keys'
import { doubled, isNumber, required } from './rules'
import Field from './smooth/Field'
import Form from './smooth/Form'

class UserForm extends Form{
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
  public changeHasDog(value:boolean):void {
    this[Keys.HasDog].setValue(value)
    if (value) {
      this[Keys.DogName].reset()
      this[Keys.DogName].enable()
    }else {
      this[Keys.DogName].disable()
    }
  }

}

export default UserForm