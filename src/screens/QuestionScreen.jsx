import React, { useState } from 'react'
import Button from '../components/Button'
import AnsFeedback from '../components/AnsFeedback';

const QuestionScreen = (props) => {

  const [isCorrect, setIsCorrect] = useState();
  const [inpVal, setInpVal] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleInputVal =(e)=> {
    e.preventDefault();
    setChecked(!checked);
    
    const inpValue = e.target.value;
    console.log(inpValue);
    setInpVal(inpValue);
  }

  const handleCheckIsCorrect =()=> {
    const currentLevelIdx = props?.correctAnsNum.findIndex(i=> i?.currLevel===props?.level);
    setIsSubmitted(true);
    if(props?.ques?.correctAnswer?.toLowerCase() === inpVal?.toLowerCase()) {
        setIsCorrect(true);
        console.log(props?.level);
        
        const correctAnsPoints = props?.level===0 ? 10 : props?.level===1 ? 20 : 30;
        if(currentLevelIdx > -1) {
            console.log("Updating correct answers...")
            const correctAnsNumAtLevel = props?.correctAnsNum?.map((item, i)=> {
                console.log(item?.currLevel, '---' , props?.level);
                if(item?.currLevel===props?.level) {
                    console.log("Got into the level to update the correct count...");
                    
                    const newItem = {
                        currLevel: props?.level, 
                        correctAnsAtLvl: item?.correctAnsAtLvl+1,
                        points: item?.points + correctAnsPoints,
                        totalQues: item?.totalQues + 1,
                    };
                    return newItem;
                } else {
                    return item;
                }
            });
            props?.setCorrectAnsNum(correctAnsNumAtLevel);
        }else {
            props?.setCorrectAnsNum([...props?.correctAnsNum, {currLevel: props?.level, correctAnsAtLvl: 1, points: correctAnsPoints, totalQues: 1}])
        }
    }else {
        setIsCorrect(false);
        if(currentLevelIdx === -1) {
            props?.setCorrectAnsNum([...props?.correctAnsNum, {currLevel: props?.level, correctAnsAtLvl: 0, points: 0, totalQues: 0}])
        }else {
            const correctAnsNumAtLevel = props?.correctAnsNum?.map((item, i)=> {
                if(item?.currLevel===props?.level) {
                    const newItem = {
                        currLevel: props?.level, 
                        correctAnsAtLvl: item?.correctAnsAtLvl,
                        points: item?.points,
                        totalQues: item?.totalQues + 1,
                    };
                    return newItem;
                } else {
                    return item;
                }
            });
            props?.setCorrectAnsNum(correctAnsNumAtLevel);
        }
    }
  }

  const handleNavNextQues =()=> {
    setIsCorrect();
    setInpVal();
    setChecked(false);
    setIsSubmitted(false);
  }

  return (
    <div className='ques-container flex flex-col items-start'>
        <h3 className='text-xl font-semibold text-red-600'> {props?.ques?.question} </h3>
        {
            props?.ques?.type==="text-input" &&
            (<input 
                type="text" 
                name="txt-inp" 
                className='p-2 border border-gray-500 rounded-lg mt-5' 
                onChange={handleInputVal}
            />)
        }
        {
            props?.ques?.type==="multiple-choice" &&
            props?.ques?.options?.map((opt, idx)=> (
                <div className="flex flex-row mt-4">
                    <input 
                        type="checkbox" 
                        id={idx} 
                        name="check-box-inp" 
                        value={opt} 
                        onChange={handleInputVal} 
                        defaultChecked={checked}
                    />
                    <label htmlFor={idx} className="mx-2"> {opt} </label>
                </div>
            ))
            
        }
        {
            props?.ques?.type==="true-false" &&
            ["True", "False"].map((opt, idx)=> (
                <div className="flex flex-row mt-4">
                    <input 
                        type="radio" 
                        id={idx} 
                        name="radio-btn-inp" 
                        value={opt} 
                        onChange={handleInputVal} 
                        defaultChecked={checked}
                    />
                    <label htmlFor={idx} className='mx-2'> {opt} </label>
                </div>    
            ))
        }
        <div className="mt-10 w-2/3">
            <Button 
                btnTitle="Submit" 
                isCorrect={isCorrect}
                setDisabled={isSubmitted ? true : false}
                handleClick={()=> { 
                    console.log("Submit clicked"); 
                    handleCheckIsCorrect(); 
                }}
            />
        </div>

        {isCorrect===true ?
            (<div className='mt-3 w-2/3'>
                <Button 
                    btnTitle="Next" 
                    handleClick={()=> { 
                        props?.onSubmit(); 
                        handleNavNextQues(); 
                        props?.onLevelChange();  
                    }}
                />
                <AnsFeedback 
                    isCorrect={isCorrect} 
                    msg="Good! You answered it correctly."
                />
            </div>) 
            :
            (<div className='mt-3 w-2/3'>
                {
                    (inpVal!==undefined && isCorrect!==undefined) && 
                    (<Button 
                        btnTitle="Next" 
                        handleClick={()=> { 
                            props?.onSubmit(); 
                            handleNavNextQues(); 
                            props?.onLevelChange(); 
                        }}
                    />)
                }
                {
                    (isCorrect!==undefined) && 
                    (<AnsFeedback 
                        isCorrect={isCorrect} 
                        msg="Oops! Your answer is incorrect."
                    />)
                }
            </div>)
        }
    </div>
  )
}

export default QuestionScreen