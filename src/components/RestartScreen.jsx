import React from 'react'
import Button from './Button'

const RestartScreen = (props) => {
  return (
    <div className='restart_container p-4 m-auto items-center'>
        { props?.lastLevel !== 2 &&
          <h4 className='text-lg text-red-500 font-semibold'> 
            Oops!! You failed the level. Don't worry, you can re-attempt it. 
          </h4>
        }
        <div className='mt-5'>
          <Button 
            btnTitle="Restart Level" 
            handleClick={props?.handleLevelRestart}
            handleHidden={props?.lastLevelNoReset ? true : false}
            topMargin={12}
          />
          <Button 
            btnTitle="Restart Game" 
            handleClick={props?.handleGameRestart}
            topMargin={12}
          />
        </div>
    </div>
  )
}

export default RestartScreen