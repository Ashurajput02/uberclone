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

5.

