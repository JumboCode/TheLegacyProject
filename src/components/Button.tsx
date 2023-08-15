import { MouseEventHandler } from "react";
import Link from "next/link";

type ButtonProps = {
  text: string,
  color: string,
  hover: string
  action?: MouseEventHandler<HTMLButtonElement>
  link?: string
}

const Button = ({ text, color, hover, action, link } : ButtonProps) => {
  if (link) {
    return (
      <Link href={link ?? "/"}>
        <button
            className={`w-auto h-[40px] bg-${color} rounded duration-150 hover:bg-${hover} hover:-translate-y-0.5`}
          >
            <span className="m-[10px] w-auto align-center font-serif text-md tracking-easy text-white">
              {text}
            </span>
        </button>
      </Link>
    );
  }
  else {
    return (
      <button
          className={`w-auto h-[40px] bg-${color} rounded duration-150 hover:bg-${hover} hover:-translate-y-0.5`}
          onClick={action ?? undefined}
        >
          <span className="m-[10px] w-auto align-center font-serif text-md tracking-easy text-white">
            {text}
          </span>
      </button>
    );
  }
}

export default Button;
