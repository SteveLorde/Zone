import {useContext, useEffect, useState} from "react";
import {Message} from "../../../Data/Models/Message.ts";
import {useNavigate} from "react-router-dom";
import {MainContext} from "../../../Services/State/MainContext.tsx";
import {useForm} from "react-hook-form";
import {User} from "../../../Data/Models/User.ts";
import {Zone} from "../../../Data/Models/Zone.ts";
import {ChatPanel} from "../../../Components/ChatPanel/ChatPanel.tsx";
import {Canvas} from "../../../Components/Canvas/Canvas.tsx";


interface JoinZoneRequest {
    zoneId : string
}

export function ZoneTabPage() {
    const {chatService, authService} = useContext(MainContext);
    const navigation = useNavigate();
    const [zone ,setZone] = useState<Zone>({} as Zone);
    const [isZoneJoined, setIsZoneJoined] = useState<boolean>(false);
    const [zoneUsers, setZoneUsers] = useState<User[]>([]);
    const {register: joinZoneForm, handleSubmit : joinZoneSubmit} = useForm<JoinZoneRequest>();

    //REAL TIME CANVAS NOT IMPLEMENTED YET!
    //const [canvasNotes, setCanvasNotes] = useState<Notes[]>([]);

    function JoinZone(joinZoneFormData : JoinZoneRequest) {
        const joinedZoneData = chatService.JoinZone(joinZoneFormData.zoneId);
        setZone(joinedZoneData);
        setIsZoneJoined(true);
    }

    function NavigateToCreateZone() {
        navigation("createzone");
    }

    return (
        <>
            {isZoneJoined && <div className={"flex flex-col gap-3 items-center"}>
                <form onSubmit={joinZoneSubmit(JoinZone)}>
                    <input type={"number"} placeholder={"insert zone id"} {...joinZoneForm("zoneId")} />
                    <input type={"submit"} value={"Join Zone"} />
                </form>
                <button onClick={() => NavigateToCreateZone()}>Create Zone</button>
            </div>}

            <section>
                {/*ChatPanel Component*/}
                <ChatPanel zone={zone} zoneUsers={zoneUsers} chatService={chatService} authService={authService}/>
                {/*Canvas Component*/}
                <Canvas />
            </section>

        </>
    );
}