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
  items: {
    id?: number;
    name: string;
    surname: string;
    login: string;
    gender: string;
    date_of_birth: string;
    role: string;
  }[];
}

const List: React.FC<ListProps> = ({ filter, items }) => {
  const filteredItems = useMemo(() => {
    return filter
      ? items.filter(
          (item) =>
            item.surname.toLowerCase().startsWith(filter.toLowerCase()) &&
            item.role !== 'Admin'
        )
      : items.filter((item) => item.role !== 'Admin');
  }, [filter, items]);

  return (
    <div className="w-full border-[#F0F0F0] rounded-[8px] border-[0.5px]">
      <HeaderList filds={filds} />
      {filteredItems.length === 0 && (
        <div className="flex items-center justify-center h-[54px] text-black font-bold">
          No cashiers found
        </div>
      )}

      {filteredItems.length > 0 &&
        filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="bg-white h-[54px] text-black flex flex-col items-start justify-start"
          >
            <div key={index} className="flex">
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

  const { isAuth } = useUserStore();

  const router = useRouter();

  // const { companys, getCompanys } = useCompamyStore();

  const [myUsers, setMyUsers] = useState(cashears);

  useEffect(() => {
    if (!isAuth) router.push('/');

    (async () => {
      const data = await getCashears();
      setMyUsers(data);
    })();
  }, []);

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

  const openNotificationWithIcon = (type: NotificationType, error?: string) => {
    api[type]({
      placement: 'top',
      message: 'Cashier created',
      description: error ? (
        <span>{`Error: ${error}`}</span>
      ) : (
        <div className="flex flex-col">
          <span>{`Name: ${name}`}</span>
          <span>{`Surname: ${surname}`}</span>
          <span className="pt-[16px]">
            Full information in cashiers profile
          </span>
        </div>
      ),
      showProgress: true,
      pauseOnHover: false,
      duration: 3,
    });
  };

  const hendleCreate = async () => {
    if (password !== passwordConfirmation) {
      openNotificationWithIcon('error');
      return;
    }
    const data = {
      id: myUsers.length + 1,
      name,
      surname,
      password,
      role,
      login,
      gender: 'men',
      date_of_birth: dateOfBirth,
      phone_number: phoneNmber,
    };
    const newCashier = await addCashear(data);
    if (typeof newCashier === 'string') {
      openNotificationWithIcon('error', newCashier);
      return;
    }
    setMyUsers((prev) => [...prev, data]);
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
            placeholder="Search by surname"
            size="large"
            suffix={suffix}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full">
        <List filter={searchTerm} items={myUsers} />
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
        onCancel={handleCancel}
        open={isModalOpen}
        footer={[
          <div key="1" className="w-full flex justify-between mt-[30px]">
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
            <span key={1} className="text-[#007AFF]">
              Name
            </span>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div key={2} className="flex flex-col gap-y-[2px]">
            <span key={2} className="text-[#007AFF] text-[16px]">
              Surname
            </span>
            <Input
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div key={3} className="flex flex-col gap-y-[2px]">
            <span key={3} className="text-[#007AFF] text-[16px]">
              Role
            </span>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div key={4} className="flex flex-col gap-y-[2px]">
            <span key={4} className="text-[#007AFF] text-[16px]">
              Email
            </span>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div key={5} className="flex flex-col gap-y-[2px]">
            <span key={5} className="text-[#007AFF] text-[16px]">
              Login
            </span>
            <Input
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div key={6} className="flex flex-col gap-y-[2px]">
            <span key={6} className="text-[#007AFF] text-[16px]">
              Phone number
            </span>
            <Input
              id="phoneNmber"
              value={phoneNmber}
              onChange={(e) => setPhoneNmber(e.target.value)}
            />
          </div>
          <div key={7} className="flex flex-col gap-y-[2px]">
            <span key={7} className="text-[#007AFF] text-[16px]">
              date of birth
            </span>
            <Input
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div key={8} className="flex flex-col gap-y-[2px]">
            <span key={8} className="text-[#007AFF] text-[16px]">
              Password
            </span>
            <Space direction="vertical">
              <Input.Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Space>
          </div>
          <div key={9} className="flex flex-col gap-y-[2px]">
            <span key={9} className="text-[#007AFF] text-[16px]">
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
