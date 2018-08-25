<template>
    <div>
          <div class="container">
            <div class="max-profile-wrapper" >
                <div class=" row ">
               <div class="col-md-12">
                   <div class="row">
                    <div class="col-md-3 max-profile-pills-nav">
                        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Profile</a>
                            <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Threads</a>
                            <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Security</a>
                            <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Contact Us</a>
                        </div>
                    </div>
                    <div class="col-md-8 max-profile-pills-content">
                        <div class="tab-content" id="v-pills-tabContent">
                            <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                <div class="">
                                    <profile :id="id" />
                                </div>
                            </div>
                            <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                               <threads :id="id" />
                            </div>
                            <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                               <security />
                            </div>
                            <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                <contact />
                            </div>
                        </div>
                    </div>
                    </div>
                   </div>
             </div>
            </div>
        </div>
    </div>
</template>

<script>
import profile from '@/components/user/profile'
import threads from '@/components/user/threads'
import security from '@/components/user/security'
import contact from '@/components/user/contact'
import getId from '@/config/token.js'
export default {
     middleware: 'user',
    data(){
        return{
            id: ''
        }
    },
    components: {
        profile,
        threads,
        security,
        contact
    },
    mounted(){
        this.id = getId()
    }
   
}
</script>

<style>

</style>
