import { RxCross2 } from "react-icons/rx";

function PopUp(props) {
    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen">
            <div className="relative z-20 bg-white border rounded-lg">
                <div className="flex justify-end">
                    <RxCross2
                        onClick={() => props.setState(false)}
                        className="inline-block text-white p-1 rounded-full h-[25px] w-[25px] bg-first translate-x-[50%] translate-y-[-50%] press-3"
                    />
                </div>
                <div>{props.children}</div>{" "}
            </div>
            <div className="absolute top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50"></div>
        </div>
    );
}

export default PopUp;
