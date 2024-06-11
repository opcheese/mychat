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
import { AiTemplate } from '@/lib/types'




export function ComboTemplate({templates, currentTemplate, setTemplate}:{templates:AiTemplate[], currentTemplate:AiTemplate|null, setTemplate:(template:AiTemplate) => void}) {
  const [open, setOpen] = React.useState(false)

  if (!templates) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="noShadow"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentTemplate
            ? templates.find((framework) => framework.id === currentTemplate.id)?.filename
            : templates.find((framework) => framework.id === "empty")?.filename}
          <ChevronsUpDown color="black" className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] !border-0 p-0 font-base">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search template..." />
            <CommandEmpty>No template found.</CommandEmpty>
            <CommandGroup>
              {templates.map((framework) => (
                <CommandItem
                  key={framework.id}
                  value={framework.filename}
                  onSelect={(currentValue:string) => {
                    setTemplate(templates.find((framework) => framework.filename === currentValue)!)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      currentTemplate?.id === framework.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {framework.filename}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}