const shoppingListService = {
    getAllProducts(knex){
        return knex.select('*').from('products')
    },
    insertProduct(knex, newProduct){
        return knex
                .insert(newProduct)
                .into('products')
                .returning('*')
                .then(rows => {
                    return rows[0]
                })
    },
    getById(knex, id){
        return knex.from('products').select('*').where('id', id).first()
    },
    deleteArticle(knex, id){
        return knex('product').where({id}).delete()
    },
    updateArticle(knex, id, newProductFields){
        return knex('blogful_articles')
            .where({id}).update(newArticleFields)
    }
}