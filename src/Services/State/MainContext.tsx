import {createContext, useState} from "react";

export const MainContext = createContext({});

export function MainContextProvider({children} : {children: JSX.Element}) {
    const [selectedTab, setSelectedTab] = useState(0);

    function SelectTab(tabNumber : number) {
        setSelectedTab(tabNumber);
    }

    return <>
        <MainContext.Provider value={{selectedTab, SelectTab}}>
            {children}
        </MainContext.Provider>
    </>;
}