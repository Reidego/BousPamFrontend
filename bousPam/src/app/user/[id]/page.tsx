'use client';
import { HeaderList, ListItem, ListItemID, WorkSpace } from '@/components';
import {
  Button,
  Input,
  Modal,
  Pagination,
  Space,
  Tag,
  message,
  notification,
} from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useMemo, useState, useEffect, ReactNode } from 'react';
import '@ant-design/v5-patch-for-react-19';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useCashaerStore } from '@/store/cashearStore';
import { text } from 'stream/consumers';

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
    cardtNumber: 1,
    company: 'Company 1',
    date: '2023-10-01',
    time: '12:00',
    terminalId: '1',
    totalCost: '100',
    state: 'Paid',
  },
  {
    cardtNumber: 2,
    company: 'Company 2',
    date: '2023-10-02',
    time: '14:00',
    terminalId: '2',
    totalCost: '200',
    state: 'Not Paid',
  },
  {
    cardtNumber: 3,
    company: 'Company 3',
    date: '2023-10-03',
    time: '16:00',
    terminalId: '3',
    totalCost: '300',
    state: 'Canceled',
  },
];

export default function Passengers() {
  const { cashears, addCashear, getCashears } = useCashaerStore();

  const path = usePathname();
  const userSurname = path.split('/').at(-1);
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

interface ListProps {}

const List: React.FC<ListProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAuth } = useUserStore();
  const { cashears } = useCashaerStore();
  const router = useRouter();

  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  // const [total, setTotal] = useState(0);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isAuth) router.push('/');
  }, []);

  // const filteredItems = useMemo(() => {
  //   return filter
  //     ? passengersFilds.filter((item) =>
  //         item.company.toLowerCase().startsWith(filter.toLowerCase())
  //       )
  //     : passengersFilds;
  // }, [filter]);

  return (
    <div className="w-full border-[#F0F0F0] rounded-[8px] border-[0.5px]">
      <HeaderList filds={filds} />
      {passengersFilds.map((item, index) => (
        <div
          key={item.cardtNumber}
          className="bg-white h-[54px] text-black flex items-start "
        >
          <div className="flex">
            <ListItemID id={index + 1} />
            <ListItem title={item.company} />
            <ListItem title={item.date} />
            <ListItem title={item.time} />
            <ListItem title={item.terminalId} />
            <ListItem title={item.totalCost} />
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
