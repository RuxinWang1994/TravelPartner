//document.write("<link rel='stylesheet' href='css/formstyle.css'/>");


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
    var imgEle = document.getElementById("banner");
    if(imgEle){
        imgEle.addEventListener("input",function() {
                                  if (imgEle.value!="")
                                  {
                                  if(imgEle.classList.contains('error'))
                                  {
                                  imgEle.classList.remove('error');
                                  }
                                  }
                                  }, true);}
    var userEle = document.getElementById("keyword");
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
