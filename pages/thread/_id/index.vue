<template>
    <div>
        
           <div class="container">
                <div class=" row ">
                     <div class="col-md-9 offset-md-1">
                         <div v-if="this.$apollo.queries.allThreads.loading" class="text-center col-md-8 offset-md-2" style="height: 100px;">
                                <center>
                                  <div class="orbit-spinner">
                                      <div class="orbit"></div>
                                      <div class="orbit"></div>
                                      <div class="orbit"></div>
                                    </div>
                                </center>
                            </div>
                         <div class="card max-single-card">
                             <div class="card-header max-card-header">
                                 <div class="single-title">{{Thread.title}}</div>
                             </div>
                             <div class="card-body">
                                 <p class="card-text" v-html="Thread.content">
                                     
                                 </p>

                                 <h5 style="margin: 10px">Tags</h5>
                                    <span class="label danger" v-for="  tag in Thread.tags" v-bind:key="tag" style="margin: 5px; padding: 5px; font-size: 15px;">{{tag}}</span>
                                   
                             </div>
                            <div class="card-footer text-muted">
                                <span class="max-author">
                                    <i class="fas fa-user"></i> {{showUserNames}}</span>
                                <span class="max-date-posted">
                                    <i class="far fa-calendar"></i> {{toDateFormat}}</span>
                            </div>
                         </div>
                        <!--Comment-->
                        <h4 class="text-center">Comments</h4>
                     
                        <comments :id="id"/>
                       

                       <postComment  :threadId="id" :userId="userId"/> 
                        
                     </div>
                </div>

            </div>
    </div>
</template>

<script>
import  gql  from "graphql-tag";
import postComment from '@/components/comments/post';
import comments from '@/components/comments/comments';
import getId from '~/config/token.js'
import moment from 'moment'
const Get_Thread = gql `query($id : ID){
    Thread(id: $id){
        user{
            firstname
            lastname
            
        },
        createdAt
        title
        content
        tags
        
    }
}`
export default {
    data(){
        return{
            id: this.$route.params.id,
            Thread: {},
            userId: ""        }
    },
    apollo: {
        Thread: {
            query: Get_Thread,
            variables() {
                return {
                     id: this.id
            
                }
            },
            prefetch: ({route}) => {
					id : route.params.id
			},
        }
    },
    components:{
        postComment,
        comments
    },
    computed: {
    toDateFormat(){
      return moment(this.Thread.createdAt).format('dddd MM YYYY');
    },
    showUserNames(){
        return this.Thread.user.firstname +' '+ this.Thread.user.lastname;
    },
    
   
    },
    mounted() {
        this.userId = getId()

    },
    middleware: 'user',
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