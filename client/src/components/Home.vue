<template>
  <div class="hello">
    <div class="pt-10 flex flex-col">
      <!-- <div class="bg-gray-300 text-3xl flex item-center justify-center pb-10">Verify</div> -->
      <div class="bg-gray-300 text-3xl flex item-center justify-center">Verify Your Educational Certificate to Avoid Future Hassle</div>
      <div class="flex item-center justify-center pt-20"><button @click="toMetaMask" class="bg-green-100" >Verify</button></div>
      
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeComponent',
  methods: {
    toMetaMask() {
      this.$router.push({
        name: 'Verify',
      });
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
