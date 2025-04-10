'use client';
import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useCashaerStore } from '@/store/cashearStore';
import { useCompamyStore } from '@/store/companyStore';
import { useTerminalStore } from '@/store/terminalStore';

export default function Prfile() {
  const { getCashears, getPassengers } = useCashaerStore();
  const { getCompanys } = useCompamyStore();
  const { getTerminals } = useTerminalStore();
  const { user, isAuth, role } = useUserStore();
  const router = useRouter();

  const infoFilds = [
    { id: 1, fildName: 'Gender', fildData: user.gender },
    { id: 2, fildName: 'Role', fildData: user.role },
    { id: 3, fildName: 'Date of birth', fildData: user.birthdey },
  ];

  useEffect(() => {
    if (!isAuth) {
      router.push('/');
    }
    // role === 'Cashier' ? getPassengers() : null;
    // getCashears();
    // getCompanys();
    // getTerminals();
  }, [isAuth]);

  return (
    <div className="w-full">
      <div className="text-black mx-[238px] mt-[78px] bg-[#fff] rounded-[8px] px-[128px] py-[56px] items-start justify-start flex flex-col gap-y-[56px]">
        <div className="flex flex-col gap-y-[32px]">
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
        </div>
      </div>
    </div>
  );
}
