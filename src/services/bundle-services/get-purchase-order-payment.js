import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetPurchaseOrderPayment = async (salesorder_id,token) => {
    
    return fetch(`${apiUrl}/orderPaymentInfo/`+ salesorder_id +'', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(Response => Response.json()).
        catch((error) => {
            console.log(error,"GetPurchaseOrderPayment")    
    })
}
