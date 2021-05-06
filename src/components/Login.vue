<template>
  <q-page class="center">
    <h1>LOGIN</h1><br><br>
       <q-input v-model="email" filled type="email" hint="Email" /><br><br>
       <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input><br><br>
      <span v-if="error != null">{{error}}</span><br><br>
      <q-btn color="white" text-color="black" label="Click to Login" v-on:click="Login()"/><br><br>
      <span>Sign Up :- </span><a v-on:click="signup()">Click Here</a><br><br>

  </q-page>
</template>


<script>
export default {
  name: 'Login',
  data () {
    return {
      user_details: [],
      password: '',
      isPwd: true,
      
      email: '',
      error:null,
    }
  },
  created() {
    this.fetchuserdetails();
  },
  methods : {
    fetchuserdetails(){
      fetch('http://localhost:3000/users').
               then(res => res.json()).
               then(res => { 
                 this.user_details = res;
                 console.log(res);
               })
    },
    Login(){
      let k;
        for(k=0; k< this.user_details.length; k++){
          if((this.email == this.user_details[k].email) && (this.password == this.user_details[k].password)){
            if(this.email == "admin@project.com"){
                this.emitvalue();
                this.$router.replace({ name: "Admin"});
            }
            else{
            this.emitvalue();
            this.$router.replace({ name: "Todo" });
            console.log("match found");
            }
          }
        }
       this.error = "Email or password is wrong";
    },
    signup(){
      this.$router.replace({ name: "Signup" });
    },
    emitvalue(){
      this.$emit('clicked',this.email);
    }
}
}
</script>
