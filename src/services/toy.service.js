import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

const TOY_KEY = 'toyDB'

_createToys()

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

function getEmptyToy(name = '', price = 100, imgUrl = '', labels = []) {
    return {
        name,
        imgUrl,
        price,
        labels,
        createdAt: Date.now(),
        isStock: true
    }
}

function getDefaultFilter() {
    return { txt: '', price: 0, labels: [] }
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        const txts = ['RoboRacer', 'magicBlocks', 'DinoBuddy']
        for (let i = 0; i < 20; i++) {
            const txt = txts[utilService.getRandomIntInclusive(0, txts.length - 1)]
            toys.push(_createToy(txt + (i + 1), utilService.getRandomIntInclusive(1, 100)))
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(txt, price) {
    const toy = getEmptyToy(txt, price)
    toy._id = utilService.makeId()
    toy.createdAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 20)
    return toy
}