const BASE_URL = `http://localhost:4000/api/v1`


export const userEndpPoints = {
    SIGNUP_API : BASE_URL + '/user/signup',
    SIGNIN_API : BASE_URL + '/user/signin'  ,
    UPDATEUSER_API : BASE_URL + '/user'  ,
    GETBULKUSER_API : BASE_URL + '/user/bulk'  ,
    GETUSER_API : BASE_URL + '/user/getUser'  ,
    GOOGLEHANDLER_API : BASE_URL + '/user/google'  ,
    GETALLUSER_API:BASE_URL + `/user/bulk?filter=`
}




export const AccountEndpPoints = {
    GETTRANSACTIONS_API : BASE_URL + '/account/getTransactionHistory',
    TRANSFER_API : BASE_URL + '/account/transfer',
    GETBALANCE_API : BASE_URL + '/account/balance',

}