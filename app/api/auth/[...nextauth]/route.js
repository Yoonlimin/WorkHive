import connectMongoDB from '@/libs/mongodb';
import { connect } from 'mongoose';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/models/employer';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        
        
      },
      async authorize(credentials) {
        const {email, password} = credentials;
        
        
        try{
          await connectMongoDB();
          const user = await User.findOne({email});
          if(!user){
            return null;
          }

          const passwordMatch=await bcrypt.compare(password, user.password);
          
          if(!passwordMatch){
            return null;
          }
          return { id: user._id, name: user.name, email: user.email };
        
        }
        catch(error){}
      },
    }),
  ],


  
  session :{
   strategy : 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages :{
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      // Attach user ID to session object
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add user ID to JWT token
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}; 