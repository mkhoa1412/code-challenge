"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Token } from "@/utils/api"
interface CryptoSelectorProps {
  tokens:Token[]
  selectedToken:Token|null,
  onSelectToken: (token: Token) => void
}

export default function TokenSelector({ tokens ,onSelectToken,selectedToken}: CryptoSelectorProps) {
  const [open, setOpen] = React.useState(false)
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" w-full justify-between"
        >
          {selectedToken
            ?<div className=" flex flex-row items-center">
                <img src={`/token_icons/${selectedToken.currency}.svg`} className="mr-2 h-4 w-4" />{selectedToken.currency}</div>
            : "Select token..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max p-0">
        <Command>
        <CommandList>
          <CommandInput placeholder="Search cryptocurrency..." />
          <CommandEmpty>No token found.</CommandEmpty>
          <CommandGroup>
            {tokens&&tokens.map((token,i) => (
              <CommandItem
                key={i}
                onSelect={() => {
                  onSelectToken(token)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                  selectedToken &&  selectedToken.currency === token.currency ? "opacity-100" : "opacity-0"
                  )}
                />
                <img src={`/token_icons/${token.currency}.svg`} className="mr-2 h-4 w-4" />
                {token.currency}
              </CommandItem>
            ))}
          </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

