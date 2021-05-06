<template>
  <q-page class="center">
    <h1>SIGN UP</h1><br><br>
      <q-input v-model="user_d.email" filled type="email" hint="Email" /><br><br>
    <q-input v-model="user_d.name" label="Username" /><br><br>
       <q-input v-model="user_d.password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input><br><br>
      <span v-if="error != null">{{error}}</span><br><br>
      <q-btn color="white" text-color="black" label="Click to Signup" v-on:click="Signup()"/><br><br>
      <span>Log In :- </span><a v-on:click="login()">Click Here</a><br><br>
  </q-page>
</template>

<script>
export default {
  name: 'Signup',
   data () {
    return {
      isPwd: true,
      
      user_d: {
          email: null,
          name: null,
          password: null,
        },
        todo: {
          arr: [],
        },
      error: null,
    }
  },
  methods: {
    Signup(){
      if((this.user_d.name == null) || (this.user_d.password == null) || (this.user_d.email == null)){
            this.error = "Fill all the details";
      }
      else{
      fetch('http://localhost:3000/users', {
            method: 'post',
            body: JSON.stringify(this.user_d),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json)
        .then(() =>{
            alert("Congrats, Account created successfully, Login to continue..");
        }).catch(err => {
          this.error = err.message;
        });
        fetch('http://localhost:3000/todolist', {
            method: 'post',
            body: JSON.stringify(this.todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json)
        .then(() =>{
            this.$router.replace({ name: "Login" }); 
            location.reload();
        }).catch(err => {
          this.error = err.message;
        });
      }
    },
    login(){
      this.$router.replace({ name: "Login" });
      location.reload();
    }
  }
}
</script>
