steps involved

1.sabse pehle hmne isme server and app.js ko setup kiya 
   basically server hamara entry point rhega and app hamara main app logic ko contain karega 
   hamara server code server mein and baaki apis cors etc app mein 

2. ab hum db connection establish karenge taaki humara code kisi db se connect ho sake
    
    sabse phele hamne users ka collection banaya

    always remember ki ham bhale hi kuch naam de mongoose usko plural plus s laga dega plus usko lowercase mein convert kar dega 

    say User---- users

3.user model
    contain fullname, email , password and socket id 
    ab idhar methods ---generateauthtoken,comparepassword,hashpassword

4. installing express validator--to validate the data entered post registration

5. for registration::

sabse pehle route define kara --route ke andar express validator rakha to ensure ki proper validated data hi andar jaaye 
phir validation result ko controller ko bhjea jisme saara logic hota hain ki kya karwana hain iss api se 
phir udhar validation result mein koi error messg hain toh voh response ke format mein bhej diya 
agar nahin hain toh user service hain ek to register user usko calll kara --matlb code ko highly modular karke lika 
udhar register user mein check hota hain ==already exists , new user create , koi null toh value nahi hain
phir uske baad jab user create hogya 
phir ab yeh ek user return karega ab user ko db mein save bhi karenge and and iska ek auth token bhi generate karenge naa babe 


jo token hamne JWT ka generate kara hain yeh token hum server side store nahin karenge 

6.hamne login karne par bhi token isliye generate kara hain as user ko login isliye hi karna pada naa as uska auth token expire ho gya hoga so ab authtoken regenerate kara hain taaki user phirse login karne ki need naa ho seedhe open ho jaaye user 


7 logout route mein main yeh bhi ensure karna chahta hoon ki jo token bekar expire ho gye hain mein unhein ek blacklist token list meinn db mein store karloon 

8. agar captain (driver) active hain toh uspe rides ki request jaayegi agar inactive hain toh ride ki request nahin jaayegi 

