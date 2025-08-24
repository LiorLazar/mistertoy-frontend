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
                toys = toys.filter(toy => regExp.test(toy.name))
            }
            if (filterBy.isStock === "true") {
                toys = toys.filter(toy => toy.isStock)
            } else if (filterBy.isStock === "false") {
                toys = toys.filter(toy => !toy.isStock)
            }
            if (filterBy.labels && Array.isArray(filterBy.labels) && filterBy.labels.length) {
                toys = toys.filter(toy => filterBy.labels.every(label => toy.labels.includes(label)))
            }
            if (filterBy.sortBy && filterBy.sortBy.sortField) {
                const { sortField, sortDir } = filterBy.sortBy
                const dir = sortDir || 1
                toys.sort((t1, t2) => {
                    if (sortField === 'name') return t1.name.localeCompare(t2.name) * dir
                    if (sortField === 'price') return (t1.price - t2.price) * dir
                    if (sortField === 'createdAt') return (t1.createdAt - t2.createdAt) * dir
                    return 0
                })
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
    return { txt: '', price: 0, labels: [], sortBy: { sortField: '', sortDir: '' } }
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
    let imgUrl = ''
    if (txt.toLowerCase().includes('robo')) {
        imgUrl = 'https://cdn-icons-png.flaticon.com/512/616/616408.png'
    } else if (txt.toLowerCase().includes('magic')) {
        imgUrl = 'https://cdn-icons-png.flaticon.com/512/616/616430.png'
    } else if (txt.toLowerCase().includes('dino')) {
        imgUrl = 'https://cdn-icons-png.flaticon.com/512/616/616408.png'
    } else {
        imgUrl = 'https://cdn-icons-png.flaticon.com/512/616/616408.png'
    }

    // Add random labels
    const possibleLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
    const labelCount = utilService.getRandomIntInclusive(1, 3)
    const labels = []
    while (labels.length < labelCount) {
        const label = possibleLabels[utilService.getRandomIntInclusive(0, possibleLabels.length - 1)]
        if (!labels.includes(label)) labels.push(label)
    }

    const toy = getEmptyToy(txt, price, imgUrl, labels)
    toy._id = utilService.makeId()
    toy.createdAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 20)
    return toy
}