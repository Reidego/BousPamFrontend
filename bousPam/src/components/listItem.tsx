interface ListItemProps {
  title: string;
}

const ListItem: React.FC<ListItemProps> = ({ title }) => {
  return (
    <span className="pl-[16px] h-[54px] w-[205px] flex items-center justify-start">
      {title}
    </span>
  );
};

export default ListItem;
