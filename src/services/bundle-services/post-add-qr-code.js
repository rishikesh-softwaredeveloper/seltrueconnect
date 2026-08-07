import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostAddQRCode = async (data,token) => {
    var url = `${apiUrl}/addQrCode`;
    
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
            console.log(error,"PostAddQRCode")
    })
}
