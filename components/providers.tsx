'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { OllamaProvider } from '@/lib/hooks/use-ollama-model'
import { ApolloProvider } from '@apollo/client';
import client from '../apolloClient';
import { TooltipProvider } from '@/components/ui/tooltip'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ApolloProvider client={client}>
      <NextThemesProvider {...props}>
        <OllamaProvider>  
          <SidebarProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </SidebarProvider>
        </OllamaProvider>
      </NextThemesProvider>
    </ApolloProvider>
  )
}
