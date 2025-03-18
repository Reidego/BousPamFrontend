interface Props {
  text: string;
}

const Input: React.FC<Props> = ({ text }) => {
  return (
    <div>
      <span className="text-orange-500 text-[16px] block">{text}</span>
      <input
        type="text"
        className="bg-[#F6F6F6] text-[#2A2A26] text-[18px] py-[10px] px-[15px] w-[380px] rounded-[10px]"
      />
    </div>
  );
};

export default Input;
