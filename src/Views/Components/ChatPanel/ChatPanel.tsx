import {useEffect, useState} from "react";
import {Message} from "../../../Data/Models/Message.ts";
import {User} from "../../../Data/Models/User.ts";
import {Zone} from "../../../Data/Models/Zone.ts";
import {IChatService} from "../../../Services/Chat/IChatService.ts";
import {IAuthenticationService} from "../../../Services/Authentication/IAuthenticationService.ts";
import "./ChatPanel.module.scss";
import {backendUrl} from "../../../Services/API.ts";

export function ChatPanel({zone, zoneUsers, chatService, authService} : {zone : Zone, zoneUsers: User[], chatService : IChatService, authService: IAuthenticationService}) {
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [selectedTab, setTab] = useState<number>(1);

    function SelectTab(tabNumber : number) {
        setTab(tabNumber);
    }


    function FindMessageUser(messageUserId : string) {
        let user = {} as User;
        for (let i = 0; i < zoneUsers.length - 1; i++) {
            if (messageUserId === zoneUsers[i].id) {
                user = zoneUsers[i];
                break;
            }
        }
        return user;
    }

    async function ListenToMessages() {
        if (chatService.isChatServiceConnected) {
            const message = chatService.ListenToChat();
            setChatMessages([...chatMessages,message]);
        }
    }

    function HandleInputChange(eventInputText: React.ChangeEvent<HTMLInputElement>) {
        setInputMessage(eventInputText.target.value);
    }

    function SendMessage() {
        if (chatService.isChatServiceConnected) {
            const newMessage : Message = {zoneId: zone.id, userId: authService.activeUser.id, content: inputMessage, date: Date.now().toString()} as Message;
            chatService.SendMessage(newMessage);
        }
    }

    useEffect(() => {
        ListenToMessages();
    });

    return (
        <>
            {/*ChatPanel Panel*/}

            <div className={"chatpanel"}>
                <div>
                    <button onClick={() => SelectTab(0)}>Connected Users
                        ${zoneUsers.length > 0 ? zoneUsers.length : 0}</button>
                    <button onClick={() => SelectTab(1)}>Chat</button>
                </div>
                {selectedTab === 0 &&
                    <section>
                        {zoneUsers?.map((user: User) =>
                            <div>
                                <img src={`${backendUrl}/storage/users/${user.id}/profilepic.png`} alt={`${user.userName}`}/>
                                <p>{user.userName}</p>
                            </div>
                    )}
                    </section>
                }

                {selectedTab === 1 &&
                    <section>
                        <div className={"messagewindow"}>
                            {chatMessages.map((message: Message) =>
                                <div className={"message"}>
                                    <img className={"messageuseravatar"}
                                         src={`${backendUrl}/storage/users/${FindMessageUser(message.userId)}/profilepic.png`} alt={"ProfileImage"}/>
                                    <p className={"messagecontent"}>{message.content}</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <input className={"messageinput"} type={"text"}
                                   onChange={(event) => HandleInputChange(event)}/>
                            <button onClick={() => SendMessage()} className={"submitmessagebutton"}>
                                <img className={"submitmessagebuttonimage"}
                                     src="../../../../public/UI/ChatInputButton.svg" alt="submit message"/>
                            </button>
                        </div>
                    </section>
                }
            </div>
        </>
    );
}