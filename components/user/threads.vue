<template>
    <div>
         <div class="row">
            <div class="col-md-12">
               <div v-if="this.$apollo.queries.allThreads.loading" class="text-center col-md-8 offset-md-2" style="height: 100px;">
                    <center>
                      <div class="orbit-spinner">
                          <div class="orbit"></div>
                          <div class="orbit"></div>
                          <div class="orbit"></div>
                        </div>
                    </center>
                </div>
               <div v-if="allThreads.length < 0" v-else>
                   <div class="card">
                       <div class="card-body">
                           <h3>You don't have any thread yet please create a new thread..</h3>
                           <center><nuxt-link to="/thread/new" class="btn btn-outline-danger">Create Thread</nuxt-link></center>
                       </div>
                   </div>
               </div>
                <div class="card"  v-for="thread in allThreads" :key="thread.id" v-else>
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