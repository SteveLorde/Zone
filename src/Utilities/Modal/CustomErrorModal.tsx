
export function CustomErrorModal({Type, Message, CloseWindow} : {Type : boolean, Message : string, CloseWindow: () => void}) {

    return (
        <>
            <div className={"flex flex-col items-center p-5 gap-3"}>
                {Type}
                {Message}
                <button onClick={() => CloseWindow}>Close</button>
            </div>
        </>
    );
}