const { v4 } = require('uuid')
const fs = require('fs')
const path = require('path')

class Service {
    constructor(title, description, img, price, brief_description) {
        this.title = title,
        this.description = description,
        this.img = img,
        this.price = price,
        this.brief_description = brief_description,
        this.id = v4()
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            img: this.img,
            price: this.price,
            brief_description: this.brief_description,
            id: this.id
        }
    }

    static async update(service) {
        const services = await Service.getAll()

        const idx = services.findIndex(s => s.id === service.id)
        services[idx] = service

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'services.json'),
                JSON.stringify(services),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    async save() {
        const services = await Service.getAll()
        services.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'services.json'),
                JSON.stringify(services),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'services.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject.err
                    } else {
                        resolve(JSON.parse(content))
                    }
                })
        })
    }

    static async getById(id) {
        const service = await Service.getAll()
        return service.find(s => s.id === id)
    }
}

module.exports = Service