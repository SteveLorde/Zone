import React, {createContext, useState} from "react";
import {IChatService} from "../Chat/IChatService.ts";
import {ChatService} from "../Chat/ChatService.ts";
import {IAuthenticationService} from "../Authentication/IAuthenticationService.ts";
import {AuthenticationService} from "../Authentication/AuthenticationService.ts";

interface MainContextType {
    selectedTabNumber : number,
    setSelectedTab: React.Dispatch<React.SetStateAction<number>>,
    authService : IAuthenticationService
    chatService : IChatService
    visibleErrorWindow : boolean
    setErrorWindowVisible : React.Dispatch<React.SetStateAction<boolean>>
    closeErrorWindow : () => void
}

export const MainContext = createContext<MainContextType>({
    selectedTabNumber: 0,
    setSelectedTab: () => {},
    authService: {} as AuthenticationService,
    chatService: {} as ChatService,
    visibleErrorWindow: false,
    setErrorWindowVisible: () => {},
    closeErrorWindow: () => {}
});

export function MainContextProvider({children} : {children: JSX.Element}) {

    const _authService : IAuthenticationService = new AuthenticationService();
    const _chatService : IChatService = new ChatService(_authService);

    const [selectedTab, setSelectedTab] = useState(0);
    const [isErrorVisible, setErrorVisible] = useState<boolean>(false);

    function CloseErrorWindow() {
        setErrorVisible(false);
    }

    const contextValue : MainContextType = {
        selectedTabNumber: selectedTab,
        setSelectedTab: setSelectedTab,
        authService: _authService,
        chatService: _chatService,
        visibleErrorWindow : isErrorVisible,
        setErrorWindowVisible: setErrorVisible,
        closeErrorWindow : CloseErrorWindow
    };

    return <>
        <MainContext.Provider value={contextValue}>
            {children}
        </MainContext.Provider>
    </>;
}