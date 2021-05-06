<template>
  <q-page class="center" v-if="email=='admin@project.com'">
    <h1>Admin Panel</h1>
       <span>List of all Users :- </span>
       <div v-for="users in user_details" :key="users.id">
         <span v-if="users.id !=1">{{users.id}} .</span><span v-if="users.id !=1">{{users.name}} </span><q-btn v-if="users.id !=1" color="white" text-color="black" label="Show Content" v-on:click="show(users.id)"/><br><br>

       </div>
       <table border="10" cellspacing="2" cellpadding="1" style="float:left" >
            <tr>
               <th>S.no</th>
               <th>To-do items</th>
               <th>Update</th>
               <th>Delete</th>
            </tr>
            <tr v-for="(data, index) in user_data" :key="data">
               <td>{{index+1}}</td>
               <td> {{data}}
                  <q-popup-edit v-model="item" buttons>
                  <q-input v-model="item" dense autofocus counter />
                  </q-popup-edit>
               </td>
               <td> <q-btn color="white" text-color="black" label="Update" v-on:click="up(tempid, index)"/> </td>
               <td> <q-btn color="white" text-color="black" label="Delete" v-on:click="del(tempid, index)"/> </td>
            </tr>
           </table><br><br>
       
  </q-page>
  <q-page v-else>
    <h1>You are not an Admin</h1>
  </q-page>
</template>

<script>
export default {
  name: 'Admin',
  props: ['email'],
  created() {
    this.fetchuser();
  },
  data() {
    return{
      user_details: [],
      user_data: [],
      user_data1: [],
      item: null,
      user_dataup: [],
         user_dataup2:{
             id: null,
             arr : []
         },
         tempid: null,
    }
  },
  methods: {
    fetchuser(){
      fetch('http://localhost:3000/users').
               then(res => res.json()).
               then(res => { 
                 this.user_details = res;
               });
    },
    show(id){
      this.tempid=id;
          fetch('http://localhost:3000/todolist/'+String(id)).
               then(res => res.json()).
               then(res => { 
                 this.user_data = res.arr;
               })
    },
    up(id, index){
          if(this.item==null){
           alert("First enter something new to update");
         }
         else{
           this.user_dataup= this.user_data;
           this.user_dataup[index]=this.item;
           console.log(this.user_dataup[index]);
           this.user_dataup2.arr = this.user_dataup;
           this.user_dataup2.id = id;

           fetch('http://localhost:3000/todolist/'+String(id), {
            method: 'put',
            body: JSON.stringify(this.user_dataup2),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json)
        .then(() =>{
            alert("Item updated successfully..");
            this.show(id);
        }).catch(err => {
          this.error = err.message;
        });
        
         }
    },
    del(id, index){
           this.user_dataup= this.user_data;

           this.user_dataup.splice(index, 1);

           this.user_dataup2.arr = this.user_dataup;
           this.user_dataup2.id = id;

           fetch('http://localhost:3000/todolist/'+String(id), {
            method: 'put',
            body: JSON.stringify(this.user_dataup2),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json)
        .then(() =>{
            alert("Item removed successfully..");
            this.show(id);
        }).catch(err => {
          this.error = err.message;
        });
    }
  }
}
</script>

<style scoped>
span{
  font-size: 25px;
}
</style>
