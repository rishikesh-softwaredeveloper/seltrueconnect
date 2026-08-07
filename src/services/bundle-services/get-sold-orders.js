import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetSoldOrders = async (vendor_id,token) => {
    
    return fetch(`${apiUrl}/soldOrders/`+ vendor_id +'', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(Response => Response.json()).
        catch((error) => { 
            console.log(error,"GetSoldOrders")
    })
}
