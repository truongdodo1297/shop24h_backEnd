var mongoose = require("mongoose");

const orderDetailModel = require("../model/orderDetail");

const getAllOrderDetail = (request, response) => {

    orderDetailModel.find((error, data) => {
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

const CreateOrderDetail = (req, response) => {
    let bodyReq = req.body;
    console.log(bodyReq)
    console.log( bodyReq.product)
        const newOrderDetail = {
        product: bodyReq.product,
        quantity: bodyReq.quantity,
        imgUrl: bodyReq.imgUrl,
        buyPrice : bodyReq.buyPrice,
        name: bodyReq.name

    }
    orderDetailModel.create(newOrderDetail, (error, dataOrderDetail) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return response.status(201).json({
            status: "create ỏderDtail",
            data: dataOrderDetail
        })
    })
}

const getOrderDetailById = (request, response) => {
    const orderDetailId = request.params.orderDetailId;

    if (!mongoose.Types.ObjectId.isValid(orderDetailId)) {
        return response.status(400).json({
            "status": "Error 400: bad request",
        });
    }

    orderDetailModel.findById(orderDetailId, (error, data) => {
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
    })
}

const updateOrderDetail = (request, response) => {
    const orderDetailId = request.params.orderDetailId;
    let bodyOrderDetail = request.body;

    if (!mongoose.Types.ObjectId.isValid(orderDetailId)) {
        return response.status(400).json({
            "status": "Error 400: bad request",
            "message": "Course Id is not valid!"
        });
    }

    if (!bodyOrderDetail.name) {
        return response.status(400).json({
            "status": "Error 400: bad request",
            "message": "Title is not valid!"
        });
    }
    let newOrderDetail = {
        product: bodyOrderDetail.product,
        quantity: bodyOrderDetail.quantity
    }
    orderDetailModel.findByIdAndUpdate(orderDetailId, newOrderDetail, (error, data) => {
        if (error) {
            return response.status(500).json({
                "status": "Error 500: internal server error",
                "message": error.message
            })
        } else {
            return response.status(201).json({
                "data": data
            })
        }
    })
}

const deleteOrderDetailById = (request, response) => {

    const orderDetailId = request.params.orderDetailId;

    if (!mongoose.Types.ObjectId.isValid(orderDetailId)) {
        return response.status(400).json({
            "status": "Error 400: bad request",
        });
    }


    //B3: Thực hiện xóa order theo id
    orderDetailModel.findByIdAndDelete(orderDetailId, (error, data) => {
        if (error) {
            return response.status(500).json({
                "status": "Error 500: internal server error",
                "message": error.message
            })
        } else {
            return response.status(201).json({
                message: "xóa order",
                data: data
            })
        }
    })
}



module.exports = {
    getAllOrderDetail,
    CreateOrderDetail,
    getOrderDetailById,
    updateOrderDetail,
    deleteOrderDetailById
}