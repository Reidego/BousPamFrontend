'use client';
import { HeaderList, ListItem, ListItemID, WorkSpace } from '@/components';
import {
  Button,
  Input,
  Modal,
  Pagination,
  Space,
  message,
  notification,
} from 'antd';
import { useMemo, useState, useEffect, ReactNode, use } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useCashaerStore } from '@/store/cashearStore';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface Passenger {
  id?: number;
  name: string;
  surname: string;
  e_mail: string;
  passport_number: string;
  inn: string;
  tg_id?: string;
  balance?: number;
  phone_number: string;
  snils: string;
  cards?: string[];
  card_number?: string;
}

const filds = [
  { id: 1, fildName: '№' },
  { id: 2, fildName: 'Name' },
  { id: 3, fildName: 'Surname ' },
];

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

export default function Passengers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cashears, addPassenger, getPassengers } = useCashaerStore();
  // const [myPassengers, setMyPassengers] = useState(passengers);
  // const passengers = await getPassengers();
  const { isAuth } = useUserStore();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');

  const [passengers, setPassengers] = useState([] as Passenger[]);

  useEffect(() => {
    if (!isAuth) router.push('/');

    (async () => {
      const data = await getPassengers();
      setPassengers(data);
    })();
  }, []);

  const [passenger, setPassenger] = useState({
    name: '',
    surname: '',
    passportNumber: '',
    role: 'passenger',
    email: '',
    cardNumber: '',
    phoneNmber: '',
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (item: {
    type: NotificationType;
    title: string;
    message: ReactNode;
    error?: string;
  }) => {
    api[item.type]({
      placement: 'top',
      message: item.title,
      description: item.message,
      showProgress: true,
      pauseOnHover: false,
      duration: 3,
    });
  };

  const hendleCreate = async () => {
    if (
      passenger.name === '' ||
      passenger.surname === '' ||
      passenger.email === '' ||
      passenger.cardNumber === '' ||
      passenger.passportNumber === '' ||
      passenger.phoneNmber === ''
    ) {
      openNotificationWithIcon({
        type: 'error',
        title: 'Create new passenger',
        message: 'Please fill all fields',
      });
      return;
    }

    const newPassenger = {
      name: passenger.name,
      surname: passenger.surname,
      e_mail: passenger.email,
      passport_number: passenger.passportNumber,
      inn: '1234567890',
      phone_number: passenger.phoneNmber,
      snils: '1234567890',
      card_number: passenger.cardNumber,
    };

    await addPassenger(newPassenger);

    setPassengers((prev) => [...prev, newPassenger]);

    openNotificationWithIcon({
      type: 'success',
      title: 'Create new passenger',
      message: (
        <div className="flex flex-col">
          <span>{`Name: ${passenger?.name ?? ''}`}</span>
          <span>{`Surname: ${passenger?.surname ?? ''}`}</span>
          <span className="pt-[16px]">
            Full information in passenger`s profile
          </span>
        </div>
      ),
    });

    // getCashears();
    setIsModalOpen(false);

    clearModalFilds();
  };

  const clearModalFilds = () => {
    setPassenger({
      name: '',
      surname: '',
      passportNumber: '',
      role: 'passenger',
      email: '',
      cardNumber: '',
      phoneNmber: '',
    });
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
        <span className="text-[24px] flex-nowrap">List of passengers</span>
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
        <List
          filter={searchTerm}
          openNotification={openNotificationWithIcon}
          passengers={passengers}
        />
      </div>
      <div className="flex text-[24px] justify-between w-full font-bold">
        <Pagination defaultCurrent={1} total={cashears.length} />
        <Button type="primary" onClick={showModal}>
          Create new passenger
        </Button>
      </div>
      <Modal
        title={
          <span className="w-full flex items-center justify-center font-medium">
            Create new passenger
          </span>
        }
        onCancel={handleCancel}
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
          {[
            {
              key: 'name',
              label: 'Name',
              value: passenger.name,
              field: 'name',
            },
            {
              key: 'surname',
              label: 'Surname',
              value: passenger.surname,
              field: 'surname',
            },
            {
              key: 'passportNumber',
              label: 'Passport number',
              value: passenger.passportNumber,
              field: 'passportNumber',
            },
            {
              key: 'email',
              label: 'Email',
              value: passenger.email,
              field: 'email',
            },
            {
              key: 'phoneNumber',
              label: 'Phone number',
              value: passenger.phoneNmber,
              field: 'phoneNmber',
            },
            {
              key: 'cardNumber',
              label: 'Card number',
              value: passenger.cardNumber,
              field: 'cardNumber',
            },
          ].map((item) => (
            <div key={item.key} className="flex flex-col gap-y-[2px]">
              <span className="text-[#007AFF] text-[16px]">{item.label}</span>
              <Input
                value={item.value}
                onChange={(e) =>
                  setPassenger({ ...passenger, [item.field]: e.target.value })
                }
              />
            </div>
          ))}
        </form>
      </Modal>
    </WorkSpace>
  );
}

interface ListProps {
  filter: string;
  passengers: Passenger[];
  openNotification: (item: {
    type: NotificationType;
    title: string;
    message: ReactNode;
    error?: string;
  }) => void;
}

const List: React.FC<ListProps> = ({
  filter,
  openNotification,
  passengers,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [listPassengers, setListPassengers] = useState(
    passengers as Passenger[]
  );

  const { replenishPassengerBalance } = useCashaerStore();

  useEffect(() => {
    setListPassengers([...passengers]);
    console.log('Updated passengers:', passengers);
  }, [passengers]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const hendleReplenish = async () => {
    if (passenger.amound === '' || user.cardtNumber === '') {
      openNotification({
        type: 'error',
        title: 'Replenish',
        message: 'Please fill all fields',
      });
      return;
    }

    await replenishPassengerBalance(user.cardtNumber, +passenger.amound);

    openNotification({
      type: 'success',
      title: 'Replenish',
      message: 'Replenish was successful',
    });
    setIsModalOpen(false);
    setPassenger({
      name: '',
      surname: '',
      amound: '',
    });
    setUser({
      name: '',
      surname: '',
      cardtNumber: '',
    });
  };

  const [user, setUser] = useState({
    name: '',
    surname: '',
    cardtNumber: '',
  });

  const [passenger, setPassenger] = useState({
    name: '',
    surname: '',
    amound: '',
  });

  const { cashears } = useCashaerStore();

  // const passengers = await getPassengers();

  // const passengers = [
  //   { name: 'John', surname: 'Doe', cardtNumber: '123456789' },
  //   { name: 'Jane', surname: 'Smith', cardtNumber: '987654321' },
  //   { name: 'Alice', surname: 'Johnson', cardtNumber: '456789123' },
  //   { name: 'Bob', surname: 'Brown', cardtNumber: '321654987' },
  //   { name: 'Charlie', surname: 'Davis', cardtNumber: '654321789' },
  // ];
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  // const [total, setTotal] = useState(0);
  // const [loading, setLoading] = useState(false);

  // const filteredItems = useMemo(() => {
  //   console.log('useMemo');
  //   return filter
  //     ? listPassengers.filter((item) =>
  //         item.surname.toLowerCase().startsWith(filter.toLowerCase())
  //       )
  //     : listPassengers;
  // }, [filter, listPassengers, passengers]);

  return (
    <div className="w-full border-[#F0F0F0] rounded-[8px] border-[0.5px]">
      <HeaderList filds={filds} />
      {listPassengers.map((item, index) => (
        <div
          key={index}
          className="bg-white h-[54px] text-black flex items-start justify-between "
        >
          <div className="flex">
            <ListItemID id={index + 1} />
            <ListItem title={item.name} />
            <ListItem title={item.surname} />
          </div>
          <div className="flex items-center justify-end pr-[16px] gap-x-[8px] w-full h-full">
            <Button
              type="primary"
              onClick={() => {
                setUser({
                  name: item.name,
                  surname: item.surname,
                  cardtNumber: item?.cards?.at(-1) ?? '',
                });
                showModal();
              }}
            >
              Replenish
            </Button>
            <Button
              type="primary"
              onClick={() => router.push(`/user/${item.surname}`)}
            >
              Operations
            </Button>
          </div>
        </div>
      ))}
      <Modal
        title={
          <span className="w-full flex items-center justify-center font-medium">
            Replenish
          </span>
        }
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <div className="w-full flex justify-between mt-[30px]">
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button key="submit" type="primary" onClick={hendleReplenish}>
              Confirm
            </Button>
          </div>,
        ]}
      >
        <form>
          {[
            {
              key: 'cardtNumber',
              label: 'Card number',
              value: user.cardtNumber,
              field: 'cardtNumber',
            },
            {
              key: 'amound',
              label: 'Amound',
              value: passenger.amound,
              field: 'amound',
            },
          ].map((item) => (
            <div key={item.key} className="flex flex-col gap-y-[2px]">
              <span className="text-[#007AFF] text-[16px]">{item.label}</span>
              <Input
                value={item.value}
                onChange={(e) =>
                  setPassenger({ ...passenger, [item.field]: e.target.value })
                }
              />
            </div>
          ))}
        </form>
      </Modal>
    </div>
  );
};
