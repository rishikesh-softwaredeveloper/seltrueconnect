import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostAccessToken = async (accesstoken,token) => {

    return fetch(`${apiUrl}/getAccessToken`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(accesstoken)
    }).then(Response => Response.json()).
        catch((error) => { 
            console.log(error,"GetAccessToken")
    })
}
