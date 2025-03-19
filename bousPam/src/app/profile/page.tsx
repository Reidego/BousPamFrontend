import WorkSpace from '@/components/workSpace';

export default function Prfile() {
  const user = {
    name: 'John Thomas Shelby',
    phoneNmber: '+7 (922) 333-33-33',
    gender: 'male',
    role: 'Admin',
    birthdey: '13.02.2003',
  };

  const infoFilds = [
    { id: 1, fildName: 'Gender', fildData: user.gender },
    { id: 2, fildName: 'Role', fildData: user.role },
    { id: 3, fildName: 'Date of birth', fildData: user.birthdey },
  ];

  return (
    <WorkSpace>
      <div className="flex flex-col gap-y-[16px]">
        <span className="text-[30px] font-bold">{user.name}</span>
        <span className="text-[16px] opacity-45">{user.phoneNmber}</span>
      </div>
      <div className="flex flex-col gap-y-[24px]">
        <span className="text-[20px] font-bold">Personal information</span>
        <div className="flex flex-col gap-y-[8px]">
          {infoFilds.map((infoFild) => {
            return (
              <div className="flex text-[16px]" key={infoFild.id}>
                <span className="pr-[4px] opacity-45">
                  {infoFild.fildName} :
                </span>
                <span>{infoFild.fildData}</span>
              </div>
            );
          })}
        </div>
      </div>
    </WorkSpace>
  );
}
