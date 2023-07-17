const fs = require('fs')

class ProductManager {

    constructor(path) {
        this.path = path
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const inf = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(inf)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async addProduct(product) {
        const productPrev = await this.getProducts()
        let id
        if (!productPrev.length) {
            id = 1
        }
        else {
            id = productPrev[productPrev.length - 1].id + 1
        }
        productPrev.push({ ...product, id })
        await fs.promises.writeFile(this.path, JSON.stringify(productPrev))
    }

    async getProductById(id) {
        try {
            const productsPrev = await this.getProducts()
            const productId = productsPrev.find((p) => p.id === id)
            if (!productId) {
                return 'ERROR ID DE PRODUCTO NO ENCONTRADO'
            }
            return productId
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, obj) {
        try {
            const productsPrev = await this.getProducts()
            const productsIndex = productsPrev.findIndex(p => p.id === id)
            if (productsIndex === -1) {
                return 'ERROR ID DE PRODUCTO NO ENCONTRADO'
            }
            const product = productsPrev[productsIndex]
            productsPrev [productsIndex] = { ...product,...obj }
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(productsPrev)
            )
        } catch (error) {
            return error
        }
    }

    async deleteProduct(id) {
        try {
            const productPrev = await this.getProducts()
            const writeNewList = productPrev.filter((r) => r.id !== id)
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(writeNewList)
            )
        } catch (error) {
            return error
        }
    }

}

async function request() {
    const administrador = new ProductManager('Product.json')
    // const products = await administrador.getProducts()
    //await administrador.addProduct(product2)
    // console.log(products);

    // const productByIdRequest = await administrador.getProductById(5)
    // console.log(productByIdRequest);

    //await administrador.deleteProduct(2)

    //await administrador.updateProduct(1,obj)

}

obj = {
    title: 'Dove Gel',
    description: 'Gel de uso Personal',
}

const product1 = {
    title: 'Dove Shampoo',
    description: 'Shampoo de ducha',
    price: 1500,
    thumbnail: '',
    code: 1,
    stock: 200
}

const product2 = {
    title: 'Dove',
    description: 'Jabón de ducha',
    price: 1500,
    thumbnail: '',
    code: 2,
    stock: 200
}

request()