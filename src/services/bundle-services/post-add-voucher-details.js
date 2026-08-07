import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostAddVoucherDetails = async (newVoucher,token) => {

    return fetch(`${apiUrl}/createVoucher`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newVoucher)
    }).then(Response => Response.json()).
        catch((error) => {  
            console.log(error,"PostAddVoucherDetails")
    })
}
