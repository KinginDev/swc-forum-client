import Cookie from 'js-cookie';
import JWT from 'jsonwebtoken';
import gql from 'graphql-tag';
import client from '~/config/apollo-boost.js';

export default function (context) {
    let token;
    if (process.server) {
        const cookie = context.req.headers.cookie
     
        if (typeof cookie !== 'undefined') {
            
            const jwtCookie = context.req.headers.cookie.split(';').find(c => c.trim().startsWith("userToken="));
          
            token = jwtCookie.split("=")[1];
        } else {
            return context.redirect('/auth/signin/?redirect=' + context.route.fullPath + '&&status=timeOut')
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
        return context.redirect("/auth/signin/?redirect=" + context.route.fullPath )
    }

    const GET_USER_QUERY = gql`query($id: ID){
		User(id:$id) {
		    id
		}
	}`;

    const variables = {
        id: decoded.id
    }

    client.query({
        query: GET_USER_QUERY,
        variables
    }).then( res => { console.log(res);
    }).catch(e => {
        context.redirect('/auth/signin/?redirect' + context.route.fullPath + '&&status=timeOut')
    })


} 