import { HeaderList, WorkWindow, ListItem, ListItemID } from '@/components';

const filds = [
  { id: 1, fildName: '№' },
  { id: 2, fildName: 'Terminal id' },
  { id: 3, fildName: 'Fare' },
  { id: 4, fildName: 'Company' },
];

const items = [
  { id: 1, terminalId: '1', fare: '100', company: 'Company 1' },
  { id: 2, terminalId: '1', fare: '200', company: 'Company 2' },
  { id: 3, terminalId: '3', fare: '300', company: 'Company 3' },
  { id: 4, terminalId: '4', fare: '400', company: 'Company 4' },
  { id: 5, terminalId: '5', fare: '500', company: 'Company 5' },
  { id: 6, terminalId: '6', fare: '600', company: 'Company 6' },
  { id: 7, terminalId: '7', fare: '700', company: 'Company 7' },
  { id: 8, terminalId: '8', fare: '800', company: 'Company 8' },
  { id: 9, terminalId: '9', fare: '900', company: 'Company 9' },
  { id: 10, terminalId: '10', fare: '1000', company: 'Company 10' },
];

const List = () => {
  return (
    <div className="w-full border-[#F0F0F0] rounded-[8px] border-[0.5px]">
      <HeaderList filds={filds} />
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white h-[54px] text-black flex flex-col items-start justify-start"
        >
          <div className="flex">
            <ListItemID id={item.id} />
            <ListItem title={item.terminalId} />
            <ListItem title={item.fare} />
            <ListItem title={item.company} />
          </div>
          <hr className="text-[#F0F0F0] w-full" />
        </div>
      ))}
    </div>
  );
};

export default function Terminals() {
  return (
    <WorkWindow
      title="List of terminals"
      paginationLength={items.length}
      children={<List />}
    />
  );
}
