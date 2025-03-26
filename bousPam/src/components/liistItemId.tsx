interface ListItemIDProps {
  id: number;
}

const ListItemID: React.FC<ListItemIDProps> = ({ id }) => {
  return (
    <span className="self-start h-[54px] max-w-[57px] flex items-center pr-[32px] p-[16px]">
      {id}
    </span>
  );
};

export default ListItemID;
