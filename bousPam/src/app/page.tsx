'use client';
import { Input, Button, Space, notification, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BousPam } from '@/utils/svg';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import { useUserStore } from '@/store/userStore';
import { OTPProps } from 'antd/es/input/OTP';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function Auth() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const [login, setLogin] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const { getUser, setIsAuth } = useUserStore();

  const logIn = async () => {
    // get login and password
    if (!login || !password) {
      openNotificationWithIcon(
        'error',
        'Please check your login and password.'
      );
      return;
    }

    await getUser(login, password);
    setIsModalOpen(true);
  };
  const verify = () => {
    if (code === '123123') {
      router.push('/profile');
      setIsAuth(true);
    } else openNotificationWithIcon('error', 'Invalid confirmation code.');
  };

  const openNotificationWithIcon = (type: NotificationType, msg: string) => {
    api[type]({
      placement: 'top',
      message: 'Failed authorization: ',
      description: msg,
      showProgress: true,
      pauseOnHover: false,
      duration: 3,
    });
  };
  const onChange: OTPProps['onChange'] = (text) => {
    setCode(text);
  };

  const sharedProps: OTPProps = {
    onChange,
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
      <Modal
        title={
          <span className="w-full flex items-center justify-center font-medium">
            Verification
          </span>
        }
        centered
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        footer={[
          <div key="1" className="w-full flex justify-between mt-[30px]">
            <Button key="back" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button key="submit" type="primary" onClick={verify}>
              Confirm
            </Button>
          </div>,
        ]}
      >
        <div className="h-[60px] flex flex-col gap-y-[18px]">
          <span>
            Please enter the confirmation code sent to you in the telegram.
          </span>
          <div className="flex items-center justify-center w-full">
            <Input.OTP
              formatter={(str) => str.replace(/\D/g, '')}
              {...sharedProps}
              // Ensures only digits are allowed
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
