function activeProfileHandler() {

    if (window.innerWidth < 768) {
        var activeElement = document.getElementById('live-chat-setting-menu');
        if (getComputedStyle(activeElement).display === 'block') {
            activeElement.style.display = 'none';
            document.getElementById('live-chat-setting-content').style.display = 'block';

        } else {
            activeElement.style.display = 'block';
            document.getElementById('live-chat-setting-content').style.display = 'none';


        }
    }
}




document.querySelectorAll('.live-chat-active-customer-setting').forEach(node => node.addEventListener('click', activeProfileHandler));
document.getElementById('live-chat-active-customers-opener-setting').addEventListener('click', activeProfileHandler);


window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {

        document.getElementById('live-chat-setting-menu').style.display = 'block';
        document.getElementById('live-chat-setting-content').style.display = 'block';

    } else {

        document.getElementById('live-chat-setting-menu').style.display = 'block';
        document.getElementById('live-chat-setting-content').style.display = 'none';

    }
});



$(document).ready(function() {


    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('.profile-pic').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    $(".file-upload").on('change', function() {
        readURL(this);
    });

    $(".upload-button").on('click', function() {
        $(".file-upload").click();
    });
});

var modal = document.getElementById("myModel");
var btn = document.getElementById("myBtn");
btn.onclick = function() {
    modal.style.display = "block";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}