const path = require('path')
const fs = require('fs')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card {
    static async add(service) {
        const card = await Card.fetch()

        const idx = card.services.findIndex(c => c.id === service.id)
        const candidate = card.services[idx]
        if(candidate) {
            // курс уже есть
            candidate.count++
            card.services[idx] = candidate
        } else {
            // нужно добавить курс
            service.count = 1
            card.services.push(service)
        }
        card.price += +service.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static async remove(id) {
        const card = await Card.fetch()

        const idx = card.services.findIndex(s => s.id === id)
        const service = card.services[idx]

        if(service.count && service.count === 1) {
            // удалить
            card.services = card.services.filter(s => s.id !== id)
        } else {
            // изменить кол-во
            service.count--
        }

        card.price -= service.price 

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Card