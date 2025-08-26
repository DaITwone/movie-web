import React, { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function AuthPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/") // về trang chủ sau khi login
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [navigate])

  return (
    <div className="container mx-auto mt-15 p-4 max-w-md bg-gray-900 rounded-2xl">
      <h1 className="text-5xl mb-4 font-extrabold text-center">One Account, Endless Movies</h1>
      <Auth 
        supabaseClient={supabase} 
        appearance={{ theme: ThemeSupa }}  
        providers={[]} 
      />
    </div>
  )
}
