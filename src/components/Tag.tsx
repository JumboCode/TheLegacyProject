export interface ITagProps {
  name: string;
  color: string | undefined;
}

const Tag = ({ name, color }: ITagProps) => {
  return (
    <div
      className={`${color} h-15 w-fit whitespace-nowrap rounded-lg py-2 px-3 text-center text-off-white`}
    >
      <span className=""> {name} </span>
    </div>
  );
};

export default Tag;
