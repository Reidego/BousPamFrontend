'use client';
import React, { useState } from 'react';
import {
  CarOutlined,
  DesktopOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { BousPam, ArrowLeft, ArrowRigth, Terrmianl } from '@/utils/svg';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

type MenuItem = Required<MenuProps>['items'][number];

const LeftMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  const { role, setIsAuth } = useUserStore();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuItem[] = (() => {
    switch (role) {
      case 'Admin':
        return [
          {
            key: 1,
            icon: <HomeOutlined style={{ fontSize: '20px' }} />,
            label: 'Profile',
            onClick: () => {
              router.push('/profile');
            },
          },
          {
            key: 2,
            icon: <DesktopOutlined style={{ fontSize: '20px' }} />,
            label: 'Transport companies',
            onClick: () => {
              router.push('/transportCompanies');
            },
          },
          {
            key: 4,
            icon: <Terrmianl />,
            label: 'Terminals',
            onClick: () => {
              router.push('/terminals');
            },
          },
          {
            key: 5,
            icon: <UserOutlined style={{ fontSize: '20px' }} />,
            label: 'Users',
            onClick: () => {
              router.push('/cashiers');
            },
          },
        ];
      case 'Owner':
        return [
          {
            key: 1,
            icon: <HomeOutlined style={{ fontSize: '20px' }} />,
            label: 'Profile',
            onClick: () => {
              router.push('/profile');
            },
          },
          {
            key: 2,
            icon: <DesktopOutlined style={{ fontSize: '20px' }} />,
            label: 'Drivers',
            onClick: () => {
              router.push('/drivers');
            },
          },
          {
            key: 4,
            icon: <Terrmianl />,
            label: 'Terminals',
            onClick: () => {
              router.push('/terminals');
            },
          },
          {
            key: 5,
            icon: <CarOutlined style={{ fontSize: '20px' }} />,
            label: 'Buses',
            onClick: () => {
              router.push('/buses');
            },
          },
          {
            key: 6,
            icon: <EnvironmentOutlined style={{ fontSize: '20px' }} />,
            label: 'Routes',
            onClick: () => {
              router.push('/listRoutes');
            },
          },
        ];
      case 'Cashier':
        return [
          {
            key: 1,
            icon: <HomeOutlined style={{ fontSize: '20px' }} />,
            label: 'Profile',
            onClick: () => {
              router.push('/profile');
            },
          },
          {
            key: 2,
            icon: <UserOutlined style={{ fontSize: '20px' }} />,
            label: 'Users',
            onClick: () => {
              router.push('/passengers');
            },
          },
        ];
      default:
        return [];
    }
  })();

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
            <button
              onClick={() => {
                {
                  setIsAuth(false);
                  router.push('/');
                }
              }}
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
