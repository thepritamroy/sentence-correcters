import { FaCheck } from "react-icons/fa";

interface ProgressBarProps {
  currentIndex: number;
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({current,total,currentIndex}) => {
  const percentage = (current / total) * 100;

  return (


    <section>
      <div className="w-full bg-gray-200 rounded-full h-4 hidden [@media(max-width:370px)]:block">
  <div 
    className="bg-green-600 h-4 rounded-full"
    style={{ width: `${percentage}%` }}
  />
</div>

      <div className="flex justify-center [@media(max-width:370px)]:hidden">
        {[...Array(10)].map((_,i) => (

          <div key={i} className="flex justify-center items-center">
            {i===currentIndex ? 
            <div className=" h-10 w-10 max-sm:h-6 max-sm:w-6 max-md:w-8 max-md:h-8 flex justify-center items-center rounded-full border-2 border-yellow-500">
              <div  
                className={`rounded-full h-8 w-8 
                max-sm:h-4 max-sm:w-4 flex items-center justify-center text-sm max-sm:text-xs`}>
                {i+1}
              </div>
            </div> :
            <div             
              className={`${i<currentIndex ? 'bg-green-600 text-white' : 'bg-gray-100'} shadow-md rounded-full h-8 w-8 max-sm:h-4 max-sm:w-4 max-md:w-6 max-md:h-6 flex items-center justify-center text-sm max-sm:text-xs`}>
              {i<currentIndex ? <FaCheck className="text-white text-xs" /> : i+1}
            </div>
          }

            {(i+1) !== 10 && 
            <div className={`h-[2px] w-10 max-md:w-9 max-sm:w-5 max-[420px]:w-3 bg-gray-300 relative`}>
              <div className={`absolute h-full left-0 ${i>=currentIndex ? 'w-0' : 'w-full z-0'} bg-yellow-500 transition-all duration-300`}></div>
            </div>}
          </div>
                    
        ))}
      </div>
     </section>
  );
};

export default ProgressBar;