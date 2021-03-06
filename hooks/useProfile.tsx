import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import axiosInstance from '~/lib/axios'
import { User } from '~/models/User'

export const useProfile = () => {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState<User>(null)
  const [session, loading] = useSession()

  useEffect(() => {
    const fetchProfile = async () => {
      setStatus('loading')
      try {
        const { data: profile } = await axiosInstance.get<User>('/profile', {
          headers: { Authorization: `Bearer ${session.accessToken as string}` },
        })
        setData(profile)
        setStatus('loaded')
      } catch (error) {
        setData(null)
        setStatus('error')
      }
    }

    fetchProfile()
  }, [session?.accessToken])

  return { data, status }
}
