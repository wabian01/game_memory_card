import React, { useState } from 'react'
import GameMode from './GameMode';
import "./modegame.css"

export interface GameStart{
    option:string;
    status:boolean;
    level:number;
}

const GameBody = () => {
    const [statusStart,setStatusStart] = useState<boolean>(false)
    const [gameStart,setGameStart] = useState<GameStart>({
        option:"None",
        status:false,
        level:0
    })
    const optionMode =(mode:string,level:number)=>{
        setGameStart({
            option:mode,
            status:true,
            level:level
        })
    }
  return (
    <div>
        {!gameStart.status?(
            <div className='button-start'>
                <button onClick={()=>setStatusStart((p)=>!p)} className="button-63">    
                    {statusStart ? 'Option Level' : 'Start Game'}
                </button>
                {statusStart ? (
                    <div className="list-type5">
                        <ol >
                            <li onClick={()=>optionMode("Easy",10)}><a href="#">Easy</a></li>
                            <li onClick={()=>optionMode("Medium",20)}><a href="#">Medium</a></li>
                            <li onClick={()=>optionMode("Hard",30)}><a href="#">Hard</a></li>
                        </ol>
                    </div>
                ):""}
            </div>
          ):(
            <div>
                <GameMode gameStart={gameStart} setGameStart={setGameStart}/>
            </div>
          )}
        
    </div>
  )
}

export default GameBody