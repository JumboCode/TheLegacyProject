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
  let [styles, setStyles] = useState<string>("");

  useEffect(() => {
    setStyles(
      `w-full px-5 py-3 hover:${bgColor} hover:text-white cursor-pointer ${
        selected ? `bg-${bgColor}-600 text-white` : ""
      }`
    );
  });

  return (
    <div className={styles} onClick={onClick}>
      <p>{text}</p>
    </div>
  );
}

export default function Dropdown({
  items,
  bgColor,
  selected,
  setSelected,
}: DropdownProps): JSX.Element {
  let [open, setOpen] = useState<boolean>(false);

  const styles = () => {
    return "md:min-w-[10rem] absolute shadow-lg box-shadow-lg drop-shadow-lg";
  };

  return (
    <div className={styles()}>
      <div
        className="absolute top-0 left-0 z-10 min-w-[10rem] bg-white"
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
