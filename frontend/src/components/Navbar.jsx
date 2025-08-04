import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-300'>
        <div className="mycontainer flex justify-between items-center pl-0 pr-4 py-5 h-14 min-w-full">

            <h1 className="logo font-bold flex justify-between items-center text-center text-2xl">
              <span className='text-purple-900'>&lt;</span>
                Pass<span className='text-purple-900'>OP/&gt;</span>
                </h1>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold'  href='/'>Home</a>
                <a className='hover:font-bold' href='#'>About</a>
                <a className='hover:font-bold' href='#'>Contact</a>
            </li>
        </ul> */}
          <button className='flex ring-purple-100 ring-2 rounded-md gap-2 pr-2 justify-center items-center h-10 bg-purple-900 text-white'>
            <img width={50} height={20} className='invert p-2' src="github.svg" alt="github logo" />
            <span className='font-bold px-1'>GitHub</span>
          </button>
        
        </div>
        
    </nav>
  )
}

export default Navbar
