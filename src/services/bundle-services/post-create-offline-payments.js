import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostCreateOfflinePayment = async (OfflinePaymentData,token) => {

    return fetch(`${apiUrl}/addOffLinePayments`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(OfflinePaymentData)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"PostCreateOfflinePayment")
    })
}
