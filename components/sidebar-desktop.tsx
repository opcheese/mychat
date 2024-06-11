import { Sidebar } from '@/components/sidebar'

import { auth } from '@/auth'
import { ChatHistory } from '@/components/chat-history'
import { ComboOllamaModel } from '@/components/combo-ollama-model'
import { cache } from 'react'
import { getModels } from '@/app/ollama_proxy'


const loadModels = cache(async () => {
  return await getModels()
})

export async function SidebarDesktop() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }
  const models = await loadModels()


  return (
    <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      <ComboOllamaModel models={models} />
      {/* @ts-ignore */}      
      <ChatHistory userId={session.user.id} />
    </Sidebar>
  )
}
