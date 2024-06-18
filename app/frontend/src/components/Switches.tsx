import { Switch } from '@radix-ui/themes';
import { Tooltip } from "@radix-ui/themes";
import { InfoCircledIcon } from '@radix-ui/react-icons';

export interface SwitchItem {
    switchLabel : string;
    switchValue : string;
    tooltipContent : string;
    onItemClick : (data: any) => void;
}

interface Props {
    items : SwitchItem[];
}

const Switches = ({ items } : Props) => {
  return (
    <>
        <div className="switches flex flex-col gap-4">
            { items.map(item => {
                return (
                    <div className="switch flex gap-4">
                        <div 
                        className="switch-label" 
                        style={{ minWidth : '150px'}}
                        >
                            { item.switchLabel }
                        </div>
                        <div className="switch-btn">
                            <Switch 
                            color="green"
                            onClick={ () => item.onItemClick(item.switchValue)}
                            key={item.switchValue}
                             />
                        </div>
                        <div className="switch-tooltip">
                            <Tooltip content={item.tooltipContent}>
                                <InfoCircledIcon width="20" height="20" />
                            </Tooltip>
                        </div>  
                    </div>
                )
            })}
        </div>
    </>
  )
}

export default Switches;