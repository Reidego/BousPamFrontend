import WorkWindow from '@/components/workWindow';
const List = () => {
  return <div>Лист терминалов !!!</div>;
};

export default function Terminals() {
  return <WorkWindow title="List of terminals" children={<List />} />;
}
