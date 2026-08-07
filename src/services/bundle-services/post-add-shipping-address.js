import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostAddShippingAddress = async (newAddress,token) => {

    return fetch(`${apiUrl}/addShippingAddress`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAddress)
    }).then(Response => Response.json()).
        catch((error) => {  
            console.log(error,"PostAddShippingAddress")
    })
}
