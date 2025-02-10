import { useState } from 'react'
import './App.css'
import StartScreen from './screens/StartScreen'
import data from './data.json'
import QuestionScreen from './screens/QuestionScreen'
import ResultScreen from './screens/ResultScreen'
import RestartScreen from './components/RestartScreen'

function App() {
  const [quesNum, setQuesNum] = useState(0)
  const [level, setLevel] = useState(0)
  const [currLevelData, setCurrLevelData] = useState(data?.easy)
  const [gameStart, setGameStart] = useState(false)
  const [isCurrAnsCorrect, setCurrAnsCorrect] = useState(false)
  const [correctAnsNum, setCorrectAnsNum] = useState([{currLevel: 0, correctAnsAtLvl: 0, points: 0, totalQues: 0}])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0);
  const [levelWiseScore, setLevelWiseScore] = useState([])
  const [lowScoreAtLvl, setLowScoreAtLvl] = useState(false)
  const [lastLevelNoReset, setLastLevelNoReset] = useState(false)

  const handleGameStart =()=> {
    setGameStart(true);
  }

  const handleQuestionNum =()=> {
    if(quesNum < currLevelData?.length) {
      setQuesNum((prevQues)=> prevQues + 1);
    }
  }

  const handleLevel =()=> {
    const lastQuesNum = currLevelData?.length-1;
    console.log("Last Ques", lastQuesNum);
    
    const currentLevelCorrectAns = correctAnsNum.find(i=> i.currLevel===level);
    
    if(
        (lastQuesNum === quesNum) && 
        (currentLevelCorrectAns?.correctAnsAtLvl > 0.5*(currLevelData.length)) && 
        (level < 2)
      ) 
    {
      console.log("Previous Level-> ", level);
      setLevel((prevLevel)=> prevLevel + 1);
      level===0 ? setCurrLevelData(data?.medium) 
      : setCurrLevelData(data?.hard);
      
      setQuesNum(0);
    }

    if(
        (lastQuesNum===quesNum) && 
        (currentLevelCorrectAns===undefined || currentLevelCorrectAns?.correctAnsAtLvl <= 0.5*(currLevelData.length))
      ) 
    {
      setLowScoreAtLvl(true);
      
      if(level === 2) {
        setLastLevelNoReset(true);
      }else {
        setLastLevelNoReset(false);
      }
    }

    if(level===2 && quesNum===lastQuesNum) {
      setShowResult(true);
      
      let totalPoints = 0; 
      correctAnsNum.map(item=> (
        totalPoints += item.points
      ));
      setScore(totalPoints);
      
      let maxPoints = 0;
      correctAnsNum.map(item=> (
        maxPoints += 
        (item.currLevel===0 ? item.totalQues*10 : 
         item.currLevel===1 ? item.totalQues*20 : 
         item.totalQues*30
        )
      ));
      setMaxScore(maxPoints);

      const levelScores = correctAnsNum.map(item=> {
        return { 
          level: item.currLevel, 
          points: item.points, 
          totalQues: item.totalQues 
        };
      });
      setLevelWiseScore(levelScores);
    }
  }

  const handleLevelRestart =()=> {
    if(lowScoreAtLvl) {
      setGameStart(true)
      if(level === 0) {
        console.log("If zero", level)
        setLevel(0);
        setQuesNum(0);
        setCorrectAnsNum([
          {
            currLevel: 0, 
            correctAnsAtLvl: 0, 
            points: 0, 
            totalQues: 0
          }
        ]);
        setLowScoreAtLvl(false);
      } else if(level === 1) {
        console.log("Other than zero", level);
        
        //Setting the level to prevLevel no. to restart from there
        setLevel((prevLevel)=> prevLevel);
        
        setQuesNum(0);  
        
        //Removing the current level data on level restart
        setCorrectAnsNum((prevCorrectAnsArr)=> 
          (prevCorrectAnsArr.slice(0, -1))
        );
        setLowScoreAtLvl(false);
      } else {
        setLastLevelNoReset(true);
      }
    }
  }

  const handleGameRestart =()=> {
      setGameStart(false);
      setLevel(0);
      setCurrLevelData(data?.easy);
      setCorrectAnsNum([
        {
          currLevel: 0, 
          correctAnsAtLvl: 0, 
          points: 0, 
          totalQues: 0
        }
      ]);
      setQuesNum(0);
      setLevelWiseScore([]);
      setLowScoreAtLvl(false);
      setShowResult(false);
  }

  // For debugging purposes
  // const checkCurrentStatus =()=> {
  //   console.log("Current Question Number => ", quesNum);
  //   console.log("Current Level Number=> ", level);
  //   console.log("Current Game Run Status=> ", gameStart);
  //   console.log("Current level Data-> ", currLevelData);
  //   console.log("Submitted Answers Data-> ", correctAnsNum);
  // }

  return (
    <>
    { !gameStart ?
      (<StartScreen setGameStart={handleGameStart}/>)
      :
      level >= 0 && level <= 2 &&
      (
        currLevelData?.slice(quesNum, quesNum+1)?.map((item)=> (
          <QuestionScreen 
            ques={item} 
            onSubmit={handleQuestionNum} 
            level={level}
            onLevelChange={handleLevel} 
            setCurrAnsCorrect={setCurrAnsCorrect} 
            correctAnsNum={correctAnsNum}
            setCorrectAnsNum={setCorrectAnsNum}
          />
        ))
      )
    }
    {
      showResult && 
      <ResultScreen 
        totalScore={score} 
        maxScore={maxScore}
        levelScores={levelWiseScore}
      />
    }
    
    {
      lowScoreAtLvl ? (
        <RestartScreen 
          handleLevelRestart={handleLevelRestart} 
          handleGameRestart={handleGameRestart} 
          lastLevelNoReset={lastLevelNoReset}
          lastLevel={level}
        />
      ) : showResult && (
        <RestartScreen
          handleGameRestart={handleGameRestart}
          lastLevelNoReset={true}
          lastLevel={level}
        />
      )
    }
    </>
  )
}

export default App
