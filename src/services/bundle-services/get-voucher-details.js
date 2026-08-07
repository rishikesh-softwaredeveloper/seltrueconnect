import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetVoucherDetails = async (token,data) => {
    return fetch(`${apiUrl}/vouchersList/`+data, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"GetVoucherDetails")
    })
}

