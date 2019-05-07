import API from './API.js';


let imageData;
let $modal = $('.modal');
$('#save').click(()=>{
  html2canvas(document.querySelector("#capture")).then(canvas => {
    var new_canvas = document.createElement('canvas');
    new_canvas.width = 900;
    new_canvas.height = 1800;
    new_canvas.getContext('2d').drawImage(canvas, 150, 100);
    var img = new_canvas.toDataURL("image/png");
    imageData = img;
    // activate cover
    $('.cover').addClass('active');

    // show modal
    $modal.find('img').attr('src',img)
    $modal.fadeIn()
      // document.body.appendChild(canvas)
  });
})

$modal.click((e)=>{
  e.stopPropagation();
})

$('body').click(()=>{
  $modal.fadeOut();
  $('.cover').removeClass('active');
})


// submit the form
$('form').submit((e)=>{
  e.preventDefault();
  //get the name;
  let name = $('form').find('.name input')[0].value;
  if(name.trim().length === 0) {
    jQuery.notify("please input valid name",'error');
    return
  }
  //save to firebase
  API.addPicture(name,imageData)
    .then(e=>{
      jQuery.notify(`Thanks ${name}, your work is shared successfully`,'success');
      //clear the input
      $('form').find('.name input')[0].value = '';

      //fade out the cover the modal
      $modal.fadeOut();
      $('.cover').removeClass('active');
    })
    .catch(e=>{
      jQuery.notify("An error happen",'error');
    })

})


