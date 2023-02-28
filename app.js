
//Home
function btn_member(){
    alert("'Merci de vous connecter pour voir les videos")
}

const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
document.addEventListener('DOMContentLoaded', () => {

    nextButton.addEventListener("click", () => {
      const slideWidth = slide.clientWidth;
      slidesContainer.scrollLeft += slideWidth;
    });
    
    prevButton.addEventListener("click", () => {
      const slideWidth = slide.clientWidth;
      slidesContainer.scrollLeft -= slideWidth;
    });
})

//Log Out

function logout(){
   window.sessionStorage.clear();
   window.location.href='diffusion.html'

 
}

//page Log In
function annuler(){
    window.location.href='diffusion.html'
}

function oublier(){
    window.location.href='diffusion.html'
}

function pageModifier(){
    window.location.href="modifier_title.html"
}

function login(){

    const validate = () => {
        let result = true;
        
        console.log(username.value)

        if (username.value == '' || username.value == null) {
            result = false;
            alert('Saisir votre username svp....');
            

        }
        if (pass.value == '' || pass.value == null) {
            result = false;
            alert('Saisir votre mot de passe svp...');
        }
        return result;
    }

    if(validate()){
        fetch("db.json").then((res) => {
            return res.json();
        })
        .then((resp) => {

            console.log(resp)

            console.log(resp.users.filter(u=>u.login == username.value && u.password == pass.value))
           
            if(resp.users.filter(u=>u.login == username.value && u.password == pass.value).length > 0){

                    window.sessionStorage.setItem("accessToken", username.value)

                    alert("Bonjour, Heureux de vous revoir !!!")

                    window.location.href='diffusion.html'
                
                   const myTimeout= setTimeout(() => {
                    window.sessionStorage.removeItem("accessToken");
                    window.location.assign("diffusion.html")
                }, 300000);
                    window.sessionStorage.setItem('timerId', myTimeout);   

               }else{
                   alert('Le login ou le mot de passe est incorrect')   
               }
           }   
        )
        .catch((err)=> {
            alert('Erreur !!!')
        })
    }}




//page Pilote

let getVideo = document.getElementById("getVideo")

let vid = ""
   

fetch('./videos.json')

    .then((response) => response.json())
    .then((data) => {

        data.forEach(element => {

            vid += `<li class="title_record">${element.title}</li>                
                        <video class="v2" width="400" height="300" controls autoPlay={true} loop={true} >    
                            <source src="${element.src}" type="video/mp4" id="${element.id}"/>
                    </video>` 
     
        });

        if(sessionStorage.getItem('accessToken') != null){
            getVideo.innerHTML = vid
        }else{
            document.getElementById("slide-container-pilote").style.display = "none"
            document.getElementById("banner-pilote").innerHTML= "Merci de vous connecter pour consulter cette page";

        }
 
})



    function modifier(){

        fetch('./videos.json')

        .then((response) => response.json())
        .then((data) => {
            console.log(id_video.value)
            

        for (var i = 0; i< data.length; i ++){
            if(data[i].id === id_video.value ){
                data[i].title = nouveau_title.value;
                break;
            }
        }

        console.log(nouveau_title.value)
})
}


//sessionStorage

var s =  sessionStorage.getItem('accessToken')

if (s == null){
    
    document.getElementById("nav-pilote").style.display= "none";
    document.getElementById("nav-home").style.display = "none";
    document.getElementById("nav-logout").style.display = "none";

    document.getElementById("video_diff").style.display = "none";

//    
    
    
    
}else{
    document.getElementById("nav-login").style.display = "none";  
    document.getElementById("banner_diff").style.display = "none";   
    document.getElementById("btn_member").style.display = "none"; 
    
//   document.getElementById("logged").style.visibility= "hidden";
//    document.getElementById("form_login").style.display = "none"

    

}


