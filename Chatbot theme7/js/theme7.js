var GallaryslideIndex, gallery_slides, gallery_dots;
var is_automatic_carousel_enabled = false;
//is_automatic_carousel_enabled = response.is_automatic_carousel_enabled
var is_automatic_carousel_enabled = false;

function remove_banner() {
    var elements = document.getElementsByClassName("galleryContainer");
    if (elements) {
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        is_welcome_banner_present = false;
    }
}

function scrollTopFunc() {
    $(".message-section-area").scrollTop($(".message-section-messages").height());

}

// function hideBotFunc() {
//     document.getElementById('main-container').style.opacity = "0";


// }

function callfunc() {
    //document.getElementById('main-container').style.opacity = "1";

    init_gallery();
    messageDivHeight();
    scrollTopFunc();


}

function messageDivHeight() {
    var mainDiv = document.getElementById('main-container').clientHeight;
    console.log(mainDiv);
    var botNavbar = document.getElementById('easychat-navbar').clientHeight;
    console.log(botNavbar);
    var botStickymenu = document.getElementById('easychat-sticky').clientHeight;
    console.log(botStickymenu);
    var botInputfield = document.getElementById('easychat-footer').clientHeight;
    console.log(botInputfield);
    var botBrandname = document.getElementById('brand-name-section').clientHeight;
    console.log(botBrandname);

    let messageDivHeight = (mainDiv - botNavbar - botStickymenu - botInputfield + botBrandname).toString() + "px";
    document.getElementById('easychat-chat-container').style.height = messageDivHeight;
    console.log(messageDivHeight);
}


function init_gallery() {


    GallaryslideIndex = 0;
    gallery_slides = document.getElementsByClassName("GallarySlidesimageHolder");
    gallery_slides[GallaryslideIndex].style.opacity = 1;
    for (i = 0; i < gallery_slides.length; i++) { gallery_slides[i].style.display = "none"; }
    gallery_slides[GallaryslideIndex].style.display = "block";

    //disable nextPrevBtn if slide count is one
    if (gallery_slides.length < 2) {
        var nextPrevBtns = document.querySelector(".leftArrow,.rightArrow");
        if (nextPrevBtns != undefined && nextPrevBtns != null) {
            nextPrevBtns.style.display = "none";
            for (i = 0; i < nextPrevBtns.length; i++) {
                nextPrevBtns[i].style.display = "none";
            }
        }
    }

    //add gallery_dots
    gallery_dots = [];
    try {
        var dotsContainer = document.getElementById("GallarydotsContainer"),
            i;

        for (i = 0; i < gallery_slides.length; i++) {
            var dot = document.createElement("span");
            dot.classList.add("gallary_dots");
            dotsContainer.append(dot);
            dot.setAttribute("onclick", "move_slide(" + i + ")");
            gallery_dots.push(dot);
        }
        gallery_dots[GallaryslideIndex].classList.add("active");
    } catch (e) {}

    if (gallery_slides.length > 1) {
        nextSlideIndex = 1;
        gallery_slides[nextSlideIndex].style.transform = 'translate(67%, 0) scale(0.6, 0.7)';
        gallery_slides[nextSlideIndex].style.display = 'block';
        gallery_slides[nextSlideIndex].style.opacity = '0.3';
    }
    if (gallery_slides.length > 2) {
        lastSlideIndex = gallery_slides.length - 1;
        gallery_slides[lastSlideIndex].style.transform = 'translate(-67%, 0) scale(0.6, 0.7)';
        gallery_slides[lastSlideIndex].style.display = 'block';
        gallery_slides[lastSlideIndex].style.opacity = '0.3';
    }
}

init_gallery();

function move_gallary_slides(n) {
    // if (is_automatic_carousel_enabled) {
    //     clearInterval(carousel_timer);


    // }

    // if (is_welcome_banner_present) {
    //      else {
    //         move_slide(GallaryslideIndex + n);
    //     }

    //     if (EASYCHAT_BOT_THEME == 'theme_5') {
    //     }
    move_slide2(GallaryslideIndex + n);


    // if (is_automatic_carousel_enabled) {
    //     carousel_timer = setInterval(function() {
    //         move_gallary_slides(1);
    //     }, carousel_time * 1000)
    // }
}
//}

