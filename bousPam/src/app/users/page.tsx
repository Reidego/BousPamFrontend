import { HeaderList, WorkWindow } from '@/components';

const filds = [
  { id: 1, fildName: '№' },
  { id: 2, fildName: 'Name' },
  { id: 3, fildName: 'Surname ' },
  { id: 4, fildName: 'login' },
  { id: 5, fildName: 'gender' },
  { id: 6, fildName: 'date_of_birth' },
];

const items = [
  {
    id: 1,
    name: 'Name 1',
    surname: 'Surname 1',
    login: 'login',
    gender: 'gender',
    date_of_birth: 'date_of_birth',
  },
  {
    id: 2,
    name: 'Name 2',
    surname: 'Surname 2',
    login: 'login',
    gender: 'gender',
    date_of_birth: 'date_of_birth',
  },
  {
    id: 3,
    name: 'Name 3',
    surname: 'Surname 3',
    login: 'login',
    gender: 'gender',
    date_of_birth: 'date_of_birth',
  },
  {
    id: 4,
    name: 'Name 4',
    surname: 'Surname 4',
    login: 'login',
    gender: 'gender',
    date_of_birth: 'date_of_birth',
  },
  {
    id: 5,
    name: 'Name 5',
    surname: 'Surname 5',
    login: 'login',
    gender: 'gender',
    date_of_birth: 'date_of_birth',
  },
  {
    id: 6,
    name: 'Name 6',
    surname: 'Surname 6',
    login: 'login',
    gender: 'gender',
    date_of_birth: 'date_of_birth',
  },
  {
    id: 7,
    name: 'Name 7',
    surname: 'Surname 7',
    login: 'login',
    gender: 'gender',
    date_of_birth: 'date_of_birth',
  },
  {
    id: 8,
    name: 'Name 8',
    surname: 'Surname 8',
    login: 'login',
    gender: 'gender',
    date_of_birth: 'date_of_birth',
  },
  {
    id: 9,
    name: 'Name 9',
    surname: 'Surname 9',
    login: 'login',
    gender: 'gender',
    date_of_birth: 'date_of_birth',
  },
];

const List = () => {
  return (
    <div className="w-full border-[#F0F0F0] rounded-[8px] border-[0.5px]">
      <HeaderList filds={filds} />
    </div>
  );
};

export default function Users() {
  return (
    <WorkWindow
      title="List of cashiers"
      paginationLength={items.length}
      children={<List />}
    />
  );
}
