export type TagProps = { name: string, color: string };

export const tagList: TagProps[] = [
  { name: "Getting to Know You", color: "bg-tag-rust"},
  { name: "Early Childhood", color: "bg-tag-tan"},
  { name: "Adolescence", color: "bg-tag-gold"},
  { name: "Early Twenties and College", color: "bg-tag-lime"},
  { name: "Career and Adulthood", color: "bg-tag-moss"},
  { name: "Marriage", color: "bg-tag-teal"},
  { name: "Parenthood and Family", color: "bg-tag-blue"},
  { name: "Elder Years and Retirement", color: "bg-tag-violet"},
  { name: "Beliefs, Values, and the Future", color: "bg-tag-rose"}
];

export const tagMap = new Map<string, string>(tagList.map((tag) => [tag.name, tag.color]));

const Tag = ({ name, color }: TagProps) => {
  return (
    <div
      className={`${color} m-1 whitespace-nowrap rounded py-1 px-3 text-off-white`}
    >
      <span className="">{name}</span>
    </div>
  );
};

export default Tag;
