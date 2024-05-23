import { useState, useEffect } from "react";

function useResponsive(value1, value2, value3, value4, value5, value6) {
    const [value, setValue] = useState();

    useEffect(() => {
        if (window.innerWidth < 640) {
            setValue(value1);
        } else if (window.innerWidth < 768) {
            setValue(value2);
        } else if (window.innerWidth < 1024) {
            setValue(value3);
        } else if (window.innerWidth < 1280) {
            setValue(value4);
        } else if (window.innerWidth < 1536) {
            setValue(value5);
        } else {
            setValue(value6);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth < 640) {
            setValue(value1);
        } else if (window.innerWidth < 768) {
            setValue(value2);
        } else if (window.innerWidth < 1024) {
            setValue(value3);
        } else if (window.innerWidth < 1280) {
            setValue(value4);
        } else if (window.innerWidth < 1536) {
            setValue(value5);
        } else {
            setValue(value6);
        }
    });
    return value;
}

export default useResponsive;
