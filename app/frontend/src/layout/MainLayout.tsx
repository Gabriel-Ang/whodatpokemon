import AppBar, { AppbarItem } from "./AppBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

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
        <Theme className="flex flex-col" appearance="dark">
            <AppBar
            logo={ appbarLogo }
            menuItems={ appbarItems }
            onItemSelect={ handleAppbarItemSelect }
            />
            <div className="content flex flex-1">
                <Outlet />
            </div>
        </Theme>
    </>
    )
}

export default MainLayout;