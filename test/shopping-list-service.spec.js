const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')
describe (`Articles service object`, function(){
    let pdb
    let testProducts = [
        {
            id: 1,
            product_name: 'cheese',
            aisle: 1,
            department: 'cheese',
            price: 4
        },
        {
            id: 2,
            product_name: tofu,
            aisle: 2,
            department: 'health',
            price: 2
        }
    ]

    before(() => {
        pdb = knex({
            client: 'pg',
            connection: process.env.TE
        })
    })

    before(() => pdb('products').truncate())
    afterEach(() => pdb('blogful_articles').truncate())
    context(`Given 'products table has data`, () => {
        beforeEach(() => {
        return pdb
            .into('shoppingListSevice')
            .insert(testProducts)
        })
    })
    
    after(() => pdb.destroy())

    describe('getAllItems()', () => {
        it(`getAllProducts resolves all shopping list items from 'shoppingListService`, () => {
            return ShoppingListService.getAllProducts(pdb)
            .then(actual => {
                expect(actual).to.eql(testProducts.map(thing => ({
                    ...product
                })))
            })
        })
    })
    context(`given products has no data`, () => {
        it(`getAllProducts resolves an empty array`, ()=> {
            return ShoppingListService.getAllProducts(pdb)
            .then(actual => {
                expect(actual).to.eql([])
            })
        })
    })

    it('Adding an item', () => {
        const newProduct = {
            id: newProduct.id,
            product_name: newProduct.produce_name,
            aise: newProduct.aisle,
            department: newProduct.department,
            price: newProduct.price,
        }
        return newProduct.insertProduct(pdb, newProduct)
    })

    it(`getById() resolves an article by id from 'products' table`, () => {
        const thirdId = 3
        const thirdTestProduct = testArticles[thirdId - 1]
        return ProductService.getById(pdb, thirdId)
            .then(actual => {
                expect(actual).to.eql({
                    id: thirdId,
                    title: thirdTestProduct.title,
                    content: thirdTestArticle.content,
                    date_published: thirdTestArticle.date_published
                })
            })
    })

    it(`deleteProduct() does what you think it does lolol`, () => {
        const productId = 7
        return ProductService.deleteProduct(pdb, productId)
            .then(() => ArticlesService.getAllArticles(db))
            .then(allProducts => {
                const expected = testArticles.filter(product => product.id !== productId)
                expect(allProducts).to.eql(expected)
            })
    })
    
    it('updates a product(this is taking 4ever)', () => {
        const idOfProductToUpdate = 4
        const newProductData = {
            id: newProductData.id,
            product_name: newProductData.name,
            aisle: newProductData.aisle,
            department: newProductData.department,
            price: newProductPlace.price
        }
        return ProductService.updateArticle(pdb, idOfProductToUpdate, newProductData)
            .then(() => ProductService.getById(pdb, idOfProductToUpdate))
            .then(product => {
                expect(article).to.eql({
                    id: idOfProductToUpdate, ...newProductData
                })
            })
    })
})