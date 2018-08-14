import { computed } from 'mobx'
import Field from './Field'
abstract class Form {
  /**
   * @description 当前表单中所有字段的 Key 值
   */
  @computed public get fieldKeys():string[] {
    return Object.keys(this)
      .filter(key=>this.isField(this[key]))
  }
  @computed public get fields():Array<Field<any>> {
    return this.fieldKeys.map(key=>this[key])
  }
  
  /**
   * @description 表单是否通过校验
   */
  @computed public get passed ():boolean {
    return this.fields
      .filter(field=>!field.disabled)
      .every(field=>field.passed)
  }

  /**
   * @description 表单是否处于校验中的状态。
   * 校验规则有可能是异步的，在校验过程中 pending 为 false，
   * 此时应该禁止用户提交等行为
   */
  @computed public get pending ():boolean {
    return this.fields.some(field=>field.pending)
  }

  /**
   * @description 重置表单。
   * 将表单中所有字段的值设置为 empty，
   * 清空所有的校验状态
   */
  public reset () {
    this.fields.forEach(field => field.reset())
  }
  /**
   * @description 校验表单。
   * 依次调用表单中所有字段的 valid 方法，
   * 并且返回校验的结果
   */
  public valid () {
    return Promise.all(
      this.fields.map(field => field.valid())
    )
  }
  /**
   * @param prop 表单中的属性值
   * @description 判断表单中的值是否为字段类型
   */
  public isField (prop:any): prop is Field<any> {
    return prop instanceof Field
  }
}

export default Form