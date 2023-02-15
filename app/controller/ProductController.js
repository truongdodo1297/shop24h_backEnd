var mongoose = require("mongoose");
const ProductModel = require("../model/ProductModel");

const productModel = require("../model/ProductModel");


//lấy 9 sp
const getAllProduct9 = (request, response) => {
    const body = request.query
    const start =body._start;
    const limit =body._limit;

    productModel.find()
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
            status: "get list data 9 sp",
            data: data
        })
    })
}

const getProductLimit4 = (request, response) => {
    productModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "get 4 data ",
            data: data
        })
    }).limit(4)
}

//lấy tất ca sp
const getAllProduct = (request, response) => {
    productModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "get all data ",
            data: data
        })
    })
}
const filterAll = (req, res) => {

    const { color, brand, rating, buyPrice} = req.query;
    const condition = {};
    
    console.log( req.query);
    if(color !== "undefined"){
        condition.color = color.trim()
    }
    if(brand !== "undefined" ){
        condition.brand =  brand
    }
    if(rating !== "undefined"){
        condition.rating =  rating
    }
    if(buyPrice !== "undefined"){
        if(buyPrice < 200){
            condition.buyPrice =  {
                ...condition.buyPrice, "$lte" : buyPrice}
        }
        if(buyPrice > 200){
            condition.buyPrice =  {
                ...condition.buyPrice, "$gte" : buyPrice}
        }
        if(buyPrice > 1001){
            condition.buyPrice =  {
                ...condition.buyPrice, "$gt" : buyPrice}
        }
    }
    console.log( condition);

   
    
    productModel.find( condition, (error, data) => {
        if (error) {
            return res.json({
                status: "Internal server error",
                message: error.message
            })
        }
        return res.json({
            status: "filter color all",
            data: data
        })
    })
}

const CreateProduct = (request, response) => {
    let body = request.body;
    const newproduct = {
        name: body.name,
        description: body.description,
        type: body.type,
        imageUrl: body.imageUrl,
        buyPrice: body.buyPrice,
        promotionPrice: body.promotionPrice,
        color: body.color,
        rating: body.rating, 
        brand: body.brand
    }
    ProductModel.create(newproduct, (error, dataProduct) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return response.status(201).json({
            data: dataProduct
        })
    })
}


const getProductById = (request, response) => {
    const productId = request.params.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return response.status(400).json({
            "status": "Error 400: bad request",
        });
    }

    productModel.findById(productId, (error, data) => {
        if (error) {
            return response.status(500).json({
                "status": "Error 500: internal server error",
                "message": error.message
            })
        } else {
            return response.status(201).json({
                status: "get data buy id",
                data: data
            })
        }
    })
}

const updateProduct = (request, response) => {
    const productId = request.params.productId;
    let bodyProduct = request.body;

    //B2: kiểm tra dữ liệu
    // Kiểm tra course id
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return response.status(400).json({
            "status": "Error 400: bad request",
            "message": "Course Id is not valid!"
        });
    }
    let newProduct = {
        name: bodyProduct.name,
        color: bodyProduct.color,
        brand: bodyProduct.brand,
        rating: bodyProduct.rating,
        description: bodyProduct.description,
        type: bodyProduct.type,
        imageUrl: bodyProduct.imageUrl,
        buyPrice: bodyProduct.buyPrice,
        promotionPrice: bodyProduct.promotionPrice,
    }
    productModel.findByIdAndUpdate(productId, newProduct, (error, data) => {
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

const deleteProductById = (request, response) => {

    const productId = request.params.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return response.status(400).json({
            "status": "Error 400: bad request",
        });
    }

    //B3: Thực hiện xóa course theo id
    productModel.findByIdAndDelete(productId, (error, data) => {
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


module.exports = {
    getAllProduct9,
    CreateProduct,
    getProductById,
    updateProduct,
    deleteProductById,
    filterAll,
    getAllProduct,
    getProductLimit4
}