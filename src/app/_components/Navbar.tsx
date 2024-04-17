import React from 'react'
import { FaSearch, FaShoppingCart } from 'react-icons/fa'

const Navbar = () => {
  return (
    <>
        <nav className='h-[100px] border fixed px-[40px] w-[100%] bg-white'>
            <div className='flex justify-end list-none h-[36px] items-center'>
                <div className='flex justify-between w-[224px] gap-[20px] text-[12px] text-[#333333]'>
                    <li>Help</li>
                    <li>Orders & Returns</li>
                    <li>Hi, John</li>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-[32px] font-bold cursor-pointer'>ECOMMERCE</h1>
                </div>
                <div className='flex list-none justify-between w-[30%] font-bold'>
                    <li>Categories</li>
                    <li>Sale</li>
                    <li>Clearance</li>
                    <li>New Stock</li>
                    <li>Trending</li>
                </div>
                <div className='flex w-[4%] justify-between'>
                    <div className=''><FaSearch className='h-[20px] w-[20px]'/></div>
                    <div><FaShoppingCart className='h-[20px] w-[20px]'/></div>
                </div>
            </div>
        </nav>
        <div className='h-[100px]'></div>
    </>
  )
}

export default Navbar