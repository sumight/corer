import { curry } from 'ramda'

export const keyPressOn = curry(
  (
    keyCode:number, 
    fn:()=>void, 
    event:React.KeyboardEvent
  ):void => {
    if (event.keyCode !== keyCode) { return }
    fn()
  }
)

export const changeValue = curry(
  (
    fn:(value:any)=>void,
    event:React.ChangeEvent
  ):void => {
    const target = (event.target as HTMLInputElement);
    let value;
    if (target.type === 'checkbox') {
      value = target.checked
    }else {
      value = target.value
    }
    fn(value)
  }
)

export function createModel<T>(store:any, changeFn:(name:T, vlaue:any)=>void) {
  return function model (name:T) {
    return {
      value: store[name]||'',
      onChange (event:React.ChangeEvent) {
        changeFn(
          name,
          (event.target as HTMLInputElement).value
        )
      }
    }
  }
}