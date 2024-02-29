import { CrosswordData } from "../utils/utils";

interface CluesProps {
  data: CrosswordData;
}

export default function CrosswordClues(props: CluesProps) {
  const { theme, data } = props.data;
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{theme}</h2>
      {data.map((d, i) => (
        <ul className="">
          {i + 1} {d.clue}
        </ul>
      ))}
    </div>
  );
}
