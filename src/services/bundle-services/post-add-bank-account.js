import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostAddBankAccount = async (newAccount,token) => {

    return fetch(`${apiUrl}/addAccount`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAccount)
    }).then(Response => Response.json()).
        catch((error) => {  
            console.log(error,"PostAddShippingAddress")
    })
}
