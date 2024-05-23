import { useState } from "react";

let [pandingRequests, setPandingRequests] = [null, null];

async function FetchData(method, url, data, headers) {
    setPandingRequests((old) => old + 1);
    let response = null;

    try {
        response = await fetch(process.env.REACT_APP_BASEURL + url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
                ...headers,
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        setPandingRequests((old) => old - 1);
        console.log(error);
    }

    if (!response) return;

    let result = await response?.json();
    setPandingRequests((old) => old - 1);
    return result;
}

function FetchAnimation() {
    [pandingRequests, setPandingRequests] = useState(0);

    return (
        <>
            <style>{`
                    .animation {
                        animation-name: FetchAnimation;
                        animation-duration: 2s;
                        animation-iteration-count: infinite;
                        animation-timing-function: ease-in;
                    }
                    @keyframes FetchAnimation {
                        0% {
                            left: -100px;
                            width: 100px;
                        }
                        60% {
                            width: 400px;
                        }
                        100% {
                            left: 100%;
                            width: 50px;
                        }
                    }
                `}</style>
            <div className="fixed top-0 left-0 w-full h-[4px] z-[100]">
                {pandingRequests > 0 ? (
                    <div className="absolute left-[-100px] animation bg-first w-[100px] h-[4px]"></div>
                ) : null}
            </div>
        </>
    );
}

export { FetchData, FetchAnimation };
