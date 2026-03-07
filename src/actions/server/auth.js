"use server"

import { dbConnect } from "@/lib/dbConnect"
import bcrypt from "bcryptjs"

export const postUser = async (payload) => {
    const { photoUrl, ...rest } = payload
    const { name, email, password } = rest
    // console.log(payload)

    const userExists = await dbConnect("users").findOne({ email })
    if (userExists) {
        console.log('user exists', email);
        return {
            success: 'false',
            msg: 'user_exists'
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
        ...rest,
        password: hashedPassword,
        image: photoUrl,
        role: "user",
        createdAt: new Date().toISOString()
    }
    console.log('newUser', newUser);

    const result = await dbConnect("users").insertOne(newUser)

    if (!result.acknowledged) {
        return {
            success: 'false',
            msg: 'failed'
        }
    }
    console.log('user created:', result);
    return {
        success: 'true',
        msg: 'user_created',
        insertedId: result.insertedId.toString()
    }
}