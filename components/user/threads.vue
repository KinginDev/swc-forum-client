<template>
    <div>
         <div class="row">
                                    <div class="col-md-12">
                                        <div class="card"  v-for="thread in allThreads" :key="thread.id">
                                            <div class="card-body">
                                                <div class="card-title">{{thread.title }}</div>
                                                <p class="card-text">{{thread.content  | truncate}}...</p>
                                                    <div class="pull-right">
                                                        <a href="" class="btn btn-outline-primary">View Thread</a> 
                                                        <a href="" class="btn btn-outline-warning">Close Thread</a>
                                                        <a href="" @click.prevent="deleteThread(id)" class="btn btn-outline-danger">Delete Thread</a>  
                                                    </div>
                                               
                                                <div class="clearfix"></div>
                                                
                                            </div>
                                            <div class="card-footer text-muted">
                                                <span class="max-author">
                                                    <i class="fa fa-user"></i>{{thread.user.firstname +' ' +thread.user.lastname}}</span>
                                                <span class="max-date-posted">
                                                    <i class="fa fa-calendar"></i> {{thread.createdAt | toDateFormat}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag'
    import moment from 'moment'
    import striptags from 'striptags'
    const userThread = gql `query ($id : ID){
        allThreads(filter: {
            user: {
                id: $id
            }
        }){
         id
        title
        user {
            firstname
            lastname
        }
        content
        tags
        createdAt
        }
    }`
    export default {
        data(){
            return {
                User: {},
                allThreads: []
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
            allThreads: {
                query: userThread,
                variables(){
                    return {
                        id: this.id
                    }
                },
                prefetch: true
            }
        },
        filters: {
        toDateFormat(params){
            return moment(params).format('dddd MM YYYY');
        },
        truncate(param){
           const newHtml = striptags(param)
            const newStr = newHtml.substring(0,100);
           return newStr;
        },
        
    },
        mounted(){
            console.log(this.allThreads)
        }
    }
</script>

<style>

</style>
