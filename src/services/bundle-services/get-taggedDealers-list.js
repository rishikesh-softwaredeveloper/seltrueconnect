import getEnvVars from '../../constants/global';
const { apiUrl } = getEnvVars();

export const GetTaggedDealersList = async (token,data) => {
    return fetch(`${apiUrl}/taggedDealersList/`+data, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(Response => Response.json()).
        catch((error) => {
            console.log(error,"GetTaggedDealersList")
    })
}

