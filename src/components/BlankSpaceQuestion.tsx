import { useEffect, useState } from 'react';
import { Question } from '../types/types';
import OptionButton from './OptionButton';
import Timer from './Timer';
import ProgressBar from './ProgressBar';

interface BlankSpaceQuestionProps {
  question: Question;
  onAnswerSubmit: (answers: string[]) => void;
  onTimeout: () => void;
  timeLimit: number;
  fadeIn: boolean;
  questionIndex: number;
  totalQuestions: number;
}

const BlankSpaceQuestion: React.FC<BlankSpaceQuestionProps> = ({
  question,
  onAnswerSubmit,
  onTimeout,
  timeLimit,
  fadeIn,
  questionIndex,
  totalQuestions
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [availableOptions, setAvailableOptions] = useState<string[]>(question.options);
  const [timeLeft, setTimeLeft] = useState(timeLimit);


  useEffect(() => {
    setSelectedOptions([]);
    setAvailableOptions(question.options);
    setTimeLeft(timeLimit);
  }, [question, timeLimit]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeout]);

  const handleOptionSelect = (word: string) => {
    // Find the first empty slot (if any)
    const emptySlotIndex = selectedOptions.indexOf('');
  
    // Determine the new selected options
    const newSelectedOptions = emptySlotIndex !== -1
      ? selectedOptions.map((option, index) => 
          index === emptySlotIndex ? word : option
        )
      : [...selectedOptions, word];
  
    setSelectedOptions(newSelectedOptions);
    setAvailableOptions(availableOptions.filter(option => option !== word));
  };
  
  const handleBlankClick = (index: number) => {
    const removedWord = selectedOptions[index];
    
    // Create new selected options with the clicked blank emptied
    const newSelectedOptions = selectedOptions.map((option, i) => 
      i === index ? '' : option
    );
  
    // Add the removed word back to available options
    const newAvailableOptions = [...availableOptions, removedWord].sort();
  
    setSelectedOptions(newSelectedOptions);
    setAvailableOptions(newAvailableOptions);
  };

  const renderQuestionWithBlanks = () => {
    const parts = question.question.split('_____________');
    return parts.map((part, index) => (
      <span key={index}>
        <span>{part}</span>
        {index < parts.length - 1 && (
          <span className='inline-block'>
            {selectedOptions[index] ? 
            <button 
              onClick={() => handleBlankClick(index)}
              className='min-w-[100px] font-bold font-mono text-[#2d9ac2] mx-1  cursor-pointer border-2 py-2 px-2 rounded-md relative  bounce h-9 flex justify-center items-center'>
                {selectedOptions[index]}
                <span className='absolute left-0 -bottom-2 h-[1.5px] w-full bg-red-700 border-dotted border-2'></span>
            </button> 
            : '_____________'}
          </span>
        )}
      </span>
    ));
  };

  return (
    <div className={`max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md ${fadeIn ? 'fade-in' : ''}`}>
      <div className="mb-10">
          <ProgressBar
            currentIndex={questionIndex}
            current={questionIndex + 1}
            total={totalQuestions}
          />
        </div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-500">
          Question {questionIndex + 1} of {totalQuestions}
        </div>
        <Timer timeLeft={timeLeft} />
      </div>

      <div className="mb-8 text-lg leading-[3.25rem]">
        {renderQuestionWithBlanks()}
      </div>

      <div className="flex justify-center gap-3 mb-6 h-[50px] max-sm:grid max-sm:grid-cols-2 max-sm:mb-20">
        {availableOptions.map((word) => (
          <OptionButton
            key={word}
            word={word}
            onClick={() => handleOptionSelect(word)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => {
            if (selectedOptions.length === question.correctAnswer.length) {
              onAnswerSubmit(selectedOptions);

            }
          }}
          className={`border-2 border-gray-800 px-4 py-2 rounded  ${selectedOptions.length === question.correctAnswer.length ? 'bg-blue-800 border-none text-white hover:-translate-y-1 transition-all duration-300 ease-in' : 'cursor-not-allowed opacity-75'}`}
        >
          Submit Answer
        </button>
      </div>
    </div>
  )
}

export default BlankSpaceQuestion;