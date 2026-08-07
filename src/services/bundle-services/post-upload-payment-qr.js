import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const PostUploadQrCodeImage = async (formData,token) => {
    return fetch(`${apiUrl}/uploadQrCodeImage`,{
        method: 'POST',
        headers: {
            // Accept: "application/json",
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        body:  formData
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"PostUploadQrCodeImage")
    })
}
