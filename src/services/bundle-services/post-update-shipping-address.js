import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostUpdateShippingAddress = async (updateAddress,token) => {

    return fetch(`${apiUrl}/updateShippingAddress`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateAddress)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"PostUpdateShippingAddress")
    })
}
