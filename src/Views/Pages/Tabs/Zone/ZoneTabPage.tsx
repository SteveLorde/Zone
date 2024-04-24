import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {MainContext} from "../../../../Services/State/MainContext.tsx";
import {useForm} from "react-hook-form";
import {User} from "../../../../Data/Models/User.ts";
import {Zone} from "../../../../Data/Models/Zone.ts";
import {ChatPanel} from "../../../Components/ChatPanel/ChatPanel.tsx";
import {Canvas} from "../../../Components/Canvas/Canvas.tsx";
import {ChatService} from "../../../../Services/Chat/ChatService.ts";


interface JoinZoneRequest {
    zoneId : string
}

export function ZoneTabPage() {
    const {chatService, authService, setSelectedTab} = useContext(MainContext);
    const navigation = useNavigate();
    const [zone ,setZone] = useState<Zone>({} as Zone);
    const [isZoneJoined, setIsZoneJoined] = useState<boolean>(false);
    const [zoneUsers, setZoneUsers] = useState<User[]>([]);
    const {register: joinZoneForm, handleSubmit : joinZoneSubmit} = useForm<JoinZoneRequest>();

    //REAL TIME CANVAS NOT IMPLEMENTED YET!
    //const [canvasNotes, setCanvasNotes] = useState<Notes[]>([]);

    function SelectCreateZoneTab() {
        setSelectedTab(3);
    }

    function JoinZone(joinZoneFormData : JoinZoneRequest) {
        const joinedZoneData = chatService.JoinZone(joinZoneFormData.zoneId);
        setZone(joinedZoneData);
        setIsZoneJoined(true);
    }
    
    function IsJoinedZone() {
        const findJoinedZoneId = chatService.IsJoinedZone();
        if (findJoinedZoneId !== "") {
            chatService.JoinZone(findJoinedZoneId);
        }
    }


    useEffect(() => {
        IsJoinedZone();
    }, []);



    return (
        <>
            {!isZoneJoined && <div className={"flex flex-col gap-3 items-center"}>
                <form onSubmit={joinZoneSubmit(JoinZone)}>
                    <input type={"number"} placeholder={"insert zone id"} {...joinZoneForm("zoneId")} />
                    <input type={"submit"} value={"Join Zone"} />
                </form>
                <button onClick={() => SelectCreateZoneTab()}>Create Zone</button>
            </div>}

            {isZoneJoined && <section>
                {/*ChatPanel Component*/}
                <ChatPanel zone={zone} zoneUsers={zoneUsers} chatService={chatService} authService={authService}/>
                {/*Canvas Component*/}
                <Canvas/>
            </section>
            }
        </>
    );
}