interface WorkSpaceProps {
  children: React.ReactNode;
  // isBackBotton: Boolean | null;
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ children }) => {
  return (
    <div className="w-full">
      <div className="text-black  ml-[150px] mr-[90px] mb-[30px] mt-[56px] bg-[#fff] rounded-[8px] py-[28px] px-[128px] items-center justify-between flex-col gap-y-[48px] flex">
        {children}
      </div>
    </div>
  );
};

export default WorkSpace;
