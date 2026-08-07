import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetAvailableVendorList = async (token,data) => {
    return fetch(`${apiUrl}/getAvailableDealers/`+data, {
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

