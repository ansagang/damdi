import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import clientPromise from '@/utils/mongoAdapter'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/utils/server";
import bcrypt from 'bcrypt'
import { User } from '@/models'

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            async authorize(credentials) {
                await db.connect();
                const user = await User.findOne({
                    email: credentials.email,
                });
                if (bcrypt.compareSync(credentials.password, user.password)) {
                    return {
                        _id: user._id,
                        username: user.username,
                        password: user.password,
                        lang: user.lang,
                        role: user.role,
                        img: user.img,
                        email: user.email,
                        createdAt:user.createdAt,
                        updatedAt: user.updatedAt,
                        __v: user.__v
                    }
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?._id) {
                token._id = user._id;
                token.username = user.username;
                token.password = user.password;
                token.lang = user.lang;
                token.role = user.role;
                token.img = user.img;
                token.email = user.email;
                token.createdAt = user.createdAt;
                token.updatedAt = user.updatedAt;
            };
            return token;
        },
        async session({ session, token }) {
            if (token?._id) {
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.password = token.password;
                session.user.lang = token.lang;
                session.user.role = token.role;
                session.user.img = token.img;
                session.user.email = token.email;
                session.user.createdAt = token.createdAt;
                session.user.updatedAt = token.updatedAt;
            };
            return session;
        },
    },
    pages: {
        signIn: '/',
    },
    adapter: MongoDBAdapter(clientPromise),
    secret: "g3xqP+Ihl+zzFtmjxg20DUlxug1+m9hocsw3g+i00zw="
})