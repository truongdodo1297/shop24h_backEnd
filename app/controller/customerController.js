var mongoose = require("mongoose");

const customerModel = require("../model/CustomerModel");

const getAllCustomer = (request, response) => {

    customerModel.find((error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            data: data
        })
    })
}
const getAllCustomerLimit9 = (request, response) => {
    const body = request.query
    const start =body._start;
    const limit =body._limit;
    customerModel.find()
    .skip(start)
    .limit(limit)
    .exec((error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            data: data
        })
    })
}
const filterCustomer = (request, response) => {

        let {fullName, phone} = request.query;
        let condition = {}
        if(fullName !== "undefined" && fullName !== ""){
            condition.fullName = fullName
        }
        if(phone !== "undefined" && phone !== "") {
            condition.phone = phone
        }
        console.log(condition)
        console.log(request.query)
    customerModel.find( condition ,(error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            message: "filter customer",
            data: data
        })
    })
}

const CreateCustomer = (request, response) => {
    let body = request.body;
    const newCustomer = {
        fullName : body.fullName,
        phone: body.phone,
        email: body.email,
        address: body.address,
        city: body.city,
        apartment: body.apartment,
        country: body.country,
        orders: body.orders
           }
    customerModel.create(newCustomer, (error, dataCustomer) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return response.status(201).json({
            data: dataCustomer
        })
    })
}

const getCustomerById = (request, response) => {
    const customerId = request.params.customerId;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            "status":"Error 400: bad request",
        });
    }

    customerModel.findById(customerId, (error, data) => {
        if (error) {
            return response.status(500).json({
                "status":"Error 500: internal server error",
                "message":error.message
            })
        } else {
            return response.status(201).json({
                data : data
            })
        }
    })
}
const getCustomerBySDT = (request, response) => {
    let customerSDT = request.params.SDT;
    let phone = parseInt(customerSDT);
    console.log(customerSDT)
 
    customerModel.find({"phone" : phone}, (error, data) => {
        if (error) {
            return response.status(500).json({
                "status":"Error 500: internal server error",
                "message":error.message
            })
        } else {
            return response.status(201).json({
                message: "filter customer SDT",
                data : data
            })
        }
    })
}

const updateCustomer = (request, response) => {
    const customerId = request.params.customerId;
    let bodyCustomer = request.body;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            "status":"Error 400: bad request",
            "message":"Course Id is not valid!"
        });
    }

    // Kiểm tra title
    if (!bodyCustomer.name) {
        return response.status(400).json({
            "status":"Error 400: bad request",
            "message":"Title is not valid!"
        });
    }
    let newcustomer = {
        name: bodyCustomer.name,
        description: bodyCustomer.description,
        type: bodyCustomer.type,
        imageUrl: bodyCustomer.imageUrl,
        buyPrice: bodyCustomer.buyPrice,
        promotionPrice: bodyCustomer.promotionPrice,
        amount: bodyCustomer.amount
    }
    customerModel.findByIdAndUpdate(customerId, newcustomer, (error, data) => {
        if (error) {
            return response.status(500).json({
                "status":"Error 500: internal server error",
                "message":error.message
            })
        } else {
            return response.status(201).json({
                "data":data
            })
        }
    })
}

const deleteCustomerById = (request, response) => {

    const customerId = request.params.customerId;   

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            "status":"Error 400: bad request",
        });
    }


    //B3: Thực hiện xóa course theo id
    customerModel.findByIdAndDelete(customerId, (error, data) => {
        if (error) {
            return response.status(500).json({
                "status":"Error 500: internal server error",
                "message":error.message
            })
        } else {
            return response.status(201).json({
                "data":data
            })
        }
    })
}



module.exports = {
    getAllCustomer,
    CreateCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomerById,
    getCustomerBySDT,
    filterCustomer,
    getAllCustomerLimit9
}