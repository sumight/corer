import * as React from 'react'
import * as shortid from 'shortid'
import * as styles from './Property.less'
enum EType {
  String,
  Number,
  Boolean
}

type Type = string|number|boolean

interface IParam {
  id: string,
  type: EType,
  value: Type
}

interface IPropertyProps {
  some:string
}
interface IPropertyState {
  opened: boolean,
  params: IParam[]
}

export default class Params extends React.Component<IPropertyProps, IPropertyState> {
  constructor(props:IPropertyProps) {
    super(props)
    this.state = {
      opened: false,
      params: []
    }
    this.toggle = this.toggle.bind(this)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
  }
  public componentDidMount() {
    this.add()
  }
  public render () {
    if (this.state.opened) {
      return <span>
        <span onClick={this.toggle}> ( ... </span>
          {this.state.params.map(param=>(
            <div className={styles.indent} key={param.id}>
              <input type="text" onChange={this.changeParam(param.id)}/>, 
              <span onClick={this.remove(param.id)}>-</span>
            </div>
          ))}
          <div className={styles.indent} onClick={this.add}>+</div>
        )
      </span>
    } else {
      return <span onClick={this.toggle}> ( ... )</span>
    }
  }
  public changeParam (id:string) {
    return (event:React.ChangeEvent<HTMLInputElement>)=>{
      const value:string = event.target.value
      this.setState({
        params: this.state.params.map(param=>{
          if (param.id !== id) {
            return param
          } else {
            return {
              ...param,
              value
            }
          }
        })
      })
    }
  }
  public toggle () {
    this.setState({
      opened: !this.state.opened
    })
  }
  public remove(id:string) {
    return () => {
      this.setState({
        params: this.state.params.filter((param:IParam)=>param.id!==id)
      })
    }
  }
  public add () {
    this.setState({
      params: this.state.params.concat({
        id: shortid.generate(),
        type: EType.String,
        value: ''
      })
    })
  }
}