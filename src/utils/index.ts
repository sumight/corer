import {
  includes,
  isArray,
  isFunction,
  isObject,
  isString,
  keys as _keys,
} from 'lodash'
declare const Object:{
  getOwnPropertyDescriptors: (ojb:any)=>any
}

function keys(obj:any) {
  return _keys(Object.getOwnPropertyDescriptors(obj))
}
function isSysKey(key:string) {
  return includes([
    'constructor'
  ], key)
}
export function clone (target:any):any {
  if (isFunction(target)) {
    return target
  } else if (isString(target)) {
    return target
  } else if (isArray(target)){
    return target.map(item=>clone(item))
  } else if (isObject(target)) {
    const newObj = {};
    keys(target.__proto__).filter(key=>!isSysKey(key)).forEach(key=>{
      newObj[key] = clone(target[key]);
    })
    return newObj
  } else {
    return target
  }
}

// export default function click (target, name, descriptor) {
//   return ''
// }