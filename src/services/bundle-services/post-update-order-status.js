import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostUpdateOrderStatus = async (data,token) => {
    return fetch(`${apiUrl}/changeOrderStatus`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"PostUpdateOrderStatus")
    })
}
