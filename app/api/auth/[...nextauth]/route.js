import connectMongoDB from '@/libs/mongodb';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import Employer from '@/models/employer';
import Freelancer from '@/models/freelancer'; // Import Freelancer model

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        // Add fields if needed, such as email and password
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();

          // Check if the user is an Employer
          let user = await Employer.findOne({ email });

          // If not found, check if the user is a Freelancer
          if (!user) {
            user = await Freelancer.findOne({ email });
          }

          // If still not found, return null (unauthorized)
          if (!user) {
            return null;
          }

          // Check password
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          // Return common user data (whether Employer or Freelancer)
          return { id: user._id, name: user.name, email: user.email };
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
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

export { handler as GET, handler as POST };
