import API from './API.js';



let vue = new Vue({
  el: '#app',
  data(){
    return {
      allWorks: [],
      loading: true,
    }
  },
  methods: {
    getAllPictures() {
      this.loading = true;
      this.allWorks = [];
      API.getAllPictures()
      .then(data=>{
        for(let i in data) {
          this.allWorks.push(data[i])
        }
        this.loading = false
      })
    }
  },

  created() {
    //observe and decide whether to get new data
    window.updateData = ()=>{
      this.getAllPictures();
    }
    
    this.getAllPictures();
  }


})