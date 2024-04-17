import {useContext, useEffect, useState} from "react";
import {Message} from "../../../Data/Models/Message.ts";
import {useNavigate} from "react-router-dom";
import {MainContext} from "../../../Services/State/MainContext.tsx";
import {useForm} from "react-hook-form";
import {User} from "../../../Data/Models/User.ts";
import {Zone} from "../../../Data/Models/Zone.ts";


interface JoinZoneRequest {
    zoneId : string
}

export function ZoneTabPage() {
    const {chatService} = useContext(MainContext);
    const navigation = useNavigate();
    const [zone ,setZone] = useState<Zone>();
    const [isZoneJoined, setIsZoneJoined] = useState<boolean>(false);
    const [zoneUsers, setZoneUsers] = useState<User[]>([]);
    const {register: joinZoneForm, handleSubmit : joinZoneSubmit} = useForm<JoinZoneRequest>();
    const [chatMessages, setChatMessages] = useState<Message[]>([]);

    //REAL TIME CANVAS NOT IMPLEMENTED YET!
    //const [canvasNotes, setCanvasNotes] = useState<Notes[]>([]);


    function JoinZone(joinZoneFormData : JoinZoneRequest) {
        const joinedZoneData = chatService.JoinZone(joinZoneFormData.zoneId);
        setZone(joinedZoneData);
        setIsZoneJoined(true);
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

    async function ListenToChat() {
        if (chatService.isChatServiceConnected) {
            const message = chatService.ListenToChat();
            setChatMessages([...chatMessages,message]);
        }
    }

    function NavigateToCreateZone() {
        navigation("createzone");
    }

    useEffect(() => {
      ListenToChat();
    });

    return (
        <>
            {isZoneJoined && <div className={"flex flex-col gap-3 items-center"}>
                <form onSubmit={joinZoneSubmit(JoinZone)}>
                    <input type={"number"} placeholder={"insert zone id"} />
                    <input type={"submit"} value={"Join Zone"} />
                </form>
                <button onClick={() => NavigateToCreateZone()}>Create Zone</button>
            </div>}

            <section>
                {/*Chat Panel*/}
                <div>
                    {/*Chat Block*/}
                    <div className={"messagewindow"}>
                        {chatMessages.map( (message : Message) =>
                            <div className={"message"}>

                                <img className={"messageuseravatar"} src={`storage/${FindMessageUser(message.userId)}/`} alt={} />
                                <p className={"messagecontent"}>{message.content}</p>
                            </div>
                        )}
                    </div>
                    {/*Chat Input*/}
                    <div>
                        <input className={"messageinput"} type={"text"} />
                        <button className={"submitmessagebutton"}>
                            <img className={"submitmessagebuttonimage"} src=""  alt="submit message"/>
                        </button>
                    </div>
                </div>

                {/*Canvas Panel*/}

            </section>

        </>
    );
}