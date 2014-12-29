function slideUpShowMenu(){
  $('.launchimg').animate(
    {
      top: "-50px"
    },
    350, function() {
    /* stuff to do after animation is complete */
    $('.addclub').show();
  });
}