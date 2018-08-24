<template>
    <div>
        
           <div class="container">
                <div class=" row ">
                     <div class="col-md-9 offset-md-1">
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
        return this.Thread.user +' '+ this.Thread.user;
    },
    
   
    },
    mounted() {
        this.userId = getId()

    },
    middleware: 'user',
}
</script>

<style>

</style>
