import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostUpdateQRPaymentDetails = async (data,token) => {
    var url = `${apiUrl}/updatePaymentDetails`;
    
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"PostUpdateQRPaymentDetails")
    })
}
