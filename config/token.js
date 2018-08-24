import Cookie from 'js-cookie';
import JWT from 'jsonwebtoken';


export default function getId(context) {
    let token;
    if (process.server) {
        const cookie = context.req.headers.cookie

        if (typeof cookie !== 'undefined') {

            const jwtCookie = context.req.headers.cookie.split(';').find(c => c.trim().startsWith("userToken="));

            token = jwtCookie.split("=")[1];
        }
    } else {
        token = Cookie.get('userToken')
        console.log(context);
    }
    let decoded;
    try {
        decoded = JWT.verify(token, 'Maxwell')
    } catch (e) {
        console.log(e)
    }

    return decoded.id;


} 