import connectMongoDB from '@/libs/mongodb';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import Employer from '@/models/employer';
import Freelancer from '@/models/freelancer';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();

          // Try to find the user as an Employer first
          let user = await Employer.findOne({ email });
          let role = 'employer';

          // If not found, check if the user is a Freelancer
          if (!user) {
            user = await Freelancer.findOne({ email });
            role = 'freelancer';
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

          // Return user data with role included
          return { id: user._id, name: user.name, email: user.email, role };
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
      // Attach user ID and role to session object
      if (token?.id) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add user ID and role to JWT token
      if (user?.id) {
        token.id = user.id;
        token.role = user.role; // Attach role to token
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
