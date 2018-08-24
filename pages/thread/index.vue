<template>
    <div>
          <div class="container">
            <div class=" row ">
                <div class="col-md-12">
                    <center>
                        <h2 class="head-text">All Threads</h2>
                    </center>
                </div>
                <div v-if="this.$apollo.queries.allThreads.loading" class="text-center">
                    <center>
                        <PulseLoader :loading="loading" color="#007bff" size="20px"/>
                    </center>
                </div>
                <div class="col-md-8 offset-md-2" v-for="thread in allThreads" :key="thread.id" v-else>
                    <div class="card max-card">
                        <div class="card-header">
                            <a href="#" class="title">{{thread.title}}</a>
                        </div>  
                        <div class="card-body">
                             <p class="card-text">{{thread.content| contentInHtml}}</p>
                            <a href="" @click.prevent="viewThread(thread.id)"
                                 class="btn btn-outline-primary pull-right">View Thread</a>
                            </div>
                        <div class="card-footer text-muted">
                            <span class="max-author"><i class="fas fa-user"></i>{{thread.user.firstname +' '+ thread.user.lastname}}</span>
                            <span class="max-date-posted"><i class="far fa-calendar"></i>{{thread.createdAt | toDateFormat}}</span>
                        </div>
                    </div>
                </div>
               
            </div>
            
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import moment from 'moment'
import striptags from 'striptags';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
const query = gql `query{
    allThreads{
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
    apollo:{
        allThreads: {
            query,
            prefetch: true,
            loadingKey: 'loading',
        }
    },
    data(){
        return {
            allThreads: []
        }
    },
    computed: {
       
    }, 
    filters: {
        toDateFormat(params){
            return moment(params).format('dddd MM YYYY');
        },
        contentInHtml(param){
           const newHtml = striptags(param)
            const newStr = newHtml.substring(0,100);
           return newStr;
        },
        
    },
    methods: {
        viewThread(id){
             this.$router.push({path: '/thread/'+ id});
        }
    },
    components: {
        PulseLoader
    }
}
</script>

<style>

</style>
