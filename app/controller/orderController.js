var mongoose = require("mongoose");

const orderModel = require("../model/orderModel");
const CustomerModel = require("../model/CustomerModel")

const getAllOrder = (request, response) => {
    orderModel.find()
    .exec((error, data) => {
        if (error) {
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
const getAllOrderLimit9 = (request, response) => {
    const body = request.query
    const start =body._start;
    const limit =body._limit;

    orderModel.find({status: {$in:["Chờ xác nhận","Xác nhận", "Hoàn tất", "Hủy bỏ"]}})
    .populate("customer")
    .populate("order.product")
    .limit(limit)
    .skip(start)
    .exec((error, data) => {
        if (error) {
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
const filterOrder = async (request, response) => {

    let { orderCode, phone, fullName, startDay, endDay } = request.query;
    let conditionCustomer = {};
    let conditionOrder = {};
    if (fullName !== "undefined" && fullName !== "") {
        conditionCustomer.fullName = fullName.trim()
    }
    console.log(orderCode)
    if (phone !== "undefined"  &&  phone !== "") {
        conditionCustomer.phone = phone
    }
    if (orderCode !== "undefined"  && orderCode !== "") {
        conditionOrder.orderCode = orderCode
    }
    if (startDay !== "undefined"  && startDay !== "") {
        conditionOrder.orderDate = {
            $gte: new Date(startDay)
        }
    }
    if (endDay !== "undefined"  && endDay !== "") {
        if( conditionOrder.orderDate){
            conditionOrder.orderDate.$lte = new Date(endDay);
        } else{
            conditionOrder.orderDate = {
                $lte: new Date(endDay)
        }
    }}
    console.log(conditionOrder)
    const customer = await CustomerModel.find(conditionCustomer);
    if (!customer) {
        return response.status(404).json({
            status: "Not found",
            message: "Không tìm thấy khách hàng với tên yêu cầu"
        });
    }
    // Lấy các _id của customer
    let customerIds = customer.map(c => c._id);
    // Thêm điều kiện vào truy vấn
    conditionOrder.customer = { $in: customerIds };
    orderModel.find(conditionOrder).populate("customer").populate("order.product").exec((err, data) => {
        if (err) {
            return response.status(500).json({
                status: "Internal server error",
                message: err.message
            })
        }
        else {
            return response.status(200).json({
                message: "order filter",
                data: data,
            })
        }
    })
}


const CreateOrder = async (request, response) => {
    let body = request.body;

    // console.log(body);
    try {
        let newCustomer = {
            fullName: body.fullName,
            email: body.email,
            phone: body.phone,
            sex: body.sex,
            address: {
                city: body.address.city,
                distric: body.address.distric,
                war: body.address.war,
                apartment: body.address.apartment
            }
        }
        let customer = await CustomerModel.create(newCustomer)

        let newOrder = {
            orderCode: body.orderCode,
            customer,
            order: [],
            requirement: body.requirement,
            orderDate: new Date(),
            status: "Chờ xác nhận"
        };
        for (let i = 0; i < body.order.length; i++) {
            let tempOrder = {
                product: body.order[i].product,
                quantity: body.order[i].quantity
            }
            newOrder.order.push(tempOrder)
        }
        console.log("order")
        console.log(newOrder)
        let order = await orderModel.create(newOrder)
        return response.status(201).json({
            customer: customer,
            order: order
        })
    }
    catch (error) {
        return response.status(500).json({
            status: "Internal server error at order",
            message: error.message
        });
    }
}
const getOrderById = (request, response) => {
    const orderId = request.params.orderId;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            "status": "Error 400: bad request",
        });
    }

    orderModel.findById(orderId).populate("customer").exec(((error, data) => {
        if (error) {
            return response.status(500).json({
                "status": "Error 500: internal server error",
                "message": error.message
            })
        } else {
            return response.status(201).json({
                data: data
            })
        }
    }))
}



const updateOrder = (req, res) => {
    const orderId = req.params.orderId;
    let bodyOrder = req.body;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            "status": "Error 400: bad request",
            "message": "Course Id is not valid!"
        });
    }
    let newOrder = {
        status: bodyOrder.status
    }
    orderModel.findByIdAndUpdate(orderId, newOrder, (error, data) => {
        if (error) {
            return res.status(500).json({
                "status": "Error 500: internal server error",
                "message": error.message
            })
        } else {
            return res.status(201).json({
                "data": data
            })
        }
    })
}

const deleteOrderById = (req, res) => {
    const orderId = req.params.orderId;
    let bodyOrder = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
            "status": "Error 400: bad request",
        });
    }
    let newOrder = {
        status: bodyOrder.status
    }

    orderModel.findByIdAndUpdate(orderId,newOrder, (error, data) => {
        if (error) {
            return res.status(500).json({
                "status": "Error 500: internal server error",
                "message": error.message
            })
        } else {
            return res.status(201).json({
                "data": data
            })
        }
    })
}



module.exports = {
    getAllOrder,
    CreateOrder,
    getOrderById,
    updateOrder,
    deleteOrderById,
    filterOrder,
    getAllOrderLimit9
}