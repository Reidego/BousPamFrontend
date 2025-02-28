import { ListItem, PeaoleItem, AnalitikItem, SettingItem } from '@/utils/svg';

export default function TapBar() {
  return (
    <div className="px-[30px] items-center justify-center gap-y-[30px] grid max-h-[230px]">
      <img
        src="image.png"
        className="size-[40px] border-[3px] border-white object-cover rounded-full"
      />
      <ListItem />
      <PeaoleItem />
      <AnalitikItem />
      <SettingItem />
    </div>
  );
}
