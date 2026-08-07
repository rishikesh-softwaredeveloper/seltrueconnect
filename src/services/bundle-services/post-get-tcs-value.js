import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetTcsValue = async (tcsData,token) => {

    return fetch(`${apiUrl}/getTcsValue`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tcsData)
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"GetTCSValue")
    })
}
