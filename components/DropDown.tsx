import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQuery } from "@tanstack/react-query"
import { InvoiceDialog } from "./pdf/invoice-generator"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"


export const DropDown=()=>{
    const { data } = useQuery({
      queryKey: ["po"],
      queryFn: async () => {
        const response = await fetch("http://localhost:3000/api/po")
        const responseData = await response.json()
        const poData = responseData.po // Assuming there is only one item in the "po" array
  
        return poData
      },
    })
      return (
          

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className=" bg-slate-200 flex flex-col justify-center items-center gap-4">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {
              
               data && data.map((item:any)=>(
             <>
             <Link  href={`/confirm/${item._id}`}>
            <Button>confirm</Button>
            </Link>
            <Link  href={`/reject/${item._id}`}>
             <Button>reject</Button>
           </Link>
           </>
              ))
            }
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }