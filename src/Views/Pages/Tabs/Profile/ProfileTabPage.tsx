import {useContext} from "react";
import {MainContext} from "../../../../Services/State/MainContext.tsx";

export function ProfileTabPage() {

    const {authService} = useContext(MainContext);

    return (
        <>
            <p>PROFILE PAGE TEST</p>
            <div className={"flex flex-row flex-wrap gap-4"}>
                <div className={""}>
                    <img src={`${authService.backendUrl}/storage/users/${authService.activeUser.id}/profilepic.png`} alt={""} />
                </div>
                <div>
                    <h2>{authService.activeUser.userName}</h2>
                    {/*<p>{authService.activeUser.joinedon}</p>*/}
                </div>
            </div>
        </>
    );
}