function CustomTextField2(props) {
    return (
        <div className="flex flex-col gap-1 ">
            <label htmlFor="id" className="text-xs">
                {props.label}
            </label>
            <input
                type="file"
                className="p-1.5 border rounded grow min-w-[250px] text-xs placeholder:text-xs focus:border-first"
                id="id"
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                accept={props.accept}
            />
        </div>
    );
}

export default CustomTextField2;
