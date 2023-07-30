const db = require('../../data/db-config');
const knex = require('knex');


async function getAllUsers() {
    const allUsers = await db('users')
        .leftJoin('roles', 'users.role_id', 'roles.role_id')
        .select('users.user_id', 'users.name', 'users.username', 'users.email', 'roles.role_name')

    return allUsers;
}

async function getUsersById(user_id) {
    const user = await db('users')
        .leftJoin('roles', 'users.role_id', 'roles.role_id')
        .select('users.user_id', 'users.name', 'users.username', 'users.email', 'roles.role_name')
        .where('users.user_id', user_id).first()
    return user;
}

async function getUsersByFilter(filter) {
    const user = await db('users')
        .where(filter).first()
    return user;
}

async function insertUser(user) {
    const [willBeInsertedUserId] = await db('users').insert(user);
    return await getUsersById(willBeInsertedUserId);
}

async function updateUser(user, user_id) {
    await db('users').where('user_id', user_id).update(user);
    return await getUsersById(user_id)
}

async function deleteUser(user_id) {
    return await db('users').where('user_id', user_id).delete();
}

module.exports = {
    getAllUsers,
    getUsersById,
    getUsersByFilter,
    insertUser,
    updateUser,
    deleteUser
}