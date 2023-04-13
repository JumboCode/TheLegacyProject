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

  type SortProps = {
    text: string;
    onClick: MouseEventHandler<HTMLDivElement> | undefined;
  }

  function Sort({ text, onClick}: SortProps) {
    return (
      <div className="rounded px-5 py-3 text-dark-gray-500 bg-white cursor-pointer">
        {text}
      </div>
    )
  }
  
  function Item({ text, onClick, selected, bgColor }: ItemProps) {
    const [styles, setStyles] = useState<string>("");
  
    useEffect(() => {
      setStyles(
        `px-5 py-3 text-dark-gray-500 cursor-pointer whitespace-nowrap ${
          selected ? `text-dark-gray-500` : ""
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
  
    return (
      // <div className= "h-full border-2 border-red-500 relative">
        <div className="h-full bg-white rounded relative" onClick={() => setOpen(!open)}>
          <Sort
            text="Sort"
            onClick={() => setOpen(!open)}
          />
          {/* <Item
            text={selected}
            onClick={() => setOpen(!open)}
            bgColor={bgColor}
            selected
          /> */}
          <div className="absolute -right-0.5 top-16 rounded">
            {open && items.map((item: string, i: number) => (
              <div className="bg-white rounded">
                <Item
                  key={i}
                  text={item}
                  onClick={() => setSelected(items[i] || "")}
                  bgColor={bgColor}
                /> 
              </div>         
            ))}
          </div>
        </div>
      // </div>
    );
  }
  