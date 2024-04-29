import {useContext, useEffect, useState} from "react";
import {MainContext} from "../../../../Services/State/MainContext.tsx";
import {useForm} from "react-hook-form";
import {User} from "../../../../Data/Models/User.ts";
import {Zone} from "../../../../Data/Models/Zone.ts";
import {ChatPanel} from "../../../Components/ChatPanel/ChatPanel.tsx";
import {Canvas} from "../../../Components/Canvas/Canvas.tsx";


interface JoinZoneRequest {
    zoneId : string
}

export function ZoneTabPage() {
    const {chatService, authService, setSelectedTab} = useContext(MainContext);
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
        setZoneUsers(joinedZoneData.joinedUsers);
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

            {!isZoneJoined && <div className={"tab gap-4"}>
                <form className={"flex flex-col items-center gap-4"} onSubmit={joinZoneSubmit(JoinZone)}>
                    <input className={"forminput"} type={"text"} placeholder={"insert zone id..."} {...joinZoneForm("zoneId")} />
                    <input className={"appbtn"} type={"submit"} value={"Join Zone"} />
                </form>
                <div className={"flex flex-col items-center"}>
                    <button className={"appbtn"} onClick={() => SelectCreateZoneTab()}>Create Zone</button>
                </div>
            </div>}

            {isZoneJoined && <section>
                <div className={"tab"}>
                {/*ChatPanel Component*/}
                    <ChatPanel zone={zone} zoneUsers={zoneUsers} chatService={chatService} authService={authService}/>
                    {/*Canvas Component*/}
                    <Canvas/>
                </div>
            </section>
            }
        </>
    );
}