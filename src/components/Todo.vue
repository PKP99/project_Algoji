<template>
  <q-page class="center">
    <h2>To do list :-</h2><br><br>
    <q-btn color="white" text-color="black" label="Show Content" v-on:click="show()"/><br><br>
    <table border="10" cellspacing="2" cellpadding="1">
      <tr>
        <th>S.no</th>
        <th>To-do items</th>
      </tr>
      <tr v-for="(data, index) in user_data" :key="data">
        <td>{{index+1}}</td>
        <td>{{data}}</td>
      </tr>
    </table><br><br>
    <span v-if="error != null">{{error}}</span><br><br>
    <span>Add item in to-do list :-</span><br><br>
    <q-input v-model="newitem" filled type="text" hint="type something" />  <q-btn color="white" text-color="black" label="ADD" v-on:click="addi()"/><br><br>
  <q-btn color="white" text-color="black" label="Logout" v-on:click="login()"/><br><br>
  </q-page>
</template>

<script>
export default {
  name: 'Todo',
  props: ['email'],
  created() {
    this.fetchuser();
  },
  data() {
    return{
         user_details: [],
         user_data: [],
         user_dataup: [],
         user_dataup2:{
             id: null,
             arr : []
         },
         user: {
           id: null,
           uname: null
         },
         newitem: null,
         error:null
    }
  },
  methods: {
    fetchuser(){
      fetch('http://localhost:3000/users').
               then(res => res.json()).
               then(res => { 
                 this.user_details = res;
                 console.log(this.user_details);
                 console.log(this.user_details.length);
               });

          
    },
    show(){
          for(let k=0; k<this.user_details.length; k++){
        if(this.user_details[k].email == this.email){
          console.log("found");
          this.user.uname=this.user_details[k].name;
          this.user.id=this.user_details[k].id;
          break;
        }
          }

          fetch('http://localhost:3000/todolist/'+String(this.user.id)).
               then(res => res.json()).
               then(res => { 
                 this.user_data = res.arr;
                 console.log(this.user_data);
               })
    },
    addi(){
         if(this.newitem==null){
           this.error="First enter something";
         }
         else{
           this.user_dataup=this.user_data;
           this.user_dataup.push(this.newitem);
           this.user_dataup2.arr = this.user_dataup;
           this.user_dataup2.id = this.user.id;

           fetch('http://localhost:3000/todolist/'+String(this.user.id), {
            method: 'put',
            body: JSON.stringify(this.user_dataup2),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json)
        .then(() =>{
            alert("Item added successfully..");
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
