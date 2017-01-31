
function printFunction() {
    window.print();
}


$("a#changeColor").each(function () {
    console.log($(this).text())
      if($(this.text === "Sandro Suladze")){
          $(this).css("color", "red");
      }
    });