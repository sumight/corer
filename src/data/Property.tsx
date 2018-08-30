import { isEmpty, isFunction } from 'lodash'
console.log(isEmpty([]))
import * as React from 'react'
import * as styles from './Property.less'
export enum ValueType {
  String,
  Number,
  Object,
  Array,
  Nil,
  Function
}
interface IPropertyProps {
  name: string,
  value?: string,
  valueType?: ValueType,
  childrenLength?:number,
  onInvoke?:()=>void
}
interface IPropertyState {
  opened: boolean
}
export default class Property extends React.Component<IPropertyProps, IPropertyState> {
  constructor (props:IPropertyProps) {
    super(props)
    this.state = {
      opened: true
    }
    this.toggle = this.toggle.bind(this)
    this.doSome = this.doSome.bind(this)
  }
  public render () {
    return (
      <div className={styles.property}>
        {this.valueIsObjectOrArray()&&(
          <div className="icon" onClick={this.toggle}>→</div>
        )}
        <div className="name-value" onClick={this.doSome}>
          <span className="name">{this.props.name}</span>
          { this.renderValue() }
        </div>
        {this.state.opened&&(
          <div className="children">
            {this.props.children}
          </div>
        )}
      </div>
    )
  }
  public doSome () {
    if (this.hasChildren()) {
      this.toggle()
    } else if (this.props.valueType === ValueType.Function) {
      if(isFunction(this.props.onInvoke)) {
        this.props.onInvoke()
      }
    }
  }
  public hasChildren () {
    return !isEmpty(this.props.children)
  }
  public renderValue() {
    if (this.props.valueType === ValueType.Object) {
      return <span className="value">: Object</span>
    } else if (this.props.valueType === ValueType.Array) {
      return <span className="value">: Array [{this.props.childrenLength}]</span>
    } else if (this.props.valueType === ValueType.String) {
      return <span className="value">: "{this.props.value}"</span>
    } else if (this.props.valueType === ValueType.Function) {
      return <span className="value">: Function</span>
    } else {
      return <span className="value">: {this.props.value}</span>
    }
  }
  public valueIsObjectOrArray ():boolean {
    return (this.props.valueType === ValueType.Object) || (this.props.valueType === ValueType.Array)
  }
  public toggle () {
    this.setState({
      opened: !this.state.opened
    })
  }
}