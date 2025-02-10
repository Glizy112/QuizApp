import React from 'react'
import Button from '../components/Button'

const StartScreen = (props) => {
  return (
    <div className='flex flex-col'>
      <div className='heading-container items-center'>
        <h2 className='text-xl font-bold text-gray-900'> Do you know? </h2>
        <h4 className='text-base text-gray-600 italic'> Test yourself and play on. </h4>
      </div>
      <div className='mt-10'>
        <Button btnTitle="Start Quiz" handleClick={props?.setGameStart}/>
      </div>
    </div>
  )
}

export default StartScreen