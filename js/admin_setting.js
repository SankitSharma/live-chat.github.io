function myFunctionArrow() {

    if (window.innerWidth < 768) {
        document.getElementById("live-chat-setting-content-p").style.display = "none";
        document.getElementById("live-chat-setting-menu").style.display = "block";
        document.getElementById("live-chat-setting-content-c").style.display = "none";
        document.getElementById("live-chat-setting-content-cr").style.display = "none";
        document.getElementById("live-chat-setting-content-gs").style.display = "none";

    }
}

function myFunctionAdminCategory() {




    if (window.innerWidth >= 768) {
        document.getElementById("live-chat-admin-setting-content-gs").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-cr").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-c").style.display = "block";
        document.getElementById("live-chat-admin-setting-content-bk").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-calendar").style.display = "none";
        document.getElementById("admin-category-blue-icon").style.display = "inline-block";
        document.getElementById("admin-category-gray-icon").style.display = "none";
        document.getElementById("admin-response-blue-icon").style.display = "none";
        document.getElementById("admin-response-gray-icon").style.display = "inline-block";
        document.getElementById("admin-calendar-blue-icon").style.display = "none";
        document.getElementById("admin-calendar-gray-icon").style.display = "inline-block";
        document.getElementById("admin-gsetting-grey-icon").style.display = "inline-block";
        document.getElementById("admin-gsetting-blue-icon").style.display = "none";
        document.getElementById("admin-blacklist-gray-icon").style.display = "inline-block";
        document.getElementById("admin-blacklist-blue-icon").style.display = "none";
        document.getElementById("admin-category-color-change").style.color = "#0254D7";
        document.getElementById("admin-response-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-calendar-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-g-setting-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-blacklist-color-change").style.color = "#4D4D4D";
    }
    if (window.innerWidth < 768) {
        document.getElementById("live-chat-admin-setting-content-gs").style.display = "block";
        document.getElementById("live-chat-admin-setting-content-cr").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-c").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-bk").style.display = "none";
        document.getElementById("live-chat-admin-setting-menu").style.display = "none";
    }

}

function myFunctionAdminBlacklistKeyword() {




    if (window.innerWidth >= 768) {
        document.getElementById("live-chat-admin-setting-content-gs").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-cr").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-c").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-calendar").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-bk").style.display = "block";
        document.getElementById("admin-category-blue-icon").style.display = "none";
        document.getElementById("admin-category-gray-icon").style.display = "inline-block";
        document.getElementById("admin-response-blue-icon").style.display = "none";
        document.getElementById("admin-response-gray-icon").style.display = "inline-block";
        document.getElementById("admin-calendar-blue-icon").style.display = "none";
        document.getElementById("admin-calendar-gray-icon").style.display = "inline-block";
        document.getElementById("admin-gsetting-grey-icon").style.display = "inline-block";
        document.getElementById("admin-gsetting-blue-icon").style.display = "none";
        document.getElementById("admin-blacklist-gray-icon").style.display = "none";
        document.getElementById("admin-blacklist-blue-icon").style.display = "inline-block";
        document.getElementById("admin-category-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-response-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-calendar-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-g-setting-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-blacklist-color-change").style.color = "#0254D7";
    }
    if (window.innerWidth < 768) {
        document.getElementById("live-chat-admin-setting-content-gs").style.display = "block";
        document.getElementById("live-chat-admin-setting-content-cr").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-c").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-bk").style.display = "none";
        document.getElementById("live-chat-admin-setting-menu").style.display = "none"
    }

}

function myFunctionAdminCalendar() {


    if (window.innerWidth >= 768) {
        document.getElementById("live-chat-admin-setting-content-calendar").style.display = "block";
        document.getElementById("live-chat-admin-setting-content-gs").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-cr").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-c").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-bk").style.display = "none";
        document.getElementById("admin-category-blue-icon").style.display = "none";
        document.getElementById("admin-category-gray-icon").style.display = "inline-block";
        document.getElementById("admin-response-blue-icon").style.display = "none";
        document.getElementById("admin-response-gray-icon").style.display = "inline-block";
        document.getElementById("admin-calendar-blue-icon").style.display = "inline-block";
        document.getElementById("admin-calendar-gray-icon").style.display = "none";
        document.getElementById("admin-gsetting-grey-icon").style.display = "inline-block";
        document.getElementById("admin-gsetting-blue-icon").style.display = "none";
        document.getElementById("admin-blacklist-gray-icon").style.display = "inline-block";
        document.getElementById("admin-blacklist-blue-icon").style.display = "none";
        document.getElementById("admin-category-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-response-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-calendar-color-change").style.color = "#0254D7";
        document.getElementById("admin-g-setting-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-blacklist-color-change").style.color = "#4D4D4D";
    }
    if (window.innerWidth < 768) {
        document.getElementById("live-chat-admin-setting-content-gs").style.display = "block";
        document.getElementById("live-chat-admin-setting-content-cr").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-c").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-bk").style.display = "none";
        document.getElementById("live-chat-admin-setting-menu").style.display = "none"
    }

}

