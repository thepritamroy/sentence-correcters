

interface OptionButtonProps {
  word: string;
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  word,
  onClick,
}) => {

  return (
    <button
      className= "px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-gray-100 hover:bg-gray-200 text-gray-800"
      onClick={onClick}
    >
      {word}
    </button>
  );
};

export default OptionButton;