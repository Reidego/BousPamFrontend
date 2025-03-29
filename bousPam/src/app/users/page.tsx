'use client';
import { HeaderList, ListItem, ListItemID, WorkSpace } from '@/components';
import { Button, Input, Modal, Pagination, Space, notification } from 'antd';
import { useMemo, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useCashaerStore } from '@/store/cashearStore';

const filds = [
  { id: 1, fildName: '№' },
  { id: 2, fildName: 'Name' },
  { id: 3, fildName: 'Surname ' },
  { id: 4, fildName: 'login' },
  { id: 5, fildName: 'gender' },
  { id: 6, fildName: 'date_of_birth' },
];

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface ListProps {
  filter: string;
}

const List: React.FC<ListProps> = ({ filter }) => {
  const { isAuth } = useUserStore();
  const router = useRouter();
  const { cashears, getCashears } = useCashaerStore();
  getCashears();
  useEffect(() => {
    if (!isAuth) router.push('/');
  }, [isAuth]);

  const filteredItems = useMemo(() => {
    return filter
      ? cashears.filter((item) =>
          item.surname.toLowerCase().startsWith(filter.toLowerCase())
        )
      : cashears;
  }, [filter]);

  return (
    <div className="w-full border-[#F0F0F0] rounded-[8px] border-[0.5px]">
      <HeaderList filds={filds} />
      {filteredItems.map((item, index) => (
        <div
          key={item.id}
          className="bg-white h-[54px] text-black flex flex-col items-start justify-start"
        >
          <div className="flex">
            <ListItemID id={index + 1} />
            <ListItem title={item.name} />
            <ListItem title={item.surname} />
            <ListItem title={item.login} />
            <ListItem title={item.gender} />
            <ListItem title={item.date_of_birth} />
          </div>
          <hr className="text-[#F0F0F0] w-full" />
        </div>
      ))}
    </div>
  );
};

const suffix = (
  <button className=" cursor-pointer">
    <SearchOutlined
      style={{
        fontSize: 16,
        opacity: 0.45,
        color: '#00000',
      }}
    />
  </button>
);

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cashears, addCashear, getCashears } = useCashaerStore();

  const [searchTerm, setSearchTerm] = useState('');

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNmber, setPhoneNmber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [login, setLogin] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      placement: 'top',
      message: 'Terminal created',
      description: (
        <div className="flex flex-col">
          <span>{`Name: ${name}`}</span>
          <span>{`Surname: ${surname}`}</span>
          <span className="pt-[16px]">
            Full information in cashier’s profile
          </span>
        </div>
      ),
      showProgress: true,
      pauseOnHover: false,
      duration: 3,
    });
  };

  const hendleCreate = () => {
    // console.log('name', name);
    // console.log('surame', surname);
    // console.log('role', role);
    // console.log('email', email);
    // console.log('password', password);
    // console.log('passwordConfirmation', passwordConfirmation);

    if (password !== passwordConfirmation) {
      openNotificationWithIcon('error');
      return;
    }
    const data = {
      name,
      surname,
      password,
      role,
      login,
      gender: 'men',
      date_of_birth: dateOfBirth,
      phone_number: phoneNmber,
    };
    addCashear(data);
    openNotificationWithIcon('success');
    getCashears();
    setIsModalOpen(false);

    clearModalFilds();
  };

  const clearModalFilds = () => {
    setName('');
    setSurname('');
    setRole('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <WorkSpace>
      {contextHolder}
      <div className="flex text-[24px] justify-between  w-full font-bold">
        <span className="text-[24px] flex-nowrap">List of cashiers</span>
        <div className="flex w-[577px]">
          <Input
            placeholder="Search"
            size="large"
            suffix={suffix}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full">
        <List filter={searchTerm} />
      </div>
      <div className="flex text-[24px] justify-between w-full font-bold">
        <Pagination defaultCurrent={1} total={cashears.length} />
        <Button type="primary" onClick={showModal}>
          Create new cashier
        </Button>
      </div>
      <Modal
        title={
          <span className="w-full flex items-center justify-center font-medium">
            Create new user
          </span>
        }
        centered
        open={isModalOpen}
        footer={[
          <div className="w-full flex justify-between mt-[30px]">
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button key="submit" type="primary" onClick={hendleCreate}>
              Create
            </Button>
          </div>,
        ]}
      >
        <form>
          <div key={1} className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF]">Name</span>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div key={2} className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF] text-[16px]">Surname</span>
            <Input
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div key={3} className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF] text-[16px]">Role</span>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div key={4} className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF] text-[16px]">Email</span>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div key={5} className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF] text-[16px]">Login</span>
            <Input
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div key={6} className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF] text-[16px]">Phone number</span>
            <Input
              id="phoneNmber"
              value={phoneNmber}
              onChange={(e) => setPhoneNmber(e.target.value)}
            />
          </div>
          <div key={7} className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF] text-[16px]">date of birth</span>
            <Input
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div key={8} className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF] text-[16px]">Password</span>
            <Space direction="vertical">
              <Input.Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Space>
          </div>
          <div key={9} className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF] text-[16px]">
              Password confirmation
            </span>
            <Space direction="vertical">
              <Input.Password
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </Space>
          </div>
        </form>
      </Modal>
    </WorkSpace>
  );
}
