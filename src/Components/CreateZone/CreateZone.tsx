import {useForm} from "react-hook-form";
import {useContext} from "react";
import {MainContext} from "../../Services/State/MainContext.tsx";
import {NewZoneRequest} from "../../Data/Models/NewZoneRequest.ts";

export function CreateZone() {
    const {chatService} = useContext(MainContext);


    async function SubmitNewZone(newZoneFormData : NewZoneRequest) {
        const checkSubmit : boolean = await chatService.CreateZone(newZoneFormData);
        if (checkSubmit) {

        }
    }

    const {register: newZoneForm, handleSubmit: submitNewZoneForm} = useForm<NewZoneRequest>();

    return <>
        <div className={"grid grid-cols-2 gap-4 place-items-center"}>
            <div className={"order-1 flex flex-col gap-4 items-center"}>
                <h1 className={"text-3xl text-blue-500"}>Create A Zone</h1>
                <form className={"flex flex-col gap-4"} onSubmit={submitNewZoneForm(SubmitNewZone)}>
                    <p>Zone Name</p>
                    <input {...newZoneForm("title")} />
                </form>
            </div>
            <div className={"order-2 flex flex-col items-center"}>
                <img className={"hidden md:block z-0"} src="public/UI/CreateZoneForm.svg" alt={"createzoneform"} />
            </div>
        </div>

    </>;
}