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

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const productsPrev = await this.getProducts()
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                return "Error campos vacios"
            }
            const verifyCode = productsPrev.find(c => c.code === code)
            if (verifyCode) {
                return "El codigo se repite"
            }
            let id
            if (!productsPrev.length) {
                id = 1
            }
            else {
                id = productsPrev[productsPrev.length - 1].id + 1
            }
            const product = { id, title, description, price, thumbnail, code, stock }
            productsPrev.push({ ...product, id })
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(productsPrev)
            )
        } catch (error) {
            return error
        }
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
            productsPrev[productsIndex] = { ...product, ...obj }
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

    //Trayendo el array vacio
    //const products = await administrador.getProducts()
    //console.log(products);

    //Agregando los productos
    //Parametros: title,description,price,thumbnail,code,stock
    //console.log(await administrador.addProduct("Dove Shampoo", "Shampoo de ducha", 150, 'None', 1, 25));
    //console.log(await administrador.addProduct("Dove Jabón", "Jabón de ducha", 100, 'None', 2, 25));

    //Traer el producto con el ID
    // const productByIdRequest = await administrador.getProductById(1)
    // console.log(productByIdRequest);

    //Eliminar el Producto
    //await administrador.deleteProduct(2)

    //Modificando un Producto
    //await administrador.updateProduct(1,obj)

}

obj = {
    title: 'Dove Acondicionador',
    description: 'Acondicionador de ducha',
    price: 180,
    thumbnail: 'none',
    code: 1,
    stock: 30
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