const consoleMethod = (req,res,next)=>{
    console.log(req.method + " Product");
    next();
}
module.exports = {
    consoleMethod
}