import React from "react";
import {IAuthenticationService} from "../Authentication/IAuthenticationService.ts";
import {IChatService} from "../Chat/IChatService.ts";

export interface MainContextType {
    selectedTabNumber: number,
    setSelectedTab: React.Dispatch<React.SetStateAction<number>>,
    authService: IAuthenticationService
    chatService: IChatService
    visibleErrorWindow: boolean
    setErrorWindowVisible: React.Dispatch<React.SetStateAction<boolean>>
    closeErrorWindow: () => void
}