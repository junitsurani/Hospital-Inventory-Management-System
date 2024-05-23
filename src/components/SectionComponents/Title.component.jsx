function Title(props) {
    return (
        <div className="flex items-center px-2">
            <div className="text-xs md:text-lg">{props.title1}</div>
            <div className="px-2 grow">
                <div className="border border-first"></div>
            </div>
            <div className="text-xs md:text-base">{props.title2}</div>
        </div>
    );
}

export default Title;
