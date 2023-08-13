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
  if (action) {
    return (
      <button
          className={`h-[40px] bg-${color} rounded duration-150 hover:bg-${hover} hover:-translate-y-0.5`}
          onClick={action}
        >
          <span className="m-[10px] w-auto align-center font-serif text-md tracking-easy text-white">
            {text}
          </span>
      </button>
    );
  }
    return (
      <Link href={link ?? "/"}>
        <button
            className={`h-[40px] bg-${color} rounded duration-150 hover:bg-${hover} hover:-translate-y-0.5`}
          >
            <span className="m-[10px] w-auto align-center font-serif text-md tracking-easy text-white">
              {text}
            </span>
        </button>
      </Link>
    );
}

export default Button;
