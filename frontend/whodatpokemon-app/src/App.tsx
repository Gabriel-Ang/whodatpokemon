import { useState } from 'react'
import AppBar from './components/AppBar'
import './App.css'

function App() {
  const [appbarIndex, setAppbarIndex] = useState(0);
  const appbarItems : string[] = ['Page1', 'Log In', 'Play Now'];
  const appbarLogo : any = 'Who Dat Pokemon?'
  const handleAppbarItemSelect = (data : any) => {
    console.log(data);
    setAppbarIndex(data);
  }

  return (
    <>
      <AppBar
        logo={ appbarLogo }
        menuItems={ appbarItems }
        onItemSelect={ handleAppbarItemSelect }
      />
      { appbarIndex }
    </>
  )
}

export default App