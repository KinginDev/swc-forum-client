
<template>
	<div>
		<!--Post Comments-->
		<div class="comment-box">
		    <h4 class="text-center">Post Your Comment</h4>
		    <!--If The user is not logged in the comment box will be missing or if the comment has been closed-->
		    <div class="col-md-10 offset-md-1">
		        <form method="POST">
		            <div class="form-group">
		                <label for="">Comment</label> 
		                <textarea 
		                        class="form-control"
		                        placeholder="Nathan Hunt"
		                        rows="7"
		                        cols="5" v-model="content" ref="content"></textarea>
		            </div>
		            <center>
	                    <button type="submit" class="btn btn-primary btn-block"  ref="Btn" @click.prevent="postComments()">
		                    <span v-if="!clickedBtn">Create Thread</span>
		                    <span class="text-center" v-else><i class="fa fa-spinner text-center"></i></span>
	                    </button>
                    </center>
		        </form>
		    </div>
		</div>
	</div>
</template>

<script>
	import gql from 'graphql-tag';
	import {eventBus} from '@/plugins/eventBus.js'
	const mutationQuery = gql`mutation createComment($content: String! , $threadId : ID $userId: ID){
		createComment(content: $content threadId : $threadId userId: $userId){
			id
			content
			thread{
				id
			}
			user{
				id
			}
		}
	}`
	export default{
		props: {
			threadId: {
				type: String,
				required: true,
			},
			userId: {
				type: String,
				required: true,
			}
		},
		data(){
			return {
				clickedBtn: false, 
				content: '',
			}
		},
		methods: {
			postComments(){
					this.clickedBtn = true;
					this.$refs.Btn.disabled = true;
					this.$apollo.mutate({
						mutation: mutationQuery,
						variables: {
							content: this.content,
							threadId: this.threadId,
							userId : this.userId,
						}	
					}).then( resp => {
						console.log( resp)
						this.$swal('success', 'You Comment has been successfully uploaded');
						 eventBus.$emit('newComment', true);
					}).catch(e => {
						this.$swal('Error', "Error tyring to create your comments, Please try agin Later", 'error')
					})
				
			}
		},
	
	}
</script>