'use client';
import WorkSpace from '@/components/workSpace';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Pagination, Button, Modal, Divider } from 'antd';
import { useState } from 'react';
import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';
import WorkWindow from '@/components/workWindow';
const List = () => {
  return <div>Просто имя и ничего большео!!!</div>;
};

export default function Users() {
  return <WorkWindow title="List of cashiers" children={<List />} />;
}
