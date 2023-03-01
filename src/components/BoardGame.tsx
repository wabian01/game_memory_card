import React, { useEffect, useState } from 'react'
import { ListCard } from './GameMode';

interface Props{
    id:number;
    name:string;
    image:string;
    activeCard:number[];
    setActiveCard: React.Dispatch<React.SetStateAction<number[]>>;
    active:number;
    listCard: ListCard[];
    removeCard:number[];
    setRemoveCard:React.Dispatch<React.SetStateAction<number[]>>;
    setWinGame:React.Dispatch<React.SetStateAction<boolean>>;
    setCountCard:React.Dispatch<React.SetStateAction<number>>;
    countCard:number;
}

const BoardGame = (props:Props) => {
    const {id,name,image,activeCard,setActiveCard,active,listCard,removeCard,setRemoveCard,setWinGame,setCountCard,countCard} = props
    
    const setActive=(index:number)=>{
        if(activeCard.includes(index) || removeCard.includes(index)){
            return
        }
        if(activeCard.length<2){
            const active = activeCard.concat(index)
            setActiveCard(active)
            if(active.length===2){
                if(listCard[active[0]].id === listCard[active[1]].id){
                    let temp = countCard + 1
                    setCountCard(temp)
                    let remove_tem = removeCard.concat(active)
                    setRemoveCard(remove_tem)
                    setTimeout(() => {
                        setActiveCard([])
                    }, 500)
                }else{
                    setTimeout(() => {
                        setActiveCard([])
                    }, 500)
                }
            }
        }
    }
  return (
    <div className={`flip-card ${activeCard.includes(active) ? "active": ""}`} onClick={()=>setActive(active)}>
        <div className='flip-card-inner'>
            <div className={`flip-card-front ${removeCard.includes(active) ? "active": ""}`}></div>
            <div className='flip-card-back'>
                <img src={image} alt="card image" className="card-image" />
                <p className="card-name">{name}</p>
            </div>
        </div>
    </div>
    
  )
}

export default BoardGame