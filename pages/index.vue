<template>
	<div>
		<div class="container">
			<div class="jumbotron bgSlider text-center">
				<h3>Welcome To SWC Forum</h3>
				<p>Where we build great people</p>
				<small>Sponsored By Apex traingle</small>
			</div>
			<div class="row">
				<div class="col-md-12 text-center how-it-works">
					<h3>How it Works</h3>
				</div>
				<div class="col-md-4">
					<div class="card animated  bounceInRight delay-1s">
						<div class="card-body card-home">
							<h3 class="card-title">Create An Account</h3>
								<p>You Click on the SignUp button to create an account with us, You will be asked to input your email, password and some other information</p>
							<div class="card-home-f">
								<nuxt-link to="/auth/signin" class="btn btn-outline-danger">Sign Up</nuxt-link>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card animated  bounceInUp delay-2s">
						<div class="card-body card-home">
							<h3>Create a Thread</h3>
							<p>After Your account has been created you can now create threads, by also clicking on the create Thread Button.</p>
							<div class="card-home-f">
								<nuxt-link to="/thread/new" class="btn btn-outline-danger">Create Thread</nuxt-link>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card animated  bounceInRight delay-3s">
						<div class="card-body card-home">
							<h3>Comment On Thread</h3>
							<p>You can know start commenting on threads and replying comments.</p>
							<div class="card-home-f">
								<nuxt-link to="/thread/" class="btn btn-outline-danger">Comment On a Thread</nuxt-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	export default{
		data(){
			return {

			}
		}
	}
</script>