'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


import { auth } from '@/auth'
import { type Chat, type ChatDB } from '@/lib/types'


import { query } from './database';

function chatDBToChat(chatdb: ChatDB): Chat {
  let res: Chat = {
    id: chatdb.id,
    userId: chatdb.userId,
    title: chatdb.title,    
    path: chatdb.path,
    createdAt: chatdb.createdAt,    
    sharePath: chatdb.sharePath,
    messages: []
  }

  if (chatdb.messages) {
    res.messages = JSON.parse(chatdb.messages)
  }
  return res
}

function chatToChatDB(chat: Chat): ChatDB {
  let res: ChatDB = {
    id: chat.id,
    userId: chat.userId,
    title: chat.title,    
    path: chat.path,
    createdAt: chat.createdAt,    
    sharePath: chat.sharePath,
    messages: JSON.stringify(chat.messages)
  }

  
  return res
}

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  //const chats = await query('SELECT * FROM chats WHERE userId = $1', [userId])
  const chatDBs = await query('SELECT * FROM chats')
  
  const chats = chatDBs.map(chatDBToChat)

  return chats
}

export async function getChat(id: string, userId: string) {
  const chatDBs = await query('SELECT * FROM chats where id = $1', [id])
  
  const chats = chatDBs.map(chatDBToChat)

  return chats[0]
}
//   const chat = await kv.hgetall<Chat>(`chat:${id}`)

//   if (!chat || (userId && chat.userId !== userId)) {
//     return null
//   }

//   return chat
// }

// export async function removeChat({ id, path }: { id: string; path: string }) {
//   const session = await auth()

//   if (!session) {
//     return {
//       error: 'Unauthorized'
//     }
//   }

//   //Convert uid to string for consistent comparison with session.user.id
//   const uid = String(await kv.hget(`chat:${id}`, 'userId'))

//   if (uid !== session?.user?.id) {
//     return {
//       error: 'Unauthorized'
//     }
//   }

//   await kv.del(`chat:${id}`)
//   await kv.zrem(`user:chat:${session.user.id}`, `chat:${id}`)

//   revalidatePath('/')
//   return revalidatePath(path)
//}

export async function clearChats() {
  throw new Error('Not implemented')
  // const session = await auth()

  // if (!session?.user?.id) {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }

  // const chats: string[] = await kv.zrange(`user:chat:${session.user.id}`, 0, -1)
  // if (!chats.length) {
  //   return redirect('/')
  // }
  // const pipeline = kv.pipeline()

  // for (const chat of chats) {
  //   pipeline.del(chat)
  //   pipeline.zrem(`user:chat:${session.user.id}`, chat)
  // }

  // await pipeline.exec()

  // revalidatePath('/')
  // return redirect('/')
}

export async function getSharedChat(id: string) {
  throw new Error('Not implemented')
//   return null;
//   const chat = await kv.hgetall<Chat>(`chat:${id}`)

//   if (!chat || !chat.sharePath) {
//     return null
//   }

//   return chat
// }

// export async function shareChat(id: string) {
//   const session = await auth()

//   if (!session?.user?.id) {
//     return {
//       error: 'Unauthorized'
//     }
//   }

//   const chat = await kv.hgetall<Chat>(`chat:${id}`)

//   if (!chat || chat.userId !== session.user.id) {
//     return {
//       error: 'Something went wrong'
//     }
//   }

//   const payload = {
//     ...chat,
//     sharePath: `/share/${chat.id}`
//   }

//   await kv.hmset(`chat:${chat.id}`, payload)

//   return payload
}

export async function saveChat(chat: Chat) {
  const session = await auth()
  let chatDB = chatToChatDB(chat)
  const chatDBs = await query('insert into Chats (id, userId, title, path, createdAt, sharePath, messages) values ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO UPDATE SET messages=$7;', [chatDB.id, chatDB.userId, chatDB.title, chatDB.path, chatDB.createdAt, chatDB.sharePath, chatDB.messages])
  
  

  return chatDBs[0]
}
  // if (session && session.user) {
    

  // } else {
  //   return
  // }
//}

export async function refreshHistory(path: string) {
  redirect(path)
}

export async function getMissingKeys() {
  const keysRequired: string[] = []
  return keysRequired
    .map(key => (process.env[key] ? '' : key))
    .filter(key => key !== '')
}
