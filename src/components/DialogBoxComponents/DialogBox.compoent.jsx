import { RxCross2 } from "react-icons/rx";

function DialogBox(props) {
    return (
        <div
            className={`fixed top-0 left-0 items-center justify-center w-screen h-screen z-50 ${
                props.state ? " flex " : " hidden "
            } `}
        >
            <div className="relative z-20 bg-white rounded-lg max-w-[90%]">
                <div className="flex justify-end rounded-t-lg bg-first">
                    <RxCross2
                        onClick={() => props.setState(false)}
                        className="inline-block p-1 rounded-full h-[25px] w-[25px] bg-white translate-x-[50%] translate-y-[-50%] press-3"
                    />
                </div>
                <div className="flex items-end justify-between gap-10 px-5 pb-3 text-white bg-first">
                    <h1 className="text-3xl font-[300]">{props.title1}</h1>
                    <h4 className="pb-0.5 text-sm">{props.title2}</h4>
                </div>
                <div className="px-5 pb-5">{props.children}</div>
            </div>
            <div className="absolute top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50"></div>
        </div>
    );
}

export default DialogBox;
