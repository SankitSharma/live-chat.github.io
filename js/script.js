function activeCustomersHandler() {
    if (window.innerWidth < 768) {
        var currElement = document.getElementById('live-chat-active-customers-sidebar');
        if (getComputedStyle(currElement).display === 'block')
            currElement.style.display = 'none';
        else
            currElement.style.display = 'block';
    }
}

function customerDetailsHandler() {
    var currElement = document.getElementById('live-chat-customer-details-sidebar');
    if (getComputedStyle(currElement).display === 'block')
        currElement.style.display = 'none';
    else
        currElement.style.display = 'block';
}



document.querySelectorAll('.live-chat-active-customer').forEach(node => node.addEventListener('click', activeCustomersHandler));
document.getElementById('live-chat-active-customers-opener').addEventListener('click', activeCustomersHandler);

document.getElementById('live-chat-customer-details-closer').addEventListener('click', customerDetailsHandler);
document.getElementById('live-chat-customer-details-opener').addEventListener('click', customerDetailsHandler);










window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {

        document.getElementById('live-chat-active-customers-sidebar').style.display = 'block';
        document.getElementById('live-chat-customer-details-sidebar').style.display = 'block';
    } else {


        document.getElementById('live-chat-active-customers-sidebar').style.display = 'block';
        document.getElementById('live-chat-customer-details-sidebar').style.display = 'none';
    }
});

// Set scrollbar at the bottom of chat display area
let chat_display_area = document.getElementsByClassName("live-chat-message-wrapper")[0];
chat_display_area.scrollTop = chat_display_area.scrollHeight - chat_display_area.clientHeight;

// Increase height of message box
let min_width = window.matchMedia("(min-width: 992px)");

function autoresize() {
    let live_chat_text_area = document.getElementsByClassName("live-chat-text-area")[0];
    let live_chat_message_box_wrapper = document.getElementsByClassName("live-chat-text-box-wrapper")[0];
    if (min_width.matches) {
        if (live_chat_text_area.scrollHeight > 150) {
            live_chat_message_box_wrapper.style.height = 23 + "%";
            live_chat_text_area.style.height = 100 + "%";
            live_chat_text_area.style.overflowY = "scroll";
        } else if (live_chat_text_area.scrollHeight < 150) {
            live_chat_message_box_wrapper.style.height = 15 + "%";
            live_chat_text_area.style.height = 100 + "%";
            live_chat_text_area.style.overflowY = "hidden";
        }
    }
}

// Text formatting icons in message box
let max_width = window.matchMedia("(max-width: 768px)");

function display_text_format_icons() {
    if (max_width.matches) {
        document.getElementsByClassName("live-chat-text-format-icon-wrapper text-format")[0].style.display = "none";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper private-note")[0].style.display = "none";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper attachment")[0].style.display = "none";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper emoji")[0].style.display = "none";

        document.getElementsByClassName("live-chat-text-format-icon-wrapper close-text-format")[0].style.display = "block";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper bold")[0].style.display = "block";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper italics")[0].style.display = "block";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper strikethrough")[0].style.display = "block";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper code")[0].style.display = "block";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper ordered-list")[0].style.display = "block";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper unordered-list")[0].style.display = "block";
    }
}

function close_text_format_icons() {
    if (max_width.matches) {
        document.getElementsByClassName("live-chat-text-format-icon-wrapper text-format")[0].style.display = "block";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper private-note")[0].style.display = "block";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper attachment")[0].style.display = "block";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper emoji")[0].style.display = "block";

        document.getElementsByClassName("live-chat-text-format-icon-wrapper close-text-format")[0].style.display = "none";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper bold")[0].style.display = "none";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper italics")[0].style.display = "none";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper strikethrough")[0].style.display = "none";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper code")[0].style.display = "none";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper ordered-list")[0].style.display = "none";
        document.getElementsByClassName("live-chat-text-format-icon-wrapper unordered-list")[0].style.display = "none";
    }
}

var modal = document.getElementById("myModel");
var resolvemodal = document.getElementById("myResolveModel");
var btn = document.getElementById("myBtn");
var mybtn = document.getElementById("myModelBtn");
var btnmobile = document.getElementById("myBtnMobile");
var mybtnmobile = document.getElementById("myModelBtnMobile");
mybtn.onclick = function() {
    resolvemodal.style.display = "block";
}
btn.onclick = function() {
    modal.style.display = "block";
}
mybtnmobile.onclick = function() {
    resolvemodal.style.display = "block";
}
btnmobile.onclick = function() {
    modal.style.display = "block";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == resolvemodal) {
        resolvemodal.style.display = "none";

    }

}