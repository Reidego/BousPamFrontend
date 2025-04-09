'use client';
import { HeaderList, ListItem, ListItemID, WorkSpace } from '@/components';
import { Button, Input, Form, Modal, Pagination, notification } from 'antd';
import { useMemo, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useTerminalStore } from '@/store/terminalStore';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface ListProps {
  filter: string;
}

const filds = [
  { id: 1, fildName: '№' },
  { id: 2, fildName: 'Driver' },
];

const drivers = [
  { id: 1, driver: 'John Doe' },
  { id: 2, driver: 'Jane Smith' },
  { id: 3, driver: 'Alice Johnson' },
  { id: 4, driver: 'Bob Brown' },
];

const List: React.FC<ListProps> = ({ filter }) => {
  const { isAuth } = useUserStore();
  const router = useRouter();
  //   const { terminals } = useTerminalStore();

  // useEffect(() => {
  //   if (!isAuth) router.push('/');
  // }, []);

  const filteredItems = useMemo(() => {
    return filter
      ? drivers.filter((item) =>
          item?.driver?.toLowerCase().startsWith(filter.toLowerCase())
        )
      : drivers;
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
            <ListItem title={item.driver ?? ''} />
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
  const { terminals, addTerminal } = useTerminalStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [newDriver, setNewDriverName] = useState({
    name: '',
    lastname: '',
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      placement: 'top',
      message: 'New driver created',
      description: (
        <div className="flex flex-col">
          <span>{`Name: ${newDriver.name}`}</span>
          <span>{`Surname: ${newDriver.lastname}`}</span>
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

  const hendleCreate = () => {
    if (!newDriver.name || !newDriver.lastname) {
      openNotificationWithIcon('error');
      return;
    }

    drivers.push({
      id: drivers.length + 1,
      driver: `${newDriver.name} ${newDriver.lastname}`,
    });
    // const terminal = {
    //   fare: modalFildsFare,
    //   company_name: modalFildsName,
    // };
    // addTerminal(terminal);

    openNotificationWithIcon('success');
    setIsModalOpen(false);

    setNewDriverName({
      name: '',
      lastname: '',
    });
  };

  return (
    <WorkSpace>
      {contextHolder}
      <div className="flex text-[24px] justify-between  w-full font-bold">
        <span className="text-[24px] flex-nowrap">List of drivers</span>
        <div className="flex w-[577px]">
          <Input
            placeholder="Search by driver name"
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
        <Pagination defaultCurrent={1} total={drivers.length} />
        <Button type="primary" onClick={showModal}>
          Create new driver
        </Button>
      </div>
      <Modal
        title={
          <span className="w-full flex items-center justify-center font-medium">
            Create new driver
          </span>
        }
        centered
        onCancel={handleCancel}
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
          <div className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF]">Name</span>
            <Input
              id="companyName"
              value={newDriver.name}
              onChange={(e) =>
                setNewDriverName({ ...newDriver, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF]">Lastname</span>
            <Input
              id="companyName"
              value={newDriver.lastname}
              onChange={(e) =>
                setNewDriverName({ ...newDriver, lastname: e.target.value })
              }
            />
          </div>
        </form>
      </Modal>
    </WorkSpace>
  );
}
