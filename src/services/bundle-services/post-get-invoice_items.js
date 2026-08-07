import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostGetInvoiceItems = async (order_id,token) => {

    return fetch(`${apiUrl}/getInvoiceItems`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(order_id)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"PostGetInvoiceItems")
    })
}
