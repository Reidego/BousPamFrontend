'use client';
import { HeaderList, ListItem, ListItemID, WorkSpace } from '@/components';
import { Button, Input, Modal, Pagination, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useBusesStore } from '@/store/busesStore';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface ListProps {
  filter: string;
  items: {
    id: number;
    company_name?: string;
    route?: string;
    number?: string;
  }[];
}

const fields = [
  { id: 1, fildName: '№' },
  { id: 2, fildName: 'Company name' },
  { id: 3, fildName: 'Route' },
  { id: 4, fildName: 'Number' },
];

const buses: {
  id: number;
  terminalId: string;
  route: string;
  number: string;
}[] = [
  { id: 1, terminalId: '123', route: 'A-B', number: 'AB123' },
  { id: 2, terminalId: '456', route: 'B-C', number: 'BC456' },
  { id: 3, terminalId: '789', route: 'C-D', number: 'CD789' },
  { id: 4, terminalId: '101', route: 'D-E', number: 'DE101' },
];

const List: React.FC<ListProps> = ({ filter, items }) => {
  //   const { terminals } = useTerminalStore();

  // useEffect(() => {
  //   if (!isAuth) router.push('/');
  // }, []);

  const filteredItems = useMemo(() => {
    return filter
      ? items.filter((item) =>
          item?.number?.toLowerCase().startsWith(filter.toLowerCase())
        )
      : items;
  }, [filter, items]);

  console.log(items);
  return (
    <div className="w-full border-[#F0F0F0] rounded-[8px] border-[0.5px]">
      <HeaderList filds={fields} />
      {filteredItems.map((item, index) => (
        <div
          key={item.id}
          className="bg-white h-[54px] text-black flex flex-col items-start justify-start"
        >
          <div className="flex">
            <ListItemID id={index + 1} />
            <ListItem title={item.company_name ?? ''} />
            <ListItem title={item.route ?? 'Belarus'} />
            <ListItem title={item.number ?? ''} />
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

export default function Bus() {
  const [api, contextHolder] = notification.useNotification();

  const { isAuth } = useUserStore();

  const { buses, getAllBuses, addBus } = useBusesStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [myBuses, setMyBuses] = useState(buses);

  // {
  //   number: string;
  //   company_name: string;
  //   id: number;
  // }
  const [newBus, setNewBus] = useState({
    companyName: '',
    number: '',
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const router = useRouter();

  useEffect(() => {
    if (!isAuth) router.push('/');
    (async () => {
      const data = await getAllBuses();
      setMyBuses(data);
    })();
  }, []);

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      placement: 'top',
      message: 'Terminal created',
      description: (
        <div className="flex flex-col">
          <span>{`Company name: ${newBus.companyName}`}</span>
          <span>{`Bus number: ${newBus.number}`}</span>
        </div>
      ),
      showProgress: true,
      pauseOnHover: false,
      duration: 3,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const clearModalFields = () => {
    setNewBus({
      companyName: '',
      number: '',
    });
  };

  const hendleCreate = () => {
    if (!newBus.companyName || !newBus.number) {
      openNotificationWithIcon('error');
      return;
    }

    const bus = {
      number: newBus.number,
      company_name: newBus.companyName,
    };

    addBus(newBus);

    setMyBuses((prev) => [...prev, { ...bus, id: myBuses.length + 1 }]);

    openNotificationWithIcon('success');
    setIsModalOpen(false);

    clearModalFields();
  };

  return (
    <WorkSpace>
      {contextHolder}
      <div className="flex text-[24px] justify-between  w-full font-bold">
        <span className="text-[24px] flex-nowrap">List of buses</span>
        <div className="flex w-[577px]">
          <Input
            placeholder="Search by bus number"
            size="large"
            suffix={suffix}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full">
        <List filter={searchTerm} items={myBuses} />
      </div>
      <div className="flex text-[24px] justify-between w-full font-bold">
        <Pagination defaultCurrent={1} total={myBuses.length} />
        <Button type="primary" onClick={showModal}>
          Create new bus
        </Button>
      </div>
      <Modal
        title={
          <span className="w-full flex items-center justify-center font-medium">
            Create new bus
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
          <div className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF]">Company name</span>
            <Input
              id="companyName"
              value={newBus.companyName}
              onChange={(e) =>
                setNewBus({ ...newBus, companyName: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF]">Bus number</span>
            <Input
              id="companyName"
              value={newBus.number}
              onChange={(e) => setNewBus({ ...newBus, number: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </WorkSpace>
  );
}
