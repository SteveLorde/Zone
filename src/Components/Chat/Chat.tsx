import {useState} from "react";
import {Message} from "../../Data/Models/Message.ts";
import {ChatService} from "../../Services/Chat/ChatService.ts";

export function Chat() {

    const chatService = new ChatService();
    const [messages, setMessages] = useState<Message[]>([]);

    return (
        <>
            {/*Chat Window*/}
            <div>

            </div>

            {/*Chat Input*/}
            <div>

                <button></button>
            </div>
        </>
    );
}