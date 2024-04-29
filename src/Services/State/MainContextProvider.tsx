import React, {useState} from "react";
import {IAuthenticationService} from "../Authentication/IAuthenticationService.ts";
import {AuthenticationService} from "../Authentication/AuthenticationService.ts";
import {IChatService} from "../Chat/IChatService.ts";
import {ChatService} from "../Chat/ChatService.ts";
import {MainContextType} from "./MainContextType.ts";
import {MainContext} from "./MainContext.tsx";

export function MainContextProvider({children}: { children: React.ReactElement }) {

    const _authService: IAuthenticationService = new AuthenticationService();
    const _chatService: IChatService = new ChatService(_authService);

    const [selectedTab, setSelectedTab] = useState(0);
    const [isErrorModalVisible, setErrorModalVisible] = useState<boolean>(false);

    function CloseErrorWindow() {
        setErrorModalVisible(false);
    }

    const contextValue: MainContextType = {
        selectedTabNumber: selectedTab,
        setSelectedTab: setSelectedTab,
        authService: _authService,
        chatService: _chatService,
        isErrorModalVisible: isErrorModalVisible,
        setErrorModalVisible: setErrorModalVisible,
        closeErrorModal: CloseErrorWindow
    };

    return <>
        <MainContext.Provider value={contextValue}>
            {children}
        </MainContext.Provider>
    </>;
}