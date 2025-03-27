'use client';
import { Input, Button, Space, notification } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BousPam } from '@/utils/svg';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import { text } from 'stream/consumers';
import { error } from 'console';
import useStore from '@/store/store';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function Auth() {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTrue }: any = useStore();

  const logIn = () => {
    // get login and password
    if (!login || !password) {
      openNotificationWithIcon('error');
      return;
    }
    setAuthTrue();

    // isAuth = true; , isAdmin = true;
    router.push('/profile');
  };

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      placement: 'top',
      message: 'Failed authorization: ',
      description: 'Please check your login and password.',
      showProgress: true,
      pauseOnHover: false,
      duration: 3,
    });
  };

  // const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="w-full h-screen flex flex-col items-center text-black">
      <div className="bg-[#FFFFFF] h-[73px] w-full flex flex-row items-center justify-start pl-[40px] gap-x-[7px]">
        <BousPam />
        <span className="text-black font-bold text-[20px]">BOUS PAM</span>
      </div>
      <div className="flex items-center justify-center pb-[73px] h-full">
        <div className="w-[592px] h-[458px] bg-[#fff] rounded-[8px] flex flex-col gap items-center justify-start py-[64px] px-[96px]">
          <span className="text-[38px] font-medium">Login</span>
          <div className="w-[400px] text-[14px] leading-[22px]">
            <div className="mt-[48px]">
              <span className="pb-[8px]">Login</span>
              <Input
                style={{ width: '100%', height: 40 }}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className="mt-[24px] flex flex-col">
              <span className="pb-[8px]">Password</span>
              {contextHolder}
              <Space direction="vertical">
                <Input.Password
                  style={{ width: '100%', height: 40 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Space>
            </div>
            <div className="mt-[32px]">
              <Button
                type="primary"
                style={{ width: '100%', height: 40, fontSize: 16 }}
                onClick={() => logIn()}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
