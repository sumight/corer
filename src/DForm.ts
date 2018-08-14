import { action, observable } from 'mobx'
import { required } from './rules';
import Field from './smooth/Field';

class DForm {
  @observable public fields:Array<Field<string>> = [];
  @action.bound public add () {
    this.fields.push( this.createField() )
  }
  @action.bound public insert (index:number) {
    this.fields.splice(index, 0, this.createField())
  }
  @action.bound public remove (index:number) {
    this.fields.splice(index, 1)
  }
  @action.bound public clean () {
    this.fields = []
  }
  @action.bound public valid ():Promise<boolean> {
    return Promise.all(
      this.fields.map(field => field.valid())
    ).then(rs=>rs.every(x=>x))
  }
  private createField ():Field<string> {
    return new Field<string>({empty: '', rule: required})
  }
}
export default DForm