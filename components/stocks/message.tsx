'use client'

import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { spinner } from './spinner'
import { CodeBlock } from '../ui/codeblock'
import { MemoizedReactMarkdown } from '../markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { StreamableValue, useStreamableValue } from 'ai/rsc'
import { useStreamableText } from '@/lib/hooks/use-streamable-text'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy, IconRefresh } from '@/components/ui/icons'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import { type AI } from '@/lib/chat/actions'

// Different types of message bubbles.

export function UserMessage({ children, messageId }: { children: React.ReactNode, messageId?: string }) {

  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
  const [messages, setMessages] = useUIState<typeof AI>()

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(children!.toString())
  }
  const { regenUserMessage } = useActions()

  const onRefresh = async () => {

    const responseMessage = await regenUserMessage(messageId)
    let messageIndex = messages.findIndex(message => message.display!["props"]["messageId"] === messageId);
    let newMessages = [...messages]
    // If such a message is found, truncate the array to only include messages before it
    if (messageIndex !== -1) {
      newMessages.splice(messageIndex + 1, messages.length - messageIndex);
    } else {
      console.log("No message with id " + messageId + " was found.");
    }
    setMessages(currentMessages => [...newMessages, responseMessage])
  }

  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
        <IconUser />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
        {children}
      </div>
      <Button variant="ghost" size="icon" onClick={onCopy}>
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy message</span>
      </Button>
      {messageId &&
        <Button variant="ghost" size="icon" onClick={onRefresh}>
          <IconRefresh />

        </Button>
      }
    </div>
  )
}

export function BotMessage({
  content,
  className
}: {
  content: string | StreamableValue<string>
  className?: string
}) {
  const text = useStreamableText(content)
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
  

  const onCopy = () => {
    if (isCopied) return
    if (typeof content === 'string') {
      copyToClipboard(content.toString())
    } else {
      const [data, error, pending] = useStreamableValue(content);
      copyToClipboard(data!.toString())
    }
  }
  return (
    <div className={cn('group relative flex items-start md:-ml-12', className)}>
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
          {text}
        </MemoizedReactMarkdown>
      </div>
      <Button variant="ghost" size="icon" onClick={onCopy}>
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy message</span>
      </Button>
    </div>
  )
}

export function BotCard({
  children,
  showAvatar = true
}: {
  children: React.ReactNode
  showAvatar?: boolean
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          'flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm',
          !showAvatar && 'invisible'
        )}
      >
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 pl-2">{children}</div>
    </div>
  )
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'
      }
    >
      <div className={'max-w-[600px] flex-initial p-2'}>{children}</div>
    </div>
  )
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <IconOpenAI />
      </div>
      <div className="ml-4 h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
        {spinner}
      </div>
    </div>
  )
}
