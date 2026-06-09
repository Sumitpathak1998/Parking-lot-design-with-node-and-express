## Parking Rate Insert Payload 
## url ::  /api/parkingRate/create
{
    first_hour : 4,
    second_third_hour : 3.5,
    remaining_hour : 2.5
}


## Parking Rate Modifiy Payload
## url :  /api/parkingRate/update
{
    first_hour : 4,
}


## For Calculate the Parking charges 
## URL : http://localhost:3000/api/exit/parkingCharge/:id

# Resposne 
{
    "success":true,
    "payment_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXltZW50X2lkIjoxLCJhbW91bnQiOjM2MC41LCJpYXQiOjE3ODEwMDA2NzMsImV4cCI6MTc4MTAwMDc5M30.6z23jRoA_tllzrQLwuMyByWILZtsXYO3CnMbC_Q_UkU",
    "amount":360.5,
    "url":"Pay at /api/exit/payment"
}

## For Pay the payment 
## URL : http://localhost:3000/api/pay/payment
{
    amount : 453
}
## heard : paymentToken 