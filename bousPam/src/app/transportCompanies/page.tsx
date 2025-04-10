'use client';
import { HeaderList, ListItem, ListItemID, WorkSpace } from '@/components';
import { useMemo, useState, useEffect } from 'react';
import { Input, Pagination, Button, Modal, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import { useCompamyStore } from '@/store/companyStore';

const filds = [
  { id: 1, fildName: '№' },
  { id: 2, fildName: 'Company' },
  { id: 3, fildName: 'Owner' },
];

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface ListProps {
  filter: string;
  items: {
    id?: number;
    name: string;
    owner?: string;
    owner_name?: string;
    owner_surname?: string;
  }[];
}

const List: React.FC<ListProps> = ({ filter, items }) => {
  const filteredItems = useMemo(() => {
    return filter
      ? items.filter((item) =>
          item.name.toLowerCase().startsWith(filter.toLowerCase())
        )
      : items;
  }, [filter, items]);

  return (
    <div className="w-full border-[#F0F0F0] rounded-[8px] border-[0.5px]">
      <HeaderList filds={filds} />

      {filteredItems.length === 0 && (
        <div className="flex items-center justify-center h-[200px] text-[16px] text-[#000000] opacity-45">
          No companies found
        </div>
      )}
      {filteredItems.length > 0 &&
        filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="bg-white h-[54px] text-black flex flex-col items-start justify-start"
          >
            <div className="flex">
              <ListItemID id={index + 1} />
              <ListItem title={item.name} />
              <ListItem title={item.owner ?? ''} />
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

export default function Profile() {
  const { companys, addCompany, getCompanys } = useCompamyStore();
  const [api, contextHolder] = notification.useNotification();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [modalFildsName, setModalFildsName] = useState('');
  const [modalFildsOwner, setModalFildsOwner] = useState('');

  const [myCompany, setMyCompany] = useState(companys);

  useEffect(() => {
    // if (!isAuth) router.push('/');
    (async () => {
      const data = await getCompanys();
      setMyCompany(data);
    })();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    createCompany();
    setIsModalOpen(false);
  };

  const createCompany = () => {
    let [owner_name, owner_surname] = modalFildsOwner.split(' ');
    if (!owner_surname) owner_surname = owner_name;

    const newCompany = {
      name: modalFildsName,
      owner_name,
      owner_surname,
    };

    addCompany(newCompany);
    // companys.push(newCompany);

    openNotificationWithIcon('success');

    clearModalFields();
  };

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      placement: 'top',
      message: 'Company created',
      description: (
        <div className="flex flex-col">
          <span>{`Name: ${modalFildsName}`}</span>
          <span>{`Owner: ${modalFildsOwner}`}</span>
        </div>
      ),
      showProgress: true,
      pauseOnHover: false,
      duration: 3,
    });
  };

  const clearModalFields = () => {
    setModalFildsName('');
    setModalFildsOwner('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <WorkSpace>
      <div className="flex text-[24px] justify-between  w-full font-bold">
        {contextHolder}
        <span className="text-[24px] flex-nowrap">
          List of transport companies
        </span>
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
        <List filter={searchTerm} items={myCompany} />
      </div>
      <div className="flex text-[24px] justify-between w-full font-bold">
        <Pagination defaultCurrent={1} total={companys.length} />
        <Button type="primary" onClick={showModal}>
          Create new company
        </Button>
      </div>
      <Modal
        title={
          <span className="w-full flex items-center justify-center font-medium">
            Create new company
          </span>
        }
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <div key="1" className="w-full flex justify-between mt-[30px]">
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button key="submit" type="primary" onClick={handleOk}>
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
            <span className="text-[#007AFF] text-[16px]">Owner</span>
            <Input
              id="owner"
              value={modalFildsOwner}
              onChange={(e) => setModalFildsOwner(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </WorkSpace>
  );
}
