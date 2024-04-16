import {Navbar} from "../../Components/Navbar/Navbar.tsx";
import {useState,useEffect} from "react";

export function Dashboard() {
    const [loadedTab, setLoadedTab] = useState<number>(0);

    useEffect(() => {

    }, []);

    return (
        <>
            <Navbar/>
            {/*Dashboard Tabs and Content*/}

        </>
    );
}