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
      this.allWorks = [];
      let works = [];
      API.getAllPictures()
      .then(data=>{
        for(let i in data) {
          works.push({...data[i], id:i})
        }
        works = works.reverse();
        this.allWorks = works;
        this.loading = false;
      })
    },
  },

  created() {
    this.loading = true;
    //observe and decide whether to get new data
    window.updateData = ()=>{
      this.loading = true;
      new Noty({
        theme: 'nest',
        layout: 'topLeft',
        text: 'Some one is creating new costume and the page is updated',
        timeout: 3000
      }).show();
      this.getAllPictures();
    }
    
    this.getAllPictures();
  }


})






// utility