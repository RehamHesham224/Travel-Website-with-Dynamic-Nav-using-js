const menu=document.getElementById("menu")
    ,sections=document.querySelectorAll("section");
//==========================Append Li To Menu Dynamic && smooth Scroll=======================
//Performance
const startingTime = performance.now();
//DocumentFragment!
const fragment = document.createDocumentFragment();                                                                         
(function buildMenu(parent , items){
    items.forEach(function(item) {
        //create li 
        const li=document.createElement("li");
        //create a
        const a=document.createElement("a");
        //add data Attribute to a
        a.setAttribute("data-scroll",`#${item.getAttribute('id')}`);
        // Add Text to A
        a.innerHTML=`${item.getAttribute("id")}`;
        //Append a to li
        li.appendChild(a);
        //click on a in li 
        a.addEventListener("click",function(){
            // Add Class Active  to section And Remove From Siblings 
            items.forEach(function(item) {
                item.classList.remove('active');
                item.getBoundingClientRect().y;
            });
            document.querySelector(this.getAttribute('data-scroll')).classList.add("active");
            //Scroll To Section
            // document.querySelector(a.getAttribute('data-scroll')).scrollIntoView({ block: 'center',  behavior: 'smooth' });
            window.scroll({
                top:document.querySelector(a.getAttribute('data-scroll')).offsetTop+1,
                behavior: 'smooth'
            });
            //Add Class Active to li  And Remove From Siblings
            const Menu=this.parentElement.parentElement;
            for(let i=0; i<Menu.childElementCount; i++){
                Menu.children[i].children[0].classList.remove('active');
            }
            this.classList.add('active');
        })
        //Append li to Fragment
        fragment.appendChild(li)
    });
    //append Fragment To Menu
    parent.appendChild(fragment);
    //Invoke Function
})(menu,sections);
const endingTime = performance.now();
console.log('This code took ' + (endingTime - startingTime) + ' milliseconds.');
//========================================================================================
//=============fixed nav ..scroll down=>hide , scroll up=>show with js====================
let prevScrollPos = window.pageYOffset;
window.onscroll = function() {
    //fixed nav
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
        menu.style.top = "0";
    } else {
        menu.style.top = "-80px";
    }
    prevScrollPos = currentScrollPos;

//==========================================================================================
//==========================Active Section==================================================

(function(items){
    items.forEach((item)=>{
        // document.body.scrollTop >item.getBoundingClientRect().y?item.classList.add('active'):item.classList.remove('active');
        //item id
        let Id=item.getAttribute("id");
        if(document.body.scrollTop >item.getBoundingClientRect().y ){
            //add active to item
            item.classList.add('active');
            //remove active from li
            document.querySelectorAll(" #menu li a").forEach(function(el){
                el.classList.remove("active");
            })
            //add active to li
            document.querySelector(' #menu li a[data-scroll ="#'+Id+'"]').classList.add('active');
        }else{
            //remove active from item
            item.classList.remove('active');
        }

    })
})(sections)
//==========================================================================================
//===============================scroll to top Btn==========================================
    showBtn();
}

let btn = document.getElementById("scrollToTop");

function showBtn() {
    if (document.body.scrollTop >=60 || document.documentElement.scrollTop >=60) {
        //show btn
        btn.style.display = "block";
    } else {
        //hide btn
        btn.style.display = "none";
    }
}
btn.addEventListener("click",scrollBtn);
function scrollBtn() {
    //scroll to top smoothly
    window.scrollTo({top: 0, behavior: 'smooth'});
}
//=======================================Out of Task========================================
//====================================testim || spinner=====================================
'use strict'
let	testim = document.getElementById("Testimonial"),
	testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
    touchStartPos,
    touchEndPos,
    touchPosDiff,
    ignoreTouch = 30;
;

window.addEventListener('DOMContentLoaded', (event) => {
    //=======hide spinner============
    setTimeout(() => {
        document.querySelector('.spinner').style.display="none";
    }, 2000);
    
    //=========== Testim Script===================
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");            
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;
    
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
                
            case 39:
                testimRightArrow.click();
                break;
            
            default:
                break;
        }
    })
		
		testim.addEventListener("touchstart", function(e) {
				touchStartPos = e.changedTouches[0].clientX;
		})
	
		testim.addEventListener("touchend", function(e) {
				touchEndPos = e.changedTouches[0].clientX;
				touchPosDiff = touchStartPos - touchEndPos;
				if (touchPosDiff > 0 + ignoreTouch) {
						testimLeftArrow.click();
				} else if (touchPosDiff < 0 - ignoreTouch) {
						testimRightArrow.click();
				} else {
					return;
				}
			
		})
})







