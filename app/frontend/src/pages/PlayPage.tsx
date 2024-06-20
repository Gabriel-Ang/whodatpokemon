// hooks
import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders, AxiosInstance } from 'axios';
// components
import Switches, { SwitchItem } from "../components/Switches";
// radix ui
import { Slider, Button } from "@radix-ui/themes";
// styles
import '../index.css';

const apiUrl = import.meta.env.VITE_APP_URL_DEV;
const axiosInstance = axios.create({
  baseURL: apiUrl
});

function PlayPage() {

  const [selectedGen, setSelectedGen] = useState([]);
  const [rounds, setRounds] = useState(5);
  const [btndisabled, setBtn] = useState(true);

  useEffect(() => {
    disableBtn();
  }, [selectedGen]);

  const disableBtn = () => {
    selectedGen.length === 0 ? setBtn(true) : setBtn(false);
  }

  const startGame = async () => {
    const reqBody : any = {
      "generation" : selectedGen,
      "rounds" : rounds
    }
    try{
      const response = await axiosInstance.post('/play', reqBody);
      console.log(response);
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
    <div className="playpage-container flex flex-1 flex-col justify-evenly">

      <div className="generation-wrapper">
        <span>Generation</span>
          <div className="switches-wrapper">
            <Switches items={ switchItems } />
          </div>
      </div>

      <div className="rounds-wrapper">
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
          Let's Go!
        </Button>
      </div>

    </div>
  )
}

export default PlayPage;