$(document).ready(function() {
 
  var owl = $(".timeline-carousel");
 
  owl.owlCarousel({
     
      itemsCustom : [
        [0, 1],
        [500, 2],
        [768, 3],
        [1024, 4],
        [1350, 5],
        [2000, 6]
      ],
      navigation : true
 
  });
 
});