'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Send, MessageCircle } from 'lucide-react'

export default function MessagesPage() {
  const [students, setStudents] = useState<any[]>([])
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (selectedStudent) loadMessages()
  }, [selectedStudent])

  const loadData = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)

    // Get students who have messaged this teacher
    const { data: msgs } = await supabase
      .from('chat_messages')
      .select('sender_id, profiles!chat_messages_sender_id_fkey(*)')
      .eq('receiver_id', user!.id)

    const uniqueStudents = Array.from(
      new Map(msgs?.map((m: any) => [m.sender_id, m.profiles]) || []).values()
    )
    setStudents(uniqueStudents as any[])
  }

  const loadMessages = async () => {
    if (!selectedStudent || !user) return
    const supabase = createClient()
    
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${selectedStudent.id}),and(sender_id.eq.${selectedStudent.id},receiver_id.eq.${user.id})`)
      .order('created_at', { ascending: true })
    
    setMessages(data || [])

    // Mark as read
    await supabase
      .from('chat_messages')
      .update({ is_read: true })
      .eq('sender_id', selectedStudent.id)
      .eq('receiver_id', user.id)
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedStudent || !user) return

    const supabase = createClient()
    await supabase.from('chat_messages').insert({
      sender_id: user.id,
      receiver_id: selectedStudent.id,
      message: newMessage
    })

    setNewMessage('')
    loadMessages()
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Students List */}
      <div className="w-80 bg-white border border-border rounded-2xl p-4 overflow-auto">
        <h2 className="font-bold mb-4">Student Messages</h2>
        <div className="space-y-2">
          {students.length > 0 ? (
            students.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`w-full text-left p-3 rounded-xl transition ${
                  selectedStudent?.id === student.id ? 'bg-primary/10 border border-primary' : 'hover:bg-muted'
                }`}
              >
                <div className="font-medium">{student.full_name || 'Student'}</div>
                <div className="text-sm text-muted-foreground">{student.school || 'Student'}</div>
              </button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No messages yet</p>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white border border-border rounded-2xl flex flex-col">
        {selectedStudent ? (
          <>
            <div className="p-6 border-b border-border">
              <h2 className="font-bold text-lg">{selectedStudent.full_name || 'Student'}</h2>
              <p className="text-sm text-muted-foreground">Respond to student questions</p>
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
                  placeholder="Type your response..."
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
              <p>Select a student to view messages</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
