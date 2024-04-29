import {useContext, useRef} from "react";
import {MainContext} from "../../../../Services/State/MainContext.tsx";
import {ProfilePicFallBack} from "../../../../Utilities/NullPic/ImageFallBack.ts";

export function ProfileTabPage() {

    const {authService} = useContext(MainContext);
    const profilePicElement = useRef<HTMLImageElement>(null);

    return (
        <>
            <p>PROFILE PAGE TEST</p>
            <div className={"flex flex-row flex-wrap gap-4"}>
                <div className={""}>
                    <img ref={profilePicElement} src={`${authService.backendUrl}/storage/users/${authService.activeUser.id}/profilepic.png`} alt={""} onError={() => ProfilePicFallBack(profilePicElement)} />
                </div>
                <div>
                    <h2>{authService.activeUser.userName}</h2>
                    {/*<p>{authService.activeUser.joinedon}</p>*/}
                </div>
            </div>
        </>
    );
}