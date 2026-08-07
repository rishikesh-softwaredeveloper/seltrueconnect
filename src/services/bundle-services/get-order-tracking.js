import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetOrderTracking = async (salesorder_id,token) => {
    
    return fetch(`${apiUrl}/orderTracking/`+ salesorder_id +'', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(Response => Response.json()).
        catch((error) => { 
            console.log(error,"GetOrderTracking")
    })
}
