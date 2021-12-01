// AuthGuard.tsx
import { signIn, useSession } from 'next-auth/client'
import { useEffect } from 'react'

const AuthGuard: React.FC = ({ children, ...props }) => {
  const [session, loading] = useSession()
  const isUser = !!session?.user

  useEffect(() => {
    if (!loading && !isUser) signIn() // If not authenticated, force log in
  }, [isUser, loading])

  if (isUser) {
    return <>{children}</>
  }

  return <div>Loading...</div>
}

export default AuthGuard
