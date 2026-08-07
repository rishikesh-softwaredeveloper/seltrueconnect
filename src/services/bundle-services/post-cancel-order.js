import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostCancelOrder = async (cancelorder,token) => {

    return fetch(`${apiUrl}/cancelOrder`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cancelorder)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"PostCancelOrder")
    })
}
