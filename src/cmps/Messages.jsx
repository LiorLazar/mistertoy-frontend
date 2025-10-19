import { useState, useEffect, useRef } from 'react'
import { messageService } from '../services/message.service.js'
import { userService } from '../services/user.service.js'

export function Messages({ toyId }) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const textareaRef = useRef(null)

    useEffect(() => {
        // Load messages for this toy
        if (toyId) {
            loadMessages()
        }
    }, [toyId])

    async function loadMessages() {
        if (!toyId) return

        try {
            setIsLoading(true)
            const messages = await messageService.getMessages(toyId)
            setMessages(messages)
        } catch (err) {
            console.error('Failed to load messages:', err)
            // Fallback to empty array if API fails
            setMessages([])
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        if (!newMessage.trim()) return

        const loggedInUser = userService.getLoggedInUser()

        // Check if user is logged in
        if (!loggedInUser) {
            alert('Please log in to leave a message')
            return
        }

        try {
            const messageToSave = {
                message: newMessage.trim(),
                user: loggedInUser.fullname || 'Anonymous',
            }

            const savedMessage = await messageService.addMessage(toyId, messageToSave)
            setMessages(prevMessages => [...prevMessages, savedMessage])
            setNewMessage('')

            // Reset textarea height after sending message
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'
            }
        } catch (err) {
            console.error('Failed to save message:', err)

            // Check if it's an authentication error
            if (err.response && err.response.status === 401) {
                alert('Please log in to leave a message')
                return
            }

            // Other error - show user feedback
            alert('Failed to save message. Please try again.')

            // Fallback: add message locally if API fails
            const message = {
                id: Date.now().toString(),
                user: loggedInUser?.fullname || 'Anonymous',
                message: newMessage,
                createdAt: Date.now()
            }
            setMessages(prevMessages => [...prevMessages, message])
            setNewMessage('')

            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'
            }
        }
    }

    function handleTextareaChange(ev) {
        const value = ev.target.value
        setNewMessage(value)

        // Auto-expand textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    function formatDate(timestamp) {
        return new Date(timestamp).toLocaleString()
    }

    return (
        <section className="messages">
            <h3>Messages</h3>

            <div className="messages-list">
                {isLoading ? (
                    <p>Loading messages...</p>
                ) : messages.length === 0 ? (
                    <p>No messages yet. Be the first to leave a message!</p>
                ) : (
                    messages.map(msg => (
                        <div key={msg.id} className="message-item">
                            <div className="message-header">
                                <span className="message-user">{msg.user}</span>
                                <span className="message-date">{formatDate(msg.createdAt)}</span>
                            </div>
                            <p className="message-text">{msg.message}</p>
                        </div>
                    ))
                )}
            </div>

            {userService.getLoggedInUser() ? (
                <form onSubmit={handleSubmit} className="message-form">
                    <textarea
                        ref={textareaRef}
                        value={newMessage}
                        onChange={handleTextareaChange}
                        placeholder="Leave a message about this toy..."
                        rows="3"
                        className="message-input"
                    />
                    <button type="submit" className="message-submit">
                        Send Message
                    </button>
                </form>
            ) : (
                <div className="message-form">
                    <p>Please log in to leave a message</p>
                </div>
            )}
        </section>
    )
}