import "../App.css";

interface Props{
    logo : any;
    menuItems : string[];
    onItemSelect : (data : any) => void;
}

function AppBar({ logo, menuItems, onItemSelect } : Props) {
  return (
    <div className="flex flex-row appbar items-center w-full">
        <div className="logo flex flex-1 justify-center">
            { logo }
        </div>
        <div className="menu flex flex-row flex-1 justify-evenly">
            { menuItems.map((item, index) => (
                <span 
                className="menu-item cursor-pointer hover:bg-sky-500 transition duration-150 ease-out hover:ease-in p-2"
                key={ item } 
                onClick={ () => onItemSelect(index) }
                >
                    { item }
                </span>
            ))}
        </div>
    </div>
  )
}

export default AppBar