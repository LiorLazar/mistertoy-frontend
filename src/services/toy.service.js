import { storageService } from "./async-storage.service.js"

const TOY_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.txt))
            }
            return toys
        })
}

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function save(toy) {
    const method = bug._id ? 'put' : 'post'
    return storageService[method](TOY_KEY, toy)
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function getEmptyToy(name = '', imgUrl = '', price = 100, labels = []) {
    return {
        name,
        imgUrl,
        price,
        labels,
        createdAt: new Date.now(),
        isStock: true
    }
}

function getDefaultFilter() {
    return { txt: '', price: 0, labels: [] }
}