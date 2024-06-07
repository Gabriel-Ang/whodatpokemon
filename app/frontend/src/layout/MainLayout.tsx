import AppBar from "../components/AppBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppbarItem } from "../components/AppBar";

function MainLayout() {
    const [appbarIndex, setAppbarIndex] = useState(0);
    const appbarItems : AppbarItem[] = [
        {
            label: 'Home',
            route: '/'
        },
        {
            label: 'Log In',
            route: '/asdasd'
        },
        {
            label: 'Play',
            route: '/play'
        }
    ];
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
        <Outlet />
    </>
    )
}

export default MainLayout