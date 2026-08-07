import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetSalesPersonsList = async (token,data) => {
    return fetch(`${apiUrl}/getSalesPersons/`+data, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"GetSalesPersonsList")
    })
}

