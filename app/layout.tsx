import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import './globals.css'
import type { Metadata } from 'next'

import Link from 'next/link'
import SideBar from '@/components/Sidebar'
import { Providers } from './Providers'






export const metadata: Metadata = {
  title: 'Opulent Fuels ',
  description: 'we provide best fuels products all araound pakistan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='light'>
      <body> 
    
        <div className="border-b z-50 bg-green-600  w-full ">
          <div className="flex h-16 items-center px-4 container font-bold text-slate-100 mx-auto">
              <Link href="/" className='ml-4'>
              
              OPLUENT FUEL
              </Link>
            <div className="ml-auto flex items-center space-x-4">
            <Avatar>
        <AvatarImage src="./logo.jpg" alt="@shadcn"  />
         <AvatarFallback>OF</AvatarFallback>
    </Avatar>
            </div>
          </div>
        </div>
        <div className='flex'>

      <SideBar/>
          
      <div className='w-full pt-12 px-4'>
        <Providers>
        <div
          className="bg-[#fc8888] absolute top-[-6rem] -z-10 right-[11rem] h-[41.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]">
        </div>
        <div
          className="bg-[#9c93ec] absolute top-[-1rem] -z-10 left-[-35rem] h-[41.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] ">
        </div>
        {children}
        </Providers>
        </div>
        </div>
      
        
        </body>
    </html>
  )
}