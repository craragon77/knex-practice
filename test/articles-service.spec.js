const ArticlesService = require('../src/articles-service');
const knex = require('knex');

describe (`Articles service object`, function(){
    let db
    let testArticles = [
        {
            id: 1,
            date_published: new Date('2029-01-22T16:28:32.615Z'),
            title: 'First test post!',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
        },
        {
            id: 2,
            date_published: new Date('2029-01-22T16:28:32.615Z'),
            title: 'Second test post!',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
        },
        {
            id: 3,
            date_published: new Date('2029-01-22T16:28:32.615Z'),
            title: 'Third test post!',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
        }, {
            
            id: 4,
            date_published: new Date('2029-01-22T16:28:32.615Z'),
            title: 'we get it they are test posts',
            content: '(╯°□°)╯︵ ┻━┻'
        }
    ]
    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    before(() => {
        return db
            .into('blogful_articles')
            .insert(testArticles)
    })
    
    context(`Given blogful_article has data`, () => {
        beforeEach(() => {
            return db
                .into('blogful_articles')
                .insert(testArticles)
        })

        it(`getAllArticles() resolves all articles from 'blogful_articles' table,`, () => {
            // test that ArticlesService.getAllArticles gets data from table
            return ArticlesService.getAllArticles(db)
            .then(actual => {
                expect(actual).to.eql(testArticles.map(article => ({
                    ...article,
                    date_published:new Date(article.date_published)
                })))
            })
        })

        it(`getById() resolves an article by id from 'blogful_articles' table`, () => {
                const thirdId = 3
                const thirdTestArticle = testArticles[thirdId - 1]
                return ArticlesService.getById(db, thirdId)
                  .then(actual => {
                    expect(actual).to.eql({
                      id: thirdId,
                      title: thirdTestArticle.title,
                      content: thirdTestArticle.content,
                      date_published: thirdTestArticle.date_published,
                    })
                  })
              })
    })
    it(`insertArticle() inserts a new article and resolves the new article with an 'id'`, () => {
        const newArticle = {
            title: 'new title',
            content: 'new content',
            date_published: new Date('2020-01-01'),
        }
        return ArticlesService.insertArticle(db, newArticle)
            .then(actual => {
                expect(actual).to.eql({
                    id: 1,
                    title: newArticle.title,
                    content: newArticle.content,
                    date_published: new Date(newArticle.date_published),
                })
            })
    })
    after(() => db.destroy())
})