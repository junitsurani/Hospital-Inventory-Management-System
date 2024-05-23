import { formattedDate } from "../../utils/formateddate";

function DateTopLabeled(props) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-xs grow">
                {props.label}
            </label>
            <input
                type="date"
                className="w-full p-2 text-xs bg-transparent border rounded grow placeholder:text-xs focus:border-first"
                id="id"
                placeholder={props.placeholder}
                value={props.value || formattedDate}
                onChange={props.onChange}
                data-label={props.label}
            />
        </div>
    );
}

export default DateTopLabeled;
