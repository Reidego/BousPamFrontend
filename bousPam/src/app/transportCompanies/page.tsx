import WorkWindow from '@/components/workWindow';
const List = () => {
  return <div>Лист транспортных компаний !!!</div>;
};

export default function Profile() {
  return <WorkWindow title="List of transport companies" children={<List />} />;
}
