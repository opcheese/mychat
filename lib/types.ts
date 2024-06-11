import { CoreMessage } from 'ai'

export type Message = CoreMessage & {
  id: string
}


export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export interface ChatDB {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: string
  sharePath?: string
}


export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface Session {
  user: {
    id: string
    email: string
  }
}

export interface AuthResult {
  type: string
  message: string
}

export interface User extends Record<string, any> {
  id: string
  email: string
  password: string
  salt: string
}


export type OllamaModel = {
  name: string;
  model: string;
  modified_at: string;
  size: number;
  digest: string;
  details: {
    parent_model: string;
    format: string;
    family: string;
    families: string[];
    parameter_size: string;
    quantization_level: string;
  };
  expires_at: string;
};

export type AiTemplate = {
  id: string;
  filename:string;
  content:string;  
}

// Define a type alias for the API response data
export type OllamaTagsApiResponse = {
  models: OllamaModel[];
  // add other properties here as needed
};