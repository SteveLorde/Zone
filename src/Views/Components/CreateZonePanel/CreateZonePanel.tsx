import {useForm} from "react-hook-form";
import {useContext, useRef} from "react";
import {MainContext} from "../../../Services/State/MainContext.tsx";
import {NewZoneRequest} from "../../../Data/Models/Requests/NewZoneRequest.ts";
import "./CreateZonePanel.scss";

export function CreateZonePanel() {
    const {chatService, setSelectedTab} = useContext(MainContext);
    const createZoneFormRef = useRef<HTMLFormElement>(null);

    async function SubmitNewZone(newZoneFormData : NewZoneRequest) {
        const checkSubmitZoneId : string = await chatService.CreateZone(newZoneFormData);
        if (checkSubmitZoneId !== "" && "error creating zone") {
            chatService.SetJoinedZone(checkSubmitZoneId);
            createZoneFormRef.current?.reset();
            setSelectedTab(1);
        }
    }

    const {register: newZoneForm, handleSubmit: submitNewZoneForm} = useForm<NewZoneRequest>();

    return <>
        <div className={"grid grid-cols-2 gap-4 place-items-center"}>
            <div className={"order-1 flex flex-col gap-4 items-center"}>
                <h1 className={"text-3xl text-blue-500"}>Create A Zone</h1>
                <form ref={createZoneFormRef} className={"flex flex-col gap-4"} onSubmit={submitNewZoneForm(SubmitNewZone)}>
                    <p className={"formtitle"}>Zone Name</p>
                    <input className={"forminput"} {...newZoneForm("title")} />
                    <input className={"formsubmitbtn p-3 bg-blue-500 text-white"} type={"submit"} value={"Create Zone"} />
                </form>
            </div>
            <div className={"order-2 flex flex-col items-center"}>
                <img className={"rightsideimg hidden md:block"} src="public/UI/CreateZoneForm.svg" alt={"createzoneform"} />
            </div>
        </div>

    </>;
}