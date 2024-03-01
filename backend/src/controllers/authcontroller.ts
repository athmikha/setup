import { getemail,getUserpassword,createuser } from "../services/user";
import { generateJWTTokenUsingPrisma } from "../util/jwtutil";

export async function login(userDetail: any): Promise<any | null> {
  
    
  
    //console.log(userCheck, "usercheck\n\n\n");
     console.log("\n\n\n\n userDetails:----",userDetail);
  
    if (userDetail.Response == false) {
      console.log("Authentication Failed in login \n");
      return null;
    } else {
      const empid = userDetail.Id;
      const userCheck = await getemail(userDetail.email);
      if (userCheck != null) {
        const pass = await getUserpassword(userDetail.email);
  
        console.log(pass, "password");
        userDetail.password = pass;
  
        const jwtToken: string = generateJWTTokenUsingPrisma(userDetail);
  
        return { token: jwtToken, userDetail };
      } else {
        console.log("user not found");
  
        return null;
      }
    }
  }
  
export async function signup(userDetail:any): Promise<any | null> {
  console.log(userDetail,"sign up params")

      const userCheck = await getemail(userDetail.email);
      if (userCheck === null){
      console.log(userCheck,"user check")
         const user = await createuser(userDetail);
         console.log(user,"user created")
         return "user created"
      }
      else{
      
        return "user already exsist"
      
    }
  
}