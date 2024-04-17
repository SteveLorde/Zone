import {useContext, useState} from "react";
import {Message} from "../../../Data/Models/Message.ts";
import {useNavigate} from "react-router-dom";
import {MainContext} from "../../../Services/State/MainContext.tsx";
import {useForm} from "react-hook-form";


interface JoinZoneRequest {

}

export function ZoneTabPage() {
    const {chatService} = useContext(MainContext);
    const navigation = useNavigate();
    const [isZoneJoined, setIsZoneJoined] = useState<boolean>(false);
    const {register: joinZoneForm, handleSubmit : joinZoneSubmit} = useForm<JoinZoneRequest>();
    const [chatMessages, setChatMessages] = useState<Message[]>([]);

    //REAL TIME CANVAS NOT IMPLEMENTED YET!
    //const [canvasNotes, setCanvasNotes] = useState<Notes[]>([]);


    function JoinZone(joinZoneFormData : JoinZoneRequest) {
        chatService.JoinZone();
    }

    function NavigateToCreateZone() {
        navigation("createzone");
    }

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
                    <div>

                    </div>
                    {/*Chat Input*/}
                    <div>
                        <input type={"text"} />
                    </div>
                </div>

                {/*Canvas Panel*/}

            </section>

        </>
    );
}