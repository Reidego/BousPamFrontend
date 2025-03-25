import HeaderList from '@/components/headerList';
import WorkWindow from '@/components/workWindow';

const filds = [
  { id: 1, fildName: '№' },
  { id: 2, fildName: 'Company' },
  { id: 3, fildName: 'Owner' },
];

const List = () => {
  const items = [
    {
      id: 1,
      name: 'Company 1',
      owner: 'Owner 1',
    },
    {
      id: 2,
      name: 'Company 2',
      owner: 'Owner 2',
    },
    {
      id: 3,
      name: 'Company 3',
      owner: 'Owner 3',
    },
    {
      id: 4,
      name: 'Company 4',
      owner: 'Owner 4',
    },
    {
      id: 5,
      name: 'Company 5',
      owner: 'Owner 5',
    },
    {
      id: 6,
      name: 'Company 6',
      owner: 'Owner 6',
    },
    {
      id: 7,
      name: 'Company 7',
      owner: 'Owner 7',
    },
    {
      id: 8,
      name: 'Company 8',
      owner: 'Owner 8',
    },
    {
      id: 9,
      name: 'Company 9',
      owner: 'Owner 9',
    },
    {
      id: 10,
      name: 'Company 10',
      owner: 'Owner 10',
    },
  ];

  return (
    <div className="w-full border-[#F0F0F0] rounded-[8px] border-[0.5px]">
      <HeaderList filds={filds} />
    </div>
  );
};

export default function Profile() {
  return <WorkWindow title="List of transport companies" children={<List />} />;
}
