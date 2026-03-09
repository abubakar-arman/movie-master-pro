"use server"

import { collections, dbConnect } from "@/lib/dbConnect"
import logger from "@/lib/logger"
import bcrypt from "bcryptjs"

export const userExists = async (email) => {
    const result = await dbConnect(collections.USERS).findOne({ email })
    logger.debug({ result });

}

export const postUser = async (payload) => {
    // 1. check payload //
    const { photoUrl, ...rest } = payload
    const { name, email, password } = rest
    // logger.debug(payload)

    // 2. check user //
    const userExists = await dbConnect(collections.USERS).findOne({ email })
    if (userExists) {
        logger.debug('user exists', email);
        return {
            success: 'false',
            msg: 'user_exists'
        }
    }

    // 3. create user //
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
        ...rest,
        password: hashedPassword,
        image: photoUrl,
        role: "user",
        createdAt: new Date().toISOString(),
        provider: 'credentials'
    }
    logger.debug('newUser', newUser);

    // 4. insert user //
    const result = await dbConnect(collections.USERS).insertOne(newUser)

    if (!result.acknowledged) {
        return {
            success: 'false',
            msg: 'failed'
        }
    }
    logger.debug('user created:', result);
    return {
        success: 'true',
        msg: 'user_created',
        ...result,
        insertedId: result.insertedId.toString()
    }
}

export const loginUser = async (payload) => {
    // logger.debug({ payload });
    logger.debug('processing login...')

    const { email, password } = payload
    if (!email || !password) {
        return null
    }
    // find user from db
    const user = await dbConnect(collections.USERS).findOne({ email })
    if (!user) {
        logger.debug('User not found')
        return null
    }

    const isPassMatched = await bcrypt.compare(password, user.password)
    if (!isPassMatched) {
        logger.debug('Password mismatch')
        return null
    }
    // logger.debug({
    //     plainPass: password,
    //     HashedPass: await bcrypt.hash(password, 10),
    //     dbHashed: user.password
    // });
    logger.debug('login successful')
    return user
}