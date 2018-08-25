<template>
    <div>
          <div class="container">
            <div class=" row ">
                <div class="col-md-12">
                    <center>
                        <h2 class="head-text">All Threads</h2>
                    </center>
                </div>
                <div v-if="this.$apollo.queries.allThreads.loading" class="text-center col-md-8 offset-md-2" style="height: 100px;">
                    <center>
                      <div class="orbit-spinner">
                          <div class="orbit"></div>
                          <div class="orbit"></div>
                          <div class="orbit"></div>
                        </div>
                    </center>
                </div>
                <div class="col-md-8 offset-md-2" v-for="thread in allThreads" :key="thread.id" v-else>
                    <div class="card max-card">
                        <div class="card-header">
                            <a href="#" class="title">{{thread.title}}</a>
                        </div>  
                        <div class="card-body">
                             <p class="card-text">{{thread.content| truncate}}</p>
                            <a href="" @click.prevent="viewThread(thread.id)"
                                 class="btn btn-outline-danger pull-right">View Thread</a>
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
        truncate(param){
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
 
}
</script>

<style scoped="">
    .orbit-spinner, .orbit-spinner * {
      box-sizing: border-box;
    }

    .orbit-spinner {
      height: 55px;
      width: 55px;
      border-radius: 50%;
      perspective: 800px;
    }

    .orbit-spinner .orbit {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .orbit-spinner .orbit:nth-child(1) {
      left: 0%;
      top: 0%;
      animation: orbit-spinner-orbit-one-animation 1200ms linear infinite;
      border-bottom: 3px solid #ff1d5e;
    }

    .orbit-spinner .orbit:nth-child(2) {
      right: 0%;
      top: 0%;
      animation: orbit-spinner-orbit-two-animation 1200ms linear infinite;
      border-right: 3px solid #ff1d5e;
    }

    .orbit-spinner .orbit:nth-child(3) {
      right: 0%;
      bottom: 0%;
      animation: orbit-spinner-orbit-three-animation 1200ms linear infinite;
      border-top: 3px solid #ff1d5e;
    }

    @keyframes orbit-spinner-orbit-one-animation {
      0% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
      }
    }

    @keyframes orbit-spinner-orbit-two-animation {
      0% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
      }
    }

    @keyframes orbit-spinner-orbit-three-animation {
      0% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
      }
    }
</style>
