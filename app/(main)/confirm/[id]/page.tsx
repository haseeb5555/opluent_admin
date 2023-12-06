

import ConfirmOrder from "@/components/form/confirm-order"

const page = ({params}:{params:{id:string}}) => {
    return (
      <div>
        <ConfirmOrder params={params}/>
      </div>
    )
  }
  
  export default page