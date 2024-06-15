import { useState, useEffect } from "react";
import CheckboxCard, { CheckboxCardItem } from "../components/CheckboxCard";
import { Slider } from "@radix-ui/themes";

function PlayPage() {

  const [selectedGen, setSelectedGen] = useState([]);
  const [rounds, setRounds] = useState(10);

  useEffect(() => {
    console.log(selectedGen);
  }, [selectedGen]);

  const onCheckboxCardItemClick = (data : any) => {
    console.log(data);
    setSelectedGen((prevSelectedGen : any) => {
      if(prevSelectedGen.includes(data)){
        return prevSelectedGen.filter((gen : any) => gen !== data);
      }else{
        return [...prevSelectedGen, data];
      }
    });
  }

  const onNumberOfRoundsChange = (data : any) => {
    console.log(data / 5);
    setRounds(data/5);
  }

  const checkboxCardItems : CheckboxCardItem[] = [
    {
      primaryText : 'Gen I',
      secondaryText : 'Pokemon Red, Blue, Green, Yellow',
      value : 'gen1',
      onItemClick : onCheckboxCardItemClick
    },
    {
      primaryText : 'Gen II',
      secondaryText : 'Pokemon Gold, Silver, Crystal',
      value : 'gen2',
      onItemClick : onCheckboxCardItemClick
    },
    {
      primaryText : 'Gen II',
      secondaryText : 'Pokemon Emerald, Ruby, Sapphire',
      value : 'gen3',
      onItemClick : onCheckboxCardItemClick
    },
    {
      primaryText : 'Gen IV',
      secondaryText : 'Pokemon Diamond, Pearl',
      value : 'gen4',
      onItemClick : onCheckboxCardItemClick
    },
  ];

  return (
    <div className="playpage-container flex flex-1 flex-col">
      Generation
      <CheckboxCard
      items={ checkboxCardItems }
      />
      Number of Rounds: { rounds }
      <div className="slider-wrapper w-1/2">
        <Slider  
        size="2"
        defaultValue={ [50] }
        min={ 5 }
        step={ 5 }
        onValueChange={ (value) => onNumberOfRoundsChange(value) }
        />
      </div>
    </div>
  )
}

export default PlayPage;