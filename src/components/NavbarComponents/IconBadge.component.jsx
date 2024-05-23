function IconBadge(props) {
    return (
        <div className="relative press">
            <span>{props.icon}</span>
            <span className="absolute left-[50%] top-[-25%] bg-first px-[4px] py-[1px] text-white rounded text-xs">
                {props.badgeContent}
            </span>
        </div>
    );
}

export default IconBadge;