import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetPurchaseDispatchAddress = async (salesorder_id,token) => {
    
    return fetch(`${apiUrl}/dispatchAddress/`+ salesorder_id +'', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(Response => Response.json()).
        catch((error) => {
            console.log(error,"GetIndividualOrders")    
    })
}
