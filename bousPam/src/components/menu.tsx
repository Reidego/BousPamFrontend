'use client';
import React, { useState } from 'react';
import {
  AppstoreOutlined,
  DesktopOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { BousPam, ArrowLeft, ArrowRigth, Terrmianl } from '@/utils/svg';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const LeftMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuItem[] = [
    {
      key: '1',
      icon: <HomeOutlined style={{ fontSize: '20px' }} />,
      label: 'Profile',
      onClick: () => {
        router.push('/profile');
      },
    },
    {
      key: '2',
      icon: <DesktopOutlined style={{ fontSize: '20px' }} />,
      label: 'Transport companies',
      onClick: () => {
        router.push('/transportCompanies');
      },
    },
    // {
    //   key: '3',
    //   icon: <ContainerOutlined style={{ fontSize: '20px' }} />,
    //   label: 'Option 3',
    //   onClick: () => {
    //     router.push('/profile');
    //   },
    // },
    {
      key: '4',
      icon: <Terrmianl />,
      label: 'Terminals',
      onClick: () => {
        router.push('/terminals');
      },
    },
    {
      key: '5',
      icon: <AppstoreOutlined style={{ fontSize: '20px' }} />,
      label: 'Users',
      onClick: () => {
        router.push('/users');
      },
    },
  ];

  return (
    <div
      className={`h-screen bg-[#ffff]  flex ${collapsed ? 'max-w-[78px]' : 'w-[338px]'}`}
    >
      <div className="w-full flex flex-col justify-between ">
        <div>
          <div className="flex items-center  justify-between py-[24px] px-[32px] text-[20px]">
            <div
              className={`flex items-center gap-x-[10px] ${collapsed ? 'hidden' : ''}`}
            >
              <BousPam />
              <span className="text-black font-bold"> BOUS PAM</span>
            </div>
            <button className="cursor-pointer" onClick={toggleCollapsed}>
              {collapsed ? <ArrowRigth /> : <ArrowLeft />}
            </button>
          </div>
          <hr className=" w-full" />
          <Menu
            style={{ fontSize: '16px' }}
            className="w-full"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
          />
        </div>

        <div>
          <hr className=" w-full" />
          <div
            className={`p-[24px] text-black text-[16px] flex items-center ${collapsed ? 'justify-center' : ''}`}
          >
            <LogoutOutlined
              style={{
                fontSize: '20px',
                color: '#000000',
              }}
            />
            <span
              className={`text-[16px] ${collapsed ? 'hidden' : 'pl-[8px]'}`}
            >
              Выход
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
