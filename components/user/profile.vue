<template>
    <div class="row"> 
                                <div class="col-md-8">
                                        <div class="">
                                            <div class="card max-profile-card">
                                                <form class="card-body">
                                                    <div class="form-group ">
                                                        <label for="staticEmail2" >Your Email</label>
                                                        <input type="text" disabled class="form-control" id="" placeholder="John" v-model="User.firstname">
                                                    </div>
                                                    <div class="form-group ">
                                                        <label for="staticEmail2" >Your Lastname </label>
                                                        <input type="text" readonly class="form-control" id="" placeholder="Doe" v-model="User.lastname">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="staticEmail2" >Your Email</label>
                                                        <input type="text" readonly class="form-control" id="" placeholder="john@doe.com" v-model="User.email">
                                                    </div>
                                                   
                                                     <div class="form-group">
                                                        <label for="staticEmail2" >Your Email</label>
                                                        <input type="text" readonly class="form-control" id="" placeholder="" v-model="User.phone">
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="submit" class="btn btn-outline-danger" value="Edit Profile">
                                                    </div>
                                                    </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card max-profile-card">
                                            <div class="card-body">
                                               <center> <img src="/images/avatar_male.jpg" alt="" class="img-responsive max-image img-rounded" title="Profile Image"></center>
                                               <div class="max-thread-info">
                                                <ul>
                                                    <li v-if="this.$apollo.queries.User.loading == false"><strong>No Of Threads:</strong><span class="pull-right">{{User.threads | count}}</span></li>
                                                    <li><strong>No Of Comments:</strong><span class="pull-right">{{User.commentses | count}}</span></li>
                                                </ul>
                                               </div>
                                            </div>
                                            
                                        </div>
                                    </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import _ from 'lodash'
const queryQ = gql `query($id: ID){
    User(id : $id){
            id
            email
            firstname
            lastname
            phone
            threads{
                id
            }
            commentses{
                id
            }

        }
    }`
export default {
    data(){
        return {
            User: {}
        }
    },
    methods: {

    }, 
    props: {
        id: {
            type: String,
            required: true
        }
    },
    apollo: {
        User: {
            query: queryQ,
            prefetch: (({route}) => {
                id: route.params.id
            }),
            variables(){
                return {
                    id: this.id
                }
            }
        }
    },
    filters: {
        count(arg){
           return _.size(arg)
        }
    }

}
</script>

<style>

</style>
