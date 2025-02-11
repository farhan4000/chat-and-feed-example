import { useEffect, useState } from 'react'
import {connect, StreamUser} from 'getstream'

interface Activity {
  id: string
  actor: string
  verb: string
  object: string
  text?: string
  time: string
}

function Feed() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initFeed = async () => {
      try {
        // Using the same credentials from App.tsx
        // console.log(stream)

        // const user = new StreamUser(
        //     'k86g3k78hetj',
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzkzNTAzNzUsInVzZXJfaWQiOiJ0ZXN0LXVzZXItMiJ9.t2ysY4aK_YvNeeKa92BiChPCZlCKhGLjhWH5ErDnJvA",
        //   '1234567'
        // )
        const client = connect(
          'k86g3k78hetj',
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdC11c2VyLTEifQ.wtUjVsamHZcn4u2TsB_w0jRR3MrqoDn651BfGVQsjMI",
          '1363361'
        )

        console.log(client)


        // Get the feed named 'cohort:test-user-1'
        const feed = client.feed('cohort', 'test-user-1')
        console.log('feed',feed);
        
        // Get activities from the feed
        // feed.follow('cohort', 'test-user-1')
        const response = await feed.get({ limit: 10 });
        console.log('response',response)
        setActivities(response.results)
        setLoading(false)
      } catch (error) {
        console.error('Error loading feed:', error)
        setLoading(false)
      }
    }

    initFeed()
  }, [])

  if (loading) {
    return <div>Loading feed...</div>
  }

  return (
    <div className="feed-container">
      <h1>Activity Feed</h1>
      <div className="activities">
        {activities.length === 0 ? (
          <p>No activities found</p>
        ) : (
          activities.map((activity: Activity) => (
            <div key={activity.id} className="activity-item">
              <p>{activity.actor} {activity.verb} {activity.object}</p>
              {activity.text && <p>{activity.text}</p>}
              <small>{new Date(activity.time).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Feed 