import Link from "next/link";
import { Button } from "./ui/button";

export default function SideBar(){
    return (
      <div className="pb-12 w-1/5  relative top-0 border-r min-h-screen bg-green-600  max-lg:w-[300px] max-sm:hidden" >
      <div className="space-y-4 py-4 sticky z-50 top-0   ">
        <div className="px-3 py-2">
        
          <h2 className="mb-2 px-4 text-lg font-bold tracking-tight  text-slate-100">
          Dashboard
          </h2>
          
          <div className="space-y-1 ">
          <Link href="/add-product">
            <Button variant="ghost" className="w-full justify-start flex gap-4  text-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

             Add Product
            </Button>
              </Link>
              <Link href="/pending-orders">
            <Button variant="ghost" className="w-full justify-start flex gap-4  text-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>


  
  
             Orders
            </Button>
            </Link>
            <Link href="/invoices">
            <Button variant="ghost" className="w-full justify-start flex gap-4  text-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
</svg>


  
  
             Invoices
            </Button>
            </Link>
            <Link href="/rejected-orders">
            <Button variant="ghost" className="w-full justify-start flex gap-4  text-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>



  
  
              Rejected Orders
            </Button>
            </Link>
           <Link href="/favorites">
           <Button variant="ghost" className="w-full justify-start flex gap-4  text-slate-100">

                
  </Button>
           </Link>
           
          </div>
        </div>
        </div>
        </div>
    )
  }