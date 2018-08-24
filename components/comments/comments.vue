<template>
	<div>
		<div class="card max-comment-card" v-for="comment in allComments" :key="comment.id">
			<div class="card-body" >
			    <div class="card-title">By :
			        <span style="font-weight: bold;">{{comment.user.firstname+ ' '+comment.user.lastname   }}</span>
			    </div>
			    <div class="card-text">{{comment.content}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import gql from 'graphql-tag';
	const query = gql `query ($id: ID){
		allComments(filter: {
			thread: {
				id: $id
			}
		}){
			user{
				id
				firstname
				lastname
			}
			content
		}
	}`
	export default{
		props:{
			id : {
				type: String,
				required: true
			}
		},
		data(){
			return {
				allComments: []
			}
		},
			apollo: {
				allComments:{
					query,
					variables() {
						return {
							id: this.id
						}
					},
					prefetch: true,
					loadingKey : 'loading'
				}
			},
		mounted(){
			console.log(this.allComments)
		}

	}
</script>