import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from "react";

type DropdownHookProps = {
    items: string[],
    color: string
}

type DropdownProps = {
    items: string[],
    color: string
    selected: string,
    setSelected: Dispatch<SetStateAction<string>>
}

type ItemProps = {
    text: string,
    onClick: MouseEventHandler<HTMLDivElement> | undefined,
    selected?: boolean,
    color: string
}

// tricking the tailwind teehee
// yes there is a proper way to do this, no this isn't it
"\
hover:bg-blue-600\
hover:bg-red-600 \
hover:bg-green-600\
hover:bg-yellow-600\
hover:bg-purple-600\
bg-blue-600\
bg-red-600 \
bg-green-600\
bg-yellow-600\
bg-purple-600\
";

function Item({ text, onClick, selected, color }: ItemProps) {
    let [styles, setStyles] = useState<string>("");

    useEffect(() => {
        setStyles(`w-full px-5 py-3 hover:bg-${color}-600 hover:text-white cursor-pointer ${selected ? `bg-${color}-600 text-white`: ''}`);
    });

    return (
        <div className={styles} onClick={onClick}>
            <p>{text}</p>
        </div>
    );
}

function Dropdown({ items, color, selected, setSelected }: DropdownProps): JSX.Element {
    let [open, setOpen] = useState<boolean>(false);

    const styles = () => {
        // return `md:min-w-[10rem] relative ${open ? "shadow box-shadow drop-shadow" : ""}`
        return "md:min-w-[10rem] relative shadow-lg box-shadow-lg drop-shadow-lg"
    }

    return (
        <div className={styles()}>
            <div className="bg-white absolute top-0 left-0 min-w-[10rem]" onClick={() => setOpen(!open)}>
                <Item text={selected} onClick={() => setOpen(!open)} color={color} selected/>
                {open &&items.map((item: string, i: number) =>
                    <Item key={i} text={item} onClick={() => setSelected(items[i] || "")} color={color}/>
                )}
            </div>
        </div>
    );
}

export default function useDropdown(props: DropdownHookProps) {
    let [selected, setSelected] = useState<string>(props.items[0] || "");
    return [
        selected, 
        <Dropdown {...props} selected={selected} setSelected={setSelected}/>
    ];
}
