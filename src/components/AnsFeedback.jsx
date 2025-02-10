import React from 'react'

const AnsFeedback = (props) => {
  return (
    <div 
      className={
        props?.isCorrect ? 'feedback_container p-3 border-2 border-green-400 rounded-lg mt-8'
        : 'feedback_container p-3 border-2 border-red-400 rounded-lg mt-8'
      }
    >
      <p className='text-base font-normal text-gray-900'> {props?.msg} </p>
    </div>
  )
}

export default AnsFeedback