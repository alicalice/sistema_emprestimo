const customerService = require('../services/customerService');
const loanService = require('../services/loanServices')
async function createCustomer(req,res) {
    try {
        const {name, cpf, age, income, location} = req.body;

        if(!name || !cpf || age ===undefined || income === undefined || !location){
            return (
                res.status(400).json({
                    erro: 'Todos os campos são obrigatóriuos.'
                })
            );
        };

        const newCustomer = await customerService.createCustomer({
            name,
            cpf,
            age,
            income,
            location
        });

        return (
            res.status(201).json(newCustomer)
        );
    } catch(error) {
        console.log(error)
        return(
            res.status(500).json({
                mensagem: 'Erro ao salvar o cliente no banco de dados'
            })
        )
    }
}

async function getCustomers(req, res) {
    try {
        const customers = await customerService.getCustomers();

        return res.status(200).json(customers);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            mensagem: 'Erro ao buscar os clientes'
        });
    }
}

async function getCustomersbyid(req,res) {
    try {
        const {id} = req.params;

        const customer = await customerService.getCustomersbyid(id);

        if(!customer){
            return (
                res.status(404).json({
                    mensagem: "Cliente não encontrado."
                })
            );
        }
        return res.status(200).json(customer);
        
    } catch (error) {
        console.log(error);

        return(
            res.status(500).json({
                mensagem: "Erro ao buscar cliente."
            })
        );
    }
}

async function updateCustomer(req,res) {
    try{
        const {id} = req.params;
        const {name, cpf,age, income, location} = req.body;

        if (!name || !cpf || age == undefined || income == undefined || !location){
            return res.status(400).json({
                mensagem: "Todos os campos são obrigatórios."
            });
        };

        const updated = await customerService.updateCustomer(id, {name,cpf,age,income,location});
        
        if(!updated){
            return res.status(404).json({
                mensagem: "Cliente não encontrado."
            })
        }

        return res.status(200).json({
            id: Number(id),
            name,
            cpf,
            age,
            income,
            location
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            mensagem: "Erro ao atualizar cliente."
        })
    }
}

async function deleteCustomer(req,res) {

    try{
        const {id} = req.params;

        const deleted = await customerService.deleteCustomer(id);

        if (!deleted) {
            return res.status(404).json({
                mensagem: "cliente não encontrado."
            });
        }

        return res.status(200).json({
            mensagem: "Cliente excluído com sucesso."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensagem: "Erro ao excluir o cliente."
        });
    }
}


async function getCustLoans(req,res) {
    try {
        const {id} = req.params;
        const customer = await customerService.getCustomersbyid(id);
        



        if(!customer){
            return res.status(404).json({
                mensagem: "Cliente não encontrado."
            });
        }

        const loans = loanService.determineLoans({
            age: customer.age,
            income:customer.income,
            location:customer.location
        })

        return res.status(200).json({
            customer: customer.name,
            loans
        });
    }
    catch (error){
        console.log(error);
        return(
            res.status(500).json({
                mensagem: "Erro ao avaliar empréstimos."
            })
        );
    }
}

module.exports = {
    createCustomer,
    getCustomers,
    getCustomersbyid,
    updateCustomer,
    getCustLoans,
    deleteCustomer
};