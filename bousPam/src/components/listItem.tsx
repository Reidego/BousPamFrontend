interface ListItemProps {
  title: string;
}

const ListItem: React.FC<ListItemProps> = ({ title }) => {
  return (
    <span className="self-start h-[54px] w-[205px] flex items-center justify-center pr-[32px] p-[16px] ">
      {title}
    </span>
  );
};

export default ListItem;
