import { Button } from '@radix-ui/themes';
import { Link } from "react-router-dom";

function HomePage() {
  const printPlay = () => {
    console.log('play');
  }

  return (
    <div className="flex flex-1 items-center justify-center">
        {/* cursor-pointer not showing  */}
        <div className="cursor-pointer"> 
          <Link to="/play">
            <Button onClick={ printPlay }>
              Play Now
            </Button>
          </Link>
        </div>
        
    </div>
    
  )
}

export default HomePage