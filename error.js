export class AppError extends Error {
    constructor(message,statusCode,isOpreational,stack = "") {
        super(message);
        this.stack = stack;
        this.statusCode = statusCode;
        this.isOpreational = isOpreational;
    }
}

export const handleError = (err,res) => {
    let status = Number(err.statusCode) || 500;

    console.log("Error Message : ", err.message);
    console.log("Error in details : " , err.stack);
    res.status(err.statusCode).send({
        success : false,
        message : err.isOpreational ? err.message : "Internal Server Error" 
    });
}