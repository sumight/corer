import { action, observable } from 'mobx'
class Validator {
  @observable public message:string = '';
  @observable public passed:boolean = false;
  @observable public pending:boolean = false;
  @observable public dirty:boolean = false;
  @action.bound public async valid(value:any):Promise<boolean> {
    this.pend()
    const { message, passed } = await this.rule(value);
    this.record(passed, message)
    return Promise.resolve(true)
  }
  @action.bound public async rule(value:any):Promise<{ passed:boolean,  message:string}> {
    return Promise.resolve({
      message: '',
      passed: true
    })
  }
  @action private pend() {
    this.pending = true;
  }
  @action private record(passed:boolean, message:string) {
    this.message = message;
    this.passed = passed;
    if(!this.dirty) {
      this.dirty = true;
    }
    this.pending = false;
  }
}
export default Validator