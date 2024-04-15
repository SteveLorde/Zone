
export function CustomModal({Type, Message} : {Type : boolean, Message : string}) {

    return (
        <>
            <div className={"flex flex-col items-center p-5 gap-3"}>
                {Type}
                {Message}
            </div>
        </>
    );
}