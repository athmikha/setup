import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export async function getemail(input: string) : Promise<string|null>{
  try {
    console.log(input, "mail id ");
    

    const user = await prisma.user.findUnique({
      where: {
        email: input,
      },
    });

    if (user) {
      const email = user.email;
      console.log(email, "role");
      return email as string | null;
    } else {
      return null; 
    }

    
  } catch (error) {
    throw new Error(" User not found ");
  }
}

export async function getUserpassword(input: string): Promise<string|null> {
  try {
    console.log(input, "password");
    
    const user = await prisma.user.findUnique({
        where: {
          email: input,
        },
      });

    console.log(user, "user\n\n\n");

    if (user) {
      const pass = user.password;
      console.log(user, "user innnn\n\n\n");
      return pass as string | null;
    } else {
      return null; 
    }
  } catch (error) {
    throw new Error("User not found");
  }
}
export async function createuser(input:any): Promise<void>{
  console.log(input, "details");
  console.log(input.email, "details");
  console.log(input.password, "details");
  try {
    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: input.password,
      },
    });

    console.log(user, "created");
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('User creation failed');
  }
}
