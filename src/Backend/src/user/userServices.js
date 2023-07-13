var userModel = require('./userModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

    return new Promise(function myFn(resolve, reject) {
        var userModelData = new userModel();

        userModelData.firstname = userDetails.firstname;
        userModelData.lastname = userDetails.lastname;
        userModelData.username = userDetails.username;
        userModelData.password = userDetails.password;
        userModelData.confirmpassword = userDetails.confirmpassword;

        var encrypted = encryptor.encrypt(userDetails.password);
        userModelData.password = encrypted;

        userModelData.save(function resultHandle(error, result){
            if (error) {
                reject(false);
            } else {
                resolve(true);
            }
        });
   });
}

module.exports.loginUserDBservice = (userDetails) =>
{
   
    return new Promise(function myFn(resolve, reject) 
   {
      userModel.findOne({ username: userDetails.username},function getresult(errorvalue, result)
      {
         if(errorvalue)
         {
            reject({status: false, msg: "Invaild Data"});
         }
         else
         {
          
            if(result !=undefined &&  result !=null)
            {
               var decrypted = encryptor.decrypt(result.password);
          

               if(decrypted== userDetails.password)
               {
                  
                  resolve({status: true,msg: result});
                  


               }
               else
               {
                  reject({status: false,msg: "User Validated failed"});
               }
            }
            else
            {
               reject({status: false,msg: "User Error Detailssss"});
            }

         }

      
      });

      
   });
}