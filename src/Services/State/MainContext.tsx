import {createContext} from "react";
import {ChatService} from "../Chat/ChatService.ts";
import {AuthenticationService} from "../Authentication/AuthenticationService.ts";
import {MainContextType} from "./MainContextType.ts";

export const MainContext = createContext<MainContextType>({
    selectedTabNumber: 0,
    setSelectedTab: () => {},
    authService: {} as AuthenticationService,
    chatService: {} as ChatService,
    visibleErrorWindow: false,
    setErrorWindowVisible: () => {},
    closeErrorWindow: () => {}
});

