'use client';
import { useUserStore } from '@/store/userStore';
import LeftMenu from './../components/menu';

export default function Prfile() {
  const { isAuth } = useUserStore();
  return (
    <div className="w-full flex">
      {!isAuth && <LeftMenu />}
      <div className="text-black  h-screen w-full pl-[150px]  pr-[90px] pb-[30px] pt-[56px]   items-center justify-between flex-col gap-y-[48px] flex">
        <div className=" py-[28px] px-[128px] bg-[#fff] flex font-bold text-[40px]  rounded-[8px] w-full h-full justify-center items-center flex-col gap-y-[6px]">
          <span>Error: 404</span>
          <span>Page not found </span>
        </div>
      </div>
    </div>
  );
}
