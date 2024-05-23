function CheckBox(props) {
    return (
        <div className="flex">
            <input
                type="checkbox"
                checked={props.checked}
                onChange={props.onChange}
                id="checkbox1"
            />
            <label className="ml-2 text-xs text-gray-700" htmlFor={"checkbox1"}>
                {props.label}
            </label>
        </div>
    );
}

export default CheckBox;
