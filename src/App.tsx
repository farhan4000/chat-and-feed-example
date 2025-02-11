import { StreamChat, Channel as StreamChannel } from 'stream-chat'
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window
} from 'stream-chat-react'
import { useEffect, useState } from 'react'

import 'stream-chat-react/dist/css/v2/index.css'

function App() {
  const apiKey = 'k86g3k78hetj'
  const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzkzNTAzNzUsInVzZXJfaWQiOiJ0ZXN0LXVzZXItMiJ9.t2ysY4aK_YvNeeKa92BiChPCZlCKhGLjhWH5ErDnJvA"
  const userToken1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdC11c2VyLTEifQ.wtUjVsamHZcn4u2TsB_w0jRR3MrqoDn651BfGVQsjMI"
  const userId = 'test-user-2'
  const userId1 = 'test-user-1'
  const [client, setClient] = useState<StreamChat | null>(null)
  const [channel, setChannel] = useState<StreamChannel | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initChat = async () => {
      try {
        const chatClient = StreamChat.getInstance(apiKey)

        await chatClient.connectUser(
          {
            id: userId1,
            name: 'Demo User',
            image: 'https://getstream.io/random_png/?id=cool-shadow-7&name=Cool+shadow',
          },
          userToken1,
        )

        const newChannel = chatClient.channel('messaging', 'test-channel-1', {
          name: 'Should be private to test-user-1',
          members: [userId],
        })
        
        await newChannel.watch()
        
        setClient(chatClient)
        setChannel(newChannel)
        setLoading(false)
      } catch (error) {
        console.error('Error connecting user:', error)
        setLoading(false)
      }
    }

    initChat()

    return () => {
      if (client) {
        client.disconnectUser()
      }
    }
  }, [])

  if (loading) {
    return <div>Loading chat...</div>
  }

  if (!channel || !client) {
    return <div>Error loading chat</div>
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Chat client={client} theme="str-chat__theme-light">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

export default App
