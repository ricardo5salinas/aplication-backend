import prisma from './prismaClient.js'

export const findAllUsers = async () => {
    return await prisma.user.findMany({
    include: {
        role: true,
        doctor: true,
    },
    })
}

export const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
    where: { email },
    include: {
        role: true,
        doctor: true,
        },
    })
}

export const findUserByIdentityCard = async (identity_card) => {
    return await prisma.user.findUnique({
        where: { identity_card },
        include: {
        role: true,
        doctor: true,
        },
    })
    }


export const createUser = async (data) => {
    const {
        identity_card,
        first_name,
        last_name,
        email,
        password,
        phone = null,
        address = null,
        role_id,
    } = data

    if (!role_id) {
        throw new Error('Missing role_id for user creation')
    }

    return await prisma.user.create({
        data: {
        identity_card,
        first_name,
        last_name,
        email,
        password,
        phone,
        address,
        role: {
            connect: { role_id },
        },
        },
        include: {
        role: true,
        doctor: true,
        },
    })
}

export const updateUser = async (user_id, data) => {
    const existingUser = await prisma.user.findUnique({
        where: { user_id: parseInt(user_id) },
    })
    if (!existingUser) return null

    return await prisma.user.update({
        where: { user_id: parseInt(user_id) },
        data: {
        identity_card: data.identity_card,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        phone: data.phone || null,
        address: data.address || null,
        role: {
            connect: {
            role_id: data.role_id,
            },
        },
        },
        include: {
        role: true,
        doctor: true,
        },
    })
    }

    export const deleteUser = async (user_id) => {
    const existingUser = await prisma.user.findUnique({
        where: { user_id: parseInt(user_id) },
    })
    if (!existingUser) return null

    return await prisma.user.delete({
        where: { user_id: parseInt(user_id) },
    })
    }