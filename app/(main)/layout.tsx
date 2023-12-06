import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import '../globals.css'
import type { Metadata } from 'next'

import Link from 'next/link'
import SideBar from '@/components/Sidebar'
import { Providers } from '../Providers'
import BottomBar from '@/components/bottom-bar'






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
    <html lang="en" >
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
  
        {children}
        </Providers>
        </div>
        </div>
        <BottomBar/>
      
        
        </body>
    </html>
  )
}