import { 
  isArray, 
  isFunction,
  isNumber, 
  isPlainObject, 
  isString,
} from 'lodash'
import * as React from 'react'
import Property, { ValueType } from './Property'
interface IProps {
  data:any
}
export default class Data extends React.Component<IProps>{
  constructor (props:any) {
    super(props)
  }
  public render () {
    return (
      <div>
        {this.renderProperty(this.props.data)}
      </div>
    )
  }
  public renderProperty(data:any):React.ReactNode[] {
    if (isString(data)) { return [] }
    if (isFunction(data)) { return [] }
    const keys = Object.keys(data)
    if (keys.length === 0) { return [] }
    return keys.map((key:string)=>{
      const valueType = this.getValueType(data[key]);
      return (
        <Property
          name={key}
          key={key}
          value={data[key]}
          valueType={valueType}
          childrenLength={data[key].length}
          onInvoke={(valueType===ValueType.Function)?this.invoke(data, key):undefined}
        >
          {
            this.renderProperty(data[key])
          }
        </Property>
      )
    })
  }
  public getValueType (value:any):ValueType {
      if (isString(value)) {
        return ValueType.String
      } else if (isNumber(value)) {
        return ValueType.Number
      } else if (isPlainObject(value)) {
        return ValueType.Object
      } else if (isArray(value)) {
        return ValueType.Array
      } else if (isFunction(value)) {
        return ValueType.Function
      } else {
        return ValueType.Nil
      }
  }
  public invoke (target:any, key:string) {
    return (params:any[])=>{
      console.log(params)
      target[key].apply(target, params)
    }
  }
}