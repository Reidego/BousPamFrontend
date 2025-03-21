interface WorkSpaceProps {
  children: React.ReactNode;
  // isBackBotton: Boolean | null;
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ children }) => {
  return (
    <div className="w-full h-screen">
      <div className="text-black h-[calc(100vh-78px-56px*2)] mx-[238px] mt-[78px] bg-[#fff] rounded-[8px] px-[128px] py-[56px] items-center justify-center flex flex-col gap-y-[56px]">
        {children}
      </div>
    </div>
  );
};

export default WorkSpace;
