import TapBar from '@/components/tapbar';
import Button from '@/components/button';
import Input from '@/components/input';
import { UploadItems } from '@/utils/svg';

export default function Prfile() {
  const filds = [
    'Full name',
    'Company name',
    'Role',
    'Phone number',
    'Email',
    'Password',
  ];
  return (
    <div className="pt-[68px] pb-[25px] pl-[30px] pr-[40px] h-screen flex">
      <TapBar />
      <div className="bg-white rounded-[20px] w-full p-[25px]">
        <div className="flex justify-between pb-[53px]">
          <span className="text-[#2A2A26] text-[30px]">Profile</span>
          <div className="flex gap-[20px]">
            <Button text="Save" />
            <Button
              text="Cancel"
              colorBotton="bg-[#F6F6F6]"
              colorTextBotton="text-[#2A2A26]"
            />
          </div>
        </div>
        <div>
          <div className="flex gap-[63px]">
            <div className="flex-col items-center justify-center w-[150px]">
              <span className="text-orange-500">Your Photo</span>
              <img
                src="image.png"
                className="rounded-full size-[150px] object-cover"
              />
            </div>
            <div className="flex items-center justify-center">
              <button className=" bg-[#2A2A26] text-[#F6F6F6] rounded-[10px]">
                <div className="flex items-center  px-[15px] py-[10px]">
                  <UploadItems />
                  <span className="whitespace-nowrap">Upload image</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-[55px] gap-y-[13px] grid grid-cols-2 max-w-1/2">
          {filds.map((item, index) => (
            <Input key={index} text={item} />
          ))}
          <div className="block"></div>
          <div className="block">
            <Button text="Change password" />
          </div>
        </div>
      </div>
    </div>
  );
}
