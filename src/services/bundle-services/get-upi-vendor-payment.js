import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetUpiVendorPayment = async (data,token) => {
    return fetch(`${apiUrl}/getAttachedVendorQrCode/`+data, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"GetUpiVendorPayment")
    })
}

