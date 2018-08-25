import { observer } from 'mobx-react'
import * as monaco from 'monaco-editor';
import { languages } from 'monaco-editor'
import * as React from 'react'
import * as styles from './Appttt.less'
// import store from './store'
console.log(languages.json)
declare var window: {editor:any}
@observer
export default class AppTest extends React.Component{
  public display:React.RefObject<any>
  constructor (props?:any) {
    super(props)
    this.display = React.createRef()
  }
  public render () {
    return (
      <div>
        <div className={styles.display} ref={this.display}/>
      </div>
    )
  }
  public componentDidMount () {
    // console.log(this.display.current, editor)
    // monaco.editor.create(this.display.current, {
    //   language: "javascript",
    //   value: "function hello() {\n\talert('Hello world!');\n}"
    // });
    // const value = "";
    // const language = 
    // const model = monaco.editor.createModel('', 'html');
    // const editor = monaco.editor.create(this.display.current);
    // console.log(editor)
    // editor.setModel(model);
    const editor = monaco.editor.create(this.display.current, {
      formatOnType: true,
      language: 'javascript',
      value: 'var x = {abc:12};',
    });
    console.log(editor)
    window.editor = editor;
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run().then(x=>{
        editor.updateOptions({ readOnly: true})
      })
    }, 1000)
    
    // 
  }
  public componentDidUpdate() {
    console.log('update')
  }
  public componentWillUnmount () {
    console.log('unmou')
  }
}