import { httpService } from './http.service.js'
import { toyService } from './toy.service.js'
import { utilService } from './util.service.js'

export const reviewService = {
    getReviews,
    addReview,
    removeReview,
    getEmptyReview,
}

window.cs = reviewService // For debugging

async function getReviews(toyId) {
    try {
        const toy = await toyService.getById(toyId)
        return toy.reviews || []
    } catch (err) {
        console.log('Had issues getting reviews', err)
        throw err
    }
}

async function addReview(toyId, review) {
    try {
        const toy = await toyService.getById(toyId)
        if (!toy.reviews) toy.reviews = []

        const newReview = {
            id: utilService.makeId(),
            ...review,
            createdAt: Date.now()
        }

        toy.reviews.push(newReview)
        const updatedToy = await toyService.save(toy)
        return newReview
    } catch (err) {
        console.log('Had issues adding review', err)
        throw err
    }
}

async function removeReview(toyId, reviewId) {
    try {
        const toy = await toyService.getById(toyId)
        if (!toy.reviews) return

        toy.reviews = toy.reviews.filter(review => review.id !== reviewId)
        await toyService.save(toy)
        return reviewId
    } catch (err) {
        console.log('Had issues removing review', err)
        throw err
    }
}

function getEmptyReview() {
    return {
        review: '',
        rating: 5,
        user: '',
        createdAt: Date.now(),
    }
}