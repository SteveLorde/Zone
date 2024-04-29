import React from "react";
import {IAuthenticationService} from "../Authentication/IAuthenticationService.ts";
import {IChatService} from "../Chat/IChatService.ts";

export interface MainContextType {
    selectedTabNumber: number,
    setSelectedTab: React.Dispatch<React.SetStateAction<number>>,
    authService: IAuthenticationService
    chatService: IChatService
    isErrorModalVisible: boolean
    setErrorModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    closeErrorModal: () => void
}