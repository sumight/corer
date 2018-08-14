import { computed } from 'mobx'
import Field from './Field'
abstract class Form {
  @computed public get fieldKeys():string[] {
    return Object.keys(this)
      .filter(key=>this.isField(this[key]))
  }
  @computed public get fields():Array<Field<any>> {
    return this.fieldKeys.map(key=>this[key])
  }
  @computed public get passed ():boolean {

    return this.fields
      .filter(field=>!field.disabled)
      .every(field=>field.passed)
  }
  @computed public get pending ():boolean {
    return this.fields.some(field=>field.pending)
  }
  public reset () {
    this.fields.forEach(field => field.reset())
  }
  public valid () {
    return Promise.all(
      this.fields.map(field => field.valid())
    )
  }
  public isField (prop:any): prop is Field<any> {
    return prop instanceof Field
  }
}

export default Form