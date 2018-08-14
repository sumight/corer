export function required (value:any, label:string):Promise<{message:string, passed:boolean}> {
  if (
    value === ''
    || value === null
    || value === undefined
    || JSON.stringify(value) === '[]'
  ) {
    return Promise.resolve({
      message: '请填写'+label,
      passed: false
    })
  }
  return Promise.resolve({
    message: '',
    passed: true
  })
}

export const doubled = (value:any, label:string):Promise<{message:string, passed:boolean}> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if(value === 'pp') {
        resolve({
          message: '名字重复',
          passed: false
        })
      }
      else {
        resolve({
          message: '',
          passed: true
        })
      }
    }, 1000)
  })
}

export function isNumber (value:any, label:string) {
  if (isNaN(value)) {
    return Promise.resolve({
      message: '请输入数字',
      passed: false
    })
  } else {
    return Promise.resolve({
      message: '',
      passed: true
    })
  }
}