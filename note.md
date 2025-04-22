sequelize model:generate --name User --attributes name:string,email:string,password:string,role:string
seqize model:generate --name Product --attributes name:string,price:integer
sequelize model:generate --name Purchase --attributes userId:integer,productId:integer