function move_slide2(n) {
    var i;
    var current, next, nextnext, nextnextSlideIndex;

    var gallery_slides_length = gallery_slides.length;
    var move_slideAnimClass = {
        forCurrent: "",
        forNext: "",
        forNextNext: ""
    };

    var slideTextAnimClass;
    for (i = 0; i < gallery_slides_length; i++) {
        gallery_slides[i].style.display = "none";
    }
    if (n > GallaryslideIndex) {
        if (n >= gallery_slides_length) { n = 0; }
        move_slideAnimClass.forCurrent = "moveLeftCurrentSlide";
        move_slideAnimClass.forNext = "moveLeftNextSlide";
        move_slideAnimClass.forNextNext = "moveLeftNextNextSlide";
        slideTextAnimClass = "slideTextFromTop";

        nextnextSlideIndex = n + 1 < gallery_slides_length ? n + 1 : 0;

    } else if (n < GallaryslideIndex) {
        if (n < 0) { n = gallery_slides_length - 1; }
        move_slideAnimClass.forCurrent = "moveRightCurrentSlide";
        move_slideAnimClass.forNext = "moveRightPrevSlide";
        move_slideAnimClass.forNextNext = "moveRightPrevPrevSlide";
        slideTextAnimClass = "slideTextFromBottom";

        nextnextSlideIndex = n - 1 >= 0 ? n - 1 : gallery_slides_length - 1;
    }

    if (gallery_slides_length > 2) {
        gallery_slides[nextnextSlideIndex].style.display = "block";
    }

    gallery_slides[GallaryslideIndex].style.display = "block";

    gallery_slides[n].style.display = "block";

    if (n != GallaryslideIndex) {
        next = gallery_slides[n];
        current = gallery_slides[GallaryslideIndex];
        nextnext = gallery_slides[nextnextSlideIndex];
        for (i = 0; i < gallery_slides.length; i++) {
            gallery_slides[i].className = "GallarySlidesimageHolder";
            gallery_slides[i].style.opacity = 0;
            //gallery_dots[i].className = gallery_dots[i].className.replace(/\bactive\b/g, "");
            //document.getElementsByClassName("gallary_dots")[i].className = document.getElementsByClassName("gallary_dots")[i].className.replace(/\bactive\b/g, "");
        }
        current.className += " " + move_slideAnimClass.forCurrent;
        next.className += " " + move_slideAnimClass.forNext;
        nextnext.className += " " + move_slideAnimClass.forNextNext;
        // gallery_dots[n].className = "gallary_dots active"
        //document.getElementsByClassName("gallary_dots")[n].className = "gallary_dots active"
        GallaryslideIndex = n;
    }
}

function move_slide(n) {
    var i;
    var current, next;
    var move_slideAnimClass = {
        forCurrent: "",
        forNext: ""
    };

    var slideTextAnimClass;
    for (i = 0; i < gallery_slides.length; i++) {
        gallery_slides[i].style.display = "none";
    }
    if (n > GallaryslideIndex) {
        if (n >= gallery_slides.length) { n = 0; }
        move_slideAnimClass.forCurrent = "moveLeftCurrentSlide";
        move_slideAnimClass.forNext = "moveLeftNextSlide";
        slideTextAnimClass = "slideTextFromTop";
    } else if (n < GallaryslideIndex) {
        if (n < 0) { n = gallery_slides.length - 1; }
        move_slideAnimClass.forCurrent = "moveRightCurrentSlide";
        move_slideAnimClass.forNext = "moveRightPrevSlide";
        slideTextAnimClass = "slideTextFromBottom";
    }

    gallery_slides[n].style.display = "block";

    if (n != GallaryslideIndex) {
        next = gallery_slides[n];
        current = gallery_slides[GallaryslideIndex];
        for (i = 0; i < gallery_slides.length; i++) {
            gallery_slides[i].className = "GallarySlidesimageHolder";
            gallery_slides[i].style.opacity = 0;
            gallery_dots[i].className = gallery_dots[i].className.replace(/\bactive\b/g, "");
            document.getElementsByClassName("gallary_dots")[i].className = document.getElementsByClassName("gallary_dots")[i].className.replace(/\bactive\b/g, "");
        }
        current.classList.add(move_slideAnimClass.forCurrent);
        next.classList.add(move_slideAnimClass.forNext);
        gallery_dots[n].className = "gallary_dots active"
        document.getElementsByClassName("gallary_dots")[n].className = "gallary_dots active"
        GallaryslideIndex = n;
    }

}