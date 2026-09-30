const db = require('../database/db')

async function createCustomer(cliente) {
    const {name, cpf, age, income, location} = cliente;

    const [result] = await db.execute(`
        insert into customer
        (name, cpf, age, income, location)
        values (?,?,?,?,?)`,
        [name,cpf,age,income,location]
    );

    return{
        id:result.insertId,
        name,
        cpf,
        age,
        income,
        location
    };

}

async function getCustomers() {
    const [customers] = await db.execute(
        'select * from customer'
    );

    return customers;
}

async function getCustomersbyid(id) {
    const [customers] = await db.execute(
        'select * from customer where id = ?',
        [id]
    );
    return customers[0];
}

async function updateCustomer(id,cliente) {

    const {name, cpf, age, income, location} = cliente

    const [result] = await db.execute(
        `update customer set 
        name = ?, 
        cpf = ?, 
        age = ?,
        income = ?,
        location = ?
        where id = ?`,
        [name, cpf, age, income,location, id]
    );

    return result.affectedRows > 0;


}

async function deleteCustomer(id) {
    const [result] = await db.execute(`
        delete from customer where id = ?
        `, [id]
    );

    return result.affectedRows > 0;
}

module.exports = {
    createCustomer,
    getCustomers,
    getCustomersbyid,
    updateCustomer,
    deleteCustomer
}