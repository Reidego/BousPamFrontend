interface GreetingProps {
  text: string;
  colorBotton?: string;
  colorTextBotton?: string;
}

const Button: React.FC<GreetingProps> = ({
  text,
  colorBotton,
  colorTextBotton,
}) => {
  return (
    <button
      className={`bg-[#2A2A26] rounded-[10px] min-h-[42px] shadow-md ${colorBotton}`}
    >
      <span className={`px-[42px] py-[11px] text-[16px] ${colorTextBotton}`}>
        {text}
      </span>
    </button>
  );
};

export default Button;
