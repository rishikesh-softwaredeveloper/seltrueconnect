import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostCreateSalesDispatch = async (salesDispatchData,token) => {

    return fetch(`${apiUrl}/salesDispatch`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(salesDispatchData)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"PostCreateSalesDispatch")
    })
}
