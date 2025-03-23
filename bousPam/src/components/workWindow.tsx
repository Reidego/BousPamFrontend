'use client';
import { useState } from 'react';
import WorkSpace from './workSpace';
import { Input, Pagination, Button, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';

unstableSetRender((node, container) => {
  (container as any)._reactRoot ||= createRoot(container);
  const root = (container as any)._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

interface WorkWindowProps {
  children: React.ReactNode;
  title: string;
  //   isBackBotton: Boolean;
}

const handleSearch = (value: string) => console.log(value);

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

const WorkWindow: React.FC<WorkWindowProps> = ({ children, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <WorkSpace>
      <div className="flex text-[24px] justify-between  w-full font-bold">
        <span className="text-[24px] flex-nowrap">{title}</span>
        <div className="flex w-[577px]">
          <Input
            placeholder="Search"
            size="large"
            suffix={suffix}
            onPressEnter={(event) =>
              handleSearch((event.target as HTMLInputElement).value)
            }
          />
        </div>
      </div>
      <div className="min-h-[533px] w-full">{children}</div>
      <div className="flex text-[24px] justify-between w-full font-bold">
        <Pagination defaultCurrent={1} total={50} />
        <Button type="primary" onClick={showModal}>
          Create new cashier
        </Button>
      </div>
      <Modal
        title="Create new cashier"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
      </Modal>
    </WorkSpace>
  );
};

export default WorkWindow;
