'use client';
import { HeaderList, ListItem, ListItemID } from '@/components';
import { Pagination } from 'antd';
import { useState, useEffect } from 'react';
import '@ant-design/v5-patch-for-react-19';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { usePassengerStore } from '@/store/passangerStore';

const filds = [
  { id: 1, fildName: '№' },
  { id: 2, fildName: 'Company' },
  { id: 3, fildName: 'Date' },
  { id: 4, fildName: 'Time ' },
  { id: 5, fildName: 'Terminal id' },
  { id: 6, fildName: 'Total cost' },
  { id: 7, fildName: 'Status' },
];

const passengersFilds = [
  {
    id_operation: 1,
    cardtNumber: 1,
    company: 'Company 1',
    data: '2023-10-01',
    time: '12:00',
    id_terminal: '1',
    balance_change: '100',
    state: 'Paid',
  },
  {
    id_operation: 2,
    cardtNumber: 2,
    company: 'Company 2',
    data: '2023-10-02',
    time: '14:00',
    id_terminal: '2',
    balance_change: '200',
    state: 'Not Paid',
  },
  {
    id_operation: 3,
    cardtNumber: 3,
    company: 'Company 3',
    data: '2023-10-03',
    time: '16:00',
    id_terminal: '3',
    balance_change: '300',
    state: 'Canceled',
  },
];

export default function Passengers() {
  const { user } = usePassengerStore();

  const userSurname = user.surname;
  return (
    <div className="w-full">
      <div className="text-black  ml-[125px] mr-[90px] mb-[30px] mt-[56px] bg-[#fff] rounded-[8px] py-[28px] px-[100px] items-center justify-between flex-col gap-y-[48px] flex">
        <div className="flex text-[24px] justify-between  w-full">
          <span className="text-[24px] flex-nowrap font-bold">
            List of trips {userSurname}
          </span>
        </div>
        <div className="w-full">
          <List />
        </div>
        <div className="flex text-[24px] justify-between w-full font-bold">
          <Pagination defaultCurrent={1} total={passengersFilds.length} />
        </div>
      </div>
    </div>
  );
}

// interface ListProps {}

interface Operations {
  balance_change: string;
  datetime: Date;
  id_operation: number;
  data: string;
  time: string;
  company: string;
  id_terminal: string;
  id_user: number;
  terminal_hash: string;
  type: string;
  state: string;
}

const List: React.FC = () => {
  const [operations, setOperations] = useState([] as Operations[]);
  // const [passengersFilds, setPassengersFilds] = useState();

  const { isAuth } = useUserStore();
  const { getOpeartions, user } = usePassengerStore();
  const router = useRouter();

  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  // const [total, setTotal] = useState(0);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isAuth) router.push('/');
    (async () => {
      const operationsData = await getOpeartions(user.id);
      setOperations(
        operationsData.map((item) => {
          const datetime = new Date(item.datetime);
          return {
            ...item,
            company: 'Bous Pam',
            data: datetime.toISOString().split('T')[0],
            time: datetime.toISOString().split('T')[1].split('.')[0],
            state: 'Paid',
          };
        })
      );
    })();
  }, []);

  return (
    <div className="w-full border-[#F0F0F0] rounded-[8px] border-[0.5px]">
      <HeaderList filds={filds} />
      {operations.length === 0 && (
        <div className="flex items-center justify-center h-[200px] w-full">
          <span className="text-[#C4C4C4] text-[16px]">
            No found operations
          </span>
        </div>
      )}
      {operations.length > 0 &&
        operations.map((item) => (
          <div
            key={item.id_operation}
            className="bg-white h-[54px] text-black flex items-start "
          >
            <div className="flex">
              <ListItemID id={item.id_operation} />
              <ListItem title={item.company} />
              <ListItem title={item.data} />
              <ListItem title={item.time} />
              <ListItem title={item.id_terminal} />
              <ListItem title={item.balance_change} />
              <Status status={item.state} />
            </div>
          </div>
        ))}
    </div>
  );
};

const Status = ({ status }: { status: string }) => {
  let color: string;
  let colorBg: string;
  let textColor: string;
  switch (status) {
    case 'Paid':
      colorBg = 'bg-[#F6FFED]';
      textColor = 'text-[#52C41A]';
      color = 'border-[#B7EB8F]';
      status = 'PAID';
      break;
    case 'Not Paid':
      colorBg = 'bg-[#FFFBE6]';
      textColor = 'text-[#FAAD14]';
      color = 'border-[#FFE58F]';
      status = 'NOT PAID';
      break;
    case 'Canceled':
      colorBg = 'bg-[#FFF2E8]';
      textColor = 'text-[#FA541C]';
      color = 'border-[#FFBB96]';
      status = 'CANCELED';
      break;
    default:
      colorBg = 'bg-blue-500';
      textColor = 'text-blue-500';
      color = 'bg-green-500';
  }

  return (
    <div className="flex items-center justify-center h-[54px]">
      <span
        className={`${colorBg} ${color} ${textColor} rounded-[4px] border-[1px] flex items-center justify-center h-[22px]  px-[8px] py-[1px] `}
      >
        {status}
      </span>
    </div>
  );
};
