import {useContext} from "react";
import {MainContext} from "../../../../Services/State/MainContext.tsx";

export function ProfileTabPage() {

    const {authService} = useContext(MainContext);

    return (
        <>
            <div className={"flex flex-row flex-wrap gap-4"}>
                <div className={""}>
                    <img src="" alt={""} />
                </div>
                <div>
                    <h2>{authService.activeUser.userName}</h2>
                    {/*<p>{authService.activeUser.joinedon}</p>*/}
                </div>
            </div>
        </>
    );
}