import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostSpstCreateOrder = async (order,token) => {

    return fetch(`${apiUrl}/spstSalesOrder`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(order)
    }).then(response => response.json()).
        catch((error) => {
            console.log(error,"PostSpstCreateOrder")
    })
}
