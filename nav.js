$.get("nav.html", function(data){
    $("header ").replaceWith(data);
});