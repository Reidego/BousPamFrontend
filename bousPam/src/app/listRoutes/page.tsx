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
  { id: 4, fildName: 'Bus number' },
  { id: 5, fildName: 'First stop' },
  { id: 6, fildName: 'Last stop' },
];

const route = [
  {
    id: 1,
    terminalId: '123',
    route: 'A-B',
    busNumber: 'AB123',
    firstStop: 'A',
    lastStop: 'B',
  },
  {
    id: 2,
    terminalId: '456',
    route: 'B-C',
    busNumber: 'BC456',
    firstStop: 'B',
    lastStop: 'C',
  },
  {
    id: 3,
    terminalId: '789',
    route: 'C-D',
    busNumber: 'CD789',
    firstStop: 'C',
    lastStop: 'D',
  },
  {
    id: 4,
    terminalId: '101',
    route: 'D-E',
    busNumber: 'DE101',
    firstStop: 'D',
    lastStop: 'E',
  },
];

const List: React.FC<ListProps> = ({ filter }) => {
  //const { terminals } = useTerminalStore();

  // useEffect(() => {
  //   if (!isAuth) router.push('/');
  // }, []);

  const filteredItems = useMemo(() => {
    return filter
      ? route.filter((item) =>
          item?.terminalId?.toLowerCase().startsWith(filter.toLowerCase())
        )
      : route;
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
            <ListItem title={item.busNumber ?? ''} />
            <ListItem title={item.firstStop ?? ''} />
            <ListItem title={item.lastStop ?? ''} />
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

  const [newRoute, setNewRoute] = useState({
    terminalId: '',
    route: '',
    busNumber: '',
    firstStop: '',
    lastStop: '',
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
          <span>{`Terminal Id: ${newRoute.terminalId}`}</span>
          <span>{`Route: ${newRoute.route}`}</span>
          <span>{`Bus number: ${newRoute.busNumber}`}</span>
          <span>{`First stop: ${newRoute.firstStop}`}</span>
          <span>{`Last stop: ${newRoute.lastStop}`}</span>
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
    setNewRoute({
      terminalId: '',
      route: '',
      busNumber: '',
      firstStop: '',
      lastStop: '',
    });
  };

  const hendleCreate = () => {
    if (
      !newRoute.terminalId ||
      !newRoute.route ||
      !newRoute.busNumber ||
      !newRoute.firstStop ||
      !newRoute.lastStop
    ) {
      openNotificationWithIcon('error');
      return;
    }
    // const terminal = {
    //   fare: modalFildsFare,
    //   company_name: modalFildsName,
    // };
    // addTerminal(terminal);
    route.push({
      id: route.length + 1,
      terminalId: newRoute.terminalId,
      route: newRoute.route,
      busNumber: newRoute.busNumber,
      firstStop: newRoute.firstStop,
      lastStop: newRoute.lastStop,
    });

    openNotificationWithIcon('success');
    setIsModalOpen(false);

    clearModalFields();
  };

  return (
    <WorkSpace>
      {contextHolder}
      <div className="flex text-[24px] justify-between  w-full font-bold">
        <span className="text-[24px] flex-nowrap">List of routes</span>
        <div className="flex w-[577px]">
          <Input
            placeholder="Search by Terminal id"
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
        <Pagination defaultCurrent={1} total={route.length} />
        <Button type="primary" onClick={showModal}>
          Create new route
        </Button>
      </div>
      <Modal
        title={
          <span className="w-full flex items-center justify-center font-medium">
            Create new route
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
              value={newRoute.terminalId}
              onChange={(e) =>
                setNewRoute({ ...newRoute, terminalId: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF]">Route</span>
            <Input
              id="companyName"
              value={newRoute.route}
              onChange={(e) =>
                setNewRoute({ ...newRoute, route: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF]">Bus number</span>
            <Input
              id="companyName"
              value={newRoute.busNumber}
              onChange={(e) =>
                setNewRoute({ ...newRoute, busNumber: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF]">First stop</span>
            <Input
              id="companyName"
              value={newRoute.firstStop}
              onChange={(e) =>
                setNewRoute({ ...newRoute, firstStop: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF]">Last stop</span>
            <Input
              id="companyName"
              value={newRoute.lastStop}
              onChange={(e) =>
                setNewRoute({ ...newRoute, lastStop: e.target.value })
              }
            />
          </div>
        </form>
      </Modal>
    </WorkSpace>
  );
}
