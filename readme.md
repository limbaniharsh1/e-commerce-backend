installjsonwebtoken
jwt req

login or sign up done

let token=jwt.sign(user.id,key)

res.send(token)

frontend  
npm i universal cookies
cookies set token

user =>cart
appi calling=> token =>backend




backend 

token get

let userid=jwt.verify(token,key)
user.findbyid(userid)




