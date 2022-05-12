$(document).ready(function () {
  console.log("jquery ready")

  //when price input cliked , it turns into $CAD
  $("#price-id").on("click",function () {
    $('#priceLabel').text("$CAD")
  })
  $("#price-id").on("focusout",function (){
    $('#priceLabel').text("Price")
  })

  //when input are missing, it turns the input border and label red

  $(".int-area input").on("invalid",function(){
    $(this).css("border-bottom", "1px solid red" )
  })
  $(".int-area input").on("input",function (){
    $(this).css("border-bottom", "1px solid black" )
  })

  
});
