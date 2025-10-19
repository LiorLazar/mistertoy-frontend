import { httpService } from './http.service.js'
import { toyService } from './toy.service.js'
import { utilService } from './util.service.js'

export const messageService = {
    getMessages,
    addMessage,
    removeMessage,
    getEmptyMessage,
}

window.cs = messageService // For debugging

async function getMessages(toyId) {
    try {
        const toy = await toyService.getById(toyId)
        return toy.msgs || []
    } catch (err) {
        console.log('Had issues getting messages', err)
        throw err
    }
}

async function addMessage(toyId, message) {
    try {
        const toy = await toyService.getById(toyId)
        if (!toy.msgs) toy.msgs = []

        const newMessage = {
            id: utilService.makeId(),
            ...message,
            createdAt: Date.now()
        }

        toy.msgs.push(newMessage)
        const updatedToy = await toyService.save(toy)
        return newMessage
    } catch (err) {
        console.log('Had issues adding message', err)
        throw err
    }
}

async function removeMessage(toyId, messageId) {
    try {
        const toy = await toyService.getById(toyId)
        if (!toy.msgs) return

        toy.msgs = toy.msgs.filter(msg => msg.id !== messageId)
        await toyService.save(toy)
        return messageId
    } catch (err) {
        console.log('Had issues removing message', err)
        throw err
    }
}

function getEmptyMessage() {
    return {
        message: '',
        user: '',
        createdAt: Date.now(),
    }
}