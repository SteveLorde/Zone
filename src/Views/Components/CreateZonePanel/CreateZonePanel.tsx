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

    const {register: newZoneForm, handleSubmit: submitNewZoneForm, formState: {errors: createZoneErrors}} = useForm<NewZoneRequest>();

    return <>
        <div className={"flex flex-col md:grid grid-cols-2 gap-4 bg-white m-4 p-4 h-[100vh]"}>

            <div className={"order-1 flex flex-col gap-4 items-center"}>
                <button className={"appbtn"} onClick={() => setSelectedTab(1)}>Back</button>
                <h1 className={"text1 text-3xl"}>Create A Zone</h1>
                <form ref={createZoneFormRef} className={"flex flex-col gap-4"}
                      onSubmit={submitNewZoneForm(SubmitNewZone)}>
                    <p className={"formtitle"}>Zone Name</p>
                    <input className={"forminput"} placeholder={"Zone Name..."} {...newZoneForm("title", {required: true, minLength: 3})} />
                    <div>
                        {createZoneErrors.title?.type === "required" && <span className={"text-red-500"}>please fill zone title</span>}
                        {createZoneErrors.title?.type === "minLength" && <span className={"text-red-500"}>please type zone title of at least 3 letters</span>}
                    </div>
                    <div className={"flex flex-row items-center gap-2"}>
                        <p className={"formtitle"}>Zone Password</p>
                        <p className={"text-xl text-gray-300"}>Optional*</p>
                    </div>
                    <input className={"forminput"} placeholder={"Zone Password..."} {...newZoneForm("title")} />
                    <input className={"appbtn p-3 text-white"} type={"submit"}
                           value={"Create Zone"}/>
                </form>
            </div>
            <div className={"order-2 flex flex-col items-center"}>
                <img className={"rightsideimg hidden md:block"} src="UI/CreateZoneForm.svg" alt={"createzoneform"} />
            </div>
        </div>

    </>;
}