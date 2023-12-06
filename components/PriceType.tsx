"use client"
 
import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function PriceType() {
 
  const [currency,setCurrency]= React.useState("$")

  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild className="absolute top-[336px]">
        <Button className="rounded-2xl font-bold ">{currency}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20">
        <DropdownMenuLabel>Currency</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={currency}  onValueChange={setCurrency} >
          <DropdownMenuRadioItem value="$" onClick={()=>setCurrency("$")}>Dollar</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="¥" onClick={()=>setCurrency("¥")}>Yarn</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Rs"  onClick={()=>setCurrency("Rs")}>Rs</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}