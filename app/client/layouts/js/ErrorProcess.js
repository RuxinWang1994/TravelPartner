document.write("<link rel='stylesheet' href='css/formstyle.css'/>");


function validateForm(){
    
    var flag=true;
    var text=document.getElementsByClassName("required");
    for(var i=0;i<text.length;i++)
    {
        if(text[i].value==null||text[i].value=="")
        {
            text[i].className +=" error";
            flag=false;
        }
    }
    if(!flag){
        event.preventDefault();
    }
    return flag;
}
window.onload = function() {
    var titleEle = document.getElementById("title");
    if(titleEle){
        titleEle.addEventListener("input",function() {
                                  if (titleEle.value!="")
                                  {
                                  if(titleEle.classList.contains('error'))
                                  {
                                  titleEle.classList.remove('error');
                                  }
                                  }
                                  }, true);}

    var userEle = document.getElementById("user");
    if(userEle){
        userEle.addEventListener("input",function() {
                                  if (userEle.value!="")
                                  {
                                  if(userEle.classList.contains('error'))
                                  {
                                  userEle.classList.remove('error');
                                  }
                                  }
                                  }, true);}
    var dateElem = document.getElementById("date");
    if(dateElem){
        dateElem.addEventListener("input",function() {
                                if (dateElem.value!="")
                                {
                                if(dateElem.classList.contains('error'))
                                {
                                dateElem.classList.remove('error');
                                }
                                }
                                }, true);}
    var contentElem = document.getElementById("content");
    if(contentElem){
        contentElem.addEventListener("input",function() {
                                  if (contentElem.value!="")
                                  {
                                  if(contentElem.classList.contains('error'))
                                  {
                                  contentElem.classList.remove('error');
                                  }
                                  }
                                  }, true);}
}


