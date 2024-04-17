import{createContext, useState} from "react";
import {IChatService} from "../Chat/IChatService.ts";
import {ChatService} from "../Chat/ChatService.ts";
import {IAuthenticationService} from "../Authentication/IAuthenticationService.ts";
import {AuthenticationService} from "../Authentication/AuthenticationService.ts";

interface MainContextType {
    selectedTabNumber : number,
    setSelectedTab: React.Dispatch<React.SetStateAction<number>>,
    authService : IAuthenticationService
    chatService : IChatService
}

export const MainContext = createContext<MainContextType>({
    selectedTabNumber: 0,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSelectedTab(_value: ((prevState: number) => number) | number): void {},
    authService: {} as AuthenticationService,
    chatService: {} as ChatService
});

export function MainContextProvider({children} : {children: JSX.Element}) {

    const _authService : IAuthenticationService = new AuthenticationService();
    const _chatService : IChatService = new ChatService(_authService);

    const [selectedTab, setSelectedTab] = useState(0);

    const contextValue : MainContextType = {
        selectedTabNumber: selectedTab,
        setSelectedTab: setSelectedTab,
        authService: _authService,
        chatService: _chatService
    };

    return <>
        <MainContext.Provider value={contextValue}>
            {children}
        </MainContext.Provider>
    </>;
}