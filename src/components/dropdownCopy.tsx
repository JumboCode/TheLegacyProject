import {
    Dispatch,
    MouseEventHandler,
    SetStateAction,
    useEffect,
    useState,
  } from "react";
  
  type DropdownProps = {
    items: string[];
    bgColor: string;
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
  };
  
  type ItemProps = {
    text: string;
    onClick: MouseEventHandler<HTMLDivElement> | undefined;
    selected?: boolean;
    bgColor: string;
  };
  
  function Item({ text, onClick, selected, bgColor }: ItemProps) {
    const [styles, setStyles] = useState<string>("");
  
    useEffect(() => {
      setStyles(
        `w-full px-5 py-3 hover:${bgColor}-500 text-dark-gray-500 cursor-pointer ${
          selected ? `bg-${bgColor}-500 text-dark-gray-500` : ""
        }`
      );
    });
  
    return (
      <div className={styles} onClick={onClick}>
        <p>{text}</p>
      </div>
    );
  }
  
  export default function DropdownCopy({
    items,
    bgColor,
    selected,
    setSelected,
  }: DropdownProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
  
    const styles = () => {
      return "absolute float-right md:min-w-[10rem]";
    };
  
    return (
      <div className={styles()}>
        <div
          className="min-w-[10rem] bg-white rounded"
          onClick={() => setOpen(!open)}
        >
          <Item
            text={selected}
            onClick={() => setOpen(!open)}
            bgColor={bgColor}
            selected
          />
          {open &&
            items.map((item: string, i: number) => (
              <Item
                key={i}
                text={item}
                onClick={() => setSelected(items[i] || "")}
                bgColor={bgColor}
              />
            ))}
        </div>
      </div>
    );
  }
  