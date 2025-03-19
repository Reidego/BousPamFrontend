interface WorkSpaceProps {
  children: React.ReactNode;
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ children }) => {
  return (
    <div className="w-full">
      <div className="text-black mx-[238px] mt-[78px] bg-[#fff] rounded-[8px] px-[128px] py-[56px] flex flex-col gap-y-[56px]">
        {children}
      </div>
    </div>
  );
};

export default WorkSpace;
