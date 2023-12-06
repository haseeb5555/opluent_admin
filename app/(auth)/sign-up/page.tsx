import { SignUp } from '@/components/form/sign-up'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center  h-screen px-8 py-6 '>

    <div className=' w-[500px]  flex justify-center items-center gap-9 '>
       <SignUp/>
    </div>
    </div>
  )
}

export default page
