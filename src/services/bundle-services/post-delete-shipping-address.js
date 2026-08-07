import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostDeleteShippingAddress = async (deletShippingAddress,token) => {

    return fetch(`${apiUrl}/deleteShippingAddress`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(deletShippingAddress)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"PostDeleteShippingAddress")
    })
}
