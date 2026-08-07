import getEnvVars from '../../constants/global';
let base64 = require("base-64");
const { apiUrl } = getEnvVars();
const { userName } = getEnvVars();
const { passWord } = getEnvVars();

const user_name = base64.decode(userName);
const password = base64.decode(passWord);

export const PostRegister = async (generateParams) => {

    return fetch(`${apiUrl}/newDealer`, {
        method: 'post',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': "Basic " + base64.encode(user_name + ":" + password)
        },
        body: JSON.stringify(generateParams)
    }).then(Response => Response.json()).
        catch((error) => {    
            console.log(error,"New Reg")
    })
}
