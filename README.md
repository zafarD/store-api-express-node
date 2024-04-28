
## Store API

### This project first create a database model with existing data.json file
### Query using different params

### Object Model 
#### {
  #### name: {String, required},
  #### price: {Number, required},
  #### rating: {Number, Default: 4.5},
  #### company: {String, enum: []},
  #### featured: {Boolean, default: false}
  #### createdAt: {Date, Date.now()}
#### }

### api => #### url/api/v1/products
####       =>  query parameters {
####                 /featured?Boolean
####                 /company?String 
####                 /name?String => case insensitive
####                 /sort?number => any number
####                 /select?field => specified in model
####                 /numericFilter?price>number&rating>4
####       }
              
        
