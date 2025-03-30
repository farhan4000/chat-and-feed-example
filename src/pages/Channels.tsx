import { StreamChat } from 'stream-chat'
import { useEffect, useState } from 'react'
import { Chat, ChannelList } from 'stream-chat-react'
import { useNavigate } from 'react-router-dom'

function Channels() {
  const apiKey = 'k86g3k78hetj'
  const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTc5NTc4NGUtYjI3My00M2I1LThhNDAtMWVmNTgwNmEwNjFhIn0.Bd_-hOXdhqgExFcuXX13VIBBbQyHtfED9yn2hCPuYXg"
  const userId = '9795784e-b273-43b5-8a40-1ef5806a061a'
  const [client, setClient] = useState<StreamChat | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const initChat = async () => {
      try {
        const chatClient = StreamChat.getInstance(apiKey)

        await chatClient.connectUser(
          {
            id: userId,
            name: 'Johan Negara',
            image: 'https://getstream.io/random_png/?id=cool-shadow-7&name=Cool+shadow',
          },
          userToken,
        )
        
        setClient(chatClient)
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
    return <div>Loading channels...</div>
  }

  if (!client) {
    return <div>Error loading channels</div>
  }

  const filters = {
    members: { $in: [userId] }
  }

  const sort = {
    last_message_at: -1 as const
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Chat client={client} theme="str-chat__theme-light">
        <ChannelList 
          filters={filters}
          sort={sort}
        />
      </Chat>
    </div>
  )
}

export default Channels 