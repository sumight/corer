import {
  isEmpty,
  isFunction,
} from 'lodash'
console.log(isEmpty([]))
import * as React from 'react'
import Params from './Params'
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
  onInvoke?:(params:any[])=>void
}
interface IPropertyState {
  opened: boolean
}
export default class Property extends React.Component<IPropertyProps, IPropertyState> {
  private paramsRef:React.RefObject<Params>
  constructor (props:IPropertyProps) {
    super(props)
    this.state = {
      opened: true
    }
    this.toggle = this.toggle.bind(this)
    this.doSome = this.doSome.bind(this)
    this.paramsRef = React.createRef<Params>()
  }
  public componentDidMount () {
    console.log(this.paramsRef.current)
  }
  public render () {
    return (
      <div className={styles.property}>
        {this.valueIsObjectOrArray()&&(
          <div className="icon" onClick={this.toggle}>→</div>
        )}
        <div className="name-value">
          <span className="name" onClick={this.doSome}>
            {this.props.name}
          </span>
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
        this.props.onInvoke(this.getParams())
      }
    }
  }
  public getParams ():any[] {
    if (!this.paramsRef.current) {
      return []
    } else {
      return this.paramsRef.current.state.params.map(param=>param.value)
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
      return (
        <Params some="s" ref={this.paramsRef}/>
      )
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