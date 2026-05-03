import { useState, useRef } from 'react'

const apiKey = import.meta.env.VITE_GROQ_API_KEY

const portfolioContext = `
You are a helpful assistant for Albert Castañeto's portfolio website.

Albert is a Software Developer specializing in enterprise internal business systems built with ASP.NET Core and SQL Server. He develops production-grade applications used in real company operations, not prototypes or demo projects.

CORE EXPERTISE:
- Enterprise Web Applications (ASP.NET Core MVC)
- Backend System Architecture (Clean Architecture, Repository Pattern)
- SQL Server (database design, optimization, relational modeling)
- Role-Based Access Control (RBAC) and authentication systems
- Workflow automation systems (multi-step approvals, routing, audit trails)
- Dashboard and reporting systems for business operations
- Excel import/export pipelines for bulk data processing
- Form automation systems

PROJECTS:
1. Approval Workflow System - Multi-level approvals, RBAC, audit trails
2. ePMS / KRA Performance System - Employee evaluation, weighted scoring, manager reviews
3. Sales Management System - Daily tracking, dashboards, Excel reporting
4. Pag-IBIG Form Automation - Auto-filling government forms from database data

TECH STACK: ASP.NET Core MVC, C#, SQL Server, JavaScript, Repository Pattern, EPPlus

Speak as Albert answering directly. Be confident, clear, and concise.
If asked something unrelated to software development, politely redirect back to relevant topics.
`

function Chatbot() {
  const [isOpen, setIsOpen]     = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi! I can answer questions about my experience, projects, and technical skills. What would you like to know?" }
  ])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const conversationHistory     = useRef([])
  const messagesEndRef          = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const addMessage = (text, type) => {
    setMessages(prev => [...prev, { type, text }])
    setTimeout(scrollToBottom, 100)
  }

  const sendMessage = async () => {
    const msg = input.trim()
    if (!msg || loading) return

    addMessage(msg, 'user')
    setInput('')
    setLoading(true)
    conversationHistory.current.push({ role: 'user', content: msg })

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: portfolioContext },
            ...conversationHistory.current
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      })

      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error?.message || res.status)
      const reply = data.choices[0].message.content
      conversationHistory.current.push({ role: 'assistant', content: reply })
      addMessage(reply, 'bot')
    } catch (err) {
      addMessage('Error: ' + err.message, 'bot')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        <i className='bx bx-message-rounded-dots'></i>
      </button>

      {isOpen && (
        <div className="chatbot-container active">
          <div className="chat-header">
            <div className="chat-avatar"><i className='bx bx-bot'></i></div>
            <h3>Ask about my experience</h3>
            <div className="chat-online"></div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="typing-indicator active">
                <div className="typing-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => { if (e.key === 'Enter' && !loading) sendMessage() }}
            />
            <button onClick={sendMessage} disabled={loading}>
              <i className='bx bx-send'></i>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot