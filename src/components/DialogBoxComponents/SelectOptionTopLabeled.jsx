function CustomSelect1(props) {
    return (
        <div className="flex flex-col gap-1 h-fit">
            <label htmlFor="id" className="text-xs">
                {props.label}
                {props.required && <span className="ml-1 text-red-500">*</span>}
            </label>
            <select
                type="text"
                className="px-1.5 py-2 border rounded grow min-w-[250px] text-xs outline-none bg-white focus:border-first"
                id="id"
                onChange={props.onChange}
                disabled={props.disabled}
                data-label={props.label}
            >
                <option className="text-gray-400" value="-1">
                    Select
                </option>
                {props.children}
            </select>
        </div>
    );
}

export default CustomSelect1;
