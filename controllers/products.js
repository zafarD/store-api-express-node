const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    // throw new Error('Testing express async error...')
    const products = await Product.find({
        price: {$lt:30}
    }).sort('price')

    res.status(200).json({
        massage: "success",
        products,
        nHits: products.length    
    })
}
const getAllProducts = async (req, res) => {
    //Getting any query params
    const {featured, company, name, sort, select, numericFilter} = req.query
    //create the query object
    const queryObject = {}
    // if the params exit then add to query object / else null
    if(numericFilter) {
        const operatorMap = {
            '<' : '$lt',
            '<=' : '$lte',
            '=' : '$eq',
            '>' : '$gt',
            '>=' : '$gte',
        }
        const regex = /\b(<|<=|=|>=|>)\b/g
        let filters = numericFilter.replace(regex, (match)=> `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }
    
    if(featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company) {
        queryObject.company = company
    }
    if(name) {
        //using regex for case problem "look for mongo query regex"
        queryObject.name = {$regex: name, $options: 'i'}
    }
    let result = Product.find(queryObject)

    if(sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }else {
        result = result.sort('createdAt')
    }
    if(select) {
        const selectList = select.split(',').join(' ')
        result = result.select(selectList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const products = await result.skip(skip).limit(limit)

    res.status(200).json({
        massage: "success",
        products,
        nHits: products.length
    })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}