<template>
    <div>
         <div class="container">
           <div class="row">
               <div class="col-md-8 offset-md-2">
                    <div class="card max-profile-wrapper" style="margin-bottom: 0px !important;">
                        <div class="card-header">
                            <h4 class="text-center">Create New Thread</h4>
                        </div>
                        <form class="card-body">
                            <div class="form-group">
                                <label for="">Title</label>
                                <input type="text" class="form-control" v-model="thread.title">
                            </div>
                            <div class="form-group">
                                <label for="">Tags</label>
                                <input type="text" class="form-control"  v-model="thread.tags">
                            </div>
                        </form>
                        </div>
                        </div>
                      </div>
                         <div class="card">
                              <form class="card-body">
                                <div class="form-group">
                                    <label for="">Thread Content</label>
                                    <froala :tag="'textarea'" :config="config" v-model="thread.model" ref="textarea"></froala>
                                </div>
                              </form>
                         </div>
                         <div class="row">
                        <div class="col-md-8 offset-md-2">
                                <div class="card" style="margin:20px 0px;">
                                    <div class="form-group">
                                        <div class="card-body">
                                                <center>
                                                <button type="submit" class="btn btn-primary btn-block"  ref="Btn" @click.prevent="createThread()">
                                                <span v-if="!clickedBtn">Create Thread</span>
                                                <span class="text-center" v-else><i class="fa fa-spinner text-center"></i></span>
                                                </button>
                                            </center>
                                                </div>
                                    </div>
                                </div>
                        </div>
                         </div>
                    </div>
               
        
    </div>
</template>

<script>    
import VueFroala from 'vue-froala-wysiwyg';
import gql from 'graphql-tag'
import getId from '~/config/token.js'
export default {
    middleware: 'user',
    data(){
        return {
            clickedBtn: false,
            thread: {
                title: '',
                model: '',
                tags:''
            },
            config: {
                 events: {
                    'froalaEditor.initialized': function () {
                        console.log('initialized')
                    },
                    'froalaEditor.focus' : function(e, editor) {
                        console.log(editor.selection.get());
                        }
                 },
               heightMax: 300   
            },
        }
    },
    methods: {
        createThread(){
            this.$clickedBtn = true;
            this.$refs.Btn.disabled = true
    
            const mutationQuery = gql `mutation createThread($title : String! $tags: [String!]! $content: String! $id : ID){
                createThread(title: $title tags: $tags content: $content userId: $id){
                    id
                    title
                    user{
                        email
                    }
                }
            }`;
            const tags = this.thread.tags.split(',');
            const user = getId(); 
           // return console.log(user);
            
            this.$apollo.mutate({
                mutation: mutationQuery,
                variables: {
                    title: this.thread.title,
                    content: this.thread.model,
                    tags,
                    id: user
                }
            }).then( res => {
                this.$swal('Successfull', 'Your Thread Has been Created', 'success');
                this.$swal('Success' , 'Your thread has been already created', 'success');
                
                return this.$router.push({path:'/thread/'+res.data.createThread.id})
            }).catch( e => {

            })
            
        }
    },
    
}
</script>

<style>

</style>
