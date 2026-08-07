import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetDeviceListStockType = async (stocktype,token) => {
    
    return fetch(`${apiUrl}/getDevicesByStockType`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(stocktype)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"GetDeviceListStockType")
    })
}
