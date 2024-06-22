// hooks
import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders, AxiosInstance } from 'axios';
// components
import Switches, { SwitchItem } from "../components/Switches";
// radix ui
import { Slider, Button } from "@radix-ui/themes";
// styles
import '../index.css';

interface Pokemon {
  id : number;
  name : string;
  sprite : string;
}

const apiUrl = import.meta.env.VITE_APP_URL_DEV;
const axiosInstance = axios.create({
  baseURL: apiUrl
});

function PlayPage() {
  const [selectedGen, setSelectedGen] = useState([]);
  const [rounds, setRounds] = useState(5);
  const [btndisabled, setBtn] = useState(true);
  const [settingsVisible, setSettingsVisibility] = useState(true);
  const [settingsTransition, setSettingsTransition] = useState(true);
  const [gameVisible, setGameVisibility] = useState(false);
  const [gameTransition, setGameTransition] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [spriteIndex, setSpriteIndex] = useState(0);

  useEffect(() => {
    if(settingsVisible){
      setTimeout(() => {
        setSettingsTransition(true);
      }, 300);
    }else{
      setTimeout(() => {
        setSettingsTransition(false);
      }, 300);
    }
  }, [settingsVisible]);

  useEffect(() => {
    if(gameVisible){
      setTimeout(() => {
        setGameTransition(true);
      }, 300);
    }else{
      setTimeout(() => {
        setGameTransition(false);
      }, 300);
    }
  }, [gameVisible]);

  useEffect(() => {
    selectedGen.length === 0 ? setBtn(true) : setBtn(false);
  }, [selectedGen]);

  useEffect(() => {
    if(pokemon.length > 0){
      setTimeout(() => {
        setGameVisibility(true);
      }, 300);
    }
  }, [pokemon]);

  const startGame = async () => {
    setSettingsVisibility(false);
    setSelectedGen([]);
    setRounds(5);
    const reqBody : any = {
      "generation" : selectedGen,
      "rounds" : rounds
    }
    try{
      const response = await axiosInstance.post('/play', reqBody);
      setPokemon(response.data.pokemon);
    }catch(err){
      console.error('Error starting game: ', err);
    }
  }

  const onSwitchItemClick = (data : any) => {
    setSelectedGen((prevSelectedGen : any) => {
      if(prevSelectedGen.includes(data)){
        return prevSelectedGen.filter((gen : any) => gen !== data);
      }else{
        return [...prevSelectedGen, data];
      }
    });
  }

  const onNumberOfRoundsChange = (data : any) => {
    setRounds(data/5);
  }

  const switchItems : SwitchItem[] = [
    {
      switchLabel : "Generation 1",
      switchValue : 1,
      tooltipContent : "Red, Blue, Green, Yellow",
      onItemClick : onSwitchItemClick,
    },
    {
      switchLabel : "Generation 2",
      switchValue : 2,
      tooltipContent : "Gold, Silver, Crystal",
      onItemClick : onSwitchItemClick,
    },
    {
      switchLabel : "Generation 3",
      switchValue : 3,
      tooltipContent : "Emerald, Ruby, Sapphire",
      onItemClick : onSwitchItemClick,
    },
    {
      switchLabel : "Generation 4",
      switchValue : 4,
      tooltipContent : "Diamond, Pearl, Platinum",
      onItemClick : onSwitchItemClick,
    },
    {
      switchLabel : "Generation 5",
      switchValue : 5,
      tooltipContent : "Black, White",
      onItemClick : onSwitchItemClick,
    },
    {
      switchLabel : "Generation 6",
      switchValue : 6,
      tooltipContent : "X, Y, Omega Ruby, Alpha Sapphire",
      onItemClick : onSwitchItemClick,
    },
    {
      switchLabel : "Generation 7",
      switchValue : 7,
      tooltipContent : "Sun, Moon",
      onItemClick : onSwitchItemClick,
    },
    {
      switchLabel : "Generation 8",
      switchValue : 8,
      tooltipContent : "Sword, Shield, Brilliant Diamond, Shining Pearl",
      onItemClick : onSwitchItemClick,
    },
    {
      switchLabel : "Generation 9",
      switchValue : 9,
      tooltipContent : "Scarlet, Violet",
      onItemClick : onSwitchItemClick,
    },
  ];

  return (
    <div className="playpage-container flex flex-1">
      
      { 
        settingsTransition && 

        <div className={ `settings-container flex flex-1 flex-col justify-start p-6 gap-4 ${ settingsVisible ? 'opacity-1' : 'opacity-0' }` }>

          <div className="generation-wrapper flex flex-col gap-2">
            <span>Select Generation</span>
              <div className="switches-wrapper">
                <Switches items={ switchItems } />
              </div>
          </div>

          <div className="rounds-wrapper flex flex-col gap-2">
            <span>Number of Rounds: { rounds }</span>
            <div className="slider-wrapper w-1/2">
              <Slider  
              size="2"
              defaultValue={ [25] }
              min={ 5 }
              step={ 5 }
              onValueChange={ (value) => onNumberOfRoundsChange(value) }
              />
            </div>
          </div>

          <div className="playbtn-wrapper">
            <Button
            color="green"
            variant="soft"
            className="btn"
            disabled={ btndisabled }
            onClick={ () => startGame() }
            >
              Start Game
            </Button>
          </div>

        </div> 
      }

      {
        gameTransition && 

        <div className={ `game-container ${ gameVisible ? 'opacity-1' : 'opacity-0' }` }>

          {/* <div className="background-wrapper">
            <img 
            src={ Background } 
            alt="Pokemon Background" 
            />
          </div> */}
          
          <div className="sprite-wrapper">
            {
              <img 
              src={ pokemon[spriteIndex]?.sprite } 
              key={ pokemon[spriteIndex]?.id }
              alt="Pokemon Sprite"
              className="sprite" 
              />
              // pokemon.map(item => {
              //   return (
              //     <img 
              //     src={ item.sprite } 
              //     key={ item.id }
              //     alt="Pokemon Sprite"
              //     className="sprite" 
              //     />
              //   )
              // })
            }
          </div>
          
        </div>
      }

    </div>
  )
}

export default PlayPage;