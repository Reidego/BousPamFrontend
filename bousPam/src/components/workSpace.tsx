interface WorkSpaceProps {
  children: React.ReactNode;
  // isBackBotton: Boolean | null;
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ children }) => {
  return (
    <div className="w-full h-screen">
      <div className="text-black h-[calc(100vh-78px-56px*2)] mx-[238px] mt-[78px] bg-[#fff] rounded-[8px] py-[56px] px-[128px] items-center justify-between flex-col gap-y-[48px] flex">
        {children}
      </div>
    </div>
  );
};

export default WorkSpace;
