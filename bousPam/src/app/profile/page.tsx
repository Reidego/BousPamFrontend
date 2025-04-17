'use client';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { Button, Input, Modal } from 'antd';
// import { OTPProps } from 'antd/es/input/OTP';

export default function Prfile() {
  const { user, isAuth } = useUserStore();
  const [login, setLogin] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const [filds, setFilds] = useState([
    { id: 1, fildName: 'Gender', fildData: user.gender ?? 'man' },
    { id: 2, fildName: 'Role', fildData: user.role },
    { id: 3, fildName: 'Date of birth', fildData: user.birthdey ?? '11.12.00' },
  ]);

  useEffect(() => {
    if (!isAuth) {
      router.push('/');
    }
    if (user.role === 'Cashier') setIsModalOpen(true);
  }, [isAuth]);

  const checkSum = () => {
    if (login) {
      setIsModalOpen(false);
      setFilds((prev) => [
        ...prev,
        {
          id: 4,
          fildName: 'Money in the cash register',
          fildData: login,
        },
      ]);
    }
  };

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
              {filds.map((infoFild) => {
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
      <Modal
        title={
          <span className="w-full flex items-center justify-center font-medium">
            Cashier
          </span>
        }
        centered
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        footer={[
          <div key="1" className="w-full flex justify-end mt-[30px]">
            <Button key="submit" type="primary" onClick={checkSum}>
              Confirm
            </Button>
          </div>,
        ]}
      >
        <div className="h-[60px] flex flex-col gap-y-[18px]">
          <span>Enter the amount of funds in the cash register.</span>
          <div className="flex items-center justify-center w-full">
            <Input
              value={login}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.value = input.value.replace(/\D/g, '');
                setLogin(input.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