function myFunctionAdminResponse() {
    if (window.innerWidth >= 768) {
        document.getElementById("live-chat-admin-setting-content-cr").style.display = "block";
        document.getElementById("live-chat-admin-setting-content-gs").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-c").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-bk").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-calendar").style.display = "none";
        document.getElementById("admin-category-blue-icon").style.display = "none";
        document.getElementById("admin-category-gray-icon").style.display = "inline-block";
        document.getElementById("admin-response-blue-icon").style.display = "inline-block";
        document.getElementById("admin-response-gray-icon").style.display = "none";
        document.getElementById("admin-calendar-blue-icon").style.display = "none";
        document.getElementById("admin-calendar-gray-icon").style.display = "inline-block";
        document.getElementById("admin-gsetting-grey-icon").style.display = "inline-block";
        document.getElementById("admin-gsetting-blue-icon").style.display = "none";
        document.getElementById("admin-blacklist-gray-icon").style.display = "inline-block";
        document.getElementById("admin-blacklist-blue-icon").style.display = "none";
        document.getElementById("admin-category-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-response-color-change").style.color = "#0254D7";
        document.getElementById("admin-calendar-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-g-setting-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-blacklist-color-change").style.color = "#4D4D4D";
    }
    if (window.innerWidth < 768) {
        document.getElementById("live-chat-admin-setting-content-gs").style.display = "block";
        document.getElementById("live-chat-admin-setting-content-cr").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-c").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-bk").style.display = "none";
        document.getElementById("live-chat-admin-setting-menu").style.display = "none"

    }

}

function myFunctionAdminGeneralSetting() {


    if (window.innerWidth >= 768) {
        document.getElementById("live-chat-admin-setting-content-gs").style.display = "block";
        document.getElementById("live-chat-admin-setting-content-cr").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-c").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-calendar").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-bk").style.display = "none";
        document.getElementById("admin-category-blue-icon").style.display = "none";
        document.getElementById("admin-category-gray-icon").style.display = "inline-block";
        document.getElementById("admin-response-blue-icon").style.display = "none";
        document.getElementById("admin-response-gray-icon").style.display = "inline-block";
        document.getElementById("admin-calendar-blue-icon").style.display = "none";
        document.getElementById("admin-calendar-gray-icon").style.display = "inline-block";
        document.getElementById("admin-gsetting-grey-icon").style.display = "none";
        document.getElementById("admin-gsetting-blue-icon").style.display = "inline-block";
        document.getElementById("admin-blacklist-gray-icon").style.display = "inline-block";
        document.getElementById("admin-blacklist-blue-icon").style.display = "none";
        document.getElementById("admin-category-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-response-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-calendar-color-change").style.color = "#4D4D4D";
        document.getElementById("admin-g-setting-color-change").style.color = "#0254D7";
        document.getElementById("admin-blacklist-color-change").style.color = "#4D4D4D";
    }
    if (window.innerWidth < 768) {
        // document.getElementById("live-chat-setting-content-p").style.display = "block";
        document.getElementById("live-chat-admin-setting-menu").style.display = "none"
        document.getElementById("live-chat-admin-setting-content-gs").style.display = "block";
        document.getElementById("live-chat-admin-setting-content-cr").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-c").style.display = "none";
        document.getElementById("live-chat-admin-setting-content-bk").style.display = "none";

    }

}












function deleteAdminCannedResponseFunction(element) {
    // var responsecheckBox = document.querySelector(".response-checkbox");
    var addResponse = document.getElementById("myBtnCanned");
    var deleteResponse = document.getElementById("deleteBtnCanned");
    if (element.checked == true) {

        deleteResponse.style.display = "inline-block";
        addResponse.style.display = "none";

    } else {
        deleteResponse.style.display = "none";
        addResponse.style.display = "inline-block";
    }

}

function deleteAdminCategoryFunction(element) {
    // var responsecheckBox = document.querySelector(".response-checkbox");
    var addResponse = document.getElementById("myBtnCategory");
    var deleteResponse = document.getElementById("deleteBtnCategory");
    if (element.checked == true) {

        deleteResponse.style.display = "inline-block";
        addResponse.style.display = "none";

    } else {
        deleteResponse.style.display = "none";
        addResponse.style.display = "inline-block";
    }

}

function deleteAdminKeywordFunction(element) {
    // var responsecheckBox = document.querySelector(".response-checkbox");
    var addResponse = document.getElementById("myBtnKeyword");
    var deleteResponse = document.getElementById("deleteBtnKeyword");
    if (element.checked == true) {

        deleteResponse.style.display = "inline-block";
        addResponse.style.display = "none";

    } else {
        deleteResponse.style.display = "none";
        addResponse.style.display = "inline-block";
    }

}

document.getElementById("indeterminate-checkbox-all").addEventListener("change", function() {
    if (document.getElementById("indeterminate-checkbox-all").checked) {
        is_checked = true;
    } else {
        is_checked = false;
    }

    for (idx = 0; idx < 7; idx++) {
        document.getElementById("indeterminate-checkbox-" + idx).checked = is_checked;
    }
});





///////repot page js



//manage user page js