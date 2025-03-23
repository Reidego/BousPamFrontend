interface HeaderListProps {
  filds: { id: number; fildName: string }[];
}

const HeaderList: React.FC<HeaderListProps> = ({ filds }) => {
  return (
    <div className="flex  font-semibold bg-[#FAFAFA] rounded-t-[8px]">
      {filds.map((fild) => (
        <div
          key={fild.id}
          className={`flex p-[16px] pr-0 h-[54px]  justify-start ${fild.id === 1 ? '' : 'w-[205px]'}`}
        >
          <div
            key={fild.id}
            className="w-full border-[#F0F0F0]  border-r-[0.5px]"
          >
            <span
              className={` text-[14px] text-[#2A2A26] ${fild.id === 1 ? 'pr-[16px]' : ''}`}
            >
              {fild.fildName}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeaderList;
