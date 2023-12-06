import { Login } from '@/components/form/sign-in'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center  h-screen px-8 py-6 '>

    <div className=' w-[500px]  flex justify-center items-center gap-9 '>
       <Login/>
    </div>
    </div>
  )
}

export default page
