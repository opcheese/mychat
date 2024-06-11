'use server'
import { OllamaTagsApiResponse,OllamaModel } from '@/lib/types'
export async function getModels():Promise<OllamaModel[]> {    
    const response = await fetch('http://127.0.0.1:11434/api/tags')
    const data:OllamaTagsApiResponse = await response.json()    
    return data.models
  }