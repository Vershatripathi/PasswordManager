import React from 'react'

const Footer = () => {
  return (
    <div className=' flex flex-col items-center h-16 ustify-center  bg-purple-400 min-w-full m-0'>
            <div className="logo font-bold flex justify-between items-center text-center text-2xl ">
              <span className='text-purple-900'>&lt;</span>
                Pass<span className='text-purple-900'>OP/&gt;</span>
                </div>
        <div className='flex items-center font-bold'>
   Created with <img width={38} src="heart.png" alt="heart" /> by Versha Tripathi
        </div>
   
    </div>
  )
}

export default Footer
