import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostAddtocart = async (addtocart,token) => {

    return fetch(`${apiUrl}/addToCart`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addtocart)
    }).then(Response => Response.json()).
        catch((error) => {  
            console.log(error,"PostAddTocart")
    })
}
