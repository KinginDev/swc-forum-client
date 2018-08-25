<template>
  <div>   
          <div class=" row ">
                    <div class="col-md-6 offset-md-3">
                        <div class="card max-login-card">
                            <div class="card-header">
                                <p class="text-center max-login-card-header">
                                    Sign up to access our unique contents
                                </p>
                            </div>
                            <form class="card-body">
                                <div class="form-group">
                                    <label for="" class="text-center">Your Email Address</label>
                                    <input type="email"
                                           class="form-control is-empty" v-validate="'required|email'" data-vv-delay="500" :class="{'is-danger': errors.has('email')}" name="email"
                                           required v-model="email">
                                            <span class="help-block has-warning" v-if="errors.has('email')">
                                            <p style="color:red; text-variant:uppercase; font-size: 12px;" >{{errors.first("email")}}</p>
                                    </span>
                                    </div>
                                <div class="form-group">
                                    <label for="" class="text-center">Your Firstname</label>
                                    <input type="text"
                                           class="form-control is-empty" v-validate="'required'" data-vv-delay="500" :class="{'is-danger': errors.has('firstname')}" name="firstname"
                                           required v-model="firstname">
                                           <span class="help-block has-warning" v-if="errors.has('firstname')">
                                            <p style="color:red; text-variant:uppercase; font-size: 12px;" >{{errors.first("firstname")}}</p>
                                    </span>
                                </div>
                                <div class="form-group">
                                    <label for="" class="text-center">Give Yourself a Username</label>
                                    <input type="text"
                                           class="form-control is-empty" v-validate="'required'" data-vv-delay="500" :class="{'is-danger': errors.has('username')}" name="username"
                                           required v-model="username">
                                           <span class="help-block has-warning" v-if="errors.has('username')">
                                            <p style="color:red; text-variant:uppercase; font-size: 12px;" >{{errors.first("username")}}</p>
                                           </span>
                                  
                                </div>
                                <div class="form-group">
                                    <label for="" class="text-center">Your Lastname</label>
                                    <input type="text"
                                           class="form-control is-empty" v-validate="'required'" data-vv-delay="500" :class="{'is-danger': errors.has('lastname')}" name="lastname"
                                           placeholder=""
                                           required v-model="lastname">
                                           <span class="help-block has-warning" v-if="errors.has('lastname')">
                                            <p style="color:red; text-variant:uppercase; font-size: 12px;" >{{errors.first("lastname")}}</p>
                                           </span>
                                </div>
                                <div class="form-group">
                                    <label for="" class="text-center">Your Phone Number</label>
                                    <input type="text"
                                           class="form-control is-empty" v-validate="'required'" data-vv-delay="500" :class="{'is-danger': errors.has('phone')}" name="phone"
                                           placeholder=""
                                           required v-model="phone">
                                           <span class="help-block has-warning" v-if="errors.has('phone')">
                                            <p style="color:red; text-variant:uppercase; font-size: 12px;" >{{errors.first("phone")}}</p>
                                           </span>
                                </div>
                                <div class="form-group">
                                    <label for="" class="text-center">Your Secure Password</label>
                                    <input type="password"
                                           class="form-control is-empty" v-validate="'required'" data-vv-delay="500" :class="{'is-danger': errors.has('password')}" name="password"
                                           placeholder=""
                                           required v-model="password" ref="confirm">
                                           <span class="help-block has-warning" v-if="errors.has('password')">
                                            <p style="color:red; text-variant:uppercase; font-size: 12px;" >{{errors.first("password")}}</p>
                                           </span>
                                </div>
                                <div class="form-group">
                                    <label for="" class="text-center">Confirm Password</label>
                                    <input type="password"
                                           class="form-control is-empty" v-validate="'required'" data-vv-delay="500" :class="{'is-danger': errors.has('confirm_pass')}" name="confirm_pass"
                                           placeholder=""
                                           required v-model="confirm_pass" >
                                           <span class="help-block has-warning" v-if="errors.has('confirm_pass')">
                                            <p style="color:red; text-variant:uppercase; font-size: 12px;" >{{errors.first("confirm_pass")}}</p>
                                           </span>
                                </div>
                                <div class="form-group">
                                    <input type="submit"
                                           class="btn btn-outline-primary btn-block"
                                           value="Grant Me Access" @click.prevent="signUp()">
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios'
import Cookie from 'js-cookie';
export default {
    data(){
        return {
            email: '',
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            confirm_pass : '',
            phone: '',
        }
    },
    methods: {
        signUp(){
            const data = _.assign(this.$data, {});
            this.$validator.validateAll().then(res => {
                if(res){
                     if(this.password === this.confirm_pass){
                        this.$axios.post('http://swc-forum-server.herokuapp.com/signup',data, {
                            headers: {
                                'Content-Type' : 'application/json',
                                'Access-Control-Expose-Headers' : 'x-auth, Authorization',
                                
                            }
                        }).then( (res) => {
                            //set the token cookie
                            var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
                           
                            Cookie.set('userToken', res.headers.authorization,{
                                expires: inFifteenMinutes
                            })
                            // redirect to the officer dashboard
                            this.$router.push({path: '/user/'});
                            
                        })
                    }else{
                        this.$swal('Error','Password and Confirm Password DO Not Match','error');
                    }
                }
            })
           
        }
    }

}
</script>

<style>

</style>
