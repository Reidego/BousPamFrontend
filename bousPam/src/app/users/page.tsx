import HeaderList from '@/components/headerList';
import WorkWindow from '@/components/workWindow';

const List = () => {
  const filds = [
    { id: 1, fildName: '№' },
    { id: 2, fildName: 'Name ' },
    { id: 3, fildName: 'Surname ' },
  ];
  return (
    <div className="w-full border-[#F0F0F0] rounded-[8px] border-[0.5px]">
      <HeaderList filds={filds} />
    </div>
  );
};

export default function Users() {
  return <WorkWindow title="List of cashiers" children={<List />} />;
}
