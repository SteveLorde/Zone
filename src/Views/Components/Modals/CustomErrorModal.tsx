import {useContext} from "react";
import {MainContext} from "../../../Services/State/MainContext.tsx";

export function CustomErrorModal({Type, Message} : {Type : boolean, Message : string}) {
    const {closeErrorModal} = useContext(MainContext);

    return (
        <>
            <div className={"flex flex-col items-center p-5 gap-3"}>
                {Type}
                {Message}
                <button onClick={() => closeErrorModal}>Close</button>
            </div>
        </>
    );
}