'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Send, MessageCircle } from 'lucide-react'

export default function ChatPage() {
  const [teachers, setTeachers] = useState<any[]>([])
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (selectedTeacher) loadMessages()
  }, [selectedTeacher])

  const loadData = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'teacher')
      .order('full_name')
    setTeachers(data || [])
  }

  const loadMessages = async () => {
    if (!selectedTeacher || !user) return
    const supabase = createClient()
    
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${selectedTeacher.id}),and(sender_id.eq.${selectedTeacher.id},receiver_id.eq.${user.id})`)
      .order('created_at', { ascending: true })
    
    setMessages(data || [])
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedTeacher || !user) return

    const supabase = createClient()
    await supabase.from('chat_messages').insert({
      sender_id: user.id,
      receiver_id: selectedTeacher.id,
      message: newMessage
    })

    setNewMessage('')
    loadMessages()
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Teachers List */}
      <div className="w-80 bg-white border border-border rounded-2xl p-4 overflow-auto">
        <h2 className="font-bold mb-4">Teachers</h2>
        <div className="space-y-2">
          {teachers.map((teacher) => (
            <button
              key={teacher.id}
              onClick={() => setSelectedTeacher(teacher)}
              className={`w-full text-left p-3 rounded-xl transition ${
                selectedTeacher?.id === teacher.id ? 'bg-primary/10 border border-primary' : 'hover:bg-muted'
              }`}
            >
              <div className="font-medium">{teacher.full_name || 'Teacher'}</div>
              <div className="text-sm text-muted-foreground">{teacher.school || 'Available'}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white border border-border rounded-2xl flex flex-col">
        {selectedTeacher ? (
          <>
            <div className="p-6 border-b border-border">
              <h2 className="font-bold text-lg">{selectedTeacher.full_name || 'Teacher'}</h2>
              <p className="text-sm text-muted-foreground">Ask your questions</p>
            </div>

            <div className="flex-1 overflow-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md px-4 py-3 rounded-2xl ${
                      msg.sender_id === user?.id
                        ? 'bg-primary text-white'
                        : 'bg-muted'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="p-6 border-t border-border">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>Select a teacher to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
