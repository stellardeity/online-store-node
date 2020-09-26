const { v4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const { resolve } = require('path')

class Space {
    constructor(title, description, img) {
        this.title = title,
        this.description = description,
        this.img = img,
        this.id = v4()
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            img: this.img,
            id: this.id
        }
    }

    async save() {
        const space = await Space.getAll()
        space.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'space.json'),
                JSON.stringify(space),
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
            fs.readFile(path.join(__dirname, '..', 'data', 'space.json'),
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
}

module.exports = Space