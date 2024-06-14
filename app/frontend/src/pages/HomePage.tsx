import { Button } from '@radix-ui/themes';
import { Link } from "react-router-dom";

function HomePage() {
  const printPlay = () => {
    console.log('play');
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <Button onClick={ printPlay }>
        <Link to="/play">Play Now</Link>
      </Button>
    </div>
    
  )
}

export default HomePage