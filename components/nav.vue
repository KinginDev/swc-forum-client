<template>
    <div>
            <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#"><img src="/images/57x57.png" alt=""></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <nuxt-link to="/" tag="li" class="nav-item active">
                <a class="nav-link"
                  >Home
                    <span class="sr-only">(current)</span>
                </a>
            </nuxt-link>
             <nuxt-link to="/user" tag="li" class="nav-item active">
                <a class="nav-link"
                 >Profile</a>
             </nuxt-link>
              <nuxt-link to="/thread" tag="li" class="nav-item active">
                <a class="nav-link"
                   >Threads</a>
              </nuxt-link>
            
              <nuxt-link to="/thread/new" tag="li" class="nav-item active">
                <a class="nav-link"
                   >Create Thread</a>
              </nuxt-link>
            <li class="nav-item dropdown">
                <a class="nav-link"
                   href="http://www.apex-triangle.com" target="_blank">Learn More About Us</a>
            </li>
        </ul>
           
<!--
            <span class="navbar-text">
                    
                        <span ><i class="fa fa-sign-in" style="margin: 0px 10px;"></i><nuxt-link to="/auth/signin">Sign In</nuxt-link></span>
                          <span ><i class="fa fa-sign-in-alt" style="margin: 0px 10px;"></i><nuxt-link to="/auth/signup">Sign Up</nuxt-link></span>
                   
                        <img src="/images/avatar_male.jpg" style="min-height: 30px; width: 30px ;margin: 0px 10px; border-radius: 50%;"  class="img-responsive" alt=""><nuxt-link to="/user">View Profile </nuxt-link>
                      </span>
-->
                
        </div>
    </nav>
    </div>
</template>

<script>

export default {

    
    data(){
        return {
          loggedIn: false, 
          User: {} 
        }
    },


 

}
</script>

<style>

</style>
