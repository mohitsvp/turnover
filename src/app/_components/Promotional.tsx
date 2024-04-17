import React from 'react'
import { IoIosArrowBack , IoIosArrowForward} from "react-icons/io";

interface PromotionalProps {
    text : string;
}

const Promotional:React.FC<PromotionalProps> = ({text}) => {
  return (
    <div>
        {/* Promotional */}
        <div className='h-[36px] bg-[#F4F4F4] flex items-center justify-center'>
          <div className='w-[20%] flex justify-between'>
            <div>
              <IoIosArrowBack/>
            </div>
            <div>
              <p className='text-[14px]'>{text}</p>
            </div>
            <div>
              <IoIosArrowForward/>
            </div>
          </div>
          </div>
    </div>
  )
}

export default Promotional