'use client';
import { HeaderList, ListItem, ListItemID, WorkSpace } from '@/components';
import { Button, Input, Modal, Pagination, notification } from 'antd';
import { useMemo, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface ListProps {
  filter: string;
}

const filds = [
  { id: 1, fildName: '№' },
  { id: 2, fildName: 'Terminal id' },
  { id: 3, fildName: 'Route' },
  { id: 4, fildName: 'Number' },
];

const buses = [
  { id: 1, terminalId: '123', route: 'A-B', number: 'AB123' },
  { id: 2, terminalId: '456', route: 'B-C', number: 'BC456' },
  { id: 3, terminalId: '789', route: 'C-D', number: 'CD789' },
  { id: 4, terminalId: '101', route: 'D-E', number: 'DE101' },
];

const List: React.FC<ListProps> = ({ filter }) => {
  //   const { terminals } = useTerminalStore();

  // useEffect(() => {
  //   if (!isAuth) router.push('/');
  // }, []);

  const filteredItems = useMemo(() => {
    return filter
      ? buses.filter((item) =>
          item?.number?.toLowerCase().startsWith(filter.toLowerCase())
        )
      : buses;
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
            <ListItem title={item.terminalId ?? ''} />
            <ListItem title={item.route ?? ''} />
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

export default function Terminals() {
  const [api, contextHolder] = notification.useNotification();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [newBus, setNewBus] = useState({
    terminalId: '',
    route: '',
    number: '',
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      placement: 'top',
      message: 'Terminal created',
      description: (
        <div className="flex flex-col">
          <span>{`Terminal ID: ${newBus.terminalId}`}</span>
          <span>{`Route: ${newBus.route}`}</span>
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
      terminalId: '',
      route: '',
      number: '',
    });
  };

  const hendleCreate = () => {
    if (!newBus.terminalId || !newBus.route || !newBus.number) {
      openNotificationWithIcon('error');
      return;
    }

    buses.push({
      id: buses.length + 1,
      terminalId: newBus.terminalId,
      route: newBus.route,
      number: newBus.number,
    });
    // const terminal = {
    //   fare: modalFildsFare,
    //   company_name: modalFildsName,
    // };
    // addTerminal(terminal);

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
        <List filter={searchTerm} />
      </div>
      <div className="flex text-[24px] justify-between w-full font-bold">
        <Pagination defaultCurrent={1} total={buses.length} />
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
            <span className="text-[#007AFF]">Terminal Id</span>
            <Input
              id="companyName"
              value={newBus.terminalId}
              onChange={(e) =>
                setNewBus({ ...newBus, terminalId: e.target.value })
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
          <div className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF]">Route</span>
            <Input
              id="companyName"
              value={newBus.route}
              onChange={(e) => setNewBus({ ...newBus, route: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </WorkSpace>
  );
}
