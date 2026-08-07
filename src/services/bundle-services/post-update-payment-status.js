import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostUpdatePaymentStatus = async (data,token) => {
    return fetch(`${apiUrl}/updatePaymentStatus`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"PostUpdatePaymentStatus")
    })
}
