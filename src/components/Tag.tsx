export interface ITagProps {
  name: string;
  color: string | undefined;
}

export const tagList = [
  "Getting to Know You",
  "Early Childhood",
  "Adolescence",
  "Early Twenties and College",
  "Career and Adulthood",
  "Marriage",
  "Parenthood and Family",
  "Elder Years and Retirement",
  "Beliefs, Values, and the Future",
];

export const tagColors = new Map<string, string>();
tagColors.set("Getting to Know You", "bg-tag-rust");
tagColors.set("Early Childhood", "bg-tag-tan");
tagColors.set("Adolescence", "bg-tag-gold");
tagColors.set("Early Twenties and College", "bg-tag-lime");
tagColors.set("Career and Adulthood", "bg-tag-moss");
tagColors.set("Marriage", "bg-tag-teal");
tagColors.set("Parenthood and Family", "bg-tag-blue");
tagColors.set("Elder Years and Retirement", "bg-tag-violet");
tagColors.set("Beliefs, Values, and the Future", "bg-tag-rose");

const Tag = ({ name, color }: ITagProps) => {
  return (
    <div
      className={`${color} my-0.5 mr-1 whitespace-nowrap rounded-xl py-1 px-3 text-off-white`}
    >
      <span className="">{name}</span>
    </div>
  );
};

export default Tag;
