import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostDeleteCartItem = async (deletfromcart,token) => {

    return fetch(`${apiUrl}/deleteCartItem`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(deletfromcart)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"PostDeleteCartItem")
    })
}
