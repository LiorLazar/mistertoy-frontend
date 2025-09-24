import { useState, useEffect, useRef } from 'react'
import { reviewService } from '../services/review.service.js'
import { userService } from '../services/user.service.js'

export function Reviews({ toyId }) {
    const [reviews, setReviews] = useState([])
    const [newReview, setNewReview] = useState('')
    const [rating, setRating] = useState(5)
    const [isLoading, setIsLoading] = useState(false)
    const textareaRef = useRef(null)

    useEffect(() => {
        // Load reviews for this toy
        if (toyId) {
            loadReviews()
        }
    }, [toyId])

    async function loadReviews() {
        if (!toyId) return

        try {
            setIsLoading(true)
            const reviews = await reviewService.getReviews(toyId)
            setReviews(reviews)
        } catch (err) {
            console.error('Failed to load reviews:', err)
            // Fallback to empty array if API fails
            setReviews([])
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        if (!newReview.trim()) return

        const loggedInUser = userService.getLoggedInUser()

        // Check if user is logged in
        if (!loggedInUser) {
            alert('Please log in to leave a review')
            return
        }

        try {
            const reviewToSave = {
                review: newReview.trim(),
                rating: rating,
                user: loggedInUser.fullname || 'Anonymous',
            }

            const savedReview = await reviewService.addReview(toyId, reviewToSave)
            setReviews(prevReviews => [...prevReviews, savedReview])
            setNewReview('')
            setRating(5)

            // Reset textarea height after sending review
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'
            }
        } catch (err) {
            console.error('Failed to save review:', err)

            // Check if it's an authentication error
            if (err.response && err.response.status === 401) {
                alert('Please log in to leave a review')
                return
            }

            // Other error - show user feedback
            alert('Failed to save review. Please try again.')

            // Fallback: add review locally if API fails
            const review = {
                id: Date.now().toString(),
                user: loggedInUser?.fullname || 'Anonymous',
                review: newReview,
                rating: rating,
                createdAt: Date.now()
            }
            setReviews(prevReviews => [...prevReviews, review])
            setNewReview('')
            setRating(5)

            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'
            }
        }
    }

    function handleTextareaChange(ev) {
        const value = ev.target.value
        setNewReview(value)

        // Auto-expand textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    function renderStars(rating) {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating)
    }

    function formatDate(timestamp) {
        return new Date(timestamp).toLocaleString()
    }

    return (
        <section className="reviews">
            <h3>Reviews</h3>

            <div className="reviews-list">
                {isLoading ? (
                    <p>Loading reviews...</p>
                ) : reviews.length === 0 ? (
                    <p>No reviews yet. Be the first to leave a review!</p>
                ) : (
                    reviews.map(review => (
                        <div key={review.id} className="review-item">
                            <div className="review-header">
                                <span className="review-user">{review.user}</span>
                                <span className="review-rating">{renderStars(review.rating)}</span>
                                <span className="review-date">{formatDate(review.createdAt)}</span>
                            </div>
                            <p className="review-text">{review.review}</p>
                        </div>
                    ))
                )}
            </div>

            {userService.getLoggedInUser() ? (
                <form onSubmit={handleSubmit} className="review-form">
                    <div className="rating-input">
                        <label htmlFor="rating">Rating:</label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(ev) => setRating(Number(ev.target.value))}
                            className="rating-select"
                        >
                            <option value={5}>5 Stars</option>
                            <option value={4}>4 Stars</option>
                            <option value={3}>3 Stars</option>
                            <option value={2}>2 Stars</option>
                            <option value={1}>1 Star</option>
                        </select>
                    </div>
                    <textarea
                        ref={textareaRef}
                        value={newReview}
                        onChange={handleTextareaChange}
                        placeholder="Write your review about this toy..."
                        rows="3"
                        className="review-input"
                    />
                    <button type="submit" className="review-submit">
                        Submit Review
                    </button>
                </form>
            ) : (
                <div className="review-form">
                    <p>Please log in to leave a review</p>
                </div>
            )}
        </section>
    )
}