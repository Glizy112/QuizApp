import '../App.css'
import React from 'react'

const Button = (props) => {
  return (
    <input 
      type="button" 
      className={
        props?.isCorrect || props?.isCorrect!==undefined ? 
        'w-full p-4 rounded-lg bg-blue-50 text-base font-medium'
        : 'w-full p-4 rounded-lg bg-blue-200 cursor-pointer text-base font-medium'
      }
      name={props?.btnTitle}
      value={props?.btnTitle}
      onClick={props?.handleClick}
      disabled={props?.setDisabled}
      hidden={props?.handleHidden}
      style={{marginTop: props?.topMargin}}
    />
  )
}

export default Button