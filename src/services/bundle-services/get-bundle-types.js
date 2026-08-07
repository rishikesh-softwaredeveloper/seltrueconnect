import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetBundleTypes = async (token) => {

    return fetch(`${apiUrl}/GetBundleTypes/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"GetBundleTypes")
    })
}

