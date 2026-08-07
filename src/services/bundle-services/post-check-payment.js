import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostCheckPayment = async (checkVocher,token) => {
    
    return fetch(`${apiUrl}/checkPayment`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(checkVocher)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"PostCheckPayment")
    })
}
