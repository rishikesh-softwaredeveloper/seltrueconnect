import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetPurchaseBundleItemList = async (data,token) => {

    return fetch(`${apiUrl}/purchaseBundleInfo`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"BundleItemList")
    })
}
