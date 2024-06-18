// hooks
import { useState, useEffect } from "react";

// components
import CheckboxCard, { CheckboxCardItem } from "../components/CheckboxCard";
import Switches, { SwitchItem } from "../components/Switches";

// radix ui
import { Slider, Button } from "@radix-ui/themes";

import '../index.css';

function PlayPage() {

  const [selectedGen, setSelectedGen] = useState([]);
  const [rounds, setRounds] = useState(5);

  useEffect(() => {
    console.log(selectedGen);
  }, [selectedGen]);

  const onSwitchItemClick = (data : any) => {
    console.log(data);
    setSelectedGen((prevSelectedGen : any) => {
      if(prevSelectedGen.includes(data)){
        return prevSelectedGen.filter((gen : any) => gen !== data);
      }else{
        return [...prevSelectedGen, data];
      }
    });
  }

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

  const switchItems : SwitchItem[] = [
    {
      switchLabel : "Generation I",
      switchValue : "gen1",
      tooltipContent : "Red, Blue, Green, Yellow",
      onItemClick : onSwitchItemClick,
    },
    {
      switchLabel : "Generation II",
      switchValue : "gen2",
      tooltipContent : "Gold, Silver, Crystal",
      onItemClick : onSwitchItemClick,
    },
    {
      switchLabel : "Generation III",
      switchValue : "gen3",
      tooltipContent : "Emerald, Ruby, Sapphire",
      onItemClick : onSwitchItemClick,
    },
  ];

  return (
    <div className="playpage-container flex flex-1 flex-col">

      <div className="generation-wrapper">
        <span>Generation</span>
          <div className="switches-wrapper">
            <Switches items={ switchItems } />
          </div>
        {/* <CheckboxCard
        items={ checkboxCardItems }
        /> */}
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

      {/* <div className="switches-wrapper">
        <Switches items={ switchItems } />
      </div> */}

      <div className="playbtn-wrapper">
        <Button
        color="green"
        variant="soft"
        className="btn"
        >
          Let's Go!
        </Button>
      </div>

    </div>
  )
}

export default PlayPage;