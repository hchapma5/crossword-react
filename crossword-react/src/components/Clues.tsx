import { CrosswordData } from "../utils/utils";

interface CluesProps {
  data: CrosswordData;
}

export default function Clues(props: CluesProps) {
  const { theme, data } = props.data;
  return (
    <>
      <h2>{theme}</h2>
      {data.map((d) => (
        <ul>{d.clue}</ul>
      ))}
    </>
  );
}
