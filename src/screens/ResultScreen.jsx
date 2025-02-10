import React, { useState, useEffect } from 'react'

const ResultScreen = (props) => {

  const [lowPointsLvl, setLowPointsLvl] = useState()

  useEffect(()=> {
    props?.levelScores?.map(item=> {
        if(
            (item?.level===0 && item?.points <= (0.5*item?.totalQues*10)) ||
            (item?.level===1 && item?.points <= (0.5*item?.totalQues*20)) ||
            (item?.level===2 && item?.points <= (0.5*item?.totalQues*30))
        ) {
            setLowPointsLvl(item?.level);
        }
        
    })
  },[])

  return (
    <div className='score_container p-4 m-auto items-center'>
        <h3 className='text-red-600 font-medium text-lg'> Your Score </h3>
        <h5 className='text-gray-600 font-bold text-xl mt-1'> {props?.totalScore} / {props?.maxScore} </h5>

        <div className='mt-8'>
            <h4 className='text-blue-500 font-medium text-lg'> Level Wise Scores </h4>
            {
                props?.levelScores?.map((item, idx)=> (
                    <div key={idx} className='mx-auto w-2/3 flex flex-row p-2 items-center mt-2 justify-between'>
                        <label 
                            className={
                                item?.level===0 ? 'text-green-500 font-medium text-base'
                                : item?.level===1 ? 'text-blue-500 font-medium text-base'
                                : 'text-red-500 font-medium text-base'
                            }
                        > {item?.level===0 ? "Easy" : item?.level===1 ? "Medium" : "Hard"} </label>
                        <p className='text-gray-700 font-medium text-lg'> {item?.points} </p>
                    </div>
                ))
            }
        </div>
        <div className='mt-10'>
            {   
                lowPointsLvl!==undefined ?
                <p className='text-gray-700 font-medium text-lg'> 
                    Practice
                    {
                        lowPointsLvl===0 ? " Easy" 
                        : lowPointsLvl===1 ? " Medium" : " Hard"
                    } level questions more..
                </p>
                :
                <p className='text-black font-medium text-lg'>
                    Congrats🎉 You passed the quiz.
                </p>
            }
        </div>
    </div>
  )
}

export default ResultScreen