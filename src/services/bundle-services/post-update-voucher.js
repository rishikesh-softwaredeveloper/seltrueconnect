import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostUpdateVocher = async (updateVocher,token) => {
    var url = `${apiUrl}/updateVoucher`;
    
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateVocher)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"PostUpdateVocher")
    })
}
