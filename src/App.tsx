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
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Feed from './pages/Feed'
import Channels from './pages/Channels'

import 'stream-chat-react/dist/css/v2/index.css'

function ChatComponent() {
  const apiKey = 'k86g3k78hetj'
  const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMiJ9.dgf0LS37Xt6JOo45_V2-ZpVXT-9zpwlUWkGAmVvDXmM"
  const userToken1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTc5NTc4NGUtYjI3My00M2I1LThhNDAtMWVmNTgwNmEwNjFhIn0.Bd_-hOXdhqgExFcuXX13VIBBbQyHtfED9yn2hCPuYXg"
  const userId = '2'
  const userId1 = '9795784e-b273-43b5-8a40-1ef5806a061a'
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
            name: 'Johan Negara',
            image: 'https://getstream.io/random_png/?id=cool-shadow-7&name=Cool+shadow',
          },
          userToken1,
        )

        const newChannel = chatClient.channel('messaging', 'org-2_group-3_cohort-3_module-52', {
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

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>Chat</Link>
          <Link to="/channels" style={{ marginRight: '1rem' }}>Channels</Link>
          <Link to="/feed">Feed</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ChatComponent />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
