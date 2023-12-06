import React from 'react'
import '../globals.css'
const layout = ({children}:{children:React.ReactNode}) => {
  return (
   
        <html lang='en' className='bg-black'>
          <body className=''>  
          <div>
          {children}
          </div>
          </body>
        </html>
  )
}

export default layout
