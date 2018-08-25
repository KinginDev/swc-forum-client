<template>
    <div>
       <div class="container">
                <div class=" row ">
                   
                    
                    <div class="col-md-6 offset-md-3">
                        <div v-if="$route.query.status == 'timeOut'" style="margin-top: 20px;">
                        <div class="alert alert-warning alert-dismissible" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <strong>Logged Out!</strong> Your Session has been timed out pls Login Again to Continue Commenting
                        </div>
                    </div>
                        <div class="card max-login-card">
                            <div class="card-header">
                                <p class="text-center max-login-card-header">
                                    Login To Your Account
                                </p>
                            </div>
                            <form class="card-body" @submit.prevent="signIn()">
                                <div class="form-group">
                                    <label for="">Your Email Address</label>
                                    <input type="email"
                                        class="form-control"
                                        required v-model="email">
                                </div>
                                <div class="form-group">
                                    <label for="">Your Password</label>
                                    <input type="password"
                                        class="form-control" placeholder="" required v-model="password">
                                </div>
                                <div class="form-group">
                                    <div class="">
                                                <center>
                                                <button type="submit" class="btn btn-outline-danger btn-block"  ref="loginBtn">
                                                  <span v-if="!clickedLogin">Grant Me Access</span>
                                                  <span class="text-center" v-else><i class="fa fa-spinner text-center"></i></span>
                                                </button>
                                            </center>
                                         </div>
                                </div>
                            </form>
                        </div>
                        
                   </div>     
            </div>
        </div> 
    </div>
</template>

<script>
 import  Cookie  from "js-cookie";
 import axios from 'axios';
 import { _ } from "lodash";
export default {
   
 data(){
     return {
         email: "",
         password: '',
         clickedLogin: false
     }
 }, 
 methods: {
     signIn(){
     
     this.clickedLogin = true;
     this.$refs.loginBtn.disabled = true;
        this.$axios.post('http://swc-forum-server.herokuapp.com/signin',this.$data, {
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Expose-Headers' : 'x-auth, Authorization',
                
            }
        }).then( (res) => {
            //set the token cookie
            var inFifteenMinutes = new Date(new Date().getTime() + 60 * 60 * 1000);
            
            Cookie.set('userToken', res.headers.authorization,{
                expires: inFifteenMinutes
            })
            // redirect to the officer dashboard
           if(this.$route.query.redirect){
             return this.$router.push({path: this.$route.query.redirect});
          }
           return  this.$router.push({path: '/user/'});
            
        }).catch( e => {
            this.clickedLogin = false;
            this.$refs.loginBtn.disabled = false;
            this.$swal('Sorry', 'The Username or password seems not to be correct', 'error')
        })
               
        }
 }
}
</script>

<style>

</style>
