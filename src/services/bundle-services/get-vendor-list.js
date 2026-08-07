import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetVendorList = async (token,data) => {
    return fetch(`${apiUrl}/getAttachedList/`+data, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"GetBankAccounts")
    })
}

