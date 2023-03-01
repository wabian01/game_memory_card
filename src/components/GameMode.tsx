import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BoardGame from './BoardGame';
import { GameStart } from './GameBody'
import "./buttonreturn.css"

interface Props{
    gameStart:GameStart;
    setGameStart:React.Dispatch<React.SetStateAction<GameStart>>;
}
export interface ListCard{
    id:number;
    name:string;
    sprites: {
        front_default:string;
      }
}
interface Card{
    url:string;
    name:string;
}
interface CardSelec{
    id:number;
}
const GameMode = (props:Props) => {
    const {gameStart,setGameStart} = props
    const [listCard,setListCard] = useState<ListCard[]>([])
    const [activeCard,setActiveCard] = useState<number[]>([])
    const [removeCard,setRemoveCard] = useState<number[]>([])
    const [winGame,setWinGame] = useState<boolean>(false)
    const [countCard,setCountCard] = useState<number>(0)
    useEffect(()=>{
        const getCard = async()=>{
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${gameStart.level}&offset=0`)
            res.data.results.forEach(async(card:Card)=>{
                const poke = await axios.get(card.url)
                setListCard((p)=>[...p,poke.data])
            })
        }
        getCard();
    },[])
    useEffect(()=>{
        if(listCard.length===gameStart.level){
            const dub = listCard.concat(listCard)
            const shuffer=(cards:ListCard[])=>{
                let currentIndex = cards.length,  randomIndex;
                while (currentIndex != 0) {
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex--;
                  [cards[currentIndex], cards[randomIndex]] = [
                    cards[randomIndex], cards[currentIndex]];
                }
                setListCard(cards)
            }
            shuffer(dub);
        }
    },[listCard])
    const returnGame=()=>{
        setGameStart({
            option:"None",
            status:false,
            level:0
        })
    }
    useEffect(()=>{
        if(countCard===gameStart.level){
            setWinGame(true)
        }
    },[countCard])
  return (
    <div>
        <div className='container-card'>
                {winGame?(
                    <div className='card-win'>
                        <h1>You Win</h1> 
                        <button onClick={returnGame} className="button-74">Return</button>
                    </div>
                ):(
                    <>
                        {listCard.map((list,index)=>{
                            return(
                                <div>
                                    <BoardGame
                                        key={index}
                                        activeCard={activeCard}
                                        setActiveCard={setActiveCard}
                                        id={list.id}
                                        name={list.name}
                                        image={list.sprites.front_default}
                                        active={index}
                                        listCard={listCard}
                                        removeCard={removeCard}
                                        setRemoveCard={setRemoveCard}
                                        setWinGame={setWinGame}
                                        setCountCard={setCountCard}
                                        countCard={countCard}
                                    />
                                </div>
                            )
                        })}
                    </>
                )}
        </div>
        {!winGame?(<div className='exit-card'>
            <button className="button-77" onClick={returnGame}>Exit Game</button>
        </div>):""}
    </div>
   
  )
}

export default GameMode