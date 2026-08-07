import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostTagDealers = async (data,token) => {

    return fetch(`${apiUrl}/tagDealerToSalesPerson`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(Response => Response.json()).
        catch((error) => {  
            console.log(error,"PostTagDealers")
    })
}
