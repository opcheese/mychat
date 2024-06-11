'use client'

import { CommandList } from 'cmdk'
import { Check, ChevronsUpDown } from 'lucide-react'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { OllamaModel } from '@/lib/types'

import { useOllamaModel} from '@/lib/hooks/use-ollama-model'


export function ComboOllamaModel({models}:{models:OllamaModel[]}) {
  const [open, setOpen] = React.useState(false)
  const { chosenModelName, isLoading,setChosenModelName } = useOllamaModel()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="noShadow"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {chosenModelName
            ? models.find((framework) => framework.name === chosenModelName)?.name
            : 'Select framework...'}
          <ChevronsUpDown color="black" className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] !border-0 p-0 font-base">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {models.map((framework) => (
                <CommandItem
                  key={framework.name}
                  value={framework.name}
                  onSelect={(currentValue:string) => {
                    setChosenModelName(currentValue === chosenModelName ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      chosenModelName === framework.name ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {framework.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}