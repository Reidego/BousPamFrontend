'use client';
import { HeaderList, ListItem, ListItemID, WorkSpace } from '@/components';
import { Button, Input, Modal, Pagination, notification } from 'antd';
import { useMemo, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import { useTerminalStore } from '@/store/terminalStore';

const filds = [
  { id: 1, fildName: '№' },
  { id: 2, fildName: 'Terminal id' },
  { id: 3, fildName: 'Fare' },
  { id: 4, fildName: 'Company' },
];

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface ListProps {
  filter: string;
  items: {
    id?: number;
    terminalId?: string;
    fare: number;
    company?: string;
    terminal_id?: string;
    company_name?: string;
  }[];
}

const List: React.FC<ListProps> = ({ filter, items }) => {
  // useEffect(() => {
  //   if (!isAuth) router.push('/');
  // }, []);

  const filteredItems = useMemo(() => {
    return filter
      ? items.filter((item) =>
          item?.company?.toLowerCase().startsWith(filter.toLowerCase())
        )
      : items;
  }, [filter]);

  return (
    <div className="w-full border-[#F0F0F0] rounded-[8px] border-[0.5px]">
      <HeaderList filds={filds} />

      {filteredItems.length === 0 && (
        <div className="flex items-center justify-center h-[200px] w-full">
          <span className="text-[#C4C4C4] text-[16px]">No found terminal</span>
        </div>
      )}
      {filteredItems.length > 0 &&
        filteredItems.map((item, index) => (
          <div
            key={item.terminalId}
            className="bg-white h-[54px] text-black flex flex-col items-start justify-start"
          >
            <div className="flex">
              <ListItemID id={index + 1} />
              <ListItem title={item.terminalId ?? ''} />
              <ListItem title={`${item.fare}`} />
              <ListItem title={item.company ?? ''} />
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
  const { terminals, addTerminal, getTerminals } = useTerminalStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [modalFildsName, setModalFildsName] = useState('');
  const [modalFildsFare, setModalFildsFare] = useState(NaN);

  const [myTerminal, setMyTerminal] = useState(terminals);

  useEffect(() => {
    // if (!isAuth) router.push('/');
    (async () => {
      const data = await getTerminals();
      setMyTerminal(data);
    })();
  }, []);

  const hash = 'asadasd9asdudu89asud8998sad89sad9';

  const showModal = () => {
    setIsModalOpen(true);
  };

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      placement: 'top',
      message: 'Terminal created',
      description: (
        <div className="flex flex-col">
          <span>Terminal hash:</span>
          <span>{hash}</span>
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
    setModalFildsName('');
    setModalFildsFare(NaN);
  };

  const hendleCreate = () => {
    const terminal = {
      fare: modalFildsFare,
      company_name: modalFildsName,
    };
    addTerminal(terminal);

    openNotificationWithIcon('success');
    setIsModalOpen(false);

    clearModalFields();
  };

  return (
    <WorkSpace>
      {contextHolder}
      <div className="flex text-[24px] justify-between  w-full font-bold">
        <span className="text-[24px] flex-nowrap">List of terminals</span>
        <div className="flex w-[577px]">
          <Input
            placeholder="Search by company name"
            size="large"
            suffix={suffix}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full">
        <List filter={searchTerm} items={myTerminal} />
      </div>
      <div className="flex text-[24px] justify-between w-full font-bold">
        <Pagination defaultCurrent={1} total={myTerminal.length} />
        <Button type="primary" onClick={showModal}>
          Create new terminal
        </Button>
      </div>
      <Modal
        title={
          <span className="w-full flex items-center justify-center font-medium">
            Create new terminal
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
              value={modalFildsName}
              onChange={(e) => setModalFildsName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-[2px]">
            <span className="text-[#007AFF] text-[16px]">Fare</span>
            <Input
              id="fare"
              value={isNaN(modalFildsFare) ? '' : modalFildsFare}
              onChange={(e) => {
                const value = e.target.value;
                if (!isNaN(Number(value))) {
                  setModalFildsFare(Number(value));
                }
              }}
            />
          </div>
        </form>
      </Modal>
    </WorkSpace>
  );
}
