
import  Feedback  from '@/components/Feedback'
import React from 'react'

const page = ({params}:{params:{id:string}}) => {
  return (
    <div>
      <Feedback params={params}/>
    </div>
  )
}

export default page