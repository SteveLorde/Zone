import "./ProfileTab.scss";
import {useContext, useRef} from "react";
import {MainContext} from "../../../../Services/State/MainContext.tsx";
//import {ProfilePicFallBack} from "../../../../Utilities/NullPic/ImageFallBack.ts";

export function ProfileTabPage() {

    const {authService} = useContext(MainContext);
    const profilePicElement = useRef<HTMLImageElement>(null);

    return (
        <>
            <div className={"tab"}>
                <div className={""}>
                    {authService.isLoggedIn ? <img className="profilepic" ref={profilePicElement} src={`${authService.backendUrl}/storage/users/${authService.activeUser.id}/profilepic.png`} alt={""}/> : <img className="profilepic" src="UI/nulluserpic.svg" alt={"profilepic"} /> }
                </div>
                <div>
                    <h2 className={"text1"}>{authService.activeUser.userName}</h2>
                    <p className={"text1"}>{authService.activeUser.registeredOn?.toDateString()}</p>
                </div>
            </div>
        </>
    );
}