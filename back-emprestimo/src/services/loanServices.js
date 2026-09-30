function determineLoans({age,income,location}){

    const loans = [];
    const locate = location ? location.toUpperCase() : '';

    if (income <= 3000 || (income > 3000 && income <= 5000 && age <30 && locate == "SP")){
        loans.push({
            type: "personal", interest_rate: 4
        });
    }

    if (income <= 3000 || income >= 3000 && income <= 5000 && age > 30 && locate == "SP"){
        loans.push({
            type: "guaranteed", interest_rate: 3
        });
    };

    if (income >= 5000){
        loans.push({
            type:"consignment", interest_rate: 2
        })
    }

    return loans;

}

module.exports ={
    determineLoans
}