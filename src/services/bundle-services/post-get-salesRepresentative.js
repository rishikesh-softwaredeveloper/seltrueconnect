import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetSalesRepresentatives = async (token) => {

    return fetch(`${apiUrl}/getSalesRepresentatives`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"getSalesRepresentatives")
    })
}
