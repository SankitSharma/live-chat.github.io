var EASYCHAT_IMG_PATH = "/static/EasyChatApp/img/";
var EASYCHAT_INPUT_QUERY_DEFAULT_PLACEHOLDER = "How may I help you?";
var EASYCHAT_INPUT_QUERY_THEME_5_PLACEHOLDER = "Type your question here";
var CLEAR_API_URL = "/chat/clear-user-data/";
var EASYCHAT_FEEDBACK_SAVE_URL = "/chat/save-easychat-feedback-msg/";
var GET_LIVECHAT_CATEGORY = "/livechat/get-livechat-category/"
var EASYCHAT_QUERY_URL = "/chat/query/";
var RESPONSE_SENTENCE_SEPARATOR = "$$$";
var is_doubletick = false;
var suggestion_list = [];
var code_list = [];
var custom_quote_list_flag = "";
var BOT_MESSAGE_COLOR = '';
var USER_MESSAGE_COLOR = '';
var DEFAULT_ICON_COLOR = "";
var bot_id = null;
var bot_name = null;
var user_id = "";
var session_id = "";
var window_location = "";
var easychat_card_counter = 0;
var captcha_id = "";
var is_map_js_loaded = false;
var is_captcha = null;
var is_flow_ended = true;
var hide_mic = false;
var is_custom_complete = false;
var message = null;
var voices = null;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var recognition = null;
var marker = null;
var is_livechat = false;
var form_assist_enabled = false;
var GallaryslideIndex, gallery_slides, gallery_dots;
var attached_file_src = null;
var do_not_disturb = "";
var MAX_TEXT_RESPONSE_LENGTH = 200;
var embed_cookies = ""
var embed_meta_data = ""
var bot_inactivity_detection_enabled = false
var bot_inactivity_timer = null
var bot_inactivity_msg = ""
var bot_inactivity_time = null
var is_bot_inactivity_msg_present = false
var mask_next_input = false
var file_extension = null;
var is_save_attachment_required = null;
var query_token_id = null;
var session_continue = false;
var easychat_prev_session_id = ""

var is_go_back_enabled = false;
var widget_user_selected_list = null;
var is_sticky_message = false;
var is_conversaion_started = false;
var is_video_recorder_allowed = false;
var recorded_video_data_url = null;
var livechat_trigger_message = "";
var is_remove_widget = false;

var queue_timer = 0;
var livechat_queue_time = 0;
var bot_restarted = false

var EASYCHAT_BOT_THEME = "";
var entered_suggestion = false;
var file_type_ext = {
    "image(ex. .jpeg, .png, .jpg)": ".jpeg, .png, .gif, .jpg",
    "word processor(i.e. .doc,.pdf)": ".doc, .odt, .pdf, .rtf, .tex, .txt, .wks, .wkp",
    "compressed file(ex. .zip)": ".zip, .rar, .rpm, .z, .tar.gz, .pkg",
    "video file(ex. .mp4)": ".mp4",

}
var isFeedBackDone = get_cookie("isFeedBackDone") ? get_cookie("isFeedBackDone") : "0";
var is_bot_minimized = false;
var is_automatic_carousel_enabled = false;
var carousel_timer, carousel_time = 5;
var is_welcome_banner_present = true
var STATIC_MP3_PATH = '/static/EasyChatApp/mp3';
var user_message_index = 0;
var bot_message_index = 0

var bot_response_delay_allowed = false;
var bot_response_delay_timer = null;
var bot_response_delay_message = null;
var bot_message_delay_timer = null;
var is_bot_response_message_showed = false;
var is_livechat_msg = false;
var is_campaign_link = false;

var mic_access = true;
var is_bot_notification_sound_enabled = false;

var default_order_of_response = []
var form_fields_length = 0
var form_fields = []
var widget_form_name = ""
    //////////////////////////////////////////////////////////////// LiveChat

var need_to_add_wel_msg = true;
var chat_socket = null;
var check_agent_assign_timer = null;
var customer_info_needed = true;
var email = "not_available";
var phone = "not_available";
var username = "not_available";
var send_ping_to_socket_holder = null;
var livechat_category = "-1";
var livechat_category_enabled = false;
var livechat_notification = "Our chat representatives are unavailable right now. Please try again in some time.";
var livechat_session_id = ""
var easychat_user_id = "";
var is_text_to_speech_required = false;
var livechat_speech_response = "";
var active_url = "";
var is_chat_socket_open = false;
var element_response_previous_height = 0
var initial_intent_in_welcome_message = false
var web_landing_intent = false
var is_web_landing_allowed = "false"
var welcome_message_appended = false
var rate_value = ""
var livechat_nps_text = ""
var hide_bot_typing_loader_timeout = null

if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

// Create Element.remove() function if not exist
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

/////////////////////////////// Encryption And Decription //////////////////////////

function custom_encrypt(msgString, key) {
    // msgString is expected to be Utf8 encoded
    var iv = CryptoJS.lib.WordArray.random(16);
    var encrypted = CryptoJS.AES.encrypt(msgString, CryptoJS.enc.Utf8.parse(key), {
        iv: iv
    });
    var return_value = key;
    return_value += "." + encrypted.toString();
    return_value += "." + CryptoJS.enc.Base64.stringify(iv);

    return return_value;
}

function generate_random_string(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function encrypt_variable(data) {

    utf_data = CryptoJS.enc.Utf8.parse(data);
    encoded_data = utf_data;
    random_key = generate_random_string(16);
    encrypted_data = custom_encrypt(encoded_data, random_key);

    return encrypted_data;
}


function custom_decrypt(msg_string) {

    var payload = msg_string.split(".");
    var key = payload[0];
    var decrypted_data = payload[1];
    var decrypted = CryptoJS.AES.decrypt(decrypted_data, CryptoJS.enc.Utf8.parse(key), { iv: CryptoJS.enc.Base64.parse(payload[2]) });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

////////////////////////////////////////////////////////////////////////////////////


function clear_modal_fields() {
    try {
        document.getElementById("new-issue-name").value = "";
        document.getElementById("new-issue-phone").value = "";
        document.getElementById("new-issue-issue").value = "";
        document.getElementById("create-issue-error-message").innerHTML = "";

        document.getElementById("new-meeting-name").value = "";
        document.getElementById("new-meeting-phone").value = "";
        document.getElementById("new-meeting-date").value = "";
        document.getElementById("new-meeting-time").value = "";
        document.getElementById("new-meeting-pincode").value = "";
        document.getElementById("new-meeting-issue").value = "";
        document.getElementById("schedule-error-message").innerHTML = "";

        document.getElementById("check-ticket-id").value = "";
        document.getElementById("ticket-status-error-message").innerHTML = "";

        document.getElementById("check-meeting-id").value = "";
        document.getElementById("meeting-status-error-message").innerHTML = "";
    } catch (err) {}
    enable_user_input();
}


function show_scroll_image() {
    var scrollHeight = document.getElementById("easychat-chat-container").scrollHeight;
    var scrollTop = document.getElementById("easychat-chat-container").scrollTop;
    var clientHeight = document.getElementById("easychat-chat-container").clientHeight;

    if (scrollHeight - (scrollTop + clientHeight) > 100) {
        document.getElementById("img-scroll-to-bottom").style.display = "block";
    } else {
        document.getElementById("img-scroll-to-bottom").style.display = "none";
    }
}

function get_url_vars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function set_cookie(cookiename, cookievalue) {
    document.cookie = cookiename + "=" + cookievalue;
}

function get_csrf_token() {
    var CSRF_TOKEN = $('input[name="csrfmiddlewaretoken"]').val();
    return CSRF_TOKEN;
}


function get_cookie(cookiename) {
    var cookie_name = cookiename + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookie_array = decodedCookie.split(';');
    for (var i = 0; i < cookie_array.length; i++) {
        var c = cookie_array[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cookie_name) == 0) {
            return c.substring(cookie_name.length, c.length);
        }
    }
    return "";
}

function page_embed_in_iframe() {
    try {
        if (parent.location === self.location) {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        return true;
    }
}

// send_form_assist_recommendation() if "do not distrub" is true
function send_form_assist_recommendation(bot_id, bot_name, form_assist_id) {
    append_bot_text_response("It looks like you are stuck here. Do you need any assistance");
    recommendations_list = ["Need Form Assistance", "Chat with the Bot"]
    append_bot_recommendation(recommendations_list)
}

//show_form_assist_result()
function show_form_assist_result() {
    url_parameters = get_url_vars();
    bot_id = url_parameters["id"];
    bot_name = url_parameters["name"];
    form_assist_id = url_parameters["form_assist_id"];
    session_id = get_cookie("easychat_session_id");
    //set_cookie("isFeedbackDone", "0");

    parent.postMessage({ event_id: 'isFeedBackDone', data: "0" }, "*")
    window_location = url_parameters["easychat_window_location"]
    if (window_location == undefined) {
        window_location = 'localhost'
    }

    setTimeout(function(e) {
        if (form_assist_id != null && form_assist_id != undefined && form_assist_id != "") {
            form_assist_enabled = true;
            form_assist_id = decodeURI(form_assist_id);
            var server_text = send_message_to_server(form_assist_id, user_id, bot_id, bot_name, "None");
            scroll_to_bottom();
        } else {
            append_welcome_message(bot_id, bot_name);
            get_suggestion_list(bot_id, bot_name);
        }
    }, 1000);
}

// function start_chatbot(){


window.onmessage = function(e) {
    if (e.data.event_id == "isFeedBackDone") {
        isFeedBackDone = e.data.data
        if (!page_embed_in_iframe()) {
            set_cookie("isFeedBackDone", isFeedBackDone);
        }
    }
    if (e.data.event_id == "chatbot_minimized_state") {
        is_bot_minimized = e.data.data
    }
    if (e.data.event_id == "is_chatbot_opened") {
        document.getElementById('tooltiptext-minimize').style.display = "block";
    }

    if (e.data.event_id == "livechat_cookie_session_user_id") {
        if (page_embed_in_iframe()) {
            livechat_session_id = e.data.livechat_cookie_session_id
        }
    }

    if (e.data.event_id == "chatbot_opened") {
        console.log('called');
        document.getElementById('tooltiptext-minimize').style.display = 'block';
    }


    resize_chabot_window();
};


window.onload = function(e) {

    query_token_id = $('input[name="csrfquerytoken"]').val();
    changeMiddleContainer();
    url_parameters = get_url_vars();

    // to differentiate between refresh
    // and tab close
    var refresh_was_called = false;
    setTimeout(function() {
        if (livechat_session_id != "") {
            try {
                if (window.localStorage) {
                    var time_when_last_refresh_or_closing_of_tab_was_called = Number(window.localStorage['myUnloadEventFlag']);
                    if (isNaN(time_when_last_refresh_or_closing_of_tab_was_called)) {
                        time_when_last_refresh_or_closing_of_tab_was_called = 0
                    };
                    var current_time = new Date().getTime();
                    var duration = current_time - time_when_last_refresh_or_closing_of_tab_was_called;
                    // less than 10 seconds since the previous Unload event
                    if (duration < 10 * 1000) {
                        refresh_was_called = true;
                    } else {
                        refresh_was_called = false
                    }
                }
            } catch (err) {
                console.log(err)
            }

            if (refresh_was_called == true) {

                livechat_previous_message_history(livechat_session_id)
                show_end_chat_button()
                resize_chabot_window();
            } else {

                unset_livechat_cookies();
            }
        }
    }, 1100);
    bot_id = url_parameters["id"];
    bot_name = url_parameters["name"];
    form_assist_id = url_parameters["form_assist_id"];
    do_not_disturb = url_parameters["do_not_disturb"];
    is_lead_generation = url_parameters["is_lead_generation"];
    embed_cookies = ""
    embed_meta_data = url_parameters["meta_data"]
    session_id = get_cookie("easychat_session_id");
    // window_location = window.top.location.href;
    window_location = url_parameters["easychat_window_location"]

    is_web_landing_allowed = url_parameters["is_web_landing_allowed"]
    easychat_intent_name = url_parameters["easychat_intent_name"]

    campaign_link_query_id = url_parameters["campaign_link_query_id"]
    if (campaign_link_query_id != 'INTENT_ID' && campaign_link_query_id != undefined && campaign_link_query_id != null && campaign_link_query_id != "") {
        is_campaign_link = true;
        send_message_to_server(campaign_link_query_id, user_id, bot_id, bot_name, "None");
    } else {
        is_campaign_link = false
    }

    if (window_location == undefined) {
        window_location = 'localhost'
    }

    if (embed_cookies != "" && embed_cookies != null && embed_cookies != undefined) {
        embed_cookies_decrypted = custom_decrypt(embed_cookies)
        embed_cookies_decrypted = JSON.parse(embed_cookies_decrypted)
        if ("easychat_userid" in embed_cookies_decrypted) {
            if (embed_cookies_decrypted["easychat_userid"] != "") {
                user_id = embed_cookies_decrypted["easychat_userid"]
            }
        }
        if ("easychat_prev_session_id" in embed_cookies_decrypted) {

            easychat_prev_session_id = embed_cookies_decrypted["easychat_prev_session_id"]
        }
    }
    parent.postMessage({
        event_id: 'set_cookie',
        data: {
            cookie_value: session_id,
            cookie_name: "easychat_prev_session_id",
            expiration: "",
            path: "/"
        }
    }, "*")

    if (is_web_landing_allowed == 'true') {
        easychat_intent_name = easychat_intent_name.replace(/%20|_/g, ' ');
        web_landing_intent = true
        send_message_to_server(easychat_intent_name, user_id, bot_id, bot_name, "None");

    }
    if (is_lead_generation == "true") {
        // modal_lead_generation.style.display="block";
        append_welcome_message(bot_id, bot_name);
        setTimeout(function() {
            var server_text = send_message_to_server("Learn more about us", user_id, bot_id, bot_name, "None");
        }, 2000);
    } else if (is_lead_generation != 'true') {
        if (form_assist_id != null && form_assist_id != undefined && form_assist_id != "" && do_not_disturb != "true") {
            form_assist_enabled = true;
            form_assist_id = decodeURI(form_assist_id);
            var server_text = send_message_to_server(form_assist_id, user_id, bot_id, bot_name, "None");
            scroll_to_bottom();
        } else {
            append_welcome_message(bot_id, bot_name);
        }

        setTimeout(function(e) {
            if (suggestion_list.length == 0) {
                get_suggestion_list(bot_id, bot_name);
            }
        }, 2000);
    }

    if (get_url_vars()["easychat_window_location"] == undefined) {
        // $("#easychat-navbar-wrapper").find("i").css("visibility", "hidden");
        $("#easychat-navbar-wrapper").find("i:eq(0)").css("visibility", "hidden");
        $("#user_input").parent().css("width", "90%");
    }
    detectmob();
    resize_chabot_window();
}

function close_feedback_modal() {
    document.getElementById("feedback_modal").style.display = "none";
}

function restart_chatbot(el) {
    el.style.pointerEvents = 'none';
    el.style.color = BOT_THEME_COLOR;
    clear_userData();
    bot_restarted = true
    var myNode = document.querySelectorAll("#easychat-chat-container div");
    for (i = 0; i < myNode.length; i++) {
        myNode[i].remove();
    }
    url_parameters = get_url_vars();
    bot_id = url_parameters["id"];
    bot_name = url_parameters["name"];
    session_id = get_cookie("easychat_session_id");
    parent.postMessage({
        event_id: 'set_cookie',
        data: {
            cookie_value: "",
            cookie_name: "easychat_prev_session_id",
            expiration: "",
            path: "/"
        }
    }, "*")
    easychat_session_id = ""
    easychat_prev_session_id = ""
        // window_location = window.location.href;
    window_location = url_parameters["easychat_window_location"]
    if (window_location == undefined) {
        window_location = 'localhost'
    }
    document.getElementById("user_input").value = "";

    if (EASYCHAT_BOT_THEME == "theme_5") {
        document.getElementById("easychat-chat-container").innerHTML += '<div id="sound"></div>';
    }
    if (is_web_landing_allowed == 'true') {
        easychat_intent_name = easychat_intent_name.replace(/%20|_/g, ' ');
        web_landing_intent = true
        send_message_to_server(easychat_intent_name, user_id, bot_id, bot_name, "None");
    }
    append_welcome_message(bot_id, bot_name);
    get_suggestion_list(bot_id, bot_name);
    setTimeout(function() {
        el.style.pointerEvents = 'auto';
        el.style.color = "#808080";
    }, 1000);
}

function minimize_chatbot() {
    document.getElementById('tooltiptext-minimize').style.display = 'none';
    cancel_text_to_speech();
    document.getElementById('tooltiptext-minimize').style.display = "none";
    parent.postMessage('minimize-chatbot', '*');
}

function unset_livechat_cookies() {

    if (livechat_session_id != "") {

        parent.postMessage({
            event_id: 'unset_livechat_cookies',
            data: {
                "livechat_cookie_session_id": livechat_session_id,
            }
        }, "*")
        livechat_session_id = ""
        hide_end_chat_button();
    }
}

function close_chatbot(is_nps_required) {
    try {
        document.getElementById('tooltiptext-close').style.display = "none";
        modal_create_issue.style.display = "none";
        modal_check_ticket_status.style.display = "none";
        modal_check_meeting_status.style.display = "none";
        modal_schedule_meeting.style.display = "none";
    } catch (err) {
        console.log(err)
    }
    cancel_text_to_speech();

    if (is_nps_required == "True" && user_id != "" && isFeedBackDone == "0" && is_conversaion_started) {
        document.getElementById("feedback_modal").style.display = "block";
        if (detectIEEdge()) {
            document.getElementById("easychat-rating-circular-bar__xyzw").style.display = "none";
        } else {
            document.getElementById("rating-bar-container__XqPZ").style.display = "none";
        }
    } else {
        clear_userData();
        save_time_spent();
        parent.postMessage({
            event_id: 'set_cookie',
            data: {
                cookie_value: "",
                cookie_name: "easychat_prev_session_id",
                expiration: "",
                path: "/"
            }
        }, "*")

        if (is_livechat == true) {
            unset_livechat_cookies()
            chat_socket.close();
        }

        parent.postMessage('close-bot', '*');
    }
}

function save_time_spent() {
    var json_string = JSON.stringify({
        session_id: session_id,
        user_id: user_id,
    });

    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);
    var params = 'json_string=' + json_string;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/chat/save-time-spent/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Session Time saved!!!");

            if (!page_embed_in_iframe()) {
                window.close();
            }
        }
    }
    xhttp.send(params);
}

// ##############   FeedBack #######################


function change_content(el) {
    var contentvalue = parseInt(el.getAttribute("value"))

    if (EASYCHAT_BOT_THEME == "theme_5") {
        if (contentvalue <= 6)
            document.getElementById("easychat-rating-circular-bar-content-img").setAttribute("src", EASYCHAT_IMG_PATH + "rating-zero-six.svg")
        else if (contentvalue <= 8)
            document.getElementById("easychat-rating-circular-bar-content-img").setAttribute("src", EASYCHAT_IMG_PATH + "rating-seven-eight.svg")
        else if (contentvalue <= 10) {
            document.getElementById("easychat-rating-circular-bar-content-img").setAttribute("src", EASYCHAT_IMG_PATH + "rating-nine-ten.svg")
        }
    } else {
        if (contentvalue <= 2)
            document.getElementById("easychat-rating-circular-bar-content-img").setAttribute("src", EASYCHAT_IMG_PATH + "Very_Sad_Face_Emoji_Icon_ios10_large.webp")
        else if (contentvalue > 2 && contentvalue <= 5)
            document.getElementById("easychat-rating-circular-bar-content-img").setAttribute("src", EASYCHAT_IMG_PATH + "face-with-one-eyebrow-raised_1f928.png")
        else if (contentvalue > 5 && contentvalue <= 8) {
            document.getElementById("easychat-rating-circular-bar-content-img").setAttribute("src", EASYCHAT_IMG_PATH + "no_reaction.png")
        } else if (contentvalue >= 9) {
            document.getElementById("easychat-rating-circular-bar-content-img").setAttribute("src", EASYCHAT_IMG_PATH + "Smiling_Face_Emoji_large.webp")
        }
    }
}

var contentvalue = 0;

function feedback_modal(el) {
    var temp_value = document.getElementsByClassName("circle-value")
    document.getElementById("easychat-exit-app-feedback").style.display = "none";
    for (var i = 0; i < temp_value.length; i++) {
        temp_value[i].style.strokeWidth = "1.5em"
    }
    el.style.strokeWidth = "2em"
    contentvalue = parseInt(el.getAttribute("value"))
    if (contentvalue < 10) { document.getElementById("value-0" + el.getAttribute("value")).style.strokeWidth = "2em" } else { document.getElementById("value-" + el.getAttribute("value")).style.strokeWidth = "2em" }
    document.getElementById("chatbot_feedback_comment_box").style.display = "block";
}

function no_feedback_given(e) {
    document.getElementById("feedback_modal").style.display = "none";
    clear_userData();
    parent.postMessage({
        event_id: 'set_cookie',
        data: {
            cookie_value: "",
            cookie_name: "easychat_prev_session_id",
            expiration: "",
            path: "/"
        }
    }, "*")
    parent.postMessage('close-bot', '*');
}

function submit_feedback() {
    text_value = document.getElementById("chatbot-comment-box").value;
    document.getElementById("feedback_modal").style.display = "none";
    save_feedback(contentvalue, text_value)
}

function save_feedback(contentvalue, text_value) {
    var json_string = JSON.stringify({
        session_id: session_id,
        user_id: user_id,
        bot_id: bot_id,
        rating: contentvalue,
        comments: text_value
    });
    // set_cookie("isFeedbackDone", "1")
    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", "/chat/save-feedback/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Feedback saved!!!");
            parent.postMessage({
                event_id: 'isFeedBackDone',
                data: "1"
            }, "*")

            setTimeout(function() {
                close_chatbot('False');
            }, 1000);
        }
    }
    xhttp.onerror = function() {
        close_chatbot('False');
    }
    xhttp.send(params);
}

// ######################################################

function disable_user_input() {
    if (window.outerWidth < 450) {
        // keyboard opens and closes on input
        // checks mobile and accordingly disables user input 
        var field = document.getElementById("user_input");
        field.focus();
        document.getElementById("user_input").readonly = true;
        scroll_to_bottom();
    } else {
        document.getElementById("user_input").disabled = true;
    }

}

function enable_user_input() {
    if (window.outerWidth < 450) {
        scroll_to_bottom();
        try {
            document.getElementById("user_input").readonly = false;
        } catch (err) {}
    } else {
        document.getElementById("user_input").disabled = false;
    }
}

function focus_user_input() {
    var field = document.getElementById("user_input");
    field.focus();
}

function blur_user_input() {
    document.getElementById("user_input").blur();
}

function hide_mic_icon() {
    if (EASYCHAT_BOT_THEME != 'theme_5' || !mic_access) {
        try {
            document.getElementById("easychat-mic-div").style.display = "none";
        } catch (err) {}

        try {
            document.getElementById("easychat-mic-div-not-allowed").style.display = "flex";
        } catch (err) {}
    }
}

function show_mic() {
    if (EASYCHAT_BOT_THEME != 'theme_5' || mic_access) {
        document.getElementById("easychat-mic-div").style.display = "flex";

        try {
            document.getElementById("easychat-mic-div-not-allowed").style.display = "none";
        } catch (err) {}
    }
}

function activate_mic() {
    if (EASYCHAT_BOT_THEME == "theme_5") {
        document.getElementById('easychat-mic-div').style.display = 'flex';
        document.getElementById('easychat-mic-div-not-allowed').style.display = 'none';
        document.getElementById("img-mic-up").style.fill = BOT_THEME_COLOR;
        document.getElementById("img-mic-down").style.fill = BOT_THEME_COLOR;
    } else {
        document.getElementById("img-mic").style.color = BOT_THEME_COLOR;
    }
    document.getElementById("user_input").placeholder = "Speak now";
    document.getElementById("easychat-query-submit-div").style.display = "none";
    document.getElementById("easychat-mic-disable").style.display = "inline-block";
    document.getElementById("easychat-mic-disable").style.marginLeft = "20px";
    disable_user_input();
    if (recognition != null) {
        recognition.start();
    } else {
        mic_access = false;
        hide_mic_icon();
    }
}

function deactivate_mic() {
    if (EASYCHAT_BOT_THEME == "theme_5") {
        try {
            document.getElementById("img-mic-up").style.fill = DEFAULT_ICON_COLOR;
            document.getElementById("img-mic-down").style.fill = DEFAULT_ICON_COLOR;
        } catch (err) {}
        document.getElementById("user_input").placeholder = EASYCHAT_INPUT_QUERY_THEME_5_PLACEHOLDER;
    } else {
        try {
            document.getElementById("img-mic").style.color = DEFAULT_ICON_COLOR;
            document.getElementById("user_input").placeholder = EASYCHAT_INPUT_QUERY_DEFAULT_PLACEHOLDER;
        } catch (err) {}
    }
    document.getElementById("easychat-query-submit-div").style.display = "flex";
    document.getElementById("easychat-mic-disable").style.display = "none";
    enable_user_input();
    if (recognition != null) {
        recognition.abort();
        document.getElementById('user_input').value = "";
    } else {
        mic_access = false;
        hide_mic_icon();
    }
}

function check_mic_access() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = function() {
        recognizing = true;
    };

    recognition.onerror = function(event) {
        if (event.error == 'no-speech') {
            ignore_onend = true;
            alert('error');
        }
        if (event.error == 'audio-capture') {
            ignore_onend = true;
            alert('error2');
        }
        if (event.error == 'not-allowed') {
            ignore_onend = true;
            recognition = null;
            deactivate_mic();
            alert("Please allow microphone access for this webpage to use voicebot feature");
        }
    };

    recognition.onend = function() {
        recognizing = false;
        if (ignore_onend) {
            return;
        }
        if (!final_transcript) {
            return;
        }
    };

    recognition.onresult = function(event) {
        document.getElementById('user_input').value = event.results[0][0].transcript;
        if (event.results[0].isFinal) {
            user_input = document.getElementById('user_input').value;
            if (user_input.trim() != '' && user_input.length < 300) {
                send_user_input(user_input);
            }
            recognition.stop();
            document.getElementById("user_input").value = "";
        }
    };

    if (recognition != null) {
        activate_mic();
    } else {
        mic_access = false;
        hide_mic_icon();
    }
}

function activate_query_submit_button() {
    var elem = document.getElementById("img-submit-query");
    if (EASYCHAT_BOT_THEME == "theme_5") {
        elem.style.opacity = '1';
    } else {
        elem.style.color = BOT_THEME_COLOR;
    }
}

function deactivate_query_submit_button() {
    var elem = document.getElementById("img-submit-query");
    if (EASYCHAT_BOT_THEME == "theme_5") {
        elem.style.opacity = '0.5';
    } else {
        elem.style.color = DEFAULT_ICON_COLOR;
    }
}

function scroll_to_bottom() {
    var objDiv = document.getElementById("easychat-chat-container");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function return_time() {
    var d = new Date();
    var hours = d.getHours().toString();
    var minutes = d.getMinutes().toString();
    var flagg = "AM";
    if (parseInt(hours) == 12) {
        hours = 12;
        flagg = "PM";
    }
    if (parseInt(hours) > 12) {
        hours = hours - 12;
        flagg = "PM";
    }
    if (hours.length == 1) {
        hours = "0" + hours;
    }
    if (minutes.length == 1) {
        minutes = "0" + minutes;
    }

    var time = hours + ":" + minutes + " " + flagg;
    return time;
}

function viewMore(element) {
    element.parentNode.previousElementSibling.classList.add("easychat-expand-text");
    element.setAttribute("onclick", "showLess(this)")

    if (EASYCHAT_BOT_THEME == "theme_5") {
        element.innerHTML = 'Read Less</div>'
    } else {
        element.innerHTML = 'Show Less<i class="fa fa-chevron-up" style="color:' + BOT_THEME_COLOR + ';margin-left:5px"></i></div>'
    }
}

function showLess(element) {
    element.parentNode.previousElementSibling.classList.remove("easychat-expand-text");
    element.setAttribute("onclick", "viewMore(this)")
    if (EASYCHAT_BOT_THEME == "theme_5") {
        element.innerHTML = 'Read More</div>'
    } else {
        element.innerHTML = 'View More<i class="fa fa-chevron-down" style="color:' + BOT_THEME_COLOR + ';margin-left:5px"></i></div>'
    }
}


function scroll_to_element() {
    objDiv = document.getElementById("easychat-chat-container")
    objDiv.scrollTop = objDiv.scrollTop + 10
}

function easychat_linkify(inputText) {
    //inputText.replace(/&nbsp;/g, '');
    var replacedText, replacePattern1, replacePattern2, replacePattern3, replacePattern4;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=_|!:,.;]*[-A-Z0-9+&@#\/%=_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    // Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    replacePattern4 = /([6-9][0-9]{9})/g;
    replacedText = replacedText.replace(replacePattern4, function(number) {
        return '<a href="tel:' + number + '">' + number + '</a>';
    });

    return replacedText;
}

function append_bot_text_response(text_response) {
    text_response = easychat_linkify(text_response);
    if (welcome_message_appended == true) {
        if (EASYCHAT_BOT_THEME == 'theme_5') {
            sleep(1000);
        }
    }

    window.clearTimeout(bot_inactivity_timer);
    is_bot_inactivity_msg_present = false
    is_bot_response_message_showed = true
    var time = return_time();
    hide_bot_typing_loader();

    var time = new Date()
    time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    if (EASYCHAT_BOT_THEME == "theme_4") {
        if (text_response.match("http://") != null || text_response.match("https://") != null) {
            var html = '<div class="easychat-bot-message-div" ><div class="easychat-bot-message easychat-bot-message-line" style="color: ' + BOT_MESSAGE_COLOR + '; word-break: break-word;box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2) !important;" ><div class="easychat-show-less-text">' + text_response + '</div>'
        } else {
            var html = '<div class="easychat-bot-message-div" ><div class="easychat-bot-message easychat-bot-message-line" style="color: ' + BOT_MESSAGE_COLOR + '; word-break: break-word;box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2) !important;" ><div class="easychat-show-less-text">' + text_response + '</div>'
        }
        html += '<div class=view_more_wrapper style="margin-right:5px;display:none "><div style="float:right;cursor: pointer;" onclick="viewMore(this)">View More<i class="fa fa-chevron-down" style="color:' + BOT_THEME_COLOR + ';margin-left:5px"></i></div></div>';

        if (is_livechat) {
            html += '<span class="message-time-bot" style="display:inline-block !important;">' + '</span></div></div>'
        } else {
            html += '<span class="message-time-bot">' + '</span></div></div>'
        }
        html += '<div style="margin-left: 45px;color: #757575;font-size: 10px">' + time + '</div> '
    } else if (EASYCHAT_BOT_THEME == "theme_5") {
        if (text_response.match("http://") != null || text_response.match("https://") != null) {
            var html = '<div class="easychat-bot-message-div" ><div id="easychat-bot-message-' + bot_message_index + '" class="easychat-message-animation easychat-bot-message easychat-bot-message-line" style="color:' + BOT_MESSAGE_COLOR + '; word-break: break-word;" ><div class="easychat-show-less-text">' + text_response + '</div>'
        } else {
            var html = '<div class="easychat-bot-message-div" ><div id="easychat-bot-message-' + bot_message_index + '" class="easychat-message-animation easychat-bot-message easychat-bot-message-line" style="color:' + BOT_MESSAGE_COLOR + '; word-break: break-word;" ><div class="easychat-show-less-text">' + text_response + '</div>'
        }

        html += '<div class=view_more_wrapper style="margin-right:5px;display:none "><div style="float:right;cursor: pointer; color:' + BOT_THEME_COLOR + '; padding-bottom:10px; margin-right: 23px;" onclick="viewMore(this)">Read More</div></div>';

        if (is_livechat) {
            html += '<span class="message-time-bot" style="display:inline-block !important;">' + time + '</span></div></div>'
        }

        bot_message_index += 1;

        setTimeout(function() {
            const elem = document.getElementById('easychat-bot-message-' + (bot_message_index - 1));
            $(elem).removeClass('easychat-message-animation')
        }, 300)
    } else {
        if (text_response.match("http://") != null || text_response.match("https://") != null) {
            var html = '<div class="easychat-bot-message-div" ><div class="easychat-bot-message easychat-bot-message-line" style="color:' + BOT_MESSAGE_COLOR + '; word-break: break-word;" ><div class="easychat-show-less-text">' + text_response + '</div>'
        } else {
            var html = '<div class="easychat-bot-message-div" ><div class="easychat-bot-message easychat-bot-message-line" style="color:' + BOT_MESSAGE_COLOR + '; word-break: break-word;" ><div class="easychat-show-less-text">' + text_response + '</div>'
        }
        html += '<div class="view_more_wrapper" style="margin-right:5px;display:none "><div style="float:right;cursor: pointer;" onclick="viewMore(this)">View More<i class="fa fa-chevron-down" style="color:' + BOT_THEME_COLOR + ';margin-left:5px"></i></div></div>';

        if (is_livechat) {
            html += '<span class="message-time-bot" style="display:inline-block !important;">' + time + '</span></div></div>'
        } else {
            html += '<span class="message-time-bot">' + time + '</span></div></div>'
        }
    }
    document.getElementById("easychat-chat-container").innerHTML += html;

    // checks the total height of every bot response
    // adds it
    // then checks whether it's greater than container height
    // then scrolls to bottom

    element_response = document.querySelectorAll(".easychat-bot-message-div")
    element_response_previous_height += element_response[element_response.length - 1].clientHeight

    resize_chabot_window();
    setTimeout(function(e) { reset_size_of_text_field(); }, 100);
    if (bot_inactivity_detection_enabled) {
        reset_bot_inactivity_timer()
    }
    if (bot_response_delay_allowed && is_livechat_msg == false) {
        reset_bot_response_delay_timer();
    }
}

function reset_size_of_text_field() {
    var el = document.getElementsByClassName('easychat-show-less-text')[document.getElementsByClassName('easychat-show-less-text').length - 1]
        //viewmore_height = document.getElementsByClassName('easychat-show-less-text')[document.getElementsByClassName('easychat-show-less-text').length - 1].scrollHeight;
    var el_style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
    var viewmore_height = parseInt(el_style.height)

    if (EASYCHAT_BOT_THEME == 'theme_5') {
        if (viewmore_height >= 290) {
            document.getElementsByClassName('view_more_wrapper')[document.getElementsByClassName('view_more_wrapper').length - 1].style.display = 'block';
        }
    } else {
        if (viewmore_height > 295) {
            el.style.maxHeight = '295px';
            document.getElementsByClassName('view_more_wrapper')[document.getElementsByClassName('view_more_wrapper').length - 1].style.display = 'block';
        }
    }
}

function append_system_text_response(text_response) {
    window.clearTimeout(bot_inactivity_timer);
    is_bot_inactivity_msg_present = false

    var time = return_time();
    var html = '<div class="easychat-system-message-div" ><div class="easychat-system-message easychat-system-message-line" >' + text_response
        //html += '<span class="message-time-bot" style="display:inline-block !important;">' + time + '</span></div></div>'
    document.getElementById("easychat-chat-container").innerHTML += html
    if (bot_inactivity_detection_enabled) {
        reset_bot_inactivity_timer()
    }
    enable_user_input()
}

// ******************* File attachment Livechat ***************************

function append_file_to_customer(url, message) {

    var time = return_time();
    if (message != "") {
        if (is_image(url) || is_video(url)) {

            document.getElementById("easychat-chat-container").innerHTML += '<div style="width:98%;display:inline-block;"><div class="easychat-livechat-customer-attachment">' + get_file_path_html(url) + '<div class="easychat-livechat-message">' + message + '<span style="font-size: 11px;text-align: right;width: 100%;color: #757575;float: right;">' + time + '</span></div></div></div>'
        } else {

            document.getElementById("easychat-chat-container").innerHTML += '<div style="margin:5px 0px 5px 0px;width:98%;display:inline-block;"><div class="easychat-livechat-user-doc-attachment"><div class="easychat-livechat-doc-attachment-content">' + get_doc_path_html(url) + '</div><div class="easychat-livechat-message">' + message + '<span style="font-size: 11px;text-align: right;width: 100%;color: #757575;float: right;">' + time + '</span></div></div></div>'
        }
    } else {

        if (is_image(url) || is_video(url)) {

            document.getElementById("easychat-chat-container").innerHTML += '<div style="width:98%;display:inline-block;"><div class="easychat-livechat-customer-attachment">' + get_file_path_html(url) + '<span style="font-size: 11px;text-align: right;width: 100%;color: #757575;float: right;">' + time + '</span></div></div>'
        } else {

            document.getElementById("easychat-chat-container").innerHTML += '<div style="margin:5px 0px 5px 0px;width:98%;display:inline-block;"><div class="easychat-livechat-user-doc-attachment"><div class="easychat-livechat-doc-attachment-content">' + get_doc_path_html(url) + '<span style="font-size: 11px;text-align: right;width: 100%;color: #757575;float: right;">' + time + '</span></div></div></div>'
        }
    }
    resize_chabot_window()
    setTimeout(function() {
        scroll_to_bottom();
    }, 1000);
}

function get_file_name(value) {

    if (value.length > 20) {

        file_ext = value.split(".").pop()
        value = value.slice(0, 13)
        return value + "..." + file_ext
    } else {

        return value
    }
}

function get_file_path_html(attached_file_src) {
    var html = '';
    if (is_image(attached_file_src)) {
        html = '<a href="' + attached_file_src + '/?livechat_session_id=' + livechat_session_id + '" target="_blank"><img src="/static/LiveChatApp/img/Image_Icon.svg" style="height: 100%;width: 100%;border-radius: 1em;object-fit: cover;"></a>';
    } else {
        html = '<a href="' + attached_file_src + '/?livechat_session_id=' + livechat_session_id + '" target="_blank"><video style="width: 100%;height:100%;border-radius: 1em;" class="easychat-livechat-attached-video" controls><source src="' + window.location.origin + attached_file_src + '" type="video/mp4"></video></a>';
    }
    var len = attached_file_src.split("/").length;
    var file_name = get_file_name(attached_file_src.split("/")[len - 1])
    html += '<span style="margin: 13px;color: gray;">' + file_name + '</span>'
    return html;
}

function get_doc_path_html(url) {

    var html = '<a href="' + url + '/?livechat_session_id=' + livechat_session_id + '" target="_blank"><img src="/static/LiveChatApp/img/document.png" style="width: 60%; margin-left: 30px; object-fit: contain;"></a>';
    var len = url.split("/").length;
    var file_name = get_file_name(url.split("/")[len - 1])
    html += '<span style="margin: 13px;color: gray;">' + file_name + '</span>'
    return html
}

function is_image(attached_file_src) {

    file_ext = attached_file_src.split(".")
    file_ext = attached_file_src.split(".")[file_ext.length - 1]

    if (["png", "PNG", "JPG", "JPEG", "jpg", "jpeg", "svg", "bmp", "gif", "tiff", "exif", "jfif"].indexOf(file_ext) != -1) {
        return true;
    }

    return false;
}

function is_video(attached_file_src) {

    file_ext = attached_file_src.split(".")
    file_ext = attached_file_src.split(".")[file_ext.length - 1]
    file_ext = file_ext.toUpperCase()
    if (["WEBM", "MPG", "MP2", "MPEG", "MPE", "MPV", "OGG", "MP4", "M4P", "M4V", "AVI", "WMV", "MOV", "QT", "FLV", "SWF", "AVCHD"].indexOf(file_ext) != -1) {

        return true;
    }

    return false;
}

function is_docs_or_pdf(attached_file_src) {
    file_ext = attached_file_src.split(".")
    file_ext = attached_file_src.split(".")[file_ext.length - 1]
    file_ext = file_ext.toUpperCase()

    if (["DOCS", "DOCX", "DOC", "PDF"].indexOf(file_ext) != -1) {

        return true;
    }

    return false;
}
// ************************************************************************

function stripHTML(text) {
    var regex = /(<([^>]+)>)/ig;
    return text.replace(regex, "");
}

function mask_user_input(input) {

    mask_next_input = false;
    return "X".repeat(input.length);
}

function append_user_input(user_input) {
    user_input = easychat_linkify(user_input);
    var time = return_time();
    if (EASYCHAT_BOT_THEME == "theme_4") {
        if (is_livechat) {
            hide_bot_typing_loader();
            document.getElementById("easychat-chat-container").innerHTML += '<div class="easychat-user-message-div"><div class="easychat-user-message easychat-user-message-line" style="background-color:' + BOT_THEME_COLOR + ';color: ' + USER_MESSAGE_COLOR + '">' + user_input + '<span class="livechat-doubletick">' + '&nbsp;&nbsp;&nbsp;<img class="doubletick_livechat" src="' + EASYCHAT_IMG_PATH + 'doubletick_black.svg" style="height:1.2em;"></span></div></div>' + '<div style="float:right; font-size: 10px; color:#757575;padding-right: 10px;">' + time + '</div>';
            return;
        }

        document.getElementById("easychat-chat-container").innerHTML += '<div class="easychat-user-message-div"><div class="easychat-user-message easychat-user-message-line" style="background-color:' + BOT_THEME_COLOR + ';color: ' + USER_MESSAGE_COLOR + '">' + user_input + '<span class="message-time-user">' + '&nbsp;&nbsp;<div style="display:inline-block;" ><img class="doubletick_easychat" src="' + EASYCHAT_IMG_PATH + 'doubletick_black.svg" style="height:1.5em;"></div></span></div></div><div style="float:right; font-size: 10px; color:#757575;padding-right: 10px;">' + time + '</div>';
    } else if (EASYCHAT_BOT_THEME == "theme_5") {
        if (is_livechat) {
            hide_bot_typing_loader();
            document.getElementById("easychat-chat-container").innerHTML += '<div class="easychat-user-message-div"><div id="easychat-user-message-' + user_message_index + '" class="easychat-message-animation easychat-user-message easychat-user-message-line" style="background-color:' + BOT_THEME_COLOR + ';color: ' + USER_MESSAGE_COLOR + '">' + user_input + '<span class="livechat-doubletick">' + time + '&nbsp;&nbsp;&nbsp;<img class="doubletick_livechat" src="' + EASYCHAT_IMG_PATH + 'doubletick_black.svg" style="height:1.2em;"></span></div></div>';
            return;
        }

        document.getElementById("easychat-chat-container").innerHTML += '<div class="easychat-user-message-div"><div id="easychat-user-message-' + user_message_index + '" class="easychat-message-animation easychat-user-message easychat-user-message-line" style="background-color:' + BOT_THEME_COLOR + ';color: ' + USER_MESSAGE_COLOR + '">' + user_input + '</div></div>';
        user_message_index += 1;

        setTimeout(function() {
            const elem = document.getElementById('easychat-user-message-' + (user_message_index - 1));
            $(elem).removeClass('easychat-message-animation')
        }, 300)
    } else {
        if (is_livechat) {
            hide_bot_typing_loader();
            document.getElementById("easychat-chat-container").innerHTML += '<div class="easychat-user-message-div"><div class="easychat-user-message easychat-user-message-line" style="background-color:' + BOT_THEME_COLOR + ';color: ' + USER_MESSAGE_COLOR + '">' + user_input + '<span class="livechat-doubletick">' + time + '&nbsp;&nbsp;&nbsp;<img class="doubletick_livechat" src="' + EASYCHAT_IMG_PATH + 'doubletick_black.svg" style="height:1.2em;"></span></div></div>';
            return;
        }

        document.getElementById("easychat-chat-container").innerHTML += '<div class="easychat-user-message-div"><div class="easychat-user-message easychat-user-message-line" style="background-color:' + BOT_THEME_COLOR + ';color: ' + USER_MESSAGE_COLOR + '">' + user_input + '<span class="message-time-user">' + time + '&nbsp;&nbsp;<div style="display:inline-block;" ><img class="doubletick_easychat" src="' + EASYCHAT_IMG_PATH + 'doubletick_black.svg" style="height:1.5em;"></div></span></div></div>';

    }
    element_response_previous_height = 0
}

function playSound(filename) {
    if (EASYCHAT_BOT_THEME != 'theme_5' || !is_bot_notification_sound_enabled) return;
    var mp3Source = '<source src="' + filename + '" type="audio/mpeg">';
    document.getElementById("sound").innerHTML = '<audio autoplay>' + mp3Source + '</audio>';
}

function send_user_input(user_input) {
    window.clearTimeout(bot_inactivity_timer);
    remove_banner();
    remove_feedback_div()
    user_input = stripHTML(user_input);
    if(user_input == ""){
        return;
    }
    if (is_captcha == true) {
        verify_captcha(user_input);
        return;
    }

    var temp_user_input = user_input

    user_input = mask_next_input == true ? mask_user_input(user_input) : user_input
    playSound(STATIC_MP3_PATH + '/juntos1.mov');
    append_user_input(user_input)
    user_input = temp_user_input
    livechat_trigger_message = user_input;
    var server_text = send_message_to_server(user_input, user_id, bot_id, bot_name, "None");
    deactivate_mic()
    scroll_to_bottom();
    is_bot_inactivity_msg_present = false

    if (EASYCHAT_BOT_THEME != 'theme_5') {
        is_doubletick = true;
    }
    is_conversaion_started = true;
}

function append_captcha(url) {
    captcha_element = document.getElementById("recaptcha-div");
    if (captcha_element != null || captcha_element != undefined) {
        captcha_element.remove();
    }
    captcha_html = '<div class="easychat-captcha-div" id="recaptcha-div" align="center">\
        <img src="/' + url + '" id="img-captcha">\
        </div>';
    document.getElementById("easychat-chat-container").innerHTML += captcha_html;
    scroll_to_bottom();
    scroll_to_bottom();
}


function create_captcha() {
    var xhttp = new XMLHttpRequest();
    var params = '';
    xhttp.open("POST", "/chat/get_captcha/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            if (response["status"] == 200) {
                captcha_id = response["random"];
                append_captcha(response["url"]);
                scroll_to_bottom();
            }
        }
    }
    xhttp.send(params);
}

function get_quotes_suggestions(query_code) {
    if (custom_quote_list_flag != query_code) {
        var json_string = JSON.stringify({
            query_code: query_code
        });
        // json_string = encrypt_variable(json_string);
        // json_string = encodeURIComponent(json_string);

        var xhttp = new XMLHttpRequest();
        // var params = 'json_string='+json_string
        var params = 'query_code=' + query_code
        xhttp.open("POST", "/chat/get-quote-codes/", true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                response = JSON.parse(this.responseText);
                if (response["status"] == 200) {
                    code_list = response["code_list"];
                    custom_quote_list_flag = query_code
                        //custom_autocomplete(document.getElementById("user_input"), code_list)
                }
            }
        }
        xhttp.send(params);
    }
}

function verify_captcha(user_input) {
    var xhttp = new XMLHttpRequest();
    var params = 'random=' + captcha_id;
    xhttp.open("POST", "/chat/get_captcha_value/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            if (response["status"] == 200) {
                // console.log(String(user_input), String(response['value']));
                if (String(user_input) == String(response['value'])) {
                    is_captcha = null;
                    send_message_to_server("correct", user_id, bot_id, bot_name, "None")
                } else {
                    create_captcha();
                    scroll_to_bottom();
                }
            }
        }
    }
    xhttp.send(params);
}

function append_recaptcha() {
    create_captcha();
}

function handle_input_type(modes, modes_param) {
    var input_maxlength = "5000000";
    var is_numeric = '';
    if ('is_numeric_input' in modes) {

        is_numeric = modes['is_numeric_input'];
    }

    if ('input_maxlength' in modes_param) {
        input_maxlength = modes_param['input_maxlength'];
    }

    if (is_numeric == "true") {
        document.getElementById("user_input").type = "number";
        hide_mic = true;
    } else {
        document.getElementById("user_input").type = "text";
    }

    document.getElementById("user_input").maxlength = input_maxlength;
}


function append_google_map_location() {
    map_element = document.getElementById("google-map");
    if (map_element != null || map_element != undefined) {
        map_element.remove();
    }

    location_html = '<div class="easychat-gmap-wrapper" id="google-map">\
        <div id="map" class="easychat-gmap-div"></div>\
    </div>';
    document.getElementById("easychat-chat-container").innerHTML += location_html;

    element_response = document.querySelectorAll(".easychat-gmap-wrapper")
    element_response_previous_height += element_response[element_response.length - 1].clientHeight


    var script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBAHTtk1lkVvIl1X_i7_1aIK9RCrhqGEpQ&libraries=places&callback=initMap";
    document.getElementById("google-map").appendChild(script);
    is_map_js_loaded = true;
}


function get_message_list(message, separator) {
    message_list = message.split(separator);
    return message_list;
}


var speech_synthesis_utterance_instance = null;
var speech_synthesis_instance = window.speechSynthesis;
var voices = null;

function cancel_text_to_speech() {
    if (speech_synthesis_instance != null) {
        speech_synthesis_instance.cancel();
    }
}

function text_to_speech(message_to_be_spoken) {
    cancel_text_to_speech();
    message_to_be_spoken = message_to_be_spoken.replace(/<[^>]*>?/gm, '');
    speech_synthesis_utterance_instance = new SpeechSynthesisUtterance(message_to_be_spoken);
    speech_synthesis_utterance_instance.lang = "en-US";
    speech_synthesis_utterance_instance.rate = 0.95;
    speech_synthesis_utterance_instance.pitch = 1;
    speech_synthesis_utterance_instance.volume = 1;
    voices = speech_synthesis_instance.getVoices();
    speech_synthesis_instance.speak(speech_synthesis_utterance_instance);

}

function detectmob() {
    if (window.outerWidth < 450) {
        blur_user_input();
    } else {
        enable_user_input();
        focus_user_input();
    }
}

function append_prev_session_response(response) {
    var server_reply = response.response.text_response.text;
    if (is_doubletick) {
        easychat_doubletick_list = document.getElementsByClassName("doubletick_easychat");
        easychat_doubletick_list[easychat_doubletick_list.length - 1].src = EASYCHAT_IMG_PATH + 'doubletick_blue.svg';
    }
    var recommendations = response.response.recommendations;
    var choices = response.response.choices;
    var cards = response.response.cards;
    var videos = response.response.videos;
    var images = response.response.images;
    var tables = response.response.tables;

    var easy_search_results = response.response.easy_search_results;

    var google_search_results = response.response.google_search_results;
    var modes = response.response.text_response.modes;
    var modes_param = response.response.text_response.modes_param;
    if ("is_recommendation_menu" in modes && modes["is_recommendation_menu"] == "true") {
        set_cookie("is_recommendation_menu", "true")
    } else {
        set_cookie("is_recommendation_menu", "false")
    }
    is_tms_intent = false
    if (("raise_service_request" in modes && modes["raise_service_request"] == "true") || ("schedule_meeting" in modes && modes["schedule_meeting"] == "true") || ("check_meeting_status" in modes && modes["check_meeting_status"] == "true") || ("check_ticket_status" in modes && modes["check_ticket_status"] == "true")) {
        is_tms_intent = true
    }

    if (is_tms_intent == false) {
        message_list = get_message_list(server_reply, RESPONSE_SENTENCE_SEPARATOR);
        for (var i = 0; i < message_list.length; i++) {
            append_bot_text_response(message_list[i]);
        }
    }
    if (cards.length > 0) {
        append_bot_slider_cards(cards);
    }

    if (easy_search_results != null && easy_search_results != undefined && easy_search_results.length > 0) {

        append_bot_slider_cards(easy_search_results);
    }
    if (google_search_results != null && google_search_results != undefined && google_search_results.length > 0) {

        append_google_search_result(google_search_results);
    }
    if (tables != undefined && tables != null && tables.length > 0) {
        append_bot_tables(tables);
    }

    if (images.length > 0) {
        append_bot_slider_images(images);
    }

    if (videos.length > 0) {
        append_bot_slider_videos(videos);
    }

    if (choices.length > 0) {
        append_bot_choices(choices);
    }

    if (recommendations.length > 0) {
        append_bot_recommendation(recommendations);
    }
    enable_user_input();
    setTimeout(function(e) {
        scroll_to_bottom();
    }, 500);
}

function append_bot_response(response) {
    hide_mic = false;
    var server_reply = response.response.text_response.text;
    var speech_response = response.response.speech_response.text;
    var is_text_to_speech_required = response.response.is_text_to_speech_required;
    is_go_back_enabled = response.response.is_go_back_enabled;
    var is_custom_order_selected = response.response.is_custom_order_selected
    var order_of_response = response.response.order_of_response;
    var is_widgets = false;
    disable_user_input();

    if (is_doubletick) {

        easychat_doubletick_list = document.getElementsByClassName("doubletick_easychat");
        easychat_doubletick_list[easychat_doubletick_list.length - 1].src = EASYCHAT_IMG_PATH + 'doubletick_blue.svg';
    }

    var recommendations = response.response.recommendations;
    var choices = response.response.choices;
    var cards = response.response.cards;
    var videos = response.response.videos;
    var images = response.response.images;
    var tables = response.response.tables;

    var easy_search_results = response.response.easy_search_results;

    var google_search_results = response.response.google_search_results;

    is_flow_ended = response.response.is_flow_ended;


    if (is_flow_ended) {
        autocomplete(document.getElementById("user_input"), suggestion_list, []);
    }

    var modes = response.response.text_response.modes;
    var modes_param = response.response.text_response.modes_param;

    if ("is_livechat" in modes && modes["is_livechat"] == "true") {
        if (window.hasOwnProperty("WebSocket") == false) {
            return;
        }
    }

    if ("mask_next_input" in modes && modes["mask_next_input"] == "true") {

        mask_next_input = true
    }

    if ("enable_screenshare" in modes && modes["enable_screenshare"] == "true") {
        show_connect_with_agent_modal();
        return;
    }

    is_quote_response = false;
    if ("is_quote_response" in modes && modes["is_quote_response"] == "true") {
        is_quote_response = true
    }

    is_tms_intent = false
    if (("raise_service_request" in modes && modes["raise_service_request"] == "true") || ("schedule_meeting" in modes && modes["schedule_meeting"] == "true") || ("check_meeting_status" in modes && modes["check_meeting_status"] == "true") || ("check_ticket_status" in modes && modes["check_ticket_status"] == "true")) {
        is_tms_intent = true
    }

    if ("auto_trigger_last_intent" in modes && modes["auto_trigger_last_intent"] == "true") {
        if ("last_identified_intent" in modes_param) {
            last_identified_intent = modes_param["last_identified_intent"]
            if (last_identified_intent != null && last_identified_intent != "None") {
                send_message_to_server(last_identified_intent, user_id, bot_id, bot_name, "None");
                return;
            }
        }
    }

    if ("form_assist_disable" in modes && modes["form_assist_disable"] == "true") {
        parent.postMessage('disable-form-assist', '*');
        return;
    }

    if ("check_ticket_status" in modes && modes["check_ticket_status"] == "true") {
        is_bot_response_message_showed = true;
        html = '<center><button onclick="check_ticket_status(this)" style="padding: 0.4em 1em 0.4em 1em;border-radius: 0.5em;background-color:' + BOT_THEME_COLOR + ';color:white;font-size:15px;">Check Status</button></center>'
        document.getElementById("check_ticket_status_submit_button").innerHTML = html;
        modal_check_ticket_status.style.display = "block";
        disable_user_input();
        return;
    }

    if ("check_meeting_status" in modes && modes["check_meeting_status"] == "true") {
        is_bot_response_message_showed = true;
        html = '<center><button onclick="check_meeting_status(this)" style="padding: 0.4em 1em 0.4em 1em;border-radius: 0.5em;background-color:' + BOT_THEME_COLOR + ';color:white;font-size:15px;">Check Status</button></center>'
        document.getElementById("check_meeting_status_submit_button").innerHTML = html;
        modal_check_meeting_status.style.display = "block";
        disable_user_input();
        return;
    }

    if ("raise_service_request" in modes && modes["raise_service_request"] == "true") {
        is_bot_response_message_showed = true;
        html = '<center><button onclick="create_issue(this)" style="padding: 0.4em 1em 0.4em 1em;border-radius: 0.5em;background-color:' + BOT_THEME_COLOR + ';color:white;font-size:15px;">Submit</button></center>'
        document.getElementById("create_issue_submit_button").innerHTML = html;
        modal_create_issue.style.display = "block";
        disable_user_input();
        return;
    }

    if ("schedule_meeting" in modes && modes["schedule_meeting"] == "true") {
        is_bot_response_message_showed = true;
        html = '<center><button onclick="schedule_meeting(this)" style="padding: 0.4em 1em 0.4em 1em;border-radius: 0.5em;background-color:' + BOT_THEME_COLOR + ';color:white;font-size:15px;">Submit</button></center>'
        document.getElementById("schedule_meeting_submit_button").innerHTML = html;
        $(".easychat-modal-content").css('margin', '');
        $(".easychat-modal-content").css('height', '');
        modal_schedule_meeting.style.display = "block";
        disable_user_input();
        return;
    }

    if ("is_livechat" in modes && modes["is_livechat"] == "true") {
        if (window.hasOwnProperty("WebSocket") == true) {
            message_list = get_message_list(server_reply, RESPONSE_SENTENCE_SEPARATOR);
            for (var message_list_iterator = 0; message_list_iterator < message_list.length; message_list_iterator++) {
                append_bot_text_response(message_list[message_list_iterator]);
            }
            if (detectIEEdge()) {
                is_livechat = false;
                append_bot_text_response("Chat with an Expert is not supported on Internet Explorer. Please use Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari for a better experience. Sorry for the inconvenience.")
                scroll_to_bottom()
                enable_user_input();
                return;
            }
            is_livechat = true;

            append_livechat_response(is_text_to_speech_required, speech_response);
        }
        return;
    }

    if (is_text_to_speech_required == true && speech_response != "") {
        text_to_speech(speech_response);
    }

    if ("is_typable" in modes) {
        if (modes["is_typable"] == "true") {
            enable_user_input();
            focus_user_input();
            handle_input_type(modes, modes_param);
            //focus_user_input();
        } else {
            disable_user_input();
        }
    }

    if (easy_search_results != null && easy_search_results != undefined && easy_search_results.length > 0) {

        append_bot_slider_cards(easy_search_results);
    }

    if (google_search_results != null && google_search_results != undefined && google_search_results.length > 0) {

        append_google_search_result(google_search_results);
    }

    if ("is_recaptcha" in modes && modes["is_recaptcha"] == "true") {
        append_recaptcha();
        is_captcha = true;
        hide_mic = true;
        handle_input_type(modes, modes_param);
    }

    if ("is_recommendation_menu" in modes && modes["is_recommendation_menu"] == "true") {
        set_cookie("is_recommendation_menu", "true");
    } else {
        set_cookie("is_recommendation_menu", "false")
    }

    if ("is_location_required" in modes && modes["is_location_required"] == "true") {
        append_google_map_location();
    }

    is_custom_complete = false
    if ("is_custom_complete" in modes && modes["is_custom_complete"] == "true") {
        start_custom_complete();
        is_custom_complete = true
    }

    try {
        if (!is_custom_order_selected || order_of_response.length == 0) {
            order_of_response = default_order_of_response

            if (order_of_response.length == 0) {
                order_of_response = ['Text', 'Image', 'Table', 'Video', 'Link Cards', 'Quick Recommendations', 'Drop Down', 'Date Picker', 'Checkbox', 'Radio Button', 'Range Slider', 'Form', 'Time Picker', 'File Attach', 'Video Record'];
            }
        }
    } catch (err) {
        order_of_response = ['Text', 'Image', 'Table', 'Video', 'Link Cards', 'Quick Recommendations', 'Drop Down', 'Date Picker', 'Checkbox', 'Radio Button', 'Range Slider', 'Form', 'Time Picker', 'File Attach', 'Video Record'];
    }


    for (let j = 0; j < order_of_response.length; ++j) {
        let element = order_of_response[j];
        if (element == "Text" && is_tms_intent == false) {
            message_list = get_message_list(server_reply, RESPONSE_SENTENCE_SEPARATOR);
            for (var i = 0; i < message_list.length; i++) {
                append_bot_text_response(message_list[i]);
            }
        }
        if (element == "File Attach" && response.is_attachment_required == true) {
            is_widgets = true;
            disable_user_input();
            var choosen_file_type = response.choosen_file_type;
            choosen_file_type = choosen_file_type.replace(/"/g, '');
            choosen_file_ext = file_type_ext[choosen_file_type];
            if ("is_save_attachment_required" in modes && modes["is_save_attachment_required"] == "true") {
                is_save_attachment_required = true;
            } else {
                is_save_attachment_required = false;
            }
            append_attachment(choosen_file_ext, is_flow_ended);
            continue;
        }

        if (element == "Link Cards" && cards.length > 0) {
            append_bot_slider_cards(cards);
            continue;
        }

        if (element == "Date Picker" && "is_datepicker" in modes && modes["is_datepicker"] == "true") {
            is_widgets = true;
            disable_user_input();
            // DatePicker input format [{"placeholder":"From Date"}, {"placeholder":"To Date"}]
            append_datepicker(modes_param["datepicker_list"]);
            continue;
        }

        if (element == "Time Picker" && "is_timepicker" in modes && modes["is_timepicker"] == "true") {
            is_widgets = true;
            disable_user_input();
            // DatePicker input format [{"placeholder":"From Time"}, {"placeholder":"To Time"}]
            append_timepicker(modes_param["timepicker_list"])
            continue;
        }

        if (element == "Range Slider" && "is_range_slider" in modes && modes["is_range_slider"] == "true") {
            is_widgets = true;
            disable_user_input();
            // Input Range Slider list format [{"placeholder":"Loan Amount", "min":50000, "max":640000}]
            append_bot_range_slider(modes_param["range_slider_list"]);
            continue;
        }

        if (element == "Form" && "is_create_form_allowed" in modes && modes["is_create_form_allowed"] == "true") {
            is_widgets = true;
            disable_user_input();
            append_create_form_modal(modes_param["form_name"], modes_param["form_fields_list"]);
            continue;
        }

        if (element == "Radio Button" && "is_radio_button" in modes && modes["is_radio_button"] == "true") {
            is_widgets = true;
            disable_user_input();
            append_radio_buttons(modes_param["radio_button_choices"]);
            continue;
        }

        if (element == "Checkbox" && "is_check_box" in modes && modes["is_check_box"] == "true") {
            is_widgets = true;
            disable_user_input();
            append_checkbox(modes_param["check_box_choices"]);
            continue;
        }

        if (element == "Drop Down" && "is_drop_down" in modes && modes["is_drop_down"] == "true") {
            is_widgets = true;
            disable_user_input();
            append_dropdown(modes_param["drop_down_choices"]);
            continue;
        }

        if (element == "Video Record" && "is_video_recorder_allowed" in modes && modes["is_video_recorder_allowed"] == "true") {
            is_widgets = true;
            disable_user_input();
            if ("is_save_video_attachment" in modes && modes["is_save_video_attachment"] == "true") {
                is_save_attachment_required = true;
            } else {
                is_save_attachment_required = false;
            }
            append_video_recorder();
            continue;
        }

        if (element == "Table" && tables != undefined && tables != null && tables.length > 0) {
            append_bot_tables(tables);
            continue;
        }

        if (element == "Image" && images.length > 0) {
            append_bot_slider_images(images);
            continue;
        }

        if (element == "Video" && videos.length > 0) {
            append_bot_slider_videos(videos);
            continue;
        }

        if (element == "Quick Recommendations") {
            if (is_go_back_enabled) {
                recommendations.push('Go Back')
                append_bot_recommendation(recommendations);
            } else if (recommendations.length > 0) {
                append_bot_recommendation(recommendations);
            }
        }
    }

    if (choices.length > 0) {
        append_bot_choices(choices);
    }

    if ("is_feedback_required" in response["response"]) {
        var is_feedback_required = response["response"]["is_feedback_required"]
        if (is_feedback_required) {
            var feedback_id = response["response"]["feedback_id"]
            append_feedback_btns(feedback_id)
        }
    }

    //scroll_to_bottom();
    if (is_widgets = false) {
        deactivate_mic();
    }
    deactivate_query_submit_button();

    if (recognition != null) {
        if (hide_mic == true) {
            hide_mic_icon();
        } else {
            show_mic();
        }
    } else {
        hide_mic_icon();
    }

    if (initial_intent_in_welcome_message == false && web_landing_intent == false) {
        objDiv = document.getElementById("easychat-chat-container")
        element_user_response_list = document.querySelectorAll(".easychat-user-message-div")
        element_user_response = element_user_response_list[element_user_response_list.length - 1]
        let prevValue = 0,
            currValue = 0;
        var interval_scroll = setInterval(function() {
            scroll_to_element();
            try {
                if (currValue == 0) {
                    currValue = element_user_response.getBoundingClientRect().top
                } else {
                    prevValue = currValue;
                    currValue = element_user_response.getBoundingClientRect().top
                }

                if (EASYCHAT_BOT_THEME == "theme_5") {
                    if (element_user_response.getBoundingClientRect().top <= 90 || currValue - prevValue == 0) {
                        clearInterval(interval_scroll)
                    }
                } else {
                    if (element_user_response.getBoundingClientRect().top <= 80 || currValue - prevValue == 0) {
                        clearInterval(interval_scroll)
                    }
                }
            } catch (err) {}
        }, 10);
    }
    web_landing_intent = false

    is_bot_inactivity_msg_present = false
    if (bot_inactivity_detection_enabled) {
        reset_bot_inactivity_timer()
    }

    if (EASYCHAT_BOT_THEME == "theme_5") {
        playSound(STATIC_MP3_PATH + '/juntos3.mov');
    }

    is_bot_response_message_showed = true;
    if (bot_response_delay_allowed) {
        reset_bot_response_delay_timer();
    }
}

function start_custom_complete() {
    if (true) {
        custom_autocomplete(document.getElementById("user_input"), [])
    }
}

function append_bot_slider_videos(video_url_list) {
    if (video_url_list.length > 0) {
        slider_main_container = document.getElementById("easychat-slideshow-container-main-div");
        if (slider_main_container != undefined && slider_main_container != null) {
            slider_main_container.remove();
        }

        video_html = '<div class="easychat-slider-wrapper">\
        <div style="color:' + BOT_THEME_COLOR + '; width: 80%;margin: auto;"><div class="slideshow-container"  value=1 >';
        total_video = video_url_list.length;

        for (var i = 0; i < video_url_list.length; i++) {
            current_video_no = i + 1;
            if (i == 0) {
                video_html += '<div class="mySlides fade" >'
                if (video_url_list[i].indexOf("embed") != -1) {
                    video_html += '<div class="video-container">\
                      <iframe class="easychat-video-iframe" src="' + video_url_list[i] + '" frameborder="1" allowfullscreen></iframe>\
                    </div>';
                } else {
                    video_html += '<video width="325" height="200" style="border-radius: 1em;" controls>\
                      <source src="' + video_url_list[i] + '" type="video/mp4">\
                    </video>';
                }
            } else {
                video_html += '<div class="mySlides fade" style="display: none;">'
                if (video_url_list[i].indexOf("embed") != -1) {
                    video_html += '<div class="video-container">\
                      <iframe class="easychat-video-iframe" src="' + video_url_list[i] + '" frameborder="1" allowfullscreen></iframe>\
                    </div>';
                } else {
                    video_html += '<video width="325" height="200" style="border-radius: 1em;" controls>\
                      <source src="' + video_url_list[i] + '" type="video/mp4">\
                    </video>';
                }
            }
            if (video_url_list.length != 1) {
                video_html += '<div class="pageno-co">' + current_video_no + ' / ' + total_video + '</div></div>';
            } else {
                video_html += '</div>'
            }

        }
        if (video_url_list.length != 1) {
            video_html += '<a class="prev-image-video" onclick="plusImageSlides(-1,this)">&#10094;</a>\
            <a class="next-image-video" onclick="plusImageSlides(1,this)">&#10095;</a>\
            </div><script>showSlides(1,this);</script><br><div style="text-align:center"></div>';
        }
        video_html += '</div></div>';

        document.getElementById("easychat-chat-container").innerHTML += video_html;
        element_response = document.querySelectorAll(".easychat-slider-wrapper")
        element_response_previous_height += element_response[element_response.length - 1].clientHeight
        resize_chabot_window();

    }
}

function append_bot_slider_images(image_url_list) {

    slider_main_container = document.getElementById("easychat-slideshow-container-main-div");
    if (slider_main_container != undefined && slider_main_container != null) {
        slider_main_container.remove();
    }

    image_slidershow_html = '<div class="easychat-slider-wrapper">\
    <div style="color:' + BOT_THEME_COLOR + '; width: 80%;margin: auto;"><div class="slideshow-container"  value=1 >';
    total_images = image_url_list.length;

    for (var i = 0; i < image_url_list.length; i++) {
        current_image_no = i + 1;
        if (i == 0) {
            image_slidershow_html += '<div class="mySlides fade" >'
        } else {
            image_slidershow_html += '<div class="mySlides fade" style="display: none;">'
        }
        if (image_url_list.length != 1) {
            image_slidershow_html += '<div class="pageno-co">' + current_image_no + ' / ' + total_images + '</div>\
            <img src="' + image_url_list[i] + '" class="easychat-image-el" onclick = "open_link_image(this)" style = "cursor:pointer;">\
          </div>';
        } else {
            image_slidershow_html += '<img src="' + image_url_list[i] + '" class="easychat-image-el" onclick = "open_link_image(this)" style = "cursor:pointer;" ></div>';
        }
    }
    if (image_url_list.length != 1) {
        image_slidershow_html += '<a class="prev-image-video" onclick="plusImageSlides(-1,this)">&#10094;</a>\
        <a class="next-image-video" onclick="plusImageSlides(1,this)">&#10095;</a>\
        </div><script>showSlides(1,this);</script><br><div style="text-align:center"></div>';
    }
    image_slidershow_html += '</div></div>';


    document.getElementById("easychat-chat-container").innerHTML += image_slidershow_html;

    element_response = document.querySelectorAll(".easychat-slider-wrapper")
    const el = element_response[element_response.length - 1]
    el_style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
    //element_response_previous_height += element_response[element_response.length-1].clientHeight
    element_response_previous_height += parseInt(el_style.height);

    resize_chabot_window();
}

function append_bot_slider_cards(cards) {
    if (EASYCHAT_BOT_THEME == "theme_5") {
        var cards_html = '<div class="easychat-card-slider-wrapper"><div>'

        cards_html = '<div style="color:' + BOT_THEME_COLOR + ';" class="easychat-slides-wrapper" ><div class="slideshow-container"  value=1 >';
        total_images = cards.length;

        for (var i = 0; i < cards.length; i++) {
            current_image_no = i + 1;
            if (i == 0) {
                cards_html += '<div onclick="'
                cards_html += "window.open('" + cards[i]["link"] + "');"

                if (cards[i]["img_url"] != "" && cards[i]["img_url"] != undefined) {
                    cards_html += '"  class="mySlides fade easychat-slider-card">'
                } else {
                    cards_html += '"  class="mySlides fade easychat-slider-card" style = "box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);">'
                }
            } else {
                cards_html += '<div onclick="'
                cards_html += "window.open('" + cards[i]["link"] + "');"

                if (cards[i]["img_url"] != "" && cards[i]["img_url"] != undefined) {
                    cards_html += '"  class="mySlides fade easychat-slider-card" style="display: none;">';
                } else {
                    cards_html += '"  class="mySlides fade easychat-slider-card" style="display: none; box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);">';
                }
            }
            if (cards.length != 1) {
                cards_html += '<div class="pageno-co">' + current_image_no + ' / ' + total_images + '</div>'

                if (cards[i]["img_url"] != "" && cards[i]["img_url"] != undefined) {
                    cards_html += '<img src="' + cards[i]["img_url"] + '"><div>'
                } else {
                    cards_html += '<div class = "card-background">\
                    <svg width="78" height="69" viewBox="0 0 78 69" fill="none" xmlns="http://www.w3.org/2000/svg">\
                    <path d="M72.9762 0H4.86508C3.57478 0 2.33733 0.512569 1.42495 1.42495C0.512569 2.33733 0 3.57478 0 4.86508V63.246C0 64.5363 0.512569 65.7738 1.42495 66.6862C2.33733 67.5985 3.57478 68.1111 4.86508 68.1111H72.9762C74.2665 68.1111 75.5039 67.5985 76.4163 66.6862C77.3287 65.7738 77.8413 64.5363 77.8413 63.246V4.86508C77.8413 3.57478 77.3287 2.33733 76.4163 1.42495C75.5039 0.512569 74.2665 0 72.9762 0V0ZM4.86508 63.246V4.86508H72.9762V63.246H4.86508Z" fill="black" fill-opacity="0.05"/>\
                    <path d="M16.8333 24.3255C18.2766 24.3255 19.6875 23.8975 20.8876 23.0956C22.0877 22.2937 23.023 21.154 23.5754 19.8205C24.1277 18.4871 24.2722 17.0198 23.9907 15.6042C23.7091 14.1886 23.0141 12.8882 21.9935 11.8677C20.9729 10.8471 19.6726 10.152 18.257 9.87045C16.8414 9.58887 15.3741 9.73339 14.0406 10.2857C12.7071 10.8381 11.5674 11.7734 10.7655 12.9735C9.96364 14.1736 9.53564 15.5845 9.53564 17.0278C9.53564 18.9633 10.3045 20.8195 11.6731 22.188C13.0416 23.5566 14.8978 24.3255 16.8333 24.3255V24.3255ZM16.8333 13.1358C17.6041 13.131 18.3589 13.3551 19.0022 13.7799C19.6454 14.2046 20.148 14.8107 20.4464 15.5215C20.7447 16.2322 20.8252 17.0155 20.6778 17.7721C20.5304 18.5287 20.1616 19.2245 19.6183 19.7712C19.075 20.318 18.3815 20.6911 17.6259 20.8432C16.8702 20.9954 16.0864 20.9198 15.3738 20.6259C14.6612 20.3321 14.0519 19.8332 13.6232 19.1927C13.1944 18.5521 12.9655 17.7987 12.9655 17.0278C12.9719 16.004 13.3814 15.024 14.1054 14.3C14.8294 13.576 15.8094 13.1665 16.8333 13.1601V13.1358Z" fill="black" fill-opacity="0.05"/>\
                    <path d="M50.5483 27.658L37.4126 40.7938L27.6824 31.0636C27.2266 30.6105 26.6101 30.3562 25.9675 30.3562C25.3248 30.3562 24.7083 30.6105 24.2525 31.0636L9.53564 45.9751V52.8592L26.0526 36.3422L34.0556 44.2236L24.9336 53.3457H31.6231L52.1781 32.7907L68.1112 48.6509V41.7911L53.9782 27.658C53.5224 27.205 52.9059 26.9507 52.2632 26.9507C51.6206 26.9507 51.004 27.205 50.5483 27.658Z" fill="black" fill-opacity="0.05"/>\
                    </svg>\
                    </div><div>'
                }

                if (cards[i]["title"].length > 25) {
                    var cards_title = cards[i]["title"].slice(0, 25) + " ..."
                    cards_html += '<h5 style = "padding: 10px; margin: 0;">' + cards_title + '</h5>'
                } else {
                    cards_html += '<h5 style = "padding: 10px; margin: 0;">' + cards[i]["title"] + '</h5>'
                }
                if (cards[i]["content"].length > 0) {
                    if (cards[i]["content"].length > 300) {
                        cards_html += '<p style = "padding: 10px; padding-top: 0; margin: 0;">' + (cards[i]["content"].slice(0, 300) + " ... ") + '</p>'
                    } else {
                        cards_html += '<p style = "padding: 10px; padding-top: 0; margin: 0;">' + cards[i]["content"] + '</p>'
                    }
                }

                cards_html += '</div></div>';
            } else {
                if (cards[i]["img_url"] != "" && cards[i]["img_url"] != undefined) {
                    cards_html += '<img src="' + cards[i]["img_url"] + '"><div>'
                } else {
                    cards_html += '<div class = "card-background">\
                    <svg width="78" height="69" viewBox="0 0 78 69" fill="none" xmlns="http://www.w3.org/2000/svg">\
                    <path d="M72.9762 0H4.86508C3.57478 0 2.33733 0.512569 1.42495 1.42495C0.512569 2.33733 0 3.57478 0 4.86508V63.246C0 64.5363 0.512569 65.7738 1.42495 66.6862C2.33733 67.5985 3.57478 68.1111 4.86508 68.1111H72.9762C74.2665 68.1111 75.5039 67.5985 76.4163 66.6862C77.3287 65.7738 77.8413 64.5363 77.8413 63.246V4.86508C77.8413 3.57478 77.3287 2.33733 76.4163 1.42495C75.5039 0.512569 74.2665 0 72.9762 0V0ZM4.86508 63.246V4.86508H72.9762V63.246H4.86508Z" fill="black" fill-opacity="0.05"/>\
                    <path d="M16.8333 24.3255C18.2766 24.3255 19.6875 23.8975 20.8876 23.0956C22.0877 22.2937 23.023 21.154 23.5754 19.8205C24.1277 18.4871 24.2722 17.0198 23.9907 15.6042C23.7091 14.1886 23.0141 12.8882 21.9935 11.8677C20.9729 10.8471 19.6726 10.152 18.257 9.87045C16.8414 9.58887 15.3741 9.73339 14.0406 10.2857C12.7071 10.8381 11.5674 11.7734 10.7655 12.9735C9.96364 14.1736 9.53564 15.5845 9.53564 17.0278C9.53564 18.9633 10.3045 20.8195 11.6731 22.188C13.0416 23.5566 14.8978 24.3255 16.8333 24.3255V24.3255ZM16.8333 13.1358C17.6041 13.131 18.3589 13.3551 19.0022 13.7799C19.6454 14.2046 20.148 14.8107 20.4464 15.5215C20.7447 16.2322 20.8252 17.0155 20.6778 17.7721C20.5304 18.5287 20.1616 19.2245 19.6183 19.7712C19.075 20.318 18.3815 20.6911 17.6259 20.8432C16.8702 20.9954 16.0864 20.9198 15.3738 20.6259C14.6612 20.3321 14.0519 19.8332 13.6232 19.1927C13.1944 18.5521 12.9655 17.7987 12.9655 17.0278C12.9719 16.004 13.3814 15.024 14.1054 14.3C14.8294 13.576 15.8094 13.1665 16.8333 13.1601V13.1358Z" fill="black" fill-opacity="0.05"/>\
                    <path d="M50.5483 27.658L37.4126 40.7938L27.6824 31.0636C27.2266 30.6105 26.6101 30.3562 25.9675 30.3562C25.3248 30.3562 24.7083 30.6105 24.2525 31.0636L9.53564 45.9751V52.8592L26.0526 36.3422L34.0556 44.2236L24.9336 53.3457H31.6231L52.1781 32.7907L68.1112 48.6509V41.7911L53.9782 27.658C53.5224 27.205 52.9059 26.9507 52.2632 26.9507C51.6206 26.9507 51.004 27.205 50.5483 27.658Z" fill="black" fill-opacity="0.05"/>\
                    </svg>\
                    </div><div>'
                }

                cards_html += '<h5 style="overflow-wrap: break-word; padding: 10px; margin: 0;">' + cards[i]["title"] + '</h5>';

                if (cards[i]["content"].length > 0) {
                    cards_html += '<p style="overflow-wrap: break-word; padding: 10px; padding-top: 0; margin: 0;">' + cards[i]["content"] + '</p>';
                }
            }
        }
        if (cards.length != 1) {
            cards_html += '<a class="prev-image-video" onclick="plusImageSlides(-1,this)">&#10094;</a>\
            <a class="next-image-video" onclick="plusImageSlides(1,this)">&#10095;</a>\
            </div><script>showSlides(1,this);</script><br><div style="text-align:center"></div>';
        }
        cards_html += '</div>';
        cards_html += '</div></div>'
    } else {
        var cards_html = '<div class="easychat-card-slider-wrapper"><div>'
        if (cards[0]["content"] == "" && (cards[0]["img_url"] == "" || cards[0]["img_url"] == undefined)) {
            for (var i = 0; i < cards.length; i++) {
                cards_html += '<a href="' + cards[i]["link"] + '" target="_blank" style="color:black;"><div class="easychat-card">\
                <div class="container" onmouseover="custom_button_change_card(this)" onmouseout="custom_button_change_normal_card(this)">\
                    <b>' + cards[i]["title"] + '</b>\
                </div>\
                </div></a>';
            }
        } else if (cards[0]["img_url"] == "" || cards[0]["img_url"] == undefined) {
            cards_html = '<div style="color:' + BOT_THEME_COLOR + ';" class="easychat-slides-wrapper"><div class="slideshow-container"  value=1 >';
            total_images = cards.length;

            for (var i = 0; i < cards.length; i++) {
                current_image_no = i + 1;

                if (i == 0) {
                    cards_html += '<div onclick="'
                    cards_html += "window.open('" + cards[i]["link"] + "');"
                    cards_html += '"  class="mySlides fade easychat-slider-card" styles="border: 2px solid ' + BOT_THEME_COLOR + ';">'
                } else {
                    cards_html += '<div onclick="'
                    cards_html += "window.open('" + cards[i]["link"] + "');"
                    cards_html += '"  class="mySlides fade easychat-slider-card" style="display: none; border: 2px solid ' + BOT_THEME_COLOR + ';">'
                }

                if (cards.length != 1) {
                    cards_html += '<div class="pageno-co">' + current_image_no + ' / ' + total_images + '</div>'
                    if (cards[i]["title"].length > 25) {
                        var cards_title = cards[i]["title"].slice(0, 25) + " ..."
                        cards_html += '<h5>' + cards_title + '</h5>'
                    } else {
                        cards_html += '<h5>' + cards[i]["title"] + '</h5>'
                    }
                    if (cards[i]["content"].length > 300) {
                        cards_html += '<p>' + (cards[i]["content"].slice(0, 300) + " ... ") + '</p></div>'
                    } else {
                        cards_html += '<p>' + cards[i]["content"] + '</p></div>'
                    }


                } else {
                    cards_html += '<h5 style="overflow-wrap: break-word">' + cards[i]["title"] + '</h5>';
                    cards_html += '<p style="overflow-wrap: break-word">' + cards[i]["content"] + '</p></div>';
                }
            }
            if (cards.length != 1) {
                cards_html += '<a class="prev-image-video" onclick="plusImageSlides(-1,this)">&#10094;</a>\
                <a class="next-image-video" onclick="plusImageSlides(1,this)">&#10095;</a>\
                </div><script>showSlides(1,this);</script><br><div style="text-align:center"></div>';
            }
            cards_html += '</div>';
        } else {
            cards_html = '<div style="color:' + BOT_THEME_COLOR + ';" class="easychat-slides-wrapper" ><div class="slideshow-container"  value=1 >';
            total_images = cards.length;

            for (var i = 0; i < cards.length; i++) {
                current_image_no = i + 1;
                if (i == 0) {
                    cards_html += '<div onclick="'
                    cards_html += "window.open('" + cards[i]["link"] + "');"
                    cards_html += '"  class="mySlides fade easychat-slider-card" style="border: 2px solid ' + BOT_THEME_COLOR + ';" >'
                } else {
                    cards_html += '<div onclick="'
                    cards_html += "window.open('" + cards[i]["link"] + "');"
                    cards_html += '"  class="mySlides fade easychat-slider-card" style="display: none; border: 2px solid ' + BOT_THEME_COLOR + ';">'
                }
                if (cards.length != 1) {
                    cards_html += '<div class="pageno-co">' + current_image_no + ' / ' + total_images + '</div>'
                    if (cards[i]["title"].length > 25) {
                        var cards_title = cards[i]["title"].slice(0, 25) + " ..."
                        cards_html += '<h5>' + cards_title + '</h5>'
                    } else {
                        cards_html += '<h5>' + cards[i]["title"] + '</h5>'
                    }
                    if (cards[i]["content"].length > 300) {
                        cards_html += '<p>' + (cards[i]["content"].slice(0, 300) + " ... ") + '</p>'
                    } else {
                        cards_html += '<p>' + cards[i]["content"] + '</p>'
                    }
                    cards_html += '<img src="' + cards[i]["img_url"] + '"> </div>'
                } else {
                    cards_html += '<h5 style="overflow-wrap: break-word">' + cards[i]["title"] + '</h5>';
                    cards_html += '<p style="overflow-wrap: break-word">' + cards[i]["content"] + '</p>';
                    cards_html += '<img src="' + cards[i]["img_url"] + '"> </div>'
                }
            }
            if (cards.length != 1) {
                cards_html += '<a class="prev-image-video" onclick="plusImageSlides(-1,this)">&#10094;</a>\
            <a class="next-image-video" onclick="plusImageSlides(1,this)">&#10095;</a>\
            </div><script>showSlides(1,this);</script><br><div style="text-align:center"></div>';
            }
            cards_html += '</div>';
        }
        cards_html += '</div></div>'
    }
    document.getElementById("easychat-chat-container").innerHTML += cards_html;

    try {
        element_response = document.querySelectorAll(".easychat-card-slider-wrapper")
        element_response_previous_height += element_response[element_response.length - 1].clientHeight
    } catch (err) {
        element_response = document.querySelectorAll(".easychat-slides-wrapper")
        element_response_previous_height += element_response[element_response.length - 1].clientHeight

    }
    resize_chabot_window();
}

function append_google_search_result(cards) {
    cards_html = '<div style="color:' + BOT_THEME_COLOR + ';" class="easychat-slides-wrapper" ><div class="slideshow-container"  value=1 >';
    total_images = cards.length;

    for (var i = 0; i < cards.length; i++) {
        current_image_no = i + 1;
        if (i == 0) {
            cards_html += '<div onclick="'
            cards_html += "window.open('" + cards[i]["google_search_link"] + "');"
            cards_html += '"  class="mySlides fade easychat-slider-card" >'
        } else {
            cards_html += '<div onclick="'
            cards_html += "window.open('" + cards[i]["google_search_link"] + "');"
            cards_html += '"  class="mySlides fade easychat-slider-card" style="display: none;">'
        }
        if (cards.length != 1) {
            cards_html += '<div class="pageno-co">' + current_image_no + ' / ' + total_images + '</div>'
            if (cards[i]["google_search_title"].length > 25) {
                var cards_title = cards[i]["google_search_title"].slice(0, 25) + " ..."
                cards_html += '<h5>' + cards_title + '</h5>'
            } else {
                cards_html += '<h5>' + cards[i]["google_search_title"] + '</h5>'
            }
            if (cards[i]["google_search_descrptn"].length > 300) {
                cards_html += '<p>' + (cards[i]["google_search_descrptn"].slice(0, 300) + " ... ") + '</p></div>'
            } else {
                cards_html += '<p>' + cards[i]["google_search_descrptn"] + '</p></div>'
            }
        } else {
            cards_html += '<h5>' + cards[i]["google_search_title"] + '</h5><p>' + cards[i]["google_search_descrptn"] + '</p></div>';
        }
    }
    if (cards.length != 1) {
        cards_html += '<a class="prev-image-video" onclick="plusImageSlides(-1,this)">&#10094;</a>\
            <a class="next-image-video" onclick="plusImageSlides(1,this)">&#10095;</a>\
            </div><script>showSlides(1,this);</script><br><div style="text-align:center"></div>';
    }
    cards_html += '</div>';
    cards_html += '</div></div>'
    document.getElementById("easychat-chat-container").innerHTML += cards_html;
    element_response = document.querySelectorAll(".easychat-slides-wrapper")
    element_response_previous_height += element_response[element_response.length - 1].clientHeight

}

function append_attachment(choosen_file_type, is_flow_ended) {
    var html =
        '<div class="easychat-dragdropContainer__XPS">\
        <span class="easychat-dragdropMsg__XPS" style="color:' + BOT_THEME_COLOR + '">Drag your (' + choosen_file_type + ') files here<br>Or Click in this area.</span>\
        <div class="easychat-dragdrop__XPS" style="border: 4px dashed ' + BOT_THEME_COLOR + '"><input onchange="change_span_name_to_file_name(this)" id="easychat-uploadfile__XPS" type="file" accept="' + choosen_file_type + '"></div>\
        <div class="easychat-dragdropafterSelect__XPS">\
            <span id="easychat-dragdropAlertMsg__XPS">Error Message</span>\
            <button onclick="save_attachment_to_data_models(this,' + is_flow_ended + ')" id="easychat-dragdropUploadBTN__XPS" style="background-color:' + BOT_THEME_COLOR + '">Upload</button>\
            <div style="width:100%;float:left;display:none;" id="easychat-dragdropbottyping-loader"><img src="' + EASYCHAT_IMG_PATH + 'preloader.svg" style="height:3em;"></div>\
        </div></div>';
    document.getElementById("easychat-chat-container").innerHTML += html;
    element_response = document.querySelectorAll(".easychat-dragdropContainer__XPS")
    element_response_previous_height += element_response[element_response.length - 1].clientHeight

    disable_user_input();
}

function start_capturing_video(video_element_id, video_captured_canvas, start_button_id, stop_button_id, preview_button_id, is_audio_required, submit_button_id) {
    // Store a reference of the preview video element and a global reference to the recorder instance
    video = document.getElementById(video_element_id);
    canvas = document.getElementById(video_captured_canvas);
    // When the user clicks on start video recording
    document.getElementById(start_button_id).addEventListener("click", function() {
        // Disable start recording button
        this.disabled = true;
        this.style.backgroundColor = 'grey';
        // Request access to the media devices
        navigator.mediaDevices.getUserMedia({
            audio: is_audio_required,
            video: true
        }).then(function(stream) {
            // Display a live preview on the video element of the page
            setSrcObject(stream, video);

            // Start to display the preview on the video element
            // and mute the video to disable the echo issue !
            video.play();
            video.muted = true;

            // Initialize the recorder
            recorder = new RecordRTCPromisesHandler(stream, {
                mimeType: 'video/webm',
                bitsPerSecond: 128000
            });

            // Start recording the video
            recorder.startRecording().then(function() {}).catch(function(error) {
                console.error('Cannot start video recording: ', error);
            });

            // release stream on stopRecording
            recorder.stream = stream;
            videoStarted = true;

            // Enable stop recording button
            document.getElementById(stop_button_id).disabled = false;
            document.getElementById(stop_button_id).style.backgroundColor = BOT_THEME_COLOR;

            // document.getElementById(preview_button_id).disabled = true;
        }).catch(function(error) {
            alert("Please allow access to webcam.");
            console.error("Cannot access media devices: ", error);
        });
    }, false);

    // When the user clicks on Stop video recording
    document.getElementById(stop_button_id).addEventListener("click", function() {
        this.disabled = true;
        recorder.stopRecording().then(function() {

            // Retrieve recorded video as blob and display in the preview element
            videoBlob = recorder.blob;
            recorder.getDataURL().then(function(result) {
                recorded_video_data_url = result;
            });

            // video.src = URL.createObjectURL(videoBlob);
            // video.play();

            // Unmute video on preview
            // video.muted = false;

            // Stop the device streaming
            recorder.stream.stop();
            videoStopped = true;

            document.getElementById(start_button_id).disabled = false;
            document.getElementById(start_button_id).style.backgroundColor = BOT_THEME_COLOR;
            // document.getElementById(start_button_id).style.backgroundColor = "grey";
            // document.getElementById(preview_button_id).disabled = false;
            document.getElementById(submit_button_id).disabled = false;
            document.getElementById(submit_button_id).style.backgroundColor = BOT_THEME_COLOR;

            document.getElementById(stop_button_id).style.backgroundColor = "grey";
        }).catch(function(error) {
            console.error('stopRecording failure', error);
        });
    }, false);
    // We need this code in future for preview button
    // document.getElementById(preview_button_id).addEventListener("click", function() {
    //     this.disabled = true;
    //     var new_window = window.open("");
    //     inner_video_html = "<video controls><source type='video/webm' src='" + recorded_video_data_url + "'></video>";
    //     new_window.document.write(inner_video_html);
    //     document.getElementById(stop_button_id).disabled = true;
    //     document.getElementById(start_button_id).disabled = false;
    //     document.getElementById(submit_button_id).disabled = false;
    // }, false);

    document.getElementById(submit_button_id).addEventListener("click", function() {
        append_bot_text_response("Uploading your video. Please wait.");
        document.getElementById("global-canvas-video-capture").remove();
        document.getElementById("global-video-captured-response").remove();
        document.getElementById(stop_button_id).remove();
        document.getElementById(start_button_id).remove();
        document.getElementById(submit_button_id).remove();
        // document.getElementById(preview_button_id).style.display = 'none';
        attached_file_src = recorded_video_data_url
        file_extension = "mp4"
        send_message_to_server("attachment", user_id, bot_id, bot_name, "");
        recorded_video_data_url = null;

    }, false);
}

function append_video_recorder() {
    try {
        document.getElementById("global-canvas-video-capture").remove();
        document.getElementById("global-video-captured-response").remove();
        document.getElementById("btn-start-recording").remove();
        document.getElementById("btn-stop-recording").remove();
        document.getElementById("btn-submit-recording").remove();
    } catch (err) {}
    is_video_recorder_allowed = true
    var html = '<div class="col s12">\
    <div class="col s12" style="">\
        <div class="col s12">\
          <video class="responsive-video" id="global-video-captured-response" controls autoplay style="height:10em;" type="video/webm"></video>\
        </div>\
    </div>\
      <button id="btn-start-recording" style=background-color:' + BOT_THEME_COLOR + ';color:white;border-radius:7px;font-size:14px;height:30px;>Start</button>\
      <button id="btn-stop-recording" disabled="disabled" style=background-color:grey;color:white;border-radius:7px;font-size:14px;height:30px;>Stop</button>\
      <button id="btn-submit-recording" disabled="disabled" style=background-color:grey;color:white;border-radius:7px;font-size:14px;height:30px;>Submit</button>\
      <canvas style="display:none;" id="global-canvas-video-capture"></canvas>\
    </div>'
    document.getElementById("easychat-chat-container").innerHTML += html;
    element_response = document.querySelectorAll(".responsive-video")
    element_response_previous_height += element_response[element_response.length - 1].clientHeight

    start_capturing_video("global-video-captured-response", "global-canvas-video-capture", "btn-start-recording", "btn-stop-recording", "btn-stop-recording", true, "btn-submit-recording");
}

function change_span_name_to_file_name(el) {
    if (el.files[0] != undefined || el.files[0] != null) {
        var file_ext = el.files[0].name.split(".");
        file_ext = el.files[0].name.split(".")[file_ext.length - 1];
        if (document.getElementById("easychat-uploadfile__XPS").getAttribute("accept").toString().indexOf(file_ext.toLowerCase()) !== -1) {
            if (el.files[0].size <= 20 * 1024 * 1024) {
                document.getElementsByClassName("easychat-dragdropafterSelect__XPS")[0].style.backgroundColor = "white"
                document.getElementById("easychat-dragdropAlertMsg__XPS").style.fontSize = "unset"
                document.getElementsByClassName("easychat-dragdropafterSelect__XPS")[0].style.padding = "1em"
                document.getElementsByClassName("easychat-dragdropafterSelect__XPS")[0].style.boxShadow = "1px 1px 6px rgba(0, 0, 0, 0.2)"
                document.getElementsByClassName("easychat-dragdropafterSelect__XPS")[0].style.borderRadius = "1em"
                document.getElementById("easychat-dragdropAlertMsg__XPS").style.display = "inline-block"
                document.getElementById("easychat-dragdropAlertMsg__XPS").style.color = "black"
                file_name = el.files[0].name.split(".")
                file_length = file_name.length
                file_ext = parseInt(parseInt(file_length) - 1)
                    // console.log(file_ext)
                if (el.files[0].name.length >= 15) {
                    file_name_mod = file_name[0].slice(0, 15) + "... ." + file_name[file_name.length - 1]
                } else {
                    file_name_mod = el.files[0].name
                }
                document.getElementById("easychat-dragdropAlertMsg__XPS").innerHTML = file_name_mod + ' <span onclick="remove_file_from_attachment()" class="easychat-dragdropAlertMsgClose__XPS" style="color: ' + BOT_THEME_COLOR + ';">x</span>'
                document.getElementById("easychat-dragdropUploadBTN__XPS").style.display = "inline-block"
                document.getElementsByClassName("easychat-dragdropMsg__XPS")[0].style.display = "none"
                document.getElementsByClassName("easychat-dragdrop__XPS")[0].style.display = "none"
            } else {
                document.getElementById("easychat-dragdropAlertMsg__XPS").style.display = "inline-block"
                document.getElementById("easychat-dragdropAlertMsg__XPS").style.fontSize = "unset"
                document.getElementById("easychat-dragdropAlertMsg__XPS").style.color = "red"
                document.getElementById("easychat-dragdropAlertMsg__XPS").textContent = "Please Select file < 20MB*"
            }
        } else {
            document.getElementById("easychat-dragdropAlertMsg__XPS").style.display = "inline-block"
            document.getElementById("easychat-dragdropAlertMsg__XPS").style.fontSize = "unset"
            document.getElementById("easychat-dragdropAlertMsg__XPS").style.color = "red"
            document.getElementById("easychat-dragdropAlertMsg__XPS").textContent = "Please Select Correct File Type*"
        }
    } else {
        document.getElementById("easychat-dragdropAlertMsg__XPS").style.display = "inline-block"
        document.getElementById("easychat-dragdropAlertMsg__XPS").style.fontSize = "unset"
        document.getElementById("easychat-dragdropAlertMsg__XPS").style.color = "red"
        document.getElementById("easychat-dragdropAlertMsg__XPS").textContent = "No File Selected*"
        document.getElementById("easychat-dragdropUploadBTN__XPS").style.display = "none"
    }
}

function save_attachment_to_data_models(el, is_flow_ended) {
    disable_user_input();
    var attachment_data = document.querySelector('#easychat-uploadfile__XPS').files[0]
    document.getElementById("easychat-dragdropbottyping-loader").style.display = "inline-block"
    reader = new FileReader();
    reader.onloadend = function() {
        var b64 = reader.result.replace(/^data:.+;base64,/, '');
        var file_name = document.getElementById("easychat-dragdropAlertMsg__XPS").childNodes[0].textContent
        var file_ext = document.querySelector('#easychat-uploadfile__XPS').files[0].name
        file_ext = file_ext.split(".")
        file_ext = file_ext[file_ext.length - 1]
        setTimeout(function() {
            document.getElementById("easychat-dragdropbottyping-loader").style.display = "none"
            document.getElementsByClassName("easychat-dragdropContainer__XPS")[0].remove()
                // append_bot_text_response("Uploading " + file_name)
            attached_file_src = b64
            file_extension = file_ext
                // if(!is_flow_ended){
            send_message_to_server("attachment", user_id, bot_id, bot_name, "");
            // }
        }, 1000);
    };
    reader.readAsDataURL(attachment_data);
}


/*
// We are know using different method for stoing the file -> save_attachment_to_data_models()
function upload_attachment_to_server(el,is_flow_ended){
    var formData = new FormData();
    var upload_attachment_data = document.querySelector('#easychat-uploadfile__XPS').files[0]
    formData.append("upload_attachment", upload_attachment_data);
    document.getElementById("easychat-dragdropbottyping-loader").style.display = "inline-block"
    var xhttp = new XMLHttpRequest();
    var params = formData;
    xhttp.open("POST", "/chat/upload-attachment/", true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            if(response.status==200){
                            attached_file_src = response.src;
                    var file_name = document.getElementById("easychat-dragdropAlertMsg__XPS").childNodes[0].textContent
                    setTimeout(function(){
                    document.getElementById("easychat-dragdropbottyping-loader").style.display = "none"
                    document.getElementsByClassName("easychat-dragdropContainer__XPS")[0].remove()
                    append_bot_text_response(file_name+" has been successfully uploaded.")
                    if(!is_flow_ended){
                        send_message_to_server("attachment", user_id, bot_id, bot_name, "");
                    }
                    }, 1000);
            }
            else{
                document.getElementById("easychat-dragdropUploadBTN__XPS").style.display = "none"
                setTimeout(function(){
                    document.getElementById("easychat-dragdropbottyping-loader").style.display = "none"
                    document.getElementById("easychat-dragdropAlertMsg__XPS").style.color = "red"
                    document.getElementById("easychat-dragdropAlertMsg__XPS").innerHTML = "Unable to Upload"
                    setTimeout(function(){
                        remove_file_from_attachment();
                        }, 1000);
                }, 1000);
            }
        }
    }
    xhttp.send(params);
}*/

function remove_file_from_attachment() {
    document.getElementById("easychat-dragdropAlertMsg__XPS").innerHTML = ""
    document.getElementById("easychat-uploadfile__XPS").value = ""
    document.getElementById("easychat-dragdropUploadBTN__XPS").style.display = "none"
    document.getElementById("easychat-dragdropAlertMsg__XPS").style.display = "none"
    document.getElementsByClassName("easychat-dragdropMsg__XPS")[0].style.display = "block"
    document.getElementsByClassName("easychat-dragdrop__XPS")[0].style.display = "block"
    document.getElementsByClassName("easychat-dragdropafterSelect__XPS")[0].style.backgroundColor = "unset"
    document.getElementsByClassName("easychat-dragdropafterSelect__XPS")[0].style.padding = "0"
    document.getElementsByClassName("easychat-dragdropafterSelect__XPS")[0].style.boxShadow = "unset"
    document.getElementsByClassName("easychat-dragdropafterSelect__XPS")[0].style.borderRadius = "unset"
}


function append_bot_recommendation(recommendations_list) {
    var is_recommendation_menu = get_cookie("is_recommendation_menu")
    var recommendations_html = '';
    if (is_recommendation_menu == "true") {
        recommendations_html = '<div class="easychat-recommendation-wrapper-menu" align="left">';
        for (var i = 0; i < recommendations_list.length; i++) {
            recommendations_html += "<div class=\"easychat-recommendation-menu\" onmouseover='custom_button_change(this)' onmouseout='custom_button_change_normal(this)' style=\"border: 0.05em solid " + BOT_THEME_COLOR + ";color: " + BOT_THEME_COLOR + "\" onclick=\"send_selected_recommendation(this)\">" + recommendations_list[i] + "</div>";

            if (EASYCHAT_BOT_THEME == "theme_5" && i < recommendations_list.length - 1) {
                recommendations_html += '<hr class = "recommendations-menu-border">';
            }
        }
        recommendations_html += "</div>";

    } else {
        recommendations_html = '<div class="easychat-recommendation-wrapper" align="left">';

        for (var i = 0; i < recommendations_list.length; i++) {
            recommendations_html += "<div class=\"easychat-recommendation\" onmouseover='custom_button_change(this)' onmouseout='custom_button_change_normal(this)' style=\"border: 0.05em solid " + BOT_THEME_COLOR + ";color: " + BOT_THEME_COLOR + "\" onclick=\"send_selected_recommendation(this)\">" + recommendations_list[i] + "</div>";
        }
        recommendations_html += "</div>";
    }
    document.getElementById("easychat-chat-container").innerHTML += recommendations_html;
    try {
        element_response = document.querySelectorAll(".easychat-recommendation-wrapper-menu")
        element_response_previous_height += element_response[element_response.length - 1].clientHeight
    } catch (err) {
        element_response = document.querySelectorAll(".easychat-recommendation-wrapper")
        element_response_previous_height += element_response[element_response.length - 1].clientHeight
    }
    resize_chabot_window();
}

function append_bot_initial_questions(recommendations_list) {
    var recommendations_html = '<div class="easychat-initial-question-wrapper" align="left"><h6>Suggestions:</h6><div class = "easychat-initial-question-div">';

    for (var i = 0; i < recommendations_list.length; i++) {
        recommendations_html += '<div class="easychat-initial-question" style = "background: linear-gradient(180deg, ' + BOT_THEME_COLOR_LIGHT + ' 0%, ' + BOT_THEME_COLOR + ' 100%) !important;" onclick="send_selected_recommendation(this)"><p>' + recommendations_list[i] + '</p></div>';
    }

    recommendations_html += "</div></div>";

    document.getElementById("easychat-chat-container").innerHTML += recommendations_html;


    resize_chabot_window();
}

function append_bot_choices(choices_list) {
    var choices_html = '<div class="easychat-choices-wrapper">';
    for (var i = 0; i < choices_list.length; i++) {
        var display = choices_list[i]["display"];
        var value = choices_list[i]["value"];
        choices_html += '<button class="easychat-choices" onmouseover="custom_button_change(this)" onmouseout="custom_button_change_normal(this)" style=\"border: 0.05em solid ' + BOT_THEME_COLOR + ';color: ' + BOT_THEME_COLOR + '\" value="' + value + '" onclick="send_selected_choice(this)">' + display + '</button>';
    }
    choices_html += "</div>";
    document.getElementById("easychat-chat-container").innerHTML += choices_html;
    element_response = document.querySelectorAll(".easychat-choices-wrapper")
    element_response_previous_height += element_response[element_response.length - 1].clientHeight
}

function append_feedback_btns(feedback_id) {
    let el = document.getElementById("easychat-chat-container").lastChild.lastChild;
    let is_bot_icon_width_required = true;
    let paddingRight = '10px';
    try {
        if (el.classList.contains('easychat-datepicker-div') || el.classList.contains('easychat-timepicker-div')) {
            is_bot_icon_width_required = false;
        }

        if (el.classList.contains('easychat-recommendation') || el.classList.contains('easychat-datepicker-div') || el.classList.contains('easychat-timepicker-div')) {
            el = el.parentElement;
        }

        if (el.parentElement.classList.contains('easychat-range-slider-container')) {
            paddingRight = '6em';
        } else if (el.classList.contains('easychat-bot-table')) {
            paddingRight = '2em';
        }
    } catch (err) {}

    let el_style;
    const bot_icon_width = 35;
    try {
        el_style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
    } catch (err) {
        el = el.parentElement;
        el_style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
    }

    let width = parseInt(el_style.width)
    if (is_bot_icon_width_required) {
        width += bot_icon_width;
    }

    if (EASYCHAT_BOT_THEME == "theme_5") {
        var choices_html = '<div class="easychat-feedback-wrapper" style = "width:' + width + 'px; padding-right: ' + paddingRight + '">\
        <div id = "thumbs-up" onmouseover="change_thumbs_color(this)" onmouseout="change_thumbs_color_normal(this)" onclick="easychat_send_feedback_msg(this,' + feedback_id + ',1,\'\')" style = "margin: 10px;">\
        <svg style = "pointer-events: none;" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">\
        <ellipse id="thumbs-up-part-1" cx="19.5" cy="19.5" rx="18.5" ry="18.5" fill="white" stroke="#BABABA" stroke-width="2" ></ellipse>\
        <g clip-path="url(#clip0)">\
        <path id="thumbs-up-part-2" d="M13.9383 18.825C13.1345 18.825 12.48 19.4795 12.48 20.2833V24.9499C12.48 25.7538 13.1345 26.4083 13.9383 26.4083H15.6883C16.0167 26.4083 16.3189 26.2974 16.5633 26.1131V18.825H13.9383Z" fill="#BABABA"/>\
        <path id="thumbs-up-part-3" d="M26.4799 21.0125C26.4799 20.662 26.3411 20.3353 26.1002 20.0943C26.3726 19.7963 26.5114 19.3967 26.4735 18.9808C26.4053 18.2393 25.7373 17.6583 24.9522 17.6583H21.3489C21.5274 17.1164 21.8133 16.123 21.8133 15.325C21.8133 14.0598 20.7382 12.9917 20.0633 12.9917C19.4572 12.9917 19.0243 13.3329 19.0057 13.3469C18.9369 13.4024 18.8966 13.4864 18.8966 13.575V15.5531L17.2166 19.1925L17.1466 19.2281V25.4803C17.6214 25.7043 18.2223 25.825 18.6049 25.825H23.9594C24.5946 25.825 25.1505 25.3968 25.2812 24.806C25.3483 24.502 25.3092 24.1958 25.1756 23.9298C25.6067 23.7128 25.8966 23.2688 25.8966 22.7625C25.8966 22.556 25.8494 22.3583 25.7595 22.1792C26.1906 21.9622 26.4799 21.5183 26.4799 21.0125Z" fill="#BABABA"/>\
        </g>\
        <defs>\
        <clipPath id="clip0">\
        <rect width="14" height="14" fill="white" transform="translate(12.48 12.7)"/>\
        </clipPath>\
        </defs>\
        </svg>\
        </div>\
        <div id = "thumbs-down" onmouseover="change_thumbs_color(this)" onmouseout="change_thumbs_color_normal(this)" onclick="easychat_send_feedback_msg(this,' + feedback_id + ',-1,\'\')" style = "margin: 10px 0px 10px 10px;">\
        <svg style = "pointer-events: none;" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">\
        <ellipse cx="19.5" cy="19.5" rx="19.5" ry="19.5" fill="white"></ellipse>\
        <ellipse id="thumbs-down-part-1" cx="19.5" cy="19.5" rx="18.5" ry="18.5" stroke="#BABABA" stroke-width="2"></ellipse>\
        <path id="thumbs-down-part-2" d="M25.5417 20.875C26.3455 20.875 27 20.2205 27 19.4167V14.75C27 13.9462 26.3455 13.2917 25.5417 13.2917H23.7917C23.4633 13.2917 23.1611 13.4025 22.9167 13.5869V20.875H25.5417Z" fill="#CFCFCF"/>\
        <path id="thumbs-down-part-3" d="M13 18.6874C13 19.038 13.1389 19.3647 13.3798 19.6056C13.1074 19.9037 12.9685 20.3033 13.0065 20.7192C13.0747 21.4606 13.7426 22.0416 14.5278 22.0416H18.131C17.9525 22.5835 17.6667 23.5769 17.6667 24.3749C17.6667 25.6402 18.7418 26.7083 19.4167 26.7083C20.0228 26.7083 20.4557 26.367 20.4743 26.353C20.5431 26.2976 20.5834 26.2136 20.5834 26.1249V24.1469L22.2634 20.5074L22.3334 20.4719V14.2197C21.8585 13.9957 21.2577 13.8749 20.875 13.8749H15.5206C14.8854 13.8749 14.3294 14.3031 14.1988 14.894C14.1317 15.1979 14.1708 15.5042 14.3044 15.7702C13.8733 15.9872 13.5834 16.4311 13.5834 16.9374C13.5834 17.1439 13.6306 17.3417 13.7204 17.5208C13.2894 17.7378 13 18.1817 13 18.6874Z" fill="#CFCFCF"/>\
        </svg>\
        </div>\
    </div>';
    } else {
        var choices_html = '<div class="easychat-choices-wrapper">\
        <button class="easychat-choices" onmouseover="custom_button_change(this)" onmouseout="custom_button_change_normal(this)" style=\"border: 0.05em solid ' + BOT_THEME_COLOR + ';color: ' + BOT_THEME_COLOR + '\" onclick="easychat_send_feedback_msg(this,' + feedback_id + ',1,\'\')"><img src="/static/EasyChatApp/img/thumbs-up-filled.png" style="height:2em;"></button>\
        <button class="easychat-choices" onmouseover="custom_button_change(this)" onmouseout="custom_button_change_normal(this)" style=\"border: 0.05em solid ' + BOT_THEME_COLOR + ';color: ' + BOT_THEME_COLOR + '\" onclick="easychat_send_feedback_msg(this,' + feedback_id + ',-1,\'\')"><img src="/static/EasyChatApp/img/thumbs-down-filled.png" style="height:2em;"></button>\
    </div>';
    }

    document.getElementById("easychat-chat-container").innerHTML += choices_html;

    if (EASYCHAT_BOT_THEME == "theme_5") {
        try {
            element_response = document.querySelectorAll(".easychat-feedback-wrapper")
        } catch (err) {}
    } else {
        try {
            element_response = document.querySelectorAll(".easychat-choices-wrapper")
        } catch (err) {}
    }
    element_response_previous_height += element_response[element_response.length - 1].clientHeight
}

function change_thumbs_color(elem) {
    elem.style.cursor = "pointer";
    if (elem.id == "thumbs-up") {
        elem.innerHTML = '<svg style = "pointer-events: none;" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">\
                        <ellipse id="thumbs-up-part-1" cx="19.5" cy="19.5" rx="18.5" ry="18.5" fill="white" stroke="' + BOT_THEME_COLOR + '" stroke-width="2" ></ellipse>\
                        <g clip-path="url(#clip0)">\
                        <path id="thumbs-up-part-2" d="M13.9383 18.825C13.1345 18.825 12.48 19.4795 12.48 20.2833V24.9499C12.48 25.7538 13.1345 26.4083 13.9383 26.4083H15.6883C16.0167 26.4083 16.3189 26.2974 16.5633 26.1131V18.825H13.9383Z" fill="' + BOT_THEME_COLOR + '"/>\
                        <path id="thumbs-up-part-3" d="M26.4799 21.0125C26.4799 20.662 26.3411 20.3353 26.1002 20.0943C26.3726 19.7963 26.5114 19.3967 26.4735 18.9808C26.4053 18.2393 25.7373 17.6583 24.9522 17.6583H21.3489C21.5274 17.1164 21.8133 16.123 21.8133 15.325C21.8133 14.0598 20.7382 12.9917 20.0633 12.9917C19.4572 12.9917 19.0243 13.3329 19.0057 13.3469C18.9369 13.4024 18.8966 13.4864 18.8966 13.575V15.5531L17.2166 19.1925L17.1466 19.2281V25.4803C17.6214 25.7043 18.2223 25.825 18.6049 25.825H23.9594C24.5946 25.825 25.1505 25.3968 25.2812 24.806C25.3483 24.502 25.3092 24.1958 25.1756 23.9298C25.6067 23.7128 25.8966 23.2688 25.8966 22.7625C25.8966 22.556 25.8494 22.3583 25.7595 22.1792C26.1906 21.9622 26.4799 21.5183 26.4799 21.0125Z" fill="' + BOT_THEME_COLOR + '"/>\
                        </g>\
                        <defs>\
                        <clipPath id="clip0">\
                        <rect width="14" height="14" fill="white" transform="translate(12.48 12.7)"/>\
                        </clipPath>\
                        </defs>\
                        </svg>';
    } else {
        elem.innerHTML = '<svg style = "pointer-events: none;" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">\
                        <ellipse cx="19.5" cy="19.5" rx="19.5" ry="19.5" fill="white"></ellipse>\
                        <ellipse id="thumbs-down-part-1" cx="19.5" cy="19.5" rx="18.5" ry="18.5" stroke="' + BOT_THEME_COLOR + '" stroke-width="2"></ellipse>\
                        <path id="thumbs-down-part-2" d="M25.5417 20.875C26.3455 20.875 27 20.2205 27 19.4167V14.75C27 13.9462 26.3455 13.2917 25.5417 13.2917H23.7917C23.4633 13.2917 23.1611 13.4025 22.9167 13.5869V20.875H25.5417Z" fill="' + BOT_THEME_COLOR + '"/>\
                        <path id="thumbs-down-part-3" d="M13 18.6874C13 19.038 13.1389 19.3647 13.3798 19.6056C13.1074 19.9037 12.9685 20.3033 13.0065 20.7192C13.0747 21.4606 13.7426 22.0416 14.5278 22.0416H18.131C17.9525 22.5835 17.6667 23.5769 17.6667 24.3749C17.6667 25.6402 18.7418 26.7083 19.4167 26.7083C20.0228 26.7083 20.4557 26.367 20.4743 26.353C20.5431 26.2976 20.5834 26.2136 20.5834 26.1249V24.1469L22.2634 20.5074L22.3334 20.4719V14.2197C21.8585 13.9957 21.2577 13.8749 20.875 13.8749H15.5206C14.8854 13.8749 14.3294 14.3031 14.1988 14.894C14.1317 15.1979 14.1708 15.5042 14.3044 15.7702C13.8733 15.9872 13.5834 16.4311 13.5834 16.9374C13.5834 17.1439 13.6306 17.3417 13.7204 17.5208C13.2894 17.7378 13 18.1817 13 18.6874Z" fill="' + BOT_THEME_COLOR + '"/>\
                        </svg>';
    }
}

function change_thumbs_color_normal(elem) {
    if (elem.getAttribute("easychat-feedback-selected") == "true") { return; }

    if (elem.id == "thumbs-up") {
        elem.innerHTML = '<svg style = "pointer-events: none;" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">\
                        <ellipse id="thumbs-up-part-1" cx="19.5" cy="19.5" rx="18.5" ry="18.5" fill="white" stroke="#BABABA" stroke-width="2" ></ellipse>\
                        <g clip-path="url(#clip0)">\
                        <path id="thumbs-up-part-2" d="M13.9383 18.825C13.1345 18.825 12.48 19.4795 12.48 20.2833V24.9499C12.48 25.7538 13.1345 26.4083 13.9383 26.4083H15.6883C16.0167 26.4083 16.3189 26.2974 16.5633 26.1131V18.825H13.9383Z" fill="#BABABA"/>\
                        <path id="thumbs-up-part-3" d="M26.4799 21.0125C26.4799 20.662 26.3411 20.3353 26.1002 20.0943C26.3726 19.7963 26.5114 19.3967 26.4735 18.9808C26.4053 18.2393 25.7373 17.6583 24.9522 17.6583H21.3489C21.5274 17.1164 21.8133 16.123 21.8133 15.325C21.8133 14.0598 20.7382 12.9917 20.0633 12.9917C19.4572 12.9917 19.0243 13.3329 19.0057 13.3469C18.9369 13.4024 18.8966 13.4864 18.8966 13.575V15.5531L17.2166 19.1925L17.1466 19.2281V25.4803C17.6214 25.7043 18.2223 25.825 18.6049 25.825H23.9594C24.5946 25.825 25.1505 25.3968 25.2812 24.806C25.3483 24.502 25.3092 24.1958 25.1756 23.9298C25.6067 23.7128 25.8966 23.2688 25.8966 22.7625C25.8966 22.556 25.8494 22.3583 25.7595 22.1792C26.1906 21.9622 26.4799 21.5183 26.4799 21.0125Z" fill="#BABABA"/>\
                        </g>\
                        <defs>\
                        <clipPath id="clip0">\
                        <rect width="14" height="14" fill="white" transform="translate(12.48 12.7)"/>\
                        </clipPath>\
                        </defs>\
                        </svg>';
    } else {
        elem.innerHTML = '<svg style = "pointer-events: none;" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">\
                        <ellipse cx="19.5" cy="19.5" rx="19.5" ry="19.5" fill="white"></ellipse>\
                        <ellipse id="thumbs-down-part-1" cx="19.5" cy="19.5" rx="18.5" ry="18.5" stroke="#BABABA" stroke-width="2"></ellipse>\
                        <path id="thumbs-down-part-2" d="M25.5417 20.875C26.3455 20.875 27 20.2205 27 19.4167V14.75C27 13.9462 26.3455 13.2917 25.5417 13.2917H23.7917C23.4633 13.2917 23.1611 13.4025 22.9167 13.5869V20.875H25.5417Z" fill="#CFCFCF"/>\
                        <path id="thumbs-down-part-3" d="M13 18.6874C13 19.038 13.1389 19.3647 13.3798 19.6056C13.1074 19.9037 12.9685 20.3033 13.0065 20.7192C13.0747 21.4606 13.7426 22.0416 14.5278 22.0416H18.131C17.9525 22.5835 17.6667 23.5769 17.6667 24.3749C17.6667 25.6402 18.7418 26.7083 19.4167 26.7083C20.0228 26.7083 20.4557 26.367 20.4743 26.353C20.5431 26.2976 20.5834 26.2136 20.5834 26.1249V24.1469L22.2634 20.5074L22.3334 20.4719V14.2197C21.8585 13.9957 21.2577 13.8749 20.875 13.8749H15.5206C14.8854 13.8749 14.3294 14.3031 14.1988 14.894C14.1317 15.1979 14.1708 15.5042 14.3044 15.7702C13.8733 15.9872 13.5834 16.4311 13.5834 16.9374C13.5834 17.1439 13.6306 17.3417 13.7204 17.5208C13.2894 17.7378 13 18.1817 13 18.6874Z" fill="#CFCFCF"/>\
                        </svg>';
    }
}

function easychat_send_feedback_msg(element, feedback_id, feedback_type, feedback_cmt) {
    var elements = document.getElementsByClassName("easychat-intent-feedback-wrapper");
    try {
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[elements.length]);
        }
    } catch (err) {}

    for (var i = 0; i < element.parentElement.children.length; i++) {
        element.parentElement.children[i].style.backgroundColor = "white";
        element.parentElement.children[i].style.color = BOT_THEME_COLOR;
        element.parentElement.children[i].style.borderColor = BOT_THEME_COLOR;
        element.parentElement.children[i].removeAttribute("easychat-feedback-selected");
    }

    if (EASYCHAT_BOT_THEME == "theme_5") {
        if (element.id == "thumbs-up") {
            element.innerHTML = '<svg style = "pointer-events: none;" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">\
                            <ellipse id="thumbs-up-part-1" cx="19.5" cy="19.5" rx="18.5" ry="18.5" fill="white" stroke="' + BOT_THEME_COLOR + '" stroke-width="2" ></ellipse>\
                            <g clip-path="url(#clip0)">\
                            <path id="thumbs-up-part-2" d="M13.9383 18.825C13.1345 18.825 12.48 19.4795 12.48 20.2833V24.9499C12.48 25.7538 13.1345 26.4083 13.9383 26.4083H15.6883C16.0167 26.4083 16.3189 26.2974 16.5633 26.1131V18.825H13.9383Z" fill="' + BOT_THEME_COLOR + '"/>\
                            <path id="thumbs-up-part-3" d="M26.4799 21.0125C26.4799 20.662 26.3411 20.3353 26.1002 20.0943C26.3726 19.7963 26.5114 19.3967 26.4735 18.9808C26.4053 18.2393 25.7373 17.6583 24.9522 17.6583H21.3489C21.5274 17.1164 21.8133 16.123 21.8133 15.325C21.8133 14.0598 20.7382 12.9917 20.0633 12.9917C19.4572 12.9917 19.0243 13.3329 19.0057 13.3469C18.9369 13.4024 18.8966 13.4864 18.8966 13.575V15.5531L17.2166 19.1925L17.1466 19.2281V25.4803C17.6214 25.7043 18.2223 25.825 18.6049 25.825H23.9594C24.5946 25.825 25.1505 25.3968 25.2812 24.806C25.3483 24.502 25.3092 24.1958 25.1756 23.9298C25.6067 23.7128 25.8966 23.2688 25.8966 22.7625C25.8966 22.556 25.8494 22.3583 25.7595 22.1792C26.1906 21.9622 26.4799 21.5183 26.4799 21.0125Z" fill="' + BOT_THEME_COLOR + '"/>\
                            </g>\
                            <defs>\
                            <clipPath id="clip0">\
                            <rect width="14" height="14" fill="white" transform="translate(12.48 12.7)"/>\
                            </clipPath>\
                            </defs>\
                            </svg>';
        } else {
            element.innerHTML = '<svg style = "pointer-events: none;" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">\
                            <ellipse cx="19.5" cy="19.5" rx="19.5" ry="19.5" fill="white"></ellipse>\
                            <ellipse id="thumbs-down-part-1" cx="19.5" cy="19.5" rx="18.5" ry="18.5" stroke="' + BOT_THEME_COLOR + '" stroke-width="2"></ellipse>\
                            <path id="thumbs-down-part-2" d="M25.5417 20.875C26.3455 20.875 27 20.2205 27 19.4167V14.75C27 13.9462 26.3455 13.2917 25.5417 13.2917H23.7917C23.4633 13.2917 23.1611 13.4025 22.9167 13.5869V20.875H25.5417Z" fill="' + BOT_THEME_COLOR + '"/>\
                            <path id="thumbs-down-part-3" d="M13 18.6874C13 19.038 13.1389 19.3647 13.3798 19.6056C13.1074 19.9037 12.9685 20.3033 13.0065 20.7192C13.0747 21.4606 13.7426 22.0416 14.5278 22.0416H18.131C17.9525 22.5835 17.6667 23.5769 17.6667 24.3749C17.6667 25.6402 18.7418 26.7083 19.4167 26.7083C20.0228 26.7083 20.4557 26.367 20.4743 26.353C20.5431 26.2976 20.5834 26.2136 20.5834 26.1249V24.1469L22.2634 20.5074L22.3334 20.4719V14.2197C21.8585 13.9957 21.2577 13.8749 20.875 13.8749H15.5206C14.8854 13.8749 14.3294 14.3031 14.1988 14.894C14.1317 15.1979 14.1708 15.5042 14.3044 15.7702C13.8733 15.9872 13.5834 16.4311 13.5834 16.9374C13.5834 17.1439 13.6306 17.3417 13.7204 17.5208C13.2894 17.7378 13 18.1817 13 18.6874Z" fill="' + BOT_THEME_COLOR + '"/>\
                            </svg>';
        }
        element.setAttribute("easychat-feedback-selected", "true");
    } else {
        element.style.backgroundColor = BOT_THEME_COLOR;
        element.style.color = "white";
        element.style.borderColor = BOT_THEME_COLOR;
        element.setAttribute("easychat-feedback-selected", "true");
    }

    for (var i = 0; i < element.parentElement.children.length; i++) {
        //if(element.parentElement.children[i].hasAttribute("onclick")){element.parentElement.children[i].removeAttribute("onclick")}
        //if(element.parentElement.children[i].hasAttribute("onmouseout")){element.parentElement.children[i].removeAttribute("onmouseout")}
        //if(element.parentElement.children[i].hasAttribute("onmouseover")){element.parentElement.children[i].removeAttribute("onmouseover")}
    }

    easychat_send_feedback_message_to_server(feedback_id, feedback_type, feedback_cmt);

    var html = '<div class="easychat-intent-feedback-wrapper">\
                    <div class="easychat-intent-feedback-cmt-wrapper easychat-bot-message easychat-bot-message-line">\
                    <p style="margin: 0;\
    padding: 0.4em 0.3em 0.4em 0.6em;\
    max-height: 300px;\
    height: unset;\
    overflow-y: hidden;\
    transition: max-height 0.2s ease;">\
                    Please provide your feedback:\
                    </p>\
                    <p style="margin: 0;\
    padding: 0.4em 0.3em 0.4em 0.6em;\
    max-height: 300px;\
    height: unset;\
    overflow-y: hidden;\
    transition: max-height 0.2s ease;\
    display:none;\
    color:red"\
    id="feedback-empty-warning"\
    >\
                    Feedback can not be empty\
                    </p>\ '

    if (feedback_type == 1) {
        html += '<p> \
    <label><input type="radio" name="feedback-radio" value="Easy Communication"><span>Easy Communication</span></label> <br> \
    <label><input type="radio" name="feedback-radio" value="Fully Satisfied"><span>Fully Satisfied</span></label> <br>\
    <label><input type="radio" name="feedback-radio" value="Quick Response"><span>Quick Response</span></label> <br>\
    <label><input type="radio" name="feedback-radio" value="Query Resolved Quickly"><span>Query Resolved Quickly</span></label> <br>\
    <label><input type="radio" name="feedback-radio" value="Good Experience"><span>Good Experience</span></label> <br>\
    </p>\
    '
    } else if (feedback_type == -1) {
        html += '<p> \
        <label><input type="radio" name="feedback-radio" value="Inappropriate Answer,"><span>Inappropriate Answer</span></label> <br> \
        <label><input type="radio" name="feedback-radio" value="Response is slow"><span>Response is slow</span></label> <br>\
        <label><input type="radio" name="feedback-radio" value="Need more information"><span>Need more information</span></label> <br>\
        <label><input type="radio" name="feedback-radio" value="I couldn’t find what I was looking for"><span>I couldn’t find what I was looking for</span></label> <br>\
        <label><input type="radio" name="feedback-radio" value="Content is too complicated"><span>Content is too complicated</span></label> <br>\
        </p>\
        '
    }

    html += '<button onclick="easychat_submit_feedback_message_to_server(' + feedback_id + ',' + feedback_type + ')" style="margin: 10px 0;margin-right: 10px;float: right;">\
                    Submit\
                    </button>\
                </div>\
                </div>'
    document.getElementById("easychat-chat-container").innerHTML += html;
    scroll_to_bottom()
}

function easychat_submit_feedback_message_to_server(feedback_id, feedback_type) {

    var feedback_cmt = $("input[name='feedback-radio']:checked").val();
    feedback_cmt = feedback_cmt.trim();
    if (feedback_cmt.length == 0) {
        $("#feedback-empty-warning").css("display", "block");
        return;
    } else {
        $("#feedback-empty-warning").css("display", "none");
    }
    var elmnt = document.getElementsByClassName("easychat-intent-feedback-wrapper")[
        document.getElementsByClassName("easychat-intent-feedback-wrapper").length - 1]
    elmnt.setAttribute("feedback_submitted", "true");

    if (EASYCHAT_BOT_THEME == "theme_5") {
        elmnt.innerHTML = '<div class="easychat-bot-message easychat-bot-message-line">\
        <p style="margin: 12px 17px 11px 17px;\
        max-height: 300px;\
        height: unset;\
        overflow-y: hidden;\
        transition: max-height 0.2s ease;">\
                        Thank you for your feedback\
                        </p>\
                </div>';
    } else {
        elmnt.innerHTML = '<div class="easychat-intent-feedback-cmt-wrapper easychat-bot-message easychat-bot-message-line">\
        <p style="margin: 0;\
        padding: 0.4em 0.3em 0.4em 0.6em;\
        max-height: 300px;\
        height: unset;\
        overflow-y: hidden;\
        transition: max-height 0.2s ease;">\
                        Thank you for your feedback\
                        </p>\
                </div>';
    }

    //scroll_to_bottom()
    easychat_send_feedback_message_to_server(feedback_id, feedback_type, feedback_cmt);
    element_response = document.querySelectorAll(".easychat-bot-message-line")
    element_response_previous_height += element_response[element_response.length - 1].clientHeight
    try {
        //document.querySelector(".easychat-choices-wrapper").remove();
        var easychat_choices_wrapper_query_selector = document.querySelectorAll(".easychat-choices-wrapper");
        easychat_choices_wrapper_query_selector[easychat_choices_wrapper_query_selector.length - 1].remove()
    } catch (err) {}
    try {
        // document.querySelector(".easychat-feedback-wrapper").remove();
        var easychat_feedback_wrapper_query_selector = document.querySelectorAll(".easychat-feedback-wrapper");
        easychat_feedback_wrapper_query_selector[easychat_feedback_wrapper_query_selector.length - 1].remove()
    } catch (err) { console.log(err) }
}

function easychat_send_feedback_message_to_server(feedback_id, feedback_type, feedback_cmt) {
    var json_string = JSON.stringify({
        feedback_id: feedback_id,
        feedback_type: feedback_type,
        feedback_cmt: feedback_cmt
    });
    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", EASYCHAT_FEEDBACK_SAVE_URL, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
        }
    }
    xhttp.send(params);
}

function append_bot_tables(table_list) {
    var tables_html = '<!--<style>table {border-left: 0;border-spacing: 0px;box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);background-color: white;}th,td {    padding: 5px 4px 6px 4px; text-align: left; vertical-align: top;}tr {display: table-row;    vertical-align: inherit;    border-color: inherit;}td {    border-top: 1px solid #000;word-break: break-all;    min-width: 65px;}th {    text-align: center;background-color: #9D1D27;    color: white;}</style>--><div style="margin-top:0.3em;width:100%;display:inline-block;border-radius:10px;overflow:hidden"><table class="easychat-bot-table"><tbody>';
    for (var row_index = 0; row_index < table_list.length; row_index++) {
        tables_html += "<tr>";
        if (row_index == 0) {
            for (var col_index = 0; col_index < table_list[row_index].length; col_index++) {
                tables_html += "<th style=background-color:" + BOT_THEME_COLOR + ">" + table_list[row_index][col_index] + "</th>";
            }
        } else {
            for (var col_index = 0; col_index < table_list[row_index].length; col_index++) {
                tables_html += "<td>" + table_list[row_index][col_index] + "</td>";
            }
        }
        tables_html += "</tr>";
    }
    tables_html += '</tbody></table></div>';
    document.getElementById("easychat-chat-container").innerHTML += tables_html;
    element_response = document.querySelectorAll(".easychat-bot-table")
    element_response_previous_height += element_response[element_response.length - 1].clientHeight
}

function append_datepicker(datepicker_list) {
    if (datepicker_list.length > 0) {
        datepicker_container = document.getElementById("easychat-datepicker-container");
        if (datepicker_container != undefined && datepicker_container != null) {
            datepicker_container.remove();
        }

        var datepicker_html = '<div class="easychat-datepicker-container"  align="center" id="easychat-datepicker-container">';
        if (EASYCHAT_BOT_THEME == "theme_5") {
            for (var i = 0; i < datepicker_list.length; i++) {
                datepicker_html += '<div style="width:50%" class="easychat-datepicker-div"><br>\
                ' + datepicker_list[i]["placeholder"] + ' <input type="date" style="width:83%" name="datepicker" class="easychat-datepicker" id="easychat-datepicker-' + i + '" onchange="append_selected_date_into_user_query(this)" placeholder="' + datepicker_list[i]["placeholder"] + '">\
                </div>';
            }
        } else {
            for (var i = 0; i < datepicker_list.length; i++) {
                datepicker_html += '<div style="width:100%"><br>\
                ' + datepicker_list[i]["placeholder"] + ' <input type="date" name="datepicker" class="easychat-datepicker" id="easychat-datepicker-' + i + '" onchange="append_selected_date_into_user_query(this)" placeholder="' + datepicker_list[i]["placeholder"] + '">\
                </div>';
            }
        }
        datepicker_html += "</div>";

        document.getElementById("easychat-chat-container").innerHTML += datepicker_html;
        element_response = document.querySelectorAll("#easychat-datepicker-container")
        element_response_previous_height += element_response[element_response.length - 1].clientHeight
    }
}

function append_timepicker(timepicker_list) {
    if (timepicker_list.length > 0) {
        timepicker_container = document.getElementById("easychat-timepicker-container");
        if (timepicker_container != undefined && timepicker_container != null) {
            timepicker_container.remove();
        }

        var timepicker_html = '<div class="easychat-timepicker-container"  align="center" id="easychat-timepicker-container">';
        for (var i = 0; i < timepicker_list.length; i++) {
            timepicker_html += '<div style="width:100%" class="easychat-timepicker-div"><br>\
            ' + timepicker_list[i]["placeholder"] + ' <input type="time" name="timepicker" class="easychat-timepicker" id="easychat-timepicker-' + i + '" onchange="append_selected_time_into_user_query(this)" placeholder="' + timepicker_list[i]["placeholder"] + '">\
            </div>';
        }
        timepicker_html += "</div>";

        document.getElementById("easychat-chat-container").innerHTML += timepicker_html;
    }
}

function append_selected_date_into_user_query(element) {
    activate_query_submit_button();
    easychat_datepicker_list = document.getElementsByClassName("easychat-datepicker");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var user_input = "";
    for (var i = 0; i < easychat_datepicker_list.length; i++) {
        var date_input_value = easychat_datepicker_list[i].value
        var dd_MM_yyyy = ""
        if (date_input_value.split("-").length == 3) {
            var date_input = new Date(date_input_value);
            var day = date_input.getDate();
            var month = date_input.getMonth();
            month = monthNames[month]
            var year = date_input.getFullYear();
            dd_MM_yyyy = day + "-" + month + "-" + year;
        }
        user_input += easychat_datepicker_list[i].placeholder + ": " + dd_MM_yyyy;
        if (i != easychat_datepicker_list.length - 1) {
            user_input += ", ";
        }
    }
    document.getElementById("user_input").value = user_input;
    is_remove_widget = true;
    disable_user_input();
}


function append_radio_buttons(radio_button_choices) {
    if (radio_button_choices.length > 0) {

        radio_button_container = document.getElementById("easychat-radio-button-container");
        if (radio_button_container != undefined && radio_button_container != null) {
            radio_button_container.remove();
        }

        var radio_button_html = '<div class="easychat-radio-button-container"  align="left" id="easychat-radio-button-container">';

        if (EASYCHAT_BOT_THEME == "theme_5") {
            radio_button_html += '<div style = "margin: 10px 0px;">'
            for (var i = 0; i < radio_button_choices.length; i++) {
                radio_button_html +=
                    '<div style="width:inherit; padding: 5px 10px 8px 7px" id="easychat-radio-div-' + i + '">\
                        <label>\
                        <input type="radio" name="radio_button" class="easychat-radio" id="easychat-radio-' + i + '" onclick="select_radio_choice(this,' + i + ',' + radio_button_choices.length + ')" value=\"' + radio_button_choices[i] + '\">\
                        <span style="font-family: "Silka", Sans-Serif;"><th style="font-weight:inherit;text-align: left;">' + radio_button_choices[i] + '</th></span>\
                        </label>\
                    </div>'
            }
            radio_button_html += "</div>"

        } else {
            for (var i = 0; i < radio_button_choices.length; i++) {
                radio_button_html += '<table><tbody>'
                radio_button_html +=
                    '<tr>\
                    <th style="font-weight:inherit">\
                        <label>\
                        <input type="radio" name="radio_button" class="easychat-radio" id="easychat-radio-' + i + '" onclick="append_selected_radio_choice_into_user_query(this)" value=\"' + radio_button_choices[i] + '\">\
                        <span style="font-family: "Silka", Sans-Serif;"><th style="font-weight:inherit;text-align: left;">' + radio_button_choices[i] + '</th></span>\
                        </label>\
                    </th>\
                </tr>'
            }
            radio_button_html += "</tbody></table>"
        }

        radio_button_html += "</div>";

        document.getElementById("easychat-chat-container").innerHTML += radio_button_html;
        element_response = document.querySelectorAll(".easychat-radio-button-container")
        element_response_previous_height += element_response[element_response.length - 1].clientHeight
    }

}

function select_radio_choice(element, index, choices_length) {
    var selected_div_id = 'easychat-radio-div-' + index;
    document.getElementById(selected_div_id).style.border = '1px solid' + BOT_THEME_COLOR;
    document.getElementById(selected_div_id).style.borderRadius = '100px';

    for (let i = 0; i < choices_length; ++i) {
        if (i != index) {
            var selected_div_id = 'easychat-radio-div-' + i;
            document.getElementById(selected_div_id).style.border = 'none';
        }
    }
    append_selected_radio_choice_into_user_query(element);
}

function append_selected_radio_choice_into_user_query(element) {
    activate_query_submit_button();
    var user_input = element.value;
    document.getElementById("user_input").value = user_input;
    widget_user_selected_list = user_input.split();
    is_remove_widget = true;
    disable_user_input();
}


function append_checkbox(check_box_choices) {
    if (check_box_choices.length > 0) {

        checkbox_container = document.getElementById("easychat-check-box-container");
        if (checkbox_container != undefined && checkbox_container != null) {
            checkbox_container.remove();
        }

        var check_box_html = '<div class="easychat-check-box-container"  align="left" id="easychat-check-box-container">';

        if (EASYCHAT_BOT_THEME == "theme_5") {
            check_box_html += '<div style = "margin: 10px 0px;">'
            for (var i = 0; i < check_box_choices.length; i++) {
                check_box_html +=
                    '<div style = "width: inherit; padding: 10px 3px 3px 10px; margin: 5px 0px;">\
                        <label>\
                            <input type="checkbox" class="easychat-check-box" id="easychat-checkbox-' + i + '" onclick="select_checkbox(this)" value=\"' + check_box_choices[i] + '\">\
                            <span style="font-family: \'Silka\', Sans-Serif;"><th style="font-weight:inherit;text-align: left;">' + check_box_choices[i] + '</th></span>\
                        </label>\
                    </div>'
            }
            check_box_html += "</div>"
        } else {
            check_box_html += '<table><tbody>'
            for (var i = 0; i < check_box_choices.length; i++) {
                check_box_html +=
                    '<tr>\
                    <th style="font-weight:inherit">\
                        <label>\
                            <input type="checkbox" class="easychat-check-box" id="easychat-checkbox-' + i + '" onclick="append_selected_check_box_into_user_query(this)" value=\"' + check_box_choices[i] + '\">\
                            <span style="font-family: "Silka", Sans-Serif;"><th style="font-weight:inherit;text-align: left;">' + check_box_choices[i] + '</th></span>\
                        </label>\
                    </th>\
                </tr>'
            }
            check_box_html += "</tbody></table>"
        }
        check_box_html += "</div>";

        document.getElementById("easychat-chat-container").innerHTML += check_box_html;
        element_response = document.querySelectorAll(".easychat-check-box-container")
        element_response_previous_height += element_response[element_response.length - 1].clientHeight
    }

}

function select_checkbox(element, i) {
    var checked = element.checked;
    var parentDiv = element.parentElement.parentElement;

    if (checked) {
        parentDiv.style.border = "1px solid " + BOT_THEME_COLOR;
        parentDiv.style.borderRadius = "100px";
    } else {
        parentDiv.style.border = "none";
    }

    append_selected_check_box_into_user_query(element)
}

function append_selected_check_box_into_user_query(element) {
    activate_query_submit_button();
    var user_input = element.value;
    var user_input_element = document.getElementById("user_input").value;

    if (user_input_element == "") {
        if (document.getElementById(element.id).checked) {
            document.getElementById("user_input").value = user_input;
        } else {
            document.getElementById("user_input").value = document.getElementById("user_input").value.replace(user_input, "")
        }
    } else {
        if (document.getElementById(element.id).checked) {
            document.getElementById("user_input").value = user_input_element + ", " + user_input;
        } else {
            var input = user_input_element.split(",")
            if (input.slice(-1)[0].trim() == user_input) {
                if (user_input_element.indexOf(', ') > -1) {
                    document.getElementById("user_input").value = document.getElementById("user_input").value.replace(", " + user_input, "")
                } else {
                    document.getElementById("user_input").value = document.getElementById("user_input").value.replace(user_input, "")
                }
            } else if (user_input_element.indexOf(', ') > -1) {
                document.getElementById("user_input").value = document.getElementById("user_input").value.replace(user_input + ", ", "")
            } else {
                document.getElementById("user_input").value = document.getElementById("user_input").value.replace(user_input, "")
            }
        }
    }
    widget_user_selected_list = document.getElementById("user_input").value.split(",")
    is_remove_widget = true;
    disable_user_input();
}

function click_dropdown(elem) {
    $(".easychat-widget-dropdown-content").toggleClass("easychat-display-dropdown");
    scroll_to_bottom();
}

function append_dropdown(drop_down_choices) {
    if (drop_down_choices.length > 0) {

        dropdown_container = document.getElementById("easychat-drop-down-container");
        if (dropdown_container != undefined && dropdown_container != null) {
            dropdown_container.remove();
        }

        var drop_down_html = '<div class="easychat-drop-down-container" onclick="click_dropdown(this)">\
        <button class="dropbtn">Choose from the following <svg width="24" height="9" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="dropdown-arrow" d="M12.2384 15.4351C11.4053 16.6642 9.59467 16.6642 8.76165 15.4351L1.03047 4.02818C0.0853811 2.63374 1.0843 0.75 2.76883 0.75L18.2312 0.749999C19.9157 0.749998 20.9146 2.63375 19.9695 4.02818L12.2384 15.4351Z" fill="#C4C4C4"/></svg></button>\
        <div class="easychat-widget-dropdown-content">'
        drop_down_html += '<input type = "text" id = "dropdown-search-input" class = "dropdown-search" onclick = "click_dropdown(this)" autocomplete="off" placeholder = "Search.."/>'
        drop_down_html += '<div id = "dropdown_choices"><a href="#" style = "display:none;"></a>'

        for (var i = 0; i < drop_down_choices.length; i++) {
            drop_down_html += '<a href="#" onclick="append_selected_drop_down_into_user_query(this); return false;"> ' + drop_down_choices[i] + '</a>'
        }
        drop_down_html += '</div></div> </div>'

        document.getElementById("easychat-chat-container").innerHTML += drop_down_html;
        element_response = document.querySelectorAll(".easychat-drop-down-container")
        element_response_previous_height += element_response[element_response.length - 1].clientHeight

        var original_height = 0,
            el;

        $(function() {
            $("#dropdown-search-input").on("change paste keyup", function() {
                if (original_height == 0) {
                    el = document.getElementsByClassName('easychat-widget-dropdown-content')[0];
                    var el_style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
                    original_height = parseInt(el_style.height);
                }

                var inputVal = $(this).val();
                var elem = document.getElementById('dropdown_choices');

                if (inputVal != '') {
                    drop_down_html = '<a href="#" style = "display:none;"></a>'
                    var is_empty = true;
                    for (var i = 0; i < drop_down_choices.length; i++) {
                        if (drop_down_choices[i].toUpperCase().indexOf(inputVal.toUpperCase()) != -1) {
                            drop_down_html += '<a href="#" onclick="append_selected_drop_down_into_user_query(this); return false;"> ' + drop_down_choices[i] + '</a>';
                            is_empty = false;
                        }
                    }

                    if (is_empty) {
                        drop_down_html = '<a href="#">No results found</a>'
                    }
                } else {
                    drop_down_html = '<a href="#" style = "display:none;"></a>'

                    for (var i = 0; i < drop_down_choices.length; i++) {
                        drop_down_html += '<a href="#" onclick="append_selected_drop_down_into_user_query(this); return false;"> ' + drop_down_choices[i] + '</a>';
                    }
                }

                elem.innerHTML = drop_down_html;

                var el_style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
                var height = parseInt(el_style.height);
                if (height < original_height) {
                    el.style.marginBottom = (original_height - height) + 10 + 'px';
                    scroll_to_bottom();
                } else {
                    el.style.marginBottom = '10px';
                    scroll_to_bottom();
                }
            });
        });

    }

}

function append_selected_drop_down_into_user_query(element) {
    activate_query_submit_button();
    document.getElementById("user_input").value = element.text;
    widget_user_selected_list = document.getElementById("user_input").value.split()
    is_remove_widget = true;
    disable_user_input();
}


function append_selected_time_into_user_query(element) {
    activate_query_submit_button();
    easychat_timepicker_list = document.getElementsByClassName("easychat-timepicker");
    var user_input = "";
    for (var i = 0; i < easychat_timepicker_list.length; i++) {
        var time_input_value = easychat_timepicker_list[i].value
        var hh_mm = ""
        if (time_input_value.split(":").length == 2) {
            var H = +time_input_value.substr(0, 2);
            var h = H % 12 || 12;
            var ampm = (H < 12 || H === 24) ? " AM" : " PM";
            time_input_value = h + time_input_value.substr(2, 3) + ampm;
            hh_mm = time_input_value
        }
        user_input += easychat_timepicker_list[i].placeholder + ": " + hh_mm;
        if (i != easychat_timepicker_list.length - 1) {
            user_input += ", ";
        }
    }
    document.getElementById("user_input").value = user_input;
    is_remove_widget = true;
    disable_user_input();
}


function append_bot_range_slider(range_slider_list) {
    if (range_slider_list.length > 0) {
        easychat_range_slider_container = document.getElementById("easychat-range-slider-container");
        if (easychat_range_slider_container != undefined && easychat_range_slider_container != null) {
            easychat_range_slider_container.remove();
        }

        var range_slider_html = '<div class="easychat-range-slider-container" id="easychat-range-slider-container">';
        for (var i = 0; i < range_slider_list.length; i++) {
            range_slider = range_slider_list[i];
            range_slider_html += '<div style="width:100%;display:inline-block;">\
              <p>Min: ' + range_slider["min"] + ', Max: ' + range_slider["max"] + '</p>\
              <p>' + range_slider["placeholder"] + ': <span id="easychat-range-slider-value-' + i + '"></span></p>\
              <div class = "range-slider-div">\
              <input class = "range-slider-input easychat-range-slider" type="range" min="' + range_slider["min"] + '" max="' + range_slider["max"] + '" value="' + range_slider["max"] + '" id="easychat-range-slider-' + i + '" onchange="append_selected_value_into_user_query(this)" placeholder="' + range_slider["placeholder"] + '">\
            </div></div>';
        }
        range_slider_html += '</div>';
        document.getElementById("easychat-chat-container").innerHTML += range_slider_html;
        element_response = document.querySelectorAll(".easychat-range-slider-container")
        element_response_previous_height += element_response[element_response.length - 1].clientHeight

        disable_user_input();
        /*for (var i = 0; i < range_slider_list.length; i++) {
            document.getElementById("easychat-range-slider-" + i).onchange();
        }*/
    }
}

function append_selected_value_into_user_query(element) {
    activate_query_submit_button();
    range_count = element.id.split("-")[3];
    document.getElementById("easychat-range-slider-value-" + range_count).innerHTML = element.value;
    var user_input = "";
    easychat_range_slider_list = document.getElementsByClassName("easychat-range-slider");
    for (var i = 0; i < easychat_range_slider_list.length; i++) {
        range_slider_element = easychat_range_slider_list[i];
        user_input += range_slider_element.placeholder + ": " + range_slider_element.value;
        if (i != easychat_range_slider_list.length - 1) {
            user_input += ", ";
        }
    }
    document.getElementById("user_input").value = user_input;
    is_remove_widget = true;
    disable_user_input();
}

function append_create_form_modal(form_name, form_fields_list) {
    form_fields_list = JSON.parse(form_fields_list);
    widget_form_name = form_name;
    form_fields = form_fields_list;
    form_fields_length = form_fields_list.length;

    if (form_fields_list.length > 0) {
        let html = '\
        <div class="easychat-form-container" id="easychat-form-container">\
            <h5>' + form_name + '</h5>';

        var dropdown_ids = []
        for (let i = 0; i < form_fields_list.length; ++i) {
            let id = "input-" + i;
            html += '\
            <div class="input-field-custom">\
                <label for="' + id + '">' + form_fields_list[i].label_name + '</label>\
            ';

            if (form_fields_list[i].input_type == "text_field") {
                html += '<input type="text" id="' + id + '" class="easychat-form-input" placeholder="' + form_fields_list[i].placeholder_or_options + '" autocomplete="off">\
                                </div>\
                ';
            } else {
                dropdown_ids.push(id);
                html += '<select id="' + id + '" class="easychat-form-select-input" ><option selected></option>';

                let options = form_fields_list[i].placeholder_or_options.split('$$$');
                for (let j = 0; j < options.length; ++j) {
                    let option = options[j].trim();

                    html += '<option value="' + option + '">' + option + '</option>';
                }

                html += '</select></div>';
            }
        }

        html += '<div style = "height: 5em;"><input class="livechat-modal-submit-btn" style="background-color:' + BOT_THEME_COLOR + ' ; float: right;"onclick="submit_form_confirmation()" type="submit" value="Submit">'
        html += '<input type = "button" value = "Cancel" class = "easychat-customer-modal-cancel-btn" onclick="remove_form_from_container(this)" style = "float: right;"></div>';

        html += '</div>';

        document.getElementById('easychat-chat-container').innerHTML += html;

        setTimeout(function() {
            for (let i = 0; i < dropdown_ids.length; ++i) {
                $('#' + dropdown_ids[i]).select2({
                    width: "100%",
                    placeholder: "Select from dropdown",
                    allowClear: true,
                });
            }
        }, 200)
    }

}

function remove_form_from_container(elem) {
    elem.parentElement.parentElement.remove();
    enable_user_input();
}

function submit_form_confirmation() {
    for (let i = 0; i < form_fields_length; ++i) {
        let input_val = document.getElementById('input-' + i).value;
        if (input_val == "") {
            alert('Please fill the form');
            return;
        }
    }
    document.getElementById('submit-form-confirmation-modal').style.display = 'flex';
}

function cancel_form_submission() {
    document.getElementById('submit-form-confirmation-modal').style.display = 'none';
}

function submit_form_widget() {
    let html = '<div class = "easychat-form-container"><h5>' + widget_form_name + '</h5>';

    let form_data = {};
    for (let i = 0; i < form_fields_length; ++i) {
        html += '<p class= "easychat-form-label">' + form_fields[i].label_name + '</p>'

        let input_val = document.getElementById('input-' + i).value;
        html += '<p class="easychat-form-value">' + input_val + '</p>';

        if (i != form_fields_length - 1) {
            html += '<hr style = "border: 1px solid #e6e6e6">';
        }

        form_data[form_fields[i].label_name] = input_val;
    }

    html += '</div>';

    document.getElementById('easychat-chat-container').innerHTML += html;
    document.getElementById('easychat-form-container').remove()
    document.getElementById('submit-form-confirmation-modal').style.display = 'none';

    var json_string = JSON.stringify({
        user_id: user_id,
        form_name: widget_form_name,
        form_data: form_data
    });

    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", '/chat/save-form-data/', true);

    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            entered_suggestion = false;
            response = JSON.parse(this.responseText);
            response = custom_decrypt(response)
            response = JSON.parse(response);

            if (response.status == 200) {
                console.log('Form data saved!');
            }
        }
    }
    xhttp.send(params);

    enable_user_input();
    scroll_to_bottom();
}

function show_bot_typing_loader() {

    var element = document.getElementById("div-bottyping-loader")
    if (element == null || element == undefined) {
        if (EASYCHAT_BOT_THEME == "theme_5") {
            document.getElementById("easychat-chat-container").innerHTML += '<div class="spinner" id="div-bottyping-loader" style="display: block;">\
                                                                                <div class="bounce1"></div>\
                                                                                <div class="bounce2"></div>\
                                                                                <div class="bounce3"></div>\
                                                                            </div>'
        } else {
            document.getElementById("easychat-chat-container").innerHTML += '<div style="width:100%;float:left;display:inline-block;" id="div-bottyping-loader"><img src="' + EASYCHAT_IMG_PATH + 'preloader.svg" style="height:3em;"></div>';
        }
        scroll_to_bottom()
    }
}


function show_start_bot_loader() {
    if (EASYCHAT_BOT_THEME == "theme_5") {
        document.getElementById("easychat-chat-container").innerHTML += '<div class="spinner" id="div-bot-start-loader" style="display: block;">\
                                                                            <div class="bounce1"></div>\
                                                                            <div class="bounce2"></div>\
                                                                            <div class="bounce3"></div>\
                                                                        </div>'
    } else {
        document.getElementById("easychat-chat-container").innerHTML += '<div style="width:100%;float:left;padding-left:28%;padding-top:46%" id="div-bot-start-loader"><img src="' + EASYCHAT_IMG_PATH + 'preloader.svg" style="height:12em;"></div>';
    }
}

function hide_start_bot_loader() {
    document.getElementById("div-bot-start-loader").remove();
}

function hide_bot_typing_loader() {

    var element = document.getElementById("div-bottyping-loader")
    if (element != null || element != undefined) {
        document.getElementById("div-bottyping-loader").remove();
    }
}

function send_message_to_server(message, userid, bot_id, bot_name, channel_params, path) {
    is_bot_response_message_showed = false
    if (bot_response_delay_allowed) {
        reset_bot_response_delay_timer();
    }
    if (path === undefined) {
        path = ""
    }
    window.clearTimeout(bot_inactivity_timer);
    if (is_livechat == true && is_chat_socket_open && chat_socket != null) {
        save_customer_chat(message, livechat_session_id, "Customer", path, "");
        var sentence = JSON.stringify({
            'message': JSON.stringify({ "text_message": message, "type": "text", "channel": "Web", "path": path }),
            'sender': 'Customer',
        });
        chat_socket.send(sentence);
        return;
    }

    var element = document.getElementsByClassName("easychat-dragdropContainer__XPS")[0]
    if (element != null && element != undefined) {
        element.remove()
    }

    document.getElementById("easychat-chat-container").click();
    show_bot_typing_loader();
    disable_user_input();

    data = {
        "session_id": session_id,
        "window_location": decodeURIComponent(window_location),
        "is_form_assist": form_assist_enabled,
        "attached_file_src": attached_file_src,
        "file_extension": file_extension,
        "is_save_attachment_required": is_save_attachment_required,
        "widget_user_selected_list": widget_user_selected_list,
        "is_sticky_message": is_sticky_message,
        "is_video_recorder_allowed": is_video_recorder_allowed,
        "is_go_back_enabled": is_go_back_enabled,
        "entered_suggestion": entered_suggestion,
        "is_campaign_link": is_campaign_link
    }
    if (embed_cookies != "" && embed_cookies != null && embed_cookies != undefined) {
        embed_cookies_decrypted = custom_decrypt(embed_cookies)
        embed_cookies_decrypted = JSON.parse(embed_cookies_decrypted)
        try {
            data = Object.assign({}, data, embed_cookies_decrypted);
        } catch (err) {
            for (key in embed_cookies_decrypted) {
                data[key] = embed_cookies_decrypted[key];
            }
        }
    }
    if (embed_meta_data != "" && embed_meta_data != null && embed_meta_data != undefined) {
        embed_meta_data_decrypted = custom_decrypt(embed_meta_data)
        embed_meta_data_decrypted = JSON.parse(embed_meta_data_decrypted)
        try {
            data = Object.assign({}, data, embed_meta_data_decrypted);
        } catch (err) {
            for (key in embed_meta_data_decrypted) {
                data[key] = embed_meta_data_decrypted[key];
            }
        }
    }

    try {
        var thumbs_down_queryselector = document.querySelectorAll("#thumbs-down");
        for (i = 0; i < thumbs_down_queryselector.length; i++) {
            thumbs_down_queryselector[i].removeAttribute('onclick');
            thumbs_down_queryselector[i].removeAttribute('onmouseover');
            thumbs_down_queryselector[i].removeAttribute('onmouseout');
            thumbs_down_queryselector[i].style.cursor = "unset";
        }
    } catch (err) {}
    try {
        var thumbs_up_queryselector = document.querySelectorAll("#thumbs-up");
        for (i = 0; i < thumbs_up_queryselector.length; i++) {
            thumbs_up_queryselector[i].removeAttribute('onclick');
            thumbs_up_queryselector[i].removeAttribute('onmouseover');
            thumbs_up_queryselector[i].removeAttribute('onmouseout');
            thumbs_up_queryselector[i].style.cursor = "unset";
        }
    } catch (err) {}

    channel_params = JSON.stringify(data);
    var json_string = JSON.stringify({
        query_token_id: query_token_id,
        message: message,
        user_id: userid,
        channel: "Web",
        channel_params: channel_params,
        bot_id: bot_id,
        bot_name: bot_name,
        bot_display_name: bot_name
    });
    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", EASYCHAT_QUERY_URL, true);

    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            entered_suggestion = false;
            response = JSON.parse(this.responseText);
            response = custom_decrypt(response)
            response = JSON.parse(response);
            user_id = response.user_id;
            query_token_id = response.query_token_id
            var date = new Date();
            date.setTime(date.getTime() + (BOT_USER_ID_EXPIRATION * 60 * 1000));
            parent.postMessage({
                event_id: 'set_cookie',
                data: {
                    cookie_value: user_id,
                    cookie_name: "easychat_userid",
                    expiration: date.toGMTString(),
                    path: ""
                }
            }, "*")
            attached_file_src = null;
            file_extension = null;
            is_save_attachment_required = null;
            widget_user_selected_list = null;
            is_sticky_message = false;
            is_video_recorder_allowed = false;
            is_campaign_link = false;
            hide_bot_typing_loader();
            if (form_assist_enabled) {
                response["response"]["recommendations"].push(["Do not disturb"]);
                do_not_disturb = "true";
            }
            enable_user_input();
            detectmob();
            append_bot_response(response);
            form_assist_enabled = false;
        }
    }
    xhttp.send(params);
}

function getPrevSessionHistory(prev_session_id) {
    var json_string = JSON.stringify({
        session_id: prev_session_id,
        bot_id: bot_id
    });
    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);

    CSRF_TOKEN = get_csrf_token();
    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", "/chat/get-previous-session-data/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('X-CSRFToken', CSRF_TOKEN);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            response = custom_decrypt(response)
            response = JSON.parse(response);
            if (response['status'] == 200) {
                response_objs = response["prev_session_response"]
                for (var i = 0; i < response_objs.length; i++) {
                    user_msg = response_objs[i]['message_received']
                    bot_resp = response_objs[i]['response_json']
                    playSound(STATIC_MP3_PATH + '/juntos1.mov');
                    append_user_input(user_msg)
                    append_prev_session_response(bot_resp);
                }
            }
            scroll_to_bottom();
        }
    }
    xhttp.send(params);
}

function default_bot_color(bot_id) {
    var json_string = JSON.stringify({
        bot_id: bot_id,
    });
    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = "json_string=" + json_string;
    xhttp.open("POST", "/chat/get-bot-message-image/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onload = function() {
        if (this.status == 200) {
            response = JSON.parse(this.responseText);
            response = custom_decrypt(response)
            response = JSON.parse(response);
            BOT_THEME_COLOR = "#" + response.bot_theme_color
            document.getElementById("easychat-navbar-wrapper").style.backgroundColor = BOT_THEME_COLOR;
            document.getElementById("user_input").style.borderColor = BOT_THEME_COLOR;
            document.getElementById("model-feedback-header").style.color = BOT_THEME_COLOR;
            document.getElementById("img-scroll-to-bottom").style.color = BOT_THEME_COLOR;
        }
    }
    xhttp.send(params);
}

function custom_button_change(x) {
    // x.style.backgroundColor = BOT_THEME_COLOR;
    x.style.setProperty('background-color', BOT_THEME_COLOR, 'important')
    x.style.color = "white";
    x.style.borderWidth = "0.05em";
    x.style.borderColor = BOT_THEME_COLOR
    x.style.borderStyle = "solid";
}

function custom_button_change_normal(x) {
    if (x.getAttribute("easychat-feedback-selected") == "true") { return; }

    if (EASYCHAT_BOT_THEME == 'theme_5') {
        x.style.setProperty('background-color', "transparent", 'important')
        x.style.color = BOT_THEME_COLOR;
    } else {
        x.style.setProperty('background-color', "#f6f6f6", 'important')
        x.style.color = BOT_THEME_COLOR;
    }
}

function custom_button_change_card(x) {
    x.style.backgroundColor = BOT_THEME_COLOR;
    x.style.color = "white";
    x.style.borderRadius = "1em";
}


function custom_button_change_normal_card(x) {
    x.style.backgroundColor = "white";
    x.style.color = "black";
    x.style.borderRadius = "1em";
}

function append_bot_inactivity_msg() {
    if (is_livechat == true) {
        alert("Agent is still with you..")
    }
    if (!is_bot_inactivity_msg_present && is_livechat == false) {
        append_bot_text_response(bot_inactivity_msg)
        if (is_text_to_speech_required) {
            text_to_speech(bot_inactivity_msg)
        }
        is_bot_inactivity_msg_present = true
        scroll_to_bottom();
    }
}


function reset_bot_inactivity_timer() {
    window.clearTimeout(bot_inactivity_timer);
    bot_inactivity_timer = setTimeout(append_bot_inactivity_msg, bot_inactivity_time * 1000);
}

function append_bot_response_delay_message() {
    if (is_livechat == false && is_bot_response_message_showed == false) {
        append_bot_text_response(bot_response_delay_message)
        if (is_text_to_speech_required) {
            text_to_speech(bot_response_delay_message)
        }
        scroll_to_bottom();
        show_bot_typing_loader()
    }
}

function reset_bot_response_delay_timer() {
    window.clearTimeout(bot_message_delay_timer);
    bot_message_delay_timer = setTimeout(append_bot_response_delay_message, bot_response_delay_timer * 1000);
}

function sticky_scroll_forward() {
    document.getElementById("easychat-sticky-intents").scrollBy(200, 0);
}

function sticky_scroll_backward() {
    document.getElementById("easychat-sticky-intents").scrollBy(-200, 0);
}

function send_sticky_message(user_input) {
    if (sticky_button_display_format == "Menu") {
        let sticky_menu = document.getElementById('easychat_sticky_menu_items');
        sticky_menu.classList = 'easychat-sticky-menu-items';
        let elem = document.getElementsByClassName('arrow_down')[0];
        elem.classList = 'arrow_up';
        elem.firstChild.src = EASYCHAT_IMG_PATH + 'arrow_up_sticky.svg';
    }

    is_sticky_message = true;
    send_user_input(user_input);
}

function append_sticky_intents(sticky_intents_list) {
    if (typeof sticky_intents_list !== 'undefined' && sticky_intents_list.length > 0) {
        var html = "";
        if (EASYCHAT_BOT_THEME == "theme_4") {
            html = '<div style=overflow:hidden;width:max-content;margin-bottom:1rem>'
            html += '<button class="arrow-button-left" onclick="sticky_scroll_backward()" style="border: none !important;"><svg width="24" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
<path d="M0 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H0V0Z" fill=""/>\
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill=' + BOT_THEME_COLOR + '>\
</svg></button>'
            for (var i = 0; i < sticky_intents_list.length; i++) {
                html += '<button class="button_sticky" onclick="send_sticky_message(\'' + sticky_intents_list[i] + '\')" style="color:' + BOT_THEME_COLOR + ';font-size:15px;outline:auto;border-radius:10px;border:0;height:30px;">' + sticky_intents_list[i] + '</button>&nbsp;&nbsp;&nbsp;&nbsp;'
            }
            html += '<button class="arrow-button-right" onclick="sticky_scroll_forward()" style="border: none !important;"><svg width="24" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
            <path d="M24 0H6C2.68629 0 0 2.68629 0 6V18C0 21.3137 2.68629 24 6 24H24V0Z" fill=""/>\
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.2929 4.29289C7.9024 4.68342 7.9024 5.31658 8.2929 5.70711L14.5858 12L8.2929 18.2929C7.9024 18.6834 7.9024 19.3166 8.2929 19.7071C8.6834 20.0976 9.3166 20.0976 9.7071 19.7071L16.7071 12.7071C17.0976 12.3166 17.0976 11.6834 16.7071 11.2929L9.7071 4.29289C9.3166 3.90237 8.6834 3.90237 8.2929 4.29289Z" fill=' + BOT_THEME_COLOR + '>\
            </svg></button>'
            html += '</div>'
        } else if (EASYCHAT_BOT_THEME == "theme_5") {
            html = '<div style=overflow:hidden;width:max-content;margin-bottom:1rem>'
            html += '<button class="arrow-button-left" onclick="sticky_scroll_backward()" style="border: none !important;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
<path d="M0 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H0V0Z" fill=""/>\
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill=' + BOT_THEME_COLOR + '>\
</svg></button>'
            for (var i = 0; i < sticky_intents_list.length; i++) {
                html += '<button class="button_sticky" onclick="send_sticky_message(\'' + sticky_intents_list[i] + '\')" style="color:' + BOT_THEME_COLOR + ';font-size:15px;outline:auto;border-radius:10px;border:0;height:30px;">' + sticky_intents_list[i] + '</button>&nbsp;&nbsp;&nbsp;&nbsp;'
            }
            html += '<button class="arrow-button-right" onclick="sticky_scroll_forward()" style="border: none !important;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
            <path d="M24 0H6C2.68629 0 0 2.68629 0 6V18C0 21.3137 2.68629 24 6 24H24V0Z" fill=""/>\
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.2929 4.29289C7.9024 4.68342 7.9024 5.31658 8.2929 5.70711L14.5858 12L8.2929 18.2929C7.9024 18.6834 7.9024 19.3166 8.2929 19.7071C8.6834 20.0976 9.3166 20.0976 9.7071 19.7071L16.7071 12.7071C17.0976 12.3166 17.0976 11.6834 16.7071 11.2929L9.7071 4.29289C9.3166 3.90237 8.6834 3.90237 8.2929 4.29289Z" fill=' + BOT_THEME_COLOR + '>\
            </svg></button>'
            html += '</div>'
        } else {
            html = '<div style=overflow:hidden;width:max-content>'
            html += '<button class="arrow-button-left" onclick="sticky_scroll_backward()" style="border: none !important;"><svg width="24" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
<path d="M0 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H0V0Z" fill=""/>\
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill=' + BOT_THEME_COLOR + '>\
</svg></button>'
            for (var i = 0; i < sticky_intents_list.length; i++) {
                html += '<button class="button_sticky" onclick="send_sticky_message(\'' + sticky_intents_list[i] + '\')" style="color:' + BOT_THEME_COLOR + ';font-size:15px;outline:auto;border-radius:10px;border:0;height:30px;">' + sticky_intents_list[i] + '</button>&nbsp;&nbsp;&nbsp;&nbsp;'
            }
            html += '<button class="arrow-button-right" onclick="sticky_scroll_forward()" style="border: none !important;"><svg width="24" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
<path d="M24 0H6C2.68629 0 0 2.68629 0 6V18C0 21.3137 2.68629 24 6 24H24V0Z" fill=""/>\
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.2929 4.29289C7.9024 4.68342 7.9024 5.31658 8.2929 5.70711L14.5858 12L8.2929 18.2929C7.9024 18.6834 7.9024 19.3166 8.2929 19.7071C8.6834 20.0976 9.3166 20.0976 9.7071 19.7071L16.7071 12.7071C17.0976 12.3166 17.0976 11.6834 16.7071 11.2929L9.7071 4.29289C9.3166 3.90237 8.6834 3.90237 8.2929 4.29289Z" fill=' + BOT_THEME_COLOR + '>\
</svg></button>'
            html += '</div>'
        }
        document.getElementById("easychat-sticky-intents").innerHTML = html;
        resize_chabot_window()
    } else {
        try {
            document.getElementById("easychat-sticky").remove();
            if (EASYCHAT_BOT_THEME == "theme_5") {
                document.getElementById('easychat-footer').style.boxShadow = '0px 0px 15px rgba(0, 0, 0, 0.1)';
            }
            document.getElementById("easychat-chat-container").style.height = '500px';
        } catch (err) {}

    }
}

function append_sticky_intents_menu(sticky_intents_list_menu) {
    if (typeof sticky_intents_list_menu !== 'undefined' && sticky_intents_list_menu.length > 0) {
        document.getElementById('easychat-sticky-intents').style.width = '100%';
        document.getElementById('easychat-sticky-intents').style.marginLeft = '0';
        document.getElementById('easychat-sticky').style.background = 'white';
        if (EASYCHAT_BOT_THEME == "theme_2") {
            document.getElementById('easychat-sticky').style.bottom = '-5px';
        }

        let html = '<div><div class="easychat-sticky-menu">\
                            <div style="color: #4d4d4d; font-size: 17px">Menu</div>\
                            <div onclick="display_sticky_menu_items(this)" class="arrow_up" style="margin-right:3%"><img src="' + EASYCHAT_IMG_PATH + 'arrow_up_sticky.svg"></div>\
                        </div><div class = "easychat-sticky-menu-items" id="easychat_sticky_menu_items">';

        for (let i = 0; i < sticky_intents_list_menu.length; ++i) {
            let sticky_intent = sticky_intents_list_menu[i];
            html += '<div class="easychat-sticky-menu-item" style="display:flex; margin: 0px 0px 10px 0px;" onclick="send_sticky_message(\'' + sticky_intent[0] + '\')"><div><i class = "fa ' + sticky_intent[1] + ' sticky-menu-item-icon" style="color:' + BOT_THEME_COLOR + '"></i></div><div style="margin-left:10px; color: #4d4d4d; font-size:15px;">' + sticky_intent[0] + '</div></div>';
        }

        html += '</div></div>';

        document.getElementById("easychat-sticky-intents").innerHTML = html;
        resize_chabot_window()
    } else {
        try {
            document.getElementById("easychat-sticky").remove();
            if (EASYCHAT_BOT_THEME == "theme_5") {
                document.getElementById('easychat-footer').style.boxShadow = '0px 0px 15px rgba(0, 0, 0, 0.1)';
            }
            document.getElementById("easychat-chat-container").style.height = '500px';
        } catch (err) {}
    }
}

function display_sticky_menu_items(elem) {
    if (elem.classList.contains('arrow_up')) {
        elem.classList = 'arrow_down';
        elem.firstChild.src = EASYCHAT_IMG_PATH + 'arrow_down_sticky.svg';

        let sticky_menu = document.getElementById('easychat_sticky_menu_items');
        sticky_menu.classList += ' easychat-sticky-menu-items-show';
    } else {
        elem.classList = 'arrow_up';
        elem.firstChild.src = EASYCHAT_IMG_PATH + 'arrow_up_sticky.svg';

        let sticky_menu = document.getElementById('easychat_sticky_menu_items');
        sticky_menu.classList = 'easychat-sticky-menu-items';
    }
    resize_chabot_window();
}

function append_welcome_message(bot_id, bot_name) {

    show_bot_typing_loader();
    var json_string = JSON.stringify({
        bot_id: bot_id,
        bot_name: bot_name,
        user_id: user_id,
        session_id: session_id,
        channel_name: "Web"
    });
    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", "/chat/get-channel-details/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onload = function() {
        if (this.status == 200) {
            response = JSON.parse(this.responseText);
            response = custom_decrypt(response)
            response = JSON.parse(response);
            welcome_message = response.welcome_message;
            recommendations = response.initial_messages["items"];
            carousel_img_url_list = response.carousel_img_url_list["items"];
            redirect_url_list = response.redirect_url_list["items"];
            welcome_msg_images = response.initial_messages["images"];
            user_id = response.user_id;
            sticky_intents_list = response.sticky_intents_list;
            sticky_intents_list_menu = response.sticky_intents_list_menu;
            sticky_button_display_format = response.sticky_button_display_format;
            welcome_msg_videos = response.initial_messages["videos"];
            is_text_to_speech_required = response.is_text_to_speech_required
                // bot_start_conversation_intent = response.bot_start_conversation_intent
            poweredby_required = response.is_powered_by_required;
            bot_inactivity_detection_enabled = response.bot_inactivity_detection_enabled;
            bot_inactivity_msg = response.bot_inactivity_msg;
            bot_inactivity_time = response.bot_inactivity_time;
            bot_response_delay_allowed = response.bot_response_delay_allowed;
            bot_response_delay_timer = response.bot_response_delay_timer;
            bot_response_delay_message = response.bot_response_delay_message;
            query_token_id = response.query_token_id
            EASYCHAT_BOT_THEME = response.bot_theme
            is_automatic_carousel_enabled = response.is_automatic_carousel_enabled
            carousel_time = parseInt(response.carousel_time)
            livechat_queue_time = parseInt(response.queue_timer)
            web_url_initial_intent_present = response.web_url_initial_intent_present
            web_url_is_welcome_message_present = response.web_url_is_welcome_message_present
            web_url_initial_image_present = response.web_url_initial_image_present
            web_url_initial_videos_present = response.web_url_initial_videos_present
            web_url_is_welcome_banner_present = response.web_url_is_welcome_banner_present
            is_bot_notification_sound_enabled = response.is_bot_notification_sound_enabled
            queue_timer = (livechat_queue_time / 5) + 1;
            default_order_of_response = response.default_order_of_response;

            if (sticky_button_display_format == 'Menu') {
                append_sticky_intents_menu(sticky_intents_list_menu);
            } else {
                append_sticky_intents(sticky_intents_list);
            }

            if (poweredby_required === true) {
                document.getElementById("easychat-powered-by-div").style.display = "block";
            };

            document.getElementById("user_input").disabled = true;
            document.getElementById("user_input").disabled = false;
            detectmob();

            var display_welcome_banner = true

            if (is_web_landing_allowed == "true" && web_url_is_welcome_banner_present == false) {
                display_welcome_banner = false
            }


            if (carousel_img_url_list.length && display_welcome_banner == true) {
                is_welcome_banner_present = true;
                add_banner(carousel_img_url_list, redirect_url_list);
                init_gallery();

                if (is_automatic_carousel_enabled) {
                    carousel_timer = setInterval(function() {
                        move_gallary_slides(1);
                    }, carousel_time * 1000);
                }
            }
            // prev_session_id = get_cookie("easychat_prev_session_id");
            if (is_text_to_speech_required) {
                speech_welcome_message = response['speech_welcome_message']
                text_to_speech(speech_welcome_message);
            }

            message_list = get_message_list(welcome_message, RESPONSE_SENTENCE_SEPARATOR);
            if (is_web_landing_allowed == "false") {
                for (var i = 0; i < message_list.length; i++) {
                    append_bot_text_response(message_list[i]);
                }
            } else if (is_web_landing_allowed == "true" && web_url_is_welcome_message_present == true) {
                for (var i = 0; i < message_list.length; i++) {
                    append_bot_text_response(message_list[i]);
                }
            }

            hide_bot_typing_loader();

            if (welcome_msg_videos != null && welcome_msg_videos != undefined && welcome_msg_videos.length > 0) {
                if (is_web_landing_allowed == "false") {
                    append_bot_slider_videos(welcome_msg_videos);
                } else if (is_web_landing_allowed == "true" && web_url_initial_videos_present == true) {
                    append_bot_slider_videos(welcome_msg_videos);
                }
            }

            if (welcome_msg_images != null && welcome_msg_images != undefined && welcome_msg_images.length > 0) {
                if (is_web_landing_allowed == "false") {
                    append_bot_slider_images(welcome_msg_images);
                } else if (is_web_landing_allowed == "true" && web_url_initial_image_present == true) {
                    append_bot_slider_images(welcome_msg_images);
                }
            }
            if (recommendations.length > 0) {
                set_cookie("is_recommendation_menu", "false")

                if (EASYCHAT_BOT_THEME == "theme_5") {
                    if (is_web_landing_allowed == "false") {
                        append_bot_initial_questions(recommendations);
                    } else if (is_web_landing_allowed == "true" && web_url_initial_intent_present == true) {
                        append_bot_initial_questions(recommendations);
                    }
                } else {
                    if (is_web_landing_allowed == "false") {
                        append_bot_recommendation(recommendations);
                    } else if (is_web_landing_allowed == "true" && web_url_initial_intent_present == true) {
                        append_bot_recommendation(recommendations);
                    }
                }
            }
            if (easychat_prev_session_id != "") {
                getPrevSessionHistory(easychat_prev_session_id);
                // session_id = prev_session_id;
            }

            if (bot_inactivity_detection_enabled) {
                reset_bot_inactivity_timer()
            }
            if (is_web_landing_allowed == "false") {
                if (response["initial_intent"] != null) {
                    initial_intent_in_welcome_message = true
                    append_bot_response(response["initial_intent"])
                    initial_intent_in_welcome_message = false
                }
            }
            is_bot_response_message_showed = true;
            welcome_message_appended = true
        }
    }
    xhttp.send(params);
}

function remove_widgets() {
    $('.easychat-radio-button-container').remove()
    $('.easychat-range-slider-container').remove()
    $('.easychat-drop-down-container').remove()
    $('.easychat-check-box-container').remove()
    $('.easychat-timepicker-container').remove()
    $('.easychat-datepicker-container').remove()
    is_remove_widget = false;
}

function send_message() {
    if (EASYCHAT_BOT_THEME == "theme_4") {
        document.getElementById('fill-color').style.fill = 'gray';
    } else if (EASYCHAT_BOT_THEME == "theme_2") {
        $('.gy-send').addClass('gy-send-gray');
        $('.gy-send-gray').removeClass('gy-send');
    }
    /*if(EASYCHAT_BOT_THEME == "theme_4") {
        document.getElementById("easychat-chat-container").style.height = "450px";
    }*/
    if (is_remove_widget == true) {
        remove_widgets();
    }
    var user_input = document.getElementById("user_input").value.trim();
    if (user_input.length == 0) {
        return;
    }
    document.getElementById("user_input").value = '';
    send_user_input(user_input);
}

document.onkeyup = function(e) {
    e = e || window.event;

    var input_element = document.getElementById("user_input");
    var user_query = input_element.value.trim();
    if (user_query != "") {
        activate_query_submit_button();
    } else {
        deactivate_query_submit_button();
    }
    if (is_livechat && user_query != "") {

        send_typing_message_to_agent()
    }

    maxlength = input_element.maxlength;
    if (input_element.value.length > maxlength) {
        restricted_value = input_element.value.substr(0, maxlength);
        input_element.value = restricted_value;
    }

    if (e.keyCode == 13) {
        send_message();
    }
}

function confirm_do_not_disturb() {
    append_bot_text_response("Are you sure, you want to enable 'Do not disturb'? By clicking 'Yes', form assistant will be disabled.");
    var choices_html = '<div class="easychat-choices-wrapper">';
    choices_html += '<button class="easychat-choices" onmouseover="custom_button_change(this)" onmouseout="custom_button_change_normal(this)" style=\"border: 0.05em solid ' + BOT_THEME_COLOR + ';color: ' + BOT_THEME_COLOR + '\" value="Yes" onclick="disable_form_assist(this)">Yes</button>';
    choices_html += '<button class="easychat-choices" onmouseover="custom_button_change(this)" onmouseout="custom_button_change_normal(this)" style=\"border: 0.05em solid ' + BOT_THEME_COLOR + ';color: ' + BOT_THEME_COLOR + '\" value="No" onclick="nothing_form_assist(this)">No</button>';
    choices_html += "</div>";
    document.getElementById("easychat-chat-container").innerHTML += choices_html;
}

function disable_form_assist(element) {
    parent.postMessage('disable-form-assist', '*');
}

function nothing_form_assist(element) {
    append_bot_text_response("Great, How may I help you?");
}

function send_selected_recommendation(element) {
    var user_input = element.innerHTML;

    if (do_not_disturb == "true") {
        if (user_input == "Do not disturb") {
            // show_form_assist_result();
            // do_not_disturb = "false"
            // form_assist_enabled = true
            // document.getElementsByClassName("easychat-recommendation")[0].style.pointerEvents = "none"
            // document.getElementsByClassName("easychat-recommendation")[1].style.pointerEvents = "none"
            // parent.postMessage('enable-form-assist','*');
            confirm_do_not_disturb();
        } else {
            // do_not_disturb = "true"
            // form_assist_enabled = false
            // document.getElementsByClassName("easychat-recommendation")[0].style.pointerEvents = "none"
            // document.getElementsByClassName("easychat-recommendation")[1].style.pointerEvents = "none"
            // append_welcome_message(bot_id, bot_name);
            // get_suggestion_list(bot_id, bot_name);
        }
        do_not_disturb = "false";
    } else {
        // var user_input = element.innerHTML;
        send_user_input(user_input);
        element.remove();
    }
}

function send_selected_choice(element) {
    var user_input = element.value;
    for (var i = 0; i < element.parentElement.children.length; i++) {
        if (element.parentElement.children[i].hasAttribute("onclick")) { element.parentElement.children[i].removeAttribute("onclick") }
        if (element.parentElement.children[i].hasAttribute("onmouseout")) { element.parentElement.children[i].removeAttribute("onmouseout") }
        if (element.parentElement.children[i].hasAttribute("onmouseover")) { element.parentElement.children[i].removeAttribute("onmouseover") }
    }
    send_user_input(user_input);
}

if (!('webkitSpeechRecognition' in window)) {
    document.getElementById("easychat-mic-div").remove();
    document.getElementById("easychat-mic-disable").style.display = "none";

    if (EASYCHAT_BOT_THEME == "theme_5") {
        document.getElementById('easychat-mic-div-not-allowed').style.display = 'flex';
    }
    //document.getElementById("recognition-img").display="none";
} else {
    if (EASYCHAT_BOT_THEME == "theme_5") {
        var stream;
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function(s) {
                return stream = s;
            }, function(e) {
                if (e.message === 'Permission denied') {
                    mic_access = false;
                    document.getElementById('easychat-mic-div').style.display = 'none';
                    document.getElementById('easychat-mic-div-not-allowed').style.display = 'flex';
                }
            })
            .catch(function(e) { console.log(e); });
    }
    // start_button.style.display = 'inline-block';
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = function() {
        recognizing = true;
    };

    recognition.onerror = function(event) {
        if (event.error == 'no-speech') {
            ignore_onend = true;
        }
        if (event.error == 'audio-capture') {
            ignore_onend = true;
        }
        if (event.error == 'not-allowed') {
            ignore_onend = true;
            recognition = null;
            deactivate_mic();
            alert("You will not be able to use voicebot feature as you haven't allowed microphone access.");
        }
    };

    recognition.onend = function() {
        recognizing = false;
        if (ignore_onend) {
            return;
        }
        if (!final_transcript) {
            return;
        }
    };

    recognition.onresult = function(event) {
        document.getElementById('user_input').value = event.results[0][0].transcript;
        if (event.results[0].isFinal) {
            user_input = document.getElementById('user_input').value;
            if (user_input.trim() != '' && user_input.length < 300) {
                send_user_input(user_input);
            }
            recognition.stop();
            document.getElementById("user_input").value = "";
        }
    };
}

function initMap() {
    var current_latitude = "";
    var current_longitude = "";

    if (("geolocation" in navigator)) {
        navigator.geolocation.getCurrentPosition(
            function success(position) {
                current_latitude = position.coords.latitude
                current_longitude = position.coords.longitude

                var map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: current_latitude, lng: current_longitude },
                    zoom: 15
                });

                var request = {
                    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
                    fields: ['name', 'formatted_address', 'place_id', 'geometry']
                };

                var infowindow = new google.maps.InfoWindow();
                var service = new google.maps.places.PlacesService(map);

                service.getDetails(request, function(place, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        marker = new google.maps.Marker({
                            map: map,
                            position: place.geometry.location
                        });

                        marker.setPosition(map.getCenter())

                        var centerControlDiv = document.createElement("div");
                        var centerControl = new CenterControl(centerControlDiv, map);
                        centerControlDiv.index = 1;
                        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
                    }
                });

                function CenterControl(controlDiv, map) {
                    var controlUI = document.createElement("div");
                    controlUI.style.backgroundColor = "#fff";
                    controlUI.style.border = "2px solid #fff";
                    controlUI.style.borderRadius = "3px";
                    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
                    controlUI.style.cursor = "pointer";
                    controlUI.style.marginBottom = "22px";
                    controlUI.style.textAlign = "center";
                    controlUI.title = "Click to Submit the location";
                    controlDiv.appendChild(controlUI);
                    // Set CSS for the control interior.\
                    var controlText = document.createElement("div");
                    controlText.style.color = "rgb(25,25,25)";
                    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
                    controlText.style.fontSize = "16px";
                    controlText.style.lineHeight = "38px";
                    controlText.style.paddingLeft = "5px";
                    controlText.style.paddingRight = "5px";
                    controlText.innerHTML = "Click here to submit your location";
                    controlUI.appendChild(controlText);
                    // Setup the click event listeners: simply set the map to Chicago.\
                    controlUI.addEventListener("click", function() {
                        var lat = marker.getPosition().lat();
                        var lng = marker.getPosition().lng();
                        user_input = lat + "__" + lng;
                        send_message_to_server(user_input, user_id, bot_id, bot_name, "None");
                        scroll_to_bottom();
                    });
                }
            },
            function error(error_message) {
                // for when getting location results in an error
                console.error('An error has occured while retrieving' +
                    'location before', error_message)
                document.getElementById("google-map").remove();
                append_bot_text_response("Unable to fetch your location details.");
                send_message_to_server("Share Pincode", user_id, bot_id, bot_name, "None");
            });
    } else {
        document.getElementById("google-map").remove();
        append_bot_text_response("Unable to fetch your location details.");
        send_message_to_server("Share Pincode", user_id, bot_id, bot_name, "None");
    }
}

/*

// Commenting this older approach for future uses
function autocomplete(inp, arr, word_mapper_list) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);

        for (var word_index = 0; word_index < word_mapper_list.length; word_index++) {
            for (var s_index = 0; s_index < word_mapper_list[word_index]["similar_words"].length; s_index++) {
                if (word_mapper_list[word_index]["similar_words"][s_index].toLowerCase() == val.toLowerCase()) {
                    //similar_word_list.push(word_mapper_list[word_index]["keyword"].toLowerCase());
                    val = word_mapper_list[word_index]["keyword"].toLowerCase();
                }
            }
        }

        var count = 0;
        arr_value_list = []
        for (i = 0; i < arr.length; i++) {
            if (is_flow_ended && count < 5 && is_livechat == false) {
                if (arr[i]["key"].toUpperCase().indexOf(val.toUpperCase()) != -1 && arr_value_list.indexOf(arr[i]["value"]) < 0) {
                    b = document.createElement("DIV");
                    arr_value_list.push(arr[i]["value"]);
                    b.innerHTML = "" + arr[i]["value"].substr(0, val.length) + "";
                    b.innerHTML += arr[i]["value"].substr(val.length);
                    //b.innerHTML += "<input type='hidden' value='" + arr[i]["value"] + "'>";
                    b.innerHTML += '<input type="hidden" value="' + arr[i]["value"] + '">';
                    b.addEventListener("click", function(e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                        entered_suggestion = true
                        send_user_input(inp.value);
                        inp.value = "";
                    });
                    a.appendChild(b);
                    count += 1;
                }
            }
        }

        if (count == 0) {

            token_list = val.split(" ");

            query_token_list = token_list.filter(function(e) { return e != ""; });

            if (query_token_list.length == 0) {
                return;
            }

            split_val = 1
            while( split_val <= query_token_list.length ){

                val = query_token_list[query_token_list.length - split_val];
                
                arr_value_list = [];

                for (i = 0; i < arr.length; i++) {

                    if (is_flow_ended && count < 5 && is_livechat == false) {
                        if (arr[i]["key"].toUpperCase().indexOf(val.toUpperCase()) != -1 && arr_value_list.indexOf(arr[i]["value"]) < 0) {
                            b = document.createElement("DIV");
                            arr_value_list.push(arr[i]["value"]); 
                            b.innerHTML = "" + arr[i]["value"].substr(0, val.length) + "";
                            b.innerHTML += arr[i]["value"].substr(val.length);
                            b.innerHTML += "<input type='hidden' value='" + arr[i]["value"] + "'>";
                            b.addEventListener("click", function(e) {
                                inp.value = this.getElementsByTagName("input")[0].value;
                                closeAllLists();

                                send_user_input(inp.value);
                                inp.value = "";
                            });
                            a.appendChild(b);
                            count += 1;
                        }
                    }
                }

                if(count == 0){
                    split_val += 1
                }else{
                    break;
                }
            }
        }
    });

    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            
            currentFocus++;
           
            addActive(x);
        } else if (e.keyCode == 38) { //up
            
            currentFocus--;

            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}*/



function autocomplete(inp, arr, word_mapper_list) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/

        for (var word_index = 0; word_index < word_mapper_list.length; word_index++) {
            for (var s_index = 0; s_index < word_mapper_list[word_index]["similar_words"].length; s_index++) {
                if (word_mapper_list[word_index]["similar_words"][s_index].toLowerCase() == val.toLowerCase()) {
                    //similar_word_list.push(word_mapper_list[word_index]["keyword"].toLowerCase());
                    val = word_mapper_list[word_index]["keyword"].toLowerCase();
                }
            }
        }

        var count = 0;
        filtered_arr_value = []
        arr_value_list = []
        for (i = 0; i < arr.length; i++) {
            if (is_flow_ended && count < 5 && is_livechat == false) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i]["key"].toUpperCase().indexOf(val.toUpperCase()) != -1 && arr_value_list.indexOf(arr[i]["value"]) < 0) {

                    // Creating a dictionary with intent and it's count
                    if (!filtered_arr_value.some(function(e) { return e.key == arr[i]["value"]; })) {
                        filtered_arr_value.push({ "key": arr[i]["value"], "count": arr[i]["count"] })
                        count += 1;
                    }
                }
            }
        }

        /* if suggestion list is not empty */
        if (count > 0 && filtered_arr_value.length > 0) {

            // Sort the intents in descending order
            filtered_arr_value.sort(function(first, second) {
                return second.count - first.count;
            });

            for (var value in filtered_arr_value) {
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "" + filtered_arr_value[value]["key"].substr(0, val.length) + "";
                b.innerHTML += filtered_arr_value[value]["key"].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                //b.innerHTML += "<input type='hidden' value='" + arr[i]["value"] + "'>";
                b.innerHTML += '<input type="hidden" value="' + filtered_arr_value[value]["key"] + '">';
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                    entered_suggestion = true
                    send_user_input(inp.value);
                    inp.value = "";
                });
                a.appendChild(b);
            }
        }

        /*Empty suggestion list check*/
        if (count == 0) {

            token_list = val.split(" ");

            query_token_list = token_list.filter(function(e) { return e != ""; });

            if (query_token_list.length == 0) {
                return;
            }

            split_val = 1
            while (split_val <= query_token_list.length) {

                val = query_token_list[query_token_list.length - split_val];

                arr_value_list = [];
                filtered_arr_value = []

                for (i = 0; i < arr.length; i++) {

                    if (is_flow_ended && count < 5 && is_livechat == false) {
                        /*check if the item starts with the same letters as the text field value:*/
                        if (arr[i]["key"].toUpperCase().indexOf(val.toUpperCase()) != -1 && arr_value_list.indexOf(arr[i]["value"]) < 0) {
                            // Creating a dictionary with intent and it's count
                            if (!filtered_arr_value.some(function(e) { return e.key == arr[i]["value"]; })) {
                                filtered_arr_value.push({ "key": arr[i]["value"], "count": arr[i]["count"] })
                                count += 1;
                            }
                        }
                    }
                }
                if (count == 0) {
                    split_val += 1
                } else {
                    break;
                }
            }

            /* if suggestion list is not empty */
            if (filtered_arr_value.length > 0) {

                // Sorting the intent in descending order
                filtered_arr_value.sort(function(first, second) {
                    return second.count - first.count;
                });

                for (var value in filtered_arr_value) {
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "" + filtered_arr_value[value]["key"].substr(0, val.length) + "";
                    b.innerHTML += filtered_arr_value[value]["key"].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    //b.innerHTML += "<input type='hidden' value='" + arr[i]["value"] + "'>";
                    b.innerHTML += '<input type="hidden" value="' + filtered_arr_value[value]["key"] + '">';
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                        entered_suggestion = true
                        send_user_input(inp.value);
                        inp.value = "";
                    });
                    a.appendChild(b);
                }
            }

        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

function custom_autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        if (val.length == 2 && is_custom_complete) { get_quotes_suggestions(val) }
        currentFocus = -1;

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        var count = 0;

        //console.log(arr)
        arr_value_list = []
        arr = code_list
        for (i = 0; i < arr.length; i++) {
            if (is_custom_complete && count < 5 && is_livechat == false) {
                //console.log(arr[i])
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i]["key"].toUpperCase().indexOf(val.toUpperCase()) != -1 && arr_value_list.indexOf(arr[i]["value"]) < 0) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    arr_value_list.push(arr[i]["value"]);
                    /*make the matching letters bold:*/
                    b.innerHTML = "" + arr[i]["value"].substr(0, val.length) + "";
                    b.innerHTML += arr[i]["value"].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i]["value"] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                        send_user_input(inp.value);
                        inp.value = "";
                    });
                    a.appendChild(b);
                    count += 1;
                }
            }
        }

        /*Empty suggestion list check*/
        if (count == 0) {

            token_list = val.split(" ");

            query_token_list = token_list.filter(function(e) { return e != ""; });

            if (query_token_list.length == 0) {
                return;
            }

            val = query_token_list[query_token_list.length - 1];

            arr_value_list = [];

            for (i = 0; i < arr.length; i++) {

                if (is_flow_ended && count < 5 && is_livechat == false) {
                    /*check if the item starts with the same letters as the text field value:*/
                    if (arr[i]["key"].toUpperCase().indexOf(val.toUpperCase()) != -1 && arr_value_list.indexOf(arr[i]["value"]) < 0) {
                        /*create a DIV element for each matching element:*/
                        b = document.createElement("DIV");
                        arr_value_list.push(arr[i]["value"]);
                        /*make the matching letters bold:*/
                        b.innerHTML = "" + arr[i]["value"].substr(0, val.length) + "";
                        b.innerHTML += arr[i]["value"].substr(val.length);
                        /*insert a input field that will hold the current array item's value:*/
                        b.innerHTML += "<input type='hidden' value='" + arr[i]["value"] + "'>";
                        /*execute a function when someone clicks on the item value (DIV element):*/
                        b.addEventListener("click", function(e) {
                            /*insert the value for the autocomplete text field:*/
                            inp.value = this.getElementsByTagName("input")[0].value;
                            /*close the list of autocompleted values,
                            (or any other open lists of autocompleted values:*/
                            closeAllLists();
                            send_user_input(inp.value);
                            inp.value = "";
                        });
                        a.appendChild(b);
                        count += 1;
                    }
                }
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

function get_suggestion_list(bot_id, bot_name) {
    web_page = window.location.href
    var json_string = JSON.stringify({
        bot_id: bot_id,
        bot_name: bot_name,
        web_page: unescape(url_parameters["easychat_window_location"])
    });
    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", "/chat/get-data/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            response = custom_decrypt(response)
            response = JSON.parse(response);
            if (response["status"] == 200) {
                suggestion_list = response["sentence_list"];
                word_mapper_list = response["word_mapper_list"];
                autocomplete(document.getElementById("user_input"), response["sentence_list"], word_mapper_list);
            } else {
                autocomplete(document.getElementById("user_input"), [], []);
            }
        }
    }
    xhttp.send(params);
}

function resize_chabot_window() {
    var sticky_intent_height = 0;

    if (document.getElementById("easychat-sticky") != null && document.getElementById("easychat-sticky").style.display != "none") {
        sticky_intent_height = document.getElementById('easychat-sticky').clientHeight;
    } else {
        if (document.getElementById("easychat-end-chat") != null && document.getElementById("easychat-end-chat").style.display != 'none') {
            sticky_intent_height = document.getElementById("easychat-end-chat").clientHeight;
        } else {
            if (EASYCHAT_BOT_THEME == "theme_4") {
                sticky_intent_height = 20;
            } else {
                sticky_intent_height = document.getElementById("easychat-footer").clientHeight;
            }
        }
    }

    if (EASYCHAT_BOT_THEME == "theme_4") {
        document.getElementById('easychat-chat-container').style.height = (document.documentElement.clientHeight - (document.getElementById("easychat-navbar").clientHeight + document.getElementById("easychat-footer").clientHeight + sticky_intent_height)).toString() + "px ";
    }
    // else if (EASYCHAT_BOT_THEME == "theme_1") {
    //     document.getElementById('easychat-chat-container').style.height = (document.documentElement.clientHeight + 36 - (document.getElementById("easychat-navbar").clientHeight + document.getElementById("easychat-footer").clientHeight + sticky_intent_height)).toString() + "px ";
    // }
    // else if (EASYCHAT_BOT_THEME == "theme_2") {
    //     document.getElementById('easychat-chat-container').style.height = (document.documentElement.clientHeight +36 - (document.getElementById("easychat-navbar").clientHeight + document.getElementById("easychat-footer").clientHeight + sticky_intent_height)).toString() + "px ";
    // }
    else {
        document.getElementById('easychat-chat-container').style.height = (document.documentElement.clientHeight - (document.getElementById("easychat-navbar").clientHeight + sticky_intent_height)).toString() + "px ";
    }

    if (EASYCHAT_BOT_THEME == "theme_5") {
        document.getElementById('easychat-chat-container').style.top = document.getElementById("easychat-navbar").clientHeight + 'px';
    }
}

window.onresize = function() {
    scroll_to_bottom();
    changeMiddleContainer();
    resize_chabot_window();
}

function plusImageSlides(n, el) {
    slideIndex = parseInt(el.parentElement.getAttribute("value"))
    slideIndex += n
    el.parentElement.setAttribute("value", slideIndex.toString())
    showSlides(slideIndex, el.parentElement);
}

function showSlides(n, el) {
    var i;
    slideIndex = parseInt(el.getAttribute("value"))
    var c = el.children
    var slides = []
    for (var i = 0; i < c.length; i++) {
        if (c[i].className == "mySlides fade easychat-slider-card") {
            slides.push(c[i])
        } else if (c[i].className == "mySlides fade") {
            slides.push(c[i])
        }
    }
    //var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { el.setAttribute("value", "1") }
    if (n < 1) { el.setAttribute("value", (slides.length).toString()) }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex = parseInt(el.getAttribute("value"))
    slides[slideIndex - 1].style.display = "block";
}

function add_banner(carousel_img_url_list, redirect_url_list) {

    html = '<div class="galleryContainer"><div class="slideShowContainer">';
    html += '<div onclick="move_gallary_slides(-1)" class="nextPrevBtn leftArrow"><span class="arrow arrowLeft"></span></div>';

    if (carousel_img_url_list.length > 1) {
        html += '<div onclick="move_gallary_slides(1)" class="nextPrevBtn rightArrow"><span class="arrow arrowRight"></span></div>';
    }

    for (var i = 0; i < carousel_img_url_list.length; i++) {

        var redirect_url = redirect_url_list[i];
        if (redirect_url == "") {
            redirect_url = "javascript:void(0)"
        }

        html += '<div style="cursor: pointer;" class="GallarySlidesimageHolder">';
        html += '<img vlink="' + redirect_url + '" onclick="open_link_banner(this)" src="' + carousel_img_url_list[i] + '"></div>'
    }

    html += "</div>";

    if (carousel_img_url_list.length > 1) {
        html += '<div id="GallarydotsContainer"></div>';
    }

    html += '</div>';

    document.getElementById("easychat-chat-container").innerHTML += html;
}

function open_link_banner(el) {
    var url = el.getAttribute("vlink")
    var pattern = /^((http|https|ftp):\/\/)/;
    if (!pattern.test(url)) { url = "http://" + url; }
    window.open(url);
}

function open_link_image(el) {
    var url = el.getAttribute("src")
    window.open(url);
}
//function open_link_banner(el){window.open(el.getAttribute("vlink"));}

function remove_banner() {
    var elements = document.getElementsByClassName("galleryContainer");
    if (elements) {
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        is_welcome_banner_present = false;
    }
}

function remove_feedback_div() {
    var elements = document.getElementsByClassName("easychat-intent-feedback-wrapper");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].getAttribute("feedback_submitted") != "true") {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }
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

    if (EASYCHAT_BOT_THEME == "theme_5") {
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
}

function move_gallary_slides(n) {
    if (is_automatic_carousel_enabled) {
        clearInterval(carousel_timer);
    }

    if (is_welcome_banner_present) {
        if (EASYCHAT_BOT_THEME == 'theme_5') {
            move_slide2(GallaryslideIndex + n);
        } else {
            move_slide(GallaryslideIndex + n);
        }

        if (is_automatic_carousel_enabled) {
            carousel_timer = setInterval(function() {
                move_gallary_slides(1);
            }, carousel_time * 1000)
        }
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

// function get_url_vars() {
//     var vars = {};
//     var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
//         vars[key] = value;
//     });
//     return vars;
// }

function create_issue(element) {
    name = document.getElementById("new-issue-name").value;
    document.getElementById("create-issue-error-message").innerHTML = "";

    if (name == "") {
        //showToast("Please enter your name.");
        document.getElementById("create-issue-error-message").innerHTML = "Please enter your name.";
        return;
    }

    if (!/^[a-zA-Z ]*$/.test(name)) {
        // showToast("Please enter a valid name.");
        document.getElementById("create-issue-error-message").innerHTML = "Please enter a valid name.";
        return;
    }

    if (!name.replace(/\s/g, '').length) {
        document.getElementById("create-issue-error-message").innerHTML = "Please enter a valid name.";
        return;
    }

    phone_no = document.getElementById("new-issue-phone").value;
    if (phone_no == "" || phone_no.length != 10) {
        // showToast("Please enter your 10 digits mobile number.");
        document.getElementById("create-issue-error-message").innerHTML = "Please enter your 10 digits mobile number";
        return;
    }

    if (phone_no.length != 10 || !/^\d{10}$/.test(phone_no)) {
        // showToast("Please enter a valid phone no.");
        document.getElementById("create-issue-error-message").innerHTML = "Please enter a valid phone no.";
        return;
    }

    issue = document.getElementById("new-issue-issue").value;
    if (issue == "") {
        // showToast("Please describe your issue.");
        document.getElementById("create-issue-error-message").innerHTML = "Please describe your issue.";
        return;
    }
    if (!issue.replace(/\s/g, '').length) {
        document.getElementById("create-issue-error-message").innerHTML = "Please describe your issue.";
        return;
    }

    priority = document.getElementById("ticket-priority").value;
    if (priority == "") {
        // showToast("Please select the priority.");
        document.getElementById("create-issue-error-message").innerHTML = "Please select the priority.";
        return;
    }

    category = document.getElementById("ticket-category").value;
    if (category == "") {
        // showToast("Please select the category.");
        document.getElementById("create-issue-error-message").innerHTML = "Please select the category.";
        return;
    }

    // bot_id = getUrlVars()["id"]

    json_string = JSON.stringify({
        name: name,
        phone_no: phone_no,
        email: "",
        issue: issue,
        priority: priority,
        category: category,
        "channel": "Web"
            // bot_id:"bot_id"
    });
    json_string = encrypt_variable(json_string);
    document.getElementById("new-issue-name").value = "";
    document.getElementById("new-issue-phone").value = "";
    document.getElementById("new-issue-issue").value = "";
    document.getElementById("ticket-priority").value = "1";
    document.getElementById("ticket-category").value = "";
    var CSRF_TOKEN = get_csrf_token();
    $.ajax({
        url: '/tms/create-issue/',
        type: 'POST',
        headers: {
            'X-CSRFToken': CSRF_TOKEN
        },
        data: {
            data: json_string
        },
        success: function(response) {
            response = custom_decrypt(response["response"])
            response = JSON.parse(response);
            if (response["status_code"] == 200 && response["ticket_id"] != "") {

                modal_create_issue.style.display = "none";
                message = "Thank you for reporting your issue. Your Ticket ID is " + response["ticket_id"] + ". Kindly save it for further reference. Our customer service agent will contact you shortly."
                append_bot_text_response(message);
            } else if (response["status_code"] == 305 && response["ticket_id"] != "") {

                modal_create_issue.style.display = "none";
                message = "Your issue has been registred. Your Ticket ID is " + response["ticket_id"] + " Today our office is closed. We will proceed with your issue as soon as possible."
                append_bot_text_response(message);
            } else {

                console.log("Please report this. ", response["status_message"]);
            }

            scroll_to_bottom();
        },
        error: function(xhr, textstatus, errorthrown) {
            console.log("Please report this error: " + errorthrown + xhr.status + xhr.responseText);
        }
    });
    enable_user_input();
}

function schedule_meeting(element) {
    document.getElementById("schedule-error-message").innerHTML = "";
    name = document.getElementById("new-meeting-name").value;

    if (name == "") {
        // showToast("Please enter your name.");
        document.getElementById("schedule-error-message").innerHTML = "Please enter your name";
        return;
    }
    if (!/^[a-zA-Z ]*$/.test(name)) {
        // showToast("Please enter a valid name.");
        document.getElementById("schedule-error-message").innerHTML = "Please enter a valid name";
        return;
    }
    if (!name.replace(/\s/g, '').length) {
        document.getElementById("schedule-error-message").innerHTML = "Please enter a valid name.";
        return;
    }

    phone_no = document.getElementById("new-meeting-phone").value;
    if (phone_no == "" || phone_no.length != 10) {
        // showToast("Please enter your 10 digits mobile number.");
        document.getElementById("schedule-error-message").innerHTML = "Please enter 10 digits mobile number";
        return;
    }

    if (phone_no.length != 10 || !/^\d{10}$/.test(phone_no)) {
        // showToast("Please enter a valid phone no.");
        document.getElementById("schedule-error-message").innerHTML = "Please enter a valid phone no.";
        return;
    }

    //Meeting Date

    meet_date = document.getElementById("new-meeting-date").value;
    if (meet_date == "") {
        // showToast("Please enter meeting date.")
        document.getElementById("schedule-error-message").innerHTML = "Please enter date.";
        return;
    }

    meet_date_year = meet_date.split("-")[0]
    meet_date_month = meet_date.split("-")[1]
    meet_date_date = meet_date.split("-")[2]

    if (meet_date_year < new Date().getFullYear()) {
        document.getElementById("schedule-error-message").innerHTML = "Please enter a valid year.";
        return;
    } else if (meet_date_year == new Date().getFullYear() && meet_date_month < (new Date().getMonth() + 1)) {
        document.getElementById("schedule-error-message").innerHTML = "Please enter a valid month.";
        return;
    } else if (meet_date_year == new Date().getFullYear() && meet_date_month == (new Date().getMonth() + 1) && meet_date_date < new Date().getDate()) {
        document.getElementById("schedule-error-message").innerHTML = "Please enter a valid day.";
        return;
    }

    // Meeting Time
    meet_time = document.getElementById("new-meeting-time").value;
    if (meet_time == "") {
        // showToast("Please enter meeting time.")
        document.getElementById("schedule-error-message").innerHTML = "Please enter meeting time.";
        return;
    }
    if (meet_date_year == new Date().getFullYear() && meet_date_month == (new Date().getMonth() + 1) && meet_date_date == new Date().getDate()) {
        meet_time_hour = meet_time.split(":")[0]
        meet_time_hour = parseInt(meet_time_hour)

        meet_time_minute = meet_time.split(":")[1]
        meet_time_minute = parseInt(meet_time_minute)

        current_hour = new Date().getHours()
        current_minute = new Date().getMinutes()
        if (meet_time_hour < current_hour) {
            // showToast("Please enter valid time.")
            document.getElementById("schedule-error-message").innerHTML = "Please enter valid time.";
            return;
        } else if (meet_time_hour == current_hour && meet_time_minute < current_minute) {
            // showToast("Please enter valid time.");
            document.getElementById("schedule-error-message").innerHTML = "Please enter valid time.";
            return;
        }
    }

    meet_agent_date_time = meet_date + "T" + meet_time

    user_pincode = document.getElementById("new-meeting-pincode").value;

    issue = document.getElementById("new-meeting-issue").value;
    if (issue == "") {
        //showToast("Please describe your issue.");
        document.getElementById("schedule-error-message").innerHTML = "Please describe your issue";
        return;
    }
    if (!issue.replace(/\s/g, '').length) {
        document.getElementById("schedule-error-message").innerHTML = "Please describe your issue";
        return;
    }

    json_string = JSON.stringify({
        name: name,
        phone_no: phone_no,
        email: "",
        issue: issue,
        meet_agent_date_time: meet_agent_date_time,
        user_pincode: user_pincode,
        "channel": "Web"
    });
    json_string = encrypt_variable(json_string);

    document.getElementById("new-meeting-name").value = "";
    document.getElementById("new-meeting-phone").value = "";
    document.getElementById("new-meeting-date").value = "";
    document.getElementById("new-meeting-time").value = "";
    document.getElementById("new-meeting-pincode").value = "";
    document.getElementById("new-meeting-issue").value = "";

    var CSRF_TOKEN = get_csrf_token();
    $.ajax({
        url: '/tms/schedule-meeting/',
        type: 'POST',
        headers: {
            'X-CSRFToken': CSRF_TOKEN
        },
        data: {
            data: json_string
        },
        success: function(response) {
            response = custom_decrypt(response["response"])
            response = JSON.parse(response);
            if (response["status_code"] == 200 && response["meeting_id"] != "") {
                modal_schedule_meeting.style.display = "none";
                // appendResponseServer("Thank you for scheduling the meeting. Our agent will contact you soon.",false, "", "", "");
                message = "Thank you for scheduling the meeting. Your Meeting ID is " + response["meeting_id"] + " .Kindly save it for further reference. Our customer service agent will contact you shortly."
                    // message = "Thank you for scheduling the meeting. Our agent will contact you soon.";
                append_bot_text_response(message);
            } else {
                // showToast("Unable to schedule meeting due to some internal server error. Kindly report the same", 2000);
                console.log("Please report this. ", response["status_message"]);
            }

            scroll_to_bottom();
        },
        error: function(xhr, textstatus, errorthrown) {
            console.log("Please report this error: " + errorthrown + xhr.status + xhr.responseText);
        }
    });
    enable_user_input();
}

function check_ticket_status(element) {
    document.getElementById("ticket-status-error-message").innerHTML = "";
    ticket_id = document.getElementById("check-ticket-id").value;
    if (ticket_id == "" || !ticket_id.replace(/\s/g, '').length) {
        // showToast("Please enter your ticket id.");
        document.getElementById("ticket-status-error-message").innerHTML = "Please enter your ticket id.";
        return;
    }
    json_string = JSON.stringify({
        ticket_id: ticket_id,
    });
    json_string = encrypt_variable(json_string);

    document.getElementById("check-ticket-id").value = "";

    var CSRF_TOKEN = get_csrf_token();
    $.ajax({
        url: '/tms/check-ticket-status/',
        type: 'POST',
        headers: {
            'X-CSRFToken': CSRF_TOKEN
        },
        data: {
            data: json_string
        },
        success: function(response) {
            response = custom_decrypt(response["response"])
            response = JSON.parse(response);
            if (response["status_code"] == 200 && response["ticket_exist"] == true) {
                // $('#modal-check-ticket-status').modal('close');
                modal_check_ticket_status.style.display = "none";
                message = response["ticket_status_message_response"]
                append_bot_text_response(message);
            } else if (response["ticket_exist"] == false) {
                // $('#modal-check-ticket-status').modal('close');
                modal_check_ticket_status.style.display = "none";
                message = "Sorry, no such ticket found. Please check your Ticket ID and try again."
                append_bot_text_response(message);
            } else {
                showToast("Unable to get your ticket due to some internal server error. Kindly report the same", 2000);
                console.log("Please report this. ", response["status_message"]);
            }
            scroll_to_bottom();
        },
        error: function(xhr, textstatus, errorthrown) {
            console.log("Please report this error: " + errorthrown + xhr.status + xhr.responseText);
        }
    });
    enable_user_input();
}

function check_meeting_status(element) {
    document.getElementById("meeting-status-error-message").innerHTML = "";
    meeting_id = document.getElementById("check-meeting-id").value;
    if (meeting_id == "" || !meeting_id.replace(/\s/g, '').length) {
        // showToast("Please enter your meeting id.");
        document.getElementById("meeting-status-error-message").innerHTML = "Please enter your meeting id.";
        return;
    }
    json_string = JSON.stringify({
        meeting_id: meeting_id,
    });
    json_string = encrypt_variable(json_string);

    document.getElementById("check-meeting-id").value = "";

    var CSRF_TOKEN = get_csrf_token();
    $.ajax({
        url: '/tms/check-meeting-status/',
        type: 'POST',
        headers: {
            'X-CSRFToken': CSRF_TOKEN
        },
        data: {
            data: json_string
        },
        success: function(response) {
            response = custom_decrypt(response["response"])
            response = JSON.parse(response);
            if (response["status_code"] == 200 && response["meeting_exist"] == true) {
                // $('#modal-check-meeting-status').modal('close');
                modal_check_meeting_status.style.display = "none";
                message = response["meeting_status_message_response"]
                append_bot_text_response(message);
            } else if (response["meeting_exist"] == false) {
                // $('#modal-check-meeting-status').modal('close');
                modal_check_meeting_status.style.display = "none";
                message = "Sorry, no such meeting found. Please check your Meeting ID and try again."
                append_bot_text_response(message);
            } else {
                showToast("Unable to submit your issue due to some internal server error. Kindly report the same", 2000);
                console.log("Please report this. ", response["status_message"]);
            }
            scroll_to_bottom();
        },
        error: function(xhr, textstatus, errorthrown) {
            console.log("Please report this error: " + errorthrown + xhr.status + xhr.responseText);
        }
    });
    enable_user_input();
}

$(document).ready(function() {
    $(':input').on('focus', function() {
        $(this).attr('autocomplete', 'off');
    });
});

//////////////////////////////////////////////////////////////// LiveChat

function close_livechat() {
    clear_userData();
    save_time_spent();
    unset_livechat_cookies();
    chat_socket.close();
    resize_chabot_window();
    setTimeout(function() {
        scroll_to_bottom();
    }, 1000);

}

function show_end_chat_button() {
    var html = '<div id="easychat-end-chat"><div id="easychat-sticky-end-chat" style="margin-bottom:1em;overflow-x:auto;width:100%;"></div></div>'
    document.getElementById("easychat-chat-container").innerHTML += html
    var html2 = '<div style=overflow:hidden;width:max-content>'
    html2 += '<button class="button_sticky" onclick="close_livechat()" style="color:' + BOT_THEME_COLOR + ';font-size:15px;outline:auto;border-radius:10px;border:0;height:30px;">End Chat</button>&nbsp;&nbsp;&nbsp;&nbsp;'
    html2 += '</div>'
    document.getElementById("easychat-sticky-end-chat").innerHTML = html2;
    document.getElementById("easychat-sticky-end-chat").style.display = "block"
    document.getElementById("easychat-end-chat").style.display = "block"
    document.getElementById("easychat-restart-div").style.display = "none"
    try {
        document.getElementById("easychat-sticky").style.display = "none"
        document.getElementById("user_input_div").style.width = '70%';
    } catch (err) {}
}

function hide_end_chat_button() {
    try {
        document.getElementById("easychat-end-chat").remove();
        document.getElementById("easychat-restart-div").style.display = "flex"
        document.getElementById("user_input_div").style.width = '65%';
    } catch (err) {}

    try {
        document.getElementById("easychat-sticky").style.display = "block"
    } catch (err) {}
}

function set_livechat_default_parametres() {

    is_livechat = true;
    document.getElementById("easychat-img-div").style.display = "flex"
    try {
        if (mic_access) {
            document.getElementById('easychat-mic-div').style.paddingRight = '0';
        } else {
            document.getElementById('easychat-mic-div-not-allowed').style.paddingRight = '0';
        }
    } catch (err) {}
    need_to_add_wel_msg = true;
    chat_socket = null;
    check_agent_assign_timer = null;
    customer_info_needed = true;
    email = "not_available";
    phone = "not_available";
    username = "not_available";
    send_ping_to_socket_holder = null;
    livechat_category = "-1";
    livechat_category_enabled = false;
    livechat_notification = "Our chat representatives are unavailable right now. Please try again in some time."
    easychat_user_id = "";
    is_text_to_speech_required = false;
    livechat_speech_response = "";
    easychat_user_id = user_id;
}

function append_livechat_response(is_text_to_speech_required, speech_response) {
    is_bot_response_message_showed = true

    set_livechat_default_parametres();
    is_text_to_speech_required = is_text_to_speech_required;
    livechat_speech_response = speech_response;

    if (customer_info_needed == true) {

        disable_user_input();
        append_info_form();
        customer_info_needed = false;
        setTimeout(function() {

            disable_user_input();
        }, 1000);
    } else {

        if (is_text_to_speech_required) {

            text_to_speech(livechat_speech_response);
        }
        create_customer(bot_id, email, phone, username, livechat_category, active_url, easychat_user_id)
    }
}

function create_customer(bot_id, email, phone, username, livechat_category, active_url, easychat_user_id) {

    if (livechat_session_id == "") {

        var json_string = JSON.stringify({
            bot_id: bot_id,
            username: username,
            phone: phone,
            email: email,
            livechat_category: livechat_category,
            message: livechat_trigger_message,
            active_url: active_url,
            easychat_user_id: easychat_user_id
        });
        json_string = encrypt_variable(json_string);
        json_string = encodeURIComponent(json_string);

        var xhttp = new XMLHttpRequest();
        var params = 'json_string=' + json_string;
        xhttp.open("POST", '/livechat/create-customer/', false);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                response = this.response
                response = JSON.parse(response)
                response = custom_decrypt(response)
                response = JSON.parse(response);
                if (response["status_code"] == "200") {

                    livechat_session_id = response["session_id"]
                    create_socket(livechat_session_id)
                    if (page_embed_in_iframe()) {

                        parent.postMessage({
                            event_id: 'livechat_cookie_session_user_id',
                            data: {
                                'livechat_cookie_session_id': livechat_session_id,
                            }
                        }, "*");
                    }
                    assign_agent();
                    check_agent_assign_timer = setInterval(assign_agent, 5000);
                } else if (response["status_code"] == "300") {

                    assigned_agent = response["assigned_agent"];

                    if (assigned_agent == "no_agent_online") {

                        livechat_notification = response["livechat_notification"]
                    } else if (assigned_agent == "holiday") {

                        livechat_notification = response["message"]
                    }

                    setTimeout(function() {
                        is_livechat = false;
                        unset_livechat_cookies()
                        append_system_text_response(livechat_notification);
                        append_bot_text_response("Hi, I am your personal virtual assistant. How may I assist you further?");
                        if (is_text_to_speech_required) {

                            text_to_speech("Hi, I am your personal virtual assistant. How may I assist you further?");
                        }
                        scroll_to_bottom();
                    }, 1000)

                } else {

                    M.toast({
                        "html": "Unable to delete due to some internal server error. Kindly report the same"
                    }, 2000);
                    console.log("Please report this. ", response["status_message"]);
                }
            }
        }
        xhttp.send(params);
    } else {

        create_socket(livechat_session_id)
        check_agent_assign_timer = setInterval(assign_agent, 5000);
    }
}

function append_queue_timer() {

    user_input = "Your request is in process.."
    html = '<br><div style=""width: 92%;margin: auto;margin-top: 1em;"><span id="queue-bar-timer">.</span></div>';
    document.getElementById("easychat-chat-container").innerHTML += '<div id="livechat_queue" style="display:inline-block;width:92%"><div style="box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);color: black;width: 100%;margin: auto;margin-top: 1.5em;border-radius: 1em;padding: 1em;background-color:white;text-align:center;">' + user_input + html + '</div></div>';
    scroll_to_bottom()
}

function remove_queue_timer() {
    var livechat_queue;
    try {
        livechat_queue = document.getElementById("livechat_queue");
    } catch (err) {
        livechat_queue = null;
    }
    if (livechat_queue != null && livechat_queue != undefined) {

        livechat_queue.remove();
        queue_timer = (livechat_queue_time / 5) + 1;
    }
}

function queue_timer_fun(queue_temp_timer) {

    var timer_value = queue_temp_timer
    var seconds = queue_temp_timer % 60;
    var minutes = Math.floor(queue_temp_timer / 60);
    var stop_at = timer_value - 5
    var queueTimer = setInterval(function() {
        if (document.getElementById("queue-bar-timer")) {
            if (seconds < 10) {
                if (minutes < 10) {
                    document.getElementById("queue-bar-timer").textContent = "0" + minutes + ":0" + seconds;
                } else {
                    document.getElementById("queue-bar-timer").textContent = minutes + ":0" + seconds;
                }
            } else {
                if (minutes < 10) {
                    document.getElementById("queue-bar-timer").textContent = "0" + minutes + ":" + seconds;
                } else {
                    document.getElementById("queue-bar-timer").textContent = minutes + ":" + seconds;
                }
            }
            if (timer_value <= 10) {
                document.getElementById("queue-bar-timer").style.color = "red";
            }
            if (timer_value > 10 && timer_value <= 20) {
                document.getElementById("queue-bar-timer").style.color = "orange";
            }
            if (timer_value > 20) {
                document.getElementById("queue-bar-timer").style.color = "green";
            }
        }
        timer_value = timer_value - 1;
        seconds = timer_value % 60;
        minutes = Math.floor(timer_value / 60);

        if (timer_value == stop_at) {
            clearInterval(queueTimer);
        } else if (timer_value <= 0) {

            remove_queue_timer()
        }
    }, 1000);
}

function assign_agent() {
    if (is_livechat == false || is_chat_socket_open == false || chat_socket == null) {

        return;
    }
    var json_string = JSON.stringify({
        session_id: livechat_session_id,
    });
    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string;
    xhttp.open("POST", '/livechat/assign-agent/', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            response = this.response
            response = JSON.parse(response)
            response = custom_decrypt(response)
            response = JSON.parse(response);
            var assigned_agent = "";
            if ("livechat_notification" in response && response["livechat_notification"] != "") {
                livechat_notification = response["livechat_notification"]
            }

            if ("assigned_agent" in response) {
                assigned_agent = response["assigned_agent"]
            }

            if (assigned_agent == "") {
                return;
            }

            if (assigned_agent == "scheduler_queue") {

                if (queue_timer == (livechat_queue_time / 5) + 1) {

                    append_queue_timer()
                    disable_user_input()
                }
                queue_timer -= 1;
                if (queue_timer == 0) {

                    scroll_to_bottom();
                    is_livechat = true;
                    chat_socket.close("1000");
                    queue_timer = (livechat_queue_time / 5) + 1;
                    remove_queue_timer()
                    enable_user_input()
                } else {

                    queue_timer_fun(queue_timer * 5)
                }
            } else if (assigned_agent == "None") {

                need_to_add_wel_msg = true;
                unset_livechat_cookies()
                is_livechat = false;
                if (chat_socket != null && is_chat_socket_open != false) {

                    chat_socket.close();
                }
                remove_queue_timer();
            } else if (assigned_agent == "not_available") {

                scroll_to_bottom();
                is_livechat = true;
                chat_socket.close();
                unset_livechat_cookies()
                remove_queue_timer()
            } else if (assigned_agent == "session_end") {

                is_livechat = false;
                document.getElementById("easychat-img-div").style.display = "none";
                try {
                    if (mic_access) {

                        document.getElementById('easychat-mic-div').style.paddingRight = '10px';
                    } else {

                        document.getElementById('easychat-mic-div-not-allowed').style.paddingRight = '10px';
                    }
                } catch (err) {}
                chat_socket.close();
                need_to_add_wel_msg = true;
                remove_queue_timer()
                scroll_to_bottom();

            } else if (assigned_agent == "abruptly_end") {

                chat_socket.close();
                unset_livechat_cookies()
                need_to_add_wel_msg = true;
                remove_queue_timer()
                scroll_to_bottom();
            } else {

                if (is_chat_socket_open == true && need_to_add_wel_msg == true) {

                    var message = "<b>" + assigned_agent + "</b> has joined the chat. Please ask your queries now.<br>"
                    append_system_text_response(message);
                    need_to_add_wel_msg = false;
                    scroll_to_bottom();
                    show_end_chat_button()
                    resize_chabot_window()
                }
                queue_timer = (livechat_queue_time / 5) + 1
                if (document.getElementById("queue-bar-timer")) {

                    document.getElementById("livechat_queue").remove()
                    enable_user_input()
                }
            }
        }
    }
    xhttp.send(params);
}

function send_ping_to_socket() {

    if (is_chat_socket_open == true && chat_socket != null) {
        var sentence = JSON.stringify({
            'message': JSON.stringify({ "text_message": "", "type": "text", "channel": "Web", "path": "", "event_type": "CUSTOMER_STILL_THERE" }),
            'sender': 'ping',
        });
        chat_socket.send(sentence);
    }
}

function create_socket(livechat_session_id) {

    var new_element = document.createElement('div');
    new_element.setAttribute('id', 'livechat-loader-div');
    new_element.innerHTML = '<div style="width:100%;float:left; display:none;" id="livechat-loader"><img src="' + EASYCHAT_IMG_PATH + 'preloader.svg" style="height:3em;"></div>';
    document.getElementById("easychat-footer").prepend(new_element);

    is_livechat = true;

    if (chat_socket == null && is_chat_socket_open == false) {
        chat_socket = window.location.protocol == "http:" ? 'ws://' : 'wss://'
        chat_socket += window.location.host + '/ws/' + livechat_session_id + '/customer/';
        chat_socket = new WebSocket(chat_socket)

        chat_socket.onmessage = send_message_to_agent_socket;
        chat_socket.onopen = open_livechat_socket;
        chat_socket.onclose = close_livechat_socket;
        chat_socket.onerror = onerror_livechat_socket;

    }
    try {
        document.getElementById("easychat-img-div").style.display = "flex"
        try {
            if (mic_access) {
                document.getElementById('easychat-mic-div').style.paddingRight = '0';
            } else {
                document.getElementById('easychat-mic-div-not-allowed').style.paddingRight = '0';
            }
        } catch (err) {}
    } catch (err) {}
    scroll_to_bottom();
}

function onerror_livechat_socket(e) {

    console.log("Connection break due to some internal server error.")
    livechat_notification = "Looks like your internet is weak. Unable to connect."
    append_system_text_response(livechat_notification);
    save_customer_chat(livechat_notification, livechat_session_id, "System", "", "")
    is_chat_socket_open = false;
    is_livechat = false;
    document.getElementById("easychat-img-div").style.display = "none"
    try {
        if (mic_access) {

            document.getElementById('easychat-mic-div').style.paddingRight = '10px';
        } else {

            document.getElementById('easychat-mic-div-not-allowed').style.paddingRight = '10px';
        }
    } catch (err) {}
    chat_socket = null;
}

function open_livechat_socket(e) {

    console.log("Connection established.")
    is_livechat = true;
    left_msg_append = false
    is_chat_socket_open = true;
    send_ping_to_socket_holder = setInterval(send_ping_to_socket, 1000);

}

function close_livechat_socket(e) {

    is_livechat_msg = true;
    if (chat_socket != null && is_chat_socket_open == true) {

        document.getElementById("livechat-loader").style.display = "none";
        document.getElementById("livechat-loader-div").style.display = "none";
    }
    console.log('Chat socket closed unexpectedly');
    scroll_to_bottom();
    var element = document.getElementById("easychat-sticky");

    if (element != undefined || element != null) {

        element.style.display = "block";
    }
    if (is_livechat == true && is_chat_socket_open == true) {

        is_livechat = false;
        document.getElementById("easychat-img-div").style.display = "none"
        try {
            if (mic_access) {

                document.getElementById('easychat-mic-div').style.paddingRight = '10px';
            } else {

                document.getElementById('easychat-mic-div-not-allowed').style.paddingRight = '10px';
            }
        } catch (err) {}
        append_system_text_response(livechat_notification);
        if (bot_restarted == false) {

            append_bot_text_response("Hi, I am your personal virtual assistant. How may I assist you further?");
            if (is_text_to_speech_required) {

                text_to_speech("Hi, I am your personal virtual assistant. How may I assist you further?");
            }
        } else {

            bot_restarted = false
        }
        scroll_to_bottom();
    }
    is_chat_socket_open = false;
    is_livechat = false;
    document.getElementById("easychat-img-div").style.display = "none"
    try {
        if (mic_access) {

            document.getElementById('easychat-mic-div').style.paddingRight = '10px';
        } else {

            document.getElementById('easychat-mic-div-not-allowed').style.paddingRight = '10px';
        }
    } catch (err) {}
    clearInterval(send_ping_to_socket_holder);
    clearInterval(check_agent_assign_timer);
    need_to_add_wel_msg = true;
    chat_socket = null;
}

function mark_all_message_seen() {

    var easychat_doubletick_list = document.getElementsByClassName("doubletick_livechat");

    for (var itr = 0; itr < easychat_doubletick_list.length; itr++) {

        easychat_doubletick_list[itr].src = EASYCHAT_IMG_PATH + 'doubletick_blue.svg';
    }
}

function maximize_chatbot() {
    console.log('called');
    if (is_bot_minimized == true) {

        parent.postMessage({
            event_id: 'chatbot_minimized_state',
            data: {
                'is_bot_minimized': true
            }
        }, "*");
    }
}

function send_message_to_agent_socket(e) {

    var data = JSON.parse(e.data);
    var message = JSON.parse(data['message']);
    var sender = data['sender'];
    if (sender == "agent_end_session") {

        append_feedback_form(livechat_session_id);
        unset_livechat_cookies();
        scroll_to_bottom();
        maximize_chatbot()

    } else if (sender == "Agent") {
        if (message['type'] == 'file') {
            file_path = message["path"]
            message = message["text_message"]
            append_file_to_customer(file_path, message);
            mark_all_message_seen();
            scroll_to_bottom();
            maximize_chatbot();
        } else if (message['type'] == 'text') {
            append_bot_text_response(message["text_message"]);
            scroll_to_bottom();
            mark_all_message_seen();
            maximize_chatbot();
        }
        check_for_message_seen_signal();
    } else if (sender == "System") {
        if ("event_type" in message && message["event_type"] == "CHAT_TRANSFERRED" && "session_id" in message) {
            livechat_session_id = message["session_id"]
            append_system_text_response(message["text_message"]);
            maximize_chatbot();
        } else if ("event_type" in message && message["event_type"] == "AGENT_MESSAGE_SEEN") {
            mark_all_message_seen();
        } else if ("event_type" in message && message["event_type"] == "AGENT_TYPING") {
            show_bot_typing_loader()
            if (hide_bot_typing_loader_timeout != null) {

                clearTimeout(hide_bot_typing_loader_timeout);
            }
            hide_bot_typing_loader_timeout = setTimeout(function() {
                hide_bot_typing_loader()
            }, 5000)
        }
    }
}
var livechat_user_id_feedback = ""
var livechat_session_id_feedback = ""

function disable_sticky_intents() {
    try {
        document.getElementById("easychat-sticky-intents").style.pointerEvents = "none";
    } catch (err) {}
}

function enable_sticky_intents() {
    try {
        document.getElementById("easychat-sticky-intents").style.pointerEvents = "unset";
    } catch (err) {}
}

function append_feedback_form(livechat_session_feedback, livechat_user_feedback) {
    is_livechat_msg = true
    is_livechat = true
    livechat_user_id_feedback = livechat_user_feedback
    livechat_session_id_feedback = livechat_session_feedback
    append_system_text_response("Agent has left the session. LiveChat session ended.");
    is_livechat_msg = false
    is_livechat = false
    disable_user_input()
    disable_sticky_intents()

    user_input = '<p style="font-family: Silka;font-style: normal;font-weight: bold;font-size: 18px;line-height: 22px;color: #2D2D2D;">Feedback</p><p style="font-family: Silka;font-style: normal;font-weight: 500;font-size: 15px;line-height: 20px;color: #4D4D4D;">On a scale of 0-10, how likely are you to recommend <strong style="color: black;font-family: Silka;">LiveChat</strong> to a friend or colleague?<p>';
    var time = return_time();
    var html = '<div class="rating-bar-container__wrapper" style="width: 105%; margin: auto;margin-top: 1em;">\
                <div id="rating-bar-container__XqPZ" class="rating-bar-container" zQPK="false" onmouseout="change_color_ratingz_bar_all(this)">\
                <button id="rating-bar-button__00" onmouseover="change_color_ratingv_bar(this)" onmouseout="change_color_ratingz_bar(this)" onclick="set_value_to_some(this)" value="1" style="color:' + BOT_THEME_COLOR + ' !important">0</button><button id="rating-bar-button__01" onmouseover="change_color_ratingv_bar(this)" onmouseout="change_color_ratingz_bar(this)" onclick="set_value_to_some(this)" value="2" style="color:' + BOT_THEME_COLOR + ' !important">1</button><button id="rating-bar-button__02" onclick="set_value_to_some(this)" onmouseover="change_color_ratingv_bar(this)" onmouseout="change_color_ratingz_bar(this)" value="3" style="color:' + BOT_THEME_COLOR + ' !important">2</button><button id="rating-bar-button__03" onmouseover="change_color_ratingv_bar(this)" onclick="set_value_to_some(this)" onmouseout="change_color_ratingz_bar(this)" value="4" style="color:' + BOT_THEME_COLOR + ' !important">3</button><button id="rating-bar-button__04" onclick="set_value_to_some(this)" onmouseover="change_color_ratingv_bar(this)" onmouseout="change_color_ratingz_bar(this)" value="5" style="color:' + BOT_THEME_COLOR + ' !important">4</button><button id="rating-bar-button__05" onmouseover="change_color_ratingv_bar(this)" onclick="set_value_to_some(this)" onmouseout="change_color_ratingz_bar(this)" value="6" style="color:' + BOT_THEME_COLOR + ' !important">5</button><button id="rating-bar-button__06" onclick="set_value_to_some(this)" onmouseover="change_color_ratingv_bar(this)" onmouseout="change_color_ratingz_bar(this)" value="7" style="color:' + BOT_THEME_COLOR + ' !important">6</button><button id="rating-bar-button__07" onmouseover="change_color_ratingv_bar(this)" onclick="set_value_to_some(this)" onmouseout="change_color_ratingz_bar(this)" value="8" style="color:' + BOT_THEME_COLOR + ' !important">7</button><button id="rating-bar-button__08" onclick="set_value_to_some(this)" onmouseover="change_color_ratingv_bar(this)" onmouseout="change_color_ratingz_bar(this)" value="9" style="color:' + BOT_THEME_COLOR + ' !important">8</button><button id="rating-bar-button__09" onmouseover="change_color_ratingv_bar(this)" onclick="set_value_to_some(this)" onmouseout="change_color_ratingz_bar(this)" value="10" style="color:' + BOT_THEME_COLOR + ' !important">9</button><button id="rating-bar-button__10" onclick="set_value_to_some(this)" onmouseover="change_color_ratingv_bar(this)" onmouseout="change_color_ratingz_bar(this)" value="11" style="color:' + BOT_THEME_COLOR + ' !important">10</button>\
                </div><br><div id="rating-bar-container-timer-div" style="width:30%;margin:auto;"><span id="rating-bar-container-timer__XqPZ"></span></div></div>'
    html += '<textarea placeholder="Comments (optional)" col="30" id="livechat-chatbot-comment-box" style="color: rgb(158, 158, 158);resize:none;height: 132px;width: 100%; border: 1px solid #E6E6E6; border-radius: 0.5em;display:inline-block;margin-left: -0.1em;" onchange="save_livechat_feedback_text()"></textarea>';
    html += '<a class="btn right" style="background-color:' + BOT_THEME_COLOR + ' !important;margin-left: 0.2em;border-radius: 30px !important;font-size: 0.9rem !important;font-weight: 400 !important;color: white !important;font-family: &quot;Silka&quot;;cursor: pointer;text-align: center;height: 36px;line-height: 36px;padding: 0 16px;vertical-align: middle;float: right !important;margin-top: 0.2em;" onclick="add_livechat_nps()">Submit</a>'
    html += '<a class="right" style="background-color: white !important;margin-left: 0.2em;color: #757575;size: 14px !important;float: right;text-decoration: none;margin-top: 0.9em;margin-right: 0.5em;" onclick="add_livechat_nps()"><b>No, Thanks</b></a>'
    document.getElementById("easychat-chat-container").innerHTML += '<div id="livechat_feedback" style="display:inline-block;"><div style="box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);color: black;width: 90%;margin: auto;margin-top: 1.5em;border-radius: 1em;padding: 1em;background-color:white;padding-right: 1.1em;height: 25em;margin-bottom:1em;">' + user_input + html + '</div></div>';
    scroll_to_bottom();
    changeMiddleContainer();
    resize_chabot_window();
}

function save_livechat_feedback_text() {
    livechat_nps_text = document.getElementById("livechat-chatbot-comment-box").value;
}

function set_value_to_some(el) {
    el.parentElement.setAttribute("zQPK", "true")
    rate_value = parseInt(el.getAttribute("value")) - 1
}

function add_livechat_nps() {
    if (rate_value == "")
        rate_value = -1
    save_livechat_feedback(rate_value, livechat_user_id_feedback, livechat_session_id_feedback, livechat_nps_text);
    livechat_session_id_feedback = ""
    livechat_user_id_feedback = ""
    document.getElementById("livechat_feedback").remove()
    if (is_text_to_speech_required) {
        text_to_speech("Thank you for connecting with us. Hoping to help you in the future again.");
        text_to_speech("Hi, I am your personal virtual assistant. How may I assist you further?");
    }
    append_bot_text_response("Thank you for connecting with us. Hoping to help you in the future again.");
    append_bot_text_response("Hi, I am your personal virtual assistant. How may I assist you further?");
    scroll_to_bottom();
    changeMiddleContainer();
    resize_chabot_window();
    enable_sticky_intents();
    enable_user_input()
    unset_livechat_cookies()
}


function change_color_ratingz_bar_all(el) {
    current_hover_value = parseInt(el.childElementCount);
    if (el.getAttribute("zQPK") == "false") {
        for (var i = 0; i <= current_hover_value; i++) {
            if (el.children[i] != undefined) {
                el.children[i].style.color = "black"
                el.children[i].style.backgroundColor = "white"
            }
        }
    }
}

function change_color_ratingz_bar(el) {
    current_hover_value = parseInt(el.getAttribute("value"));
    for (var i = current_hover_value; i <= current_hover_value; i++) {
        if (el.parentElement.children[i] != undefined) {
            el.parentElement.children[i].style.color = "black"
            el.parentElement.children[i].style.backgroundColor = "white"
        }
    }
}

function change_color_ratingv_bar(el) {
    current_hover_value = parseInt(el.getAttribute("value"));
    for (var i = 0; i <= current_hover_value; i++) {
        if (current_hover_value <= 6) {
            el.parentElement.children[i].style.color = "white"
            el.parentElement.children[i].style.backgroundColor = "red"
        }
        if (6 < current_hover_value && current_hover_value <= 8) {
            el.parentElement.children[i].style.color = "white"
            el.parentElement.children[i].style.backgroundColor = "orange"
        }
        if (8 < current_hover_value) {
            el.parentElement.children[i].style.color = "white"
            el.parentElement.children[i].style.backgroundColor = "green"
        }
    }
    for (var j = current_hover_value; j <= el.parentElement.childElementCount; j++) {
        if (el.parentElement.children[j] != undefined) {
            el.parentElement.children[j].style.color = "black"
            el.parentElement.children[j].style.backgroundColor = "white"
        }
    }
}


function save_livechat_feedback(rate_value_nps, user_id, livechat_session_feedback, nps_text_feedback_livechat) {
    var json_string = JSON.stringify({
        user_id: user_id,
        rate_value: rate_value_nps,
        bot_id: bot_id,
        session_id: livechat_session_feedback,
        nps_text_feedback: nps_text_feedback_livechat
    });

    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", '/livechat/save-livechat-feedback/', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Rating updated successfully!!!")
        }
    }
    xhttp.send(params);
}

function save_customer_chat(sentence, livechat_session_id, sender, path, chat_ended_by) {

    if (path === undefined) {
        path = ""
    }
    if (chat_ended_by === undefined) {
        chat_ended_by = ""
    }

    var json_string = JSON.stringify({
        message: sentence,
        sender: sender,
        attached_file_src: path,
        session_id: livechat_session_id,
        chat_ended_by: chat_ended_by
    });
    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", '/livechat/save-customer-chat/', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            response = this.response
            response = JSON.parse(response)
            response = custom_decrypt(response)
            response = JSON.parse(response);
            if (response["status"] == 200 || response["status"] == "200") {
                console.log("chat send by agent saved");
            }
        }
    }
    xhttp.send(params);
}

// var mark_offline_var = false;
window.onbeforeunload = function(e) {

    cancel_text_to_speech()
        // clear_userData()
    if (window.localStorage) {
        // flag the page as being unloading
        window.localStorage['myUnloadEventFlag'] = new Date().getTime();
    }
    // if (chat_socket != null) {
    //     chat_socket.close();
    // }
}

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        cancel_text_to_speech();
    }
}, false);

function add_phone_number_validation() {

    var mobile_number = document.getElementById("easychat-customer-phone")
    if (mobile_number.length >= 10) {

        mobile_number.value = mobile_number.value.substring(0, 10);
    }
}
///////////////////////////////      LiveChat Customer Info     ////////////////////////////

function append_info_form(assigned_agent) {
    var html = '<div id="customer_info_form_modal" class="easychat-modal livechat-agent-modal" style = "display: flex; align-items: center; justify-content: center; overflow: hidden"><div class="easychat-modal-content livechat-agent-modal-content" style="margin: 17% auto;height:fit-content;background: #FBFBFB; box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25); border-radius: 6px; overflow: hidden;">'
    html += '<div id="customer_info_form_div" style="text-align: left;">'
    html += '<p style = "font-weight: 500; font-size: 18px; line-height: 18px; color: #2D2D2D;">Connect with Agent</p>'
    html += '<span style = "font-weight: 500; font-size: 16px; line-height: 16px; color: #4D4D4D;">Please fill in these details to connect to our agent</span><br>'
    html += '<div class = "easychat-form-div">'
    html += '<div class="placeholder">'
    html += '<label for="name">Enter your Name</label>'
    html += '<span class="star">*</span>'
    html += '</div>'
    html += '<input id="easychat-customer-name" class = "easychat-customer-input" autocomplete="off">'
    html += '</div>'
    html += '<div class = "easychat-form-div">'
    html += '<div class="placeholder">'
    html += '<label for="name">Enter Email-ID</label>'
    html += '<span class="star">*</span>'
    html += '</div>'
    html += '<input id="easychat-customer-email" class = "easychat-customer-input" autocomplete="off">'
    html += '</div>'
    html += '<div class = "easychat-form-div">'
    html += '<div class="placeholder">'
    html += '<label for="name">Enter Phone Number</label>'
    html += '<span class="star">*</span>'
    html += '</div>'
    html += '<input type="number" id="easychat-customer-phone" class = "easychat-customer-input" autocomplete="off" inputmode="decimal">'
    html += '</div>'
    html += '<div id="livechat-agent-category-div" style="cursor: pointer;">'
    html += '</div>'
    html += '<div class="livechat-modal-submit-btn-div" style="display: flex; justify-content: flex-end; align-content: center;">'
    html += '<input type = "button" value = "Cancel" class = "easychat-customer-modal-cancel-btn" onclick="close_customer_info_form_modal()">'
    html += '<input class="livechat-modal-submit-btn" style="background-color:' + BOT_THEME_COLOR + ' ;"onclick="submit_customer_info()" type="submit" value="Submit">'
    html += '</div>'
    html += '<div id = "easychat_customer_info_form_error" style="display:none;">'
    html += '<p id = "easychat_customer_info_form_error_ptag" style="color:red; margin-bottom:0px; margin-top:8px;"></p>'
    html += '</div>'
    html += '</div>'
    html += '<div id="cutomer_info_form_termination">'
    html += '<p style="text-align: center;font-size: 15px;">To connect with a LiveChat Agent, please click on "Continue" and submit your details.</p><br>'
    html += '<input class="livechat-modal-continue-btn" onclick="submit_go_back()" type="submit" value="<< Go Back">'
    html += '<input class="livechat-modal-cancel-btn" style="background-color:' + BOT_THEME_COLOR + ' ;"onclick="submit_continue()" type="submit" value="Continue >>">'
    html += '</div>'
    html += '</div>;'
    html += '</div>';
    document.getElementById("easychat-chat-container").innerHTML += html;

    append_livechat_category()

    var element = document.getElementById("easychat-sticky");

    if (element != undefined || element != null) {

        element.style.display = "none";
    }
    document.getElementById("customer_info_form_modal").style.display = "flex";
    disable_user_input();
    try {

        document.getElementById("easychat-customer-phone").onkeyup = add_phone_number_validation;
        document.getElementById("easychat-customer-name").focus()
    } catch (err) {}
}

function append_livechat_category() {
    var json_string = JSON.stringify({
        bot_id: bot_id
    });
    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", GET_LIVECHAT_CATEGORY, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            response = JSON.parse(this.responseText);
            response = custom_decrypt(response)
            response = JSON.parse(response);

            if (response["status_code"] == "200") {
                livechat_category_enabled = true;
                category_list = response["category_list"]

                var value = "-1";

                var html = '<div class="input-field col s12 easychat-form-div"><div class="placeholder" style = "z-index:1; top:30px"><label for="name">Choose Category</label><span class="star">*</span></div><select id="livechat-agent-category" class = "easychat-customer-input" onfocus="this.size=5;" onblur="this.size=1;" onchange="this.size=1; this.blur();"><option></option>'

                for (var i = 0; i < category_list.length; i++) {

                    html += '<option value=' + category_list[i]["pk"] + '>' + category_list[i]["title"] + '</option>'
                }
                html += '</select></div>'

                $(".easychat-modal-content").css('margin', '14% auto')

                if (EASYCHAT_BOT_THEME == 'theme_4') {
                    $(".easychat-modal-content").css('height', 'fit-content')
                } else {
                    $(".easychat-modal-content").css('height', 'fit-content')
                }
                $(".livechat-modal-submit-btn-div").css('bottom', '3em')
                document.getElementById("livechat-agent-category-div").innerHTML = html;

                $('#livechat-agent-category').change(function() {
                    this.size = 1;
                    $(this).siblings('.placeholder').hide();
                });

                $('#livechat-agent-category').focus(function() {
                    $(this).siblings('.placeholder').hide();
                });

                $('#livechat-agent-category').select2({
                    placeholder: "",
                    allowClear: true,
                    dropdownParent: $('#customer_info_form_modal')
                }).on('select2:open', function() {

                    $('.select2-dropdown--below').attr('id', 'open-above');
                    $('#open-above').removeClass('select2-dropdown--below');
                    $('#open-above').addClass('select2-dropdown--above');
                });
            }
        }


        $('.placeholder').click(function() {
            $(this).siblings('input').focus();
        });

        $('.easychat-customer-input').on('input', function() {
            $(this).siblings('.placeholder').hide();
        })

        $('.easychat-form-div').focusout(function() {
            var input_val = $(this).children('.easychat-customer-input').val();
            if (input_val == null || input_val.length == 0)
                $(this).children('.placeholder').show();
        });

        $('.easychat-form-div').blur();

    }
    xhttp.send(params);
}

function validate_name(id) {

    var regex = /^[a-zA-Z ]{2,30}$/;
    var ctrl = document.getElementById(id);

    var name = ctrl.value.trim();
    var name_list = name.split(" ");

    for (var i = 0; i < name_list.length; i++) {

        if (name_list[i] != "" && regex.test(name_list[i])) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}

function validate_phone_number(id) {

    var regex = /[6-9][0-9]{9}/;
    var ctrl = document.getElementById(id);

    if (ctrl.value != "" && regex.test(ctrl.value) && ctrl.value.length == 10) {
        return true;
    } else {
        return false;
    }
}

function validate_email(id) {

    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var ctrl = document.getElementById(id);

    if (ctrl.value != "" && regex.test(ctrl.value)) {
        return true;
    } else {
        return false;
    }
}

function resize_customer_info_modal() {

    if (livechat_category_enabled) {

        $(".easychat-modal-content").css('margin', '14% auto')
        $(".easychat-modal-content").css('height', 'fit-content')
        $(".livechat-modal-submit-btn-div").css('bottom', '2em')
    } else {

        $(".easychat-modal-content").css('margin', '17% auto')
        $(".easychat-modal-content").css('height', 'fit-content')
        $(".livechat-modal-submit-btn-div").css('bottom', '7em')
    }
}

function submit_customer_info() {
    is_bot_response_message_showed = true

    document.getElementById("easychat_customer_info_form_error").style.display = "none";
    if (validate_name("easychat-customer-name") == false) {

        resize_customer_info_modal()
            //document.getElementById("easychat-customer-name").setAttribute("placeholder", "Please enter a valid name.");
        document.getElementById("easychat_customer_info_form_error").style.display = "block";
        document.getElementById("easychat_customer_info_form_error_ptag").innerHTML = "Please enter a valid name."
        return;
    }
    if (validate_email("easychat-customer-email") == false) {

        resize_customer_info_modal()
            //document.getElementById("easychat-customer-email").setAttribute("placeholder", "Please enter a valid email.");
        document.getElementById("easychat_customer_info_form_error").style.display = "inline";
        document.getElementById("easychat_customer_info_form_error_ptag").innerHTML = "Please enter a valid email."
        return;
    }
    if (validate_phone_number("easychat-customer-phone") == false) {

        resize_customer_info_modal()
            //document.getElementById("easychat-customer-phone").setAttribute("placeholder", "Please enter a valid phone number.");
        document.getElementById("easychat_customer_info_form_error").style.display = "block";
        document.getElementById("easychat_customer_info_form_error_ptag").innerHTML = "Please enter a valid phone number."
        return;
    }
    email = document.getElementById("easychat-customer-email").value;
    phone = document.getElementById("easychat-customer-phone").value;
    username = document.getElementById("easychat-customer-name").value;
    var element = document.getElementById("livechat-agent-category");
    if (element != undefined && element != null) {
        livechat_category = element.value;
        if (livechat_category == "-1") {
            resize_customer_info_modal();
            document.getElementById("easychat_customer_info_form_error").style.display = "block";
            document.getElementById("easychat_customer_info_form_error_ptag").innerHTML = "Please select a valid category."
            return;
        }
    } else {
        livechat_category = "-1";
    }
    document.getElementById("customer_info_form_modal").remove();

    if (is_text_to_speech_required) {

        text_to_speech(livechat_speech_response);
    }
    active_url = window.location.host + window.location.pathname
    create_customer(bot_id, email, phone, username, livechat_category, active_url, easychat_user_id)
    enable_user_input();

    parent.postMessage({
        event_id: 'create-cobrowsing-lead',
        data: {
            username: username,
            email: email,
            phone: phone
        }
    }, "*");
}

function close_customer_info_form_modal() {

    document.getElementById("customer_info_form_div").style.display = "none";
    document.getElementById("cutomer_info_form_termination").style.display = "block";
    enable_user_input()
}

function submit_continue() {

    document.getElementById("customer_info_form_div").style.display = "block";
    document.getElementById("cutomer_info_form_termination").style.display = "none";
    enable_user_input()
}

function submit_go_back() {

    document.getElementById("customer_info_form_modal").remove();
    var element = document.getElementById("easychat-sticky");

    if (element != undefined || element != null) {

        element.style.display = "block";
    }
    customer_info_needed = true
    if (is_text_to_speech_required) {

        text_to_speech(livechat_speech_response);
        text_to_speech("Hi, I am your personal virtual assistant. How may I assist you further?");
    }
    append_bot_text_response("Hi, I am your personal virtual assistant. How may I assist you further?");
    is_livechat = false
    document.getElementById("easychat-img-div").style.display = "none"
    try {
        if (mic_access) {
            document.getElementById('easychat-mic-div').style.paddingRight = '10px';
        } else {
            document.getElementById('easychat-mic-div-not-allowed').style.paddingRight = '10px';
        }
    } catch (err) {}
    enable_user_input()
}

function clear_userData() {

    var json_string = JSON.stringify({
        user_id: user_id,
    });
    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);
    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string;
    xhttp.open("POST", CLEAR_API_URL, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
        }
    }
    xhttp.send(params);
    if (is_chat_socket_open == true && chat_socket != null) {
        if (left_msg_append == false) {

            if (livechat_session_id != "") {
                save_customer_chat('Customer left the chat', livechat_session_id, "System", "", "Customer")
                livechat_notification = "Your chat has ended"
                left_msg_append == true
                var sentence = JSON.stringify({
                    'message': JSON.stringify({ "text_message": "Customer left the chat", "type": "text", "channel": "Web", "path": "", "event_type": "ENDBYUSER" }),
                    'sender': 'System',
                });
                chat_socket.send(sentence);
            }
            chat_socket.close("3001");
        }

        remove_queue_timer();
    }
    if (check_agent_assign_timer != null) {

        clearInterval(check_agent_assign_timer);
    }
    is_conversaion_started = false;
    is_doubletick = false;
}


// ############## NPS  FeedBack js  START #######################

function setValuetoSome(el) {
    el.parentElement.setAttribute("zQPK", "true")
    document.getElementById("easychat-exit-app-feedback").style.display = "none";
    document.getElementById("chatbot_feedback_comment_box").style.display = "block";
}

function changeColorRatingzBarAll(el) {
    current_hover_value = parseInt(el.childElementCount);
    if (el.getAttribute("zQPK") == "false") {
        for (var i = 0; i <= current_hover_value; i++) {
            if (el.children[i] != undefined) {
                el.children[i].style.color = "black"
                el.children[i].style.backgroundColor = "white"
            }
        }
    }
}

function changeColorRatingzBar(el) {
    current_hover_value = parseInt(el.getAttribute("value"));
    for (var i = current_hover_value; i <= current_hover_value; i++) {
        if (el.parentElement.children[i] != undefined) {
            el.parentElement.children[i].style.color = "black"
            el.parentElement.children[i].style.backgroundColor = "white"
        }
    }
}

function changeColorRatingvBar(el) {
    current_hover_value = parseInt(el.getAttribute("value"));
    for (var i = 0; i < current_hover_value; i++) {
        if (current_hover_value <= 6) {
            el.parentElement.children[i].style.color = "white"
            el.parentElement.children[i].style.backgroundColor = "red"
        }
        if (6 < current_hover_value && current_hover_value <= 8) {
            el.parentElement.children[i].style.color = "white"
            el.parentElement.children[i].style.backgroundColor = "orange"
        }
        if (8 < current_hover_value) {
            el.parentElement.children[i].style.color = "white"
            el.parentElement.children[i].style.backgroundColor = "green"
        }
    }
    for (var j = current_hover_value; j <= el.parentElement.childElementCount; j++) {
        if (el.parentElement.children[j] != undefined) {
            el.parentElement.children[j].style.color = "black"
            el.parentElement.children[j].style.backgroundColor = "white"
        }
    }
}

function detectIEEdge() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return true;
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return true;
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge => return version number
        return false;
    }
    // other browser
    return false;
}

// ############## NPS  FeedBack js  END #######################
// ############## Height Adjustment #################

function changeMiddleContainer() {
    var sticky_intent_height = 0;
    try {
        sticky_intent_height = document.getElementById("easychat-sticky").offsetHeight;
    } catch (err) {
        sticky_intent_height = 0;
    }

    if (sticky_intent_height == null || sticky_intent_height == undefined) {
        sticky_intent_height = 0;
    }

    document.getElementById("easychat-chat-container").style.height = String(window.innerHeight - (document.getElementById("easychat-navbar").offsetHeight + document.getElementById("easychat-footer").offsetHeight + sticky_intent_height)) + "px";
}

// ############## Cobrowsing Integration Start ####################

function screenshare_with_agent(element) {
    element.innerHTML = "Connecting...";
    document.getElementById("connect-agent-status-error-message").innerHTML = "";
    var full_name = document.getElementById("connect-agent-name").value;
    var mobile_number = document.getElementById("connect-agent-phone").value;
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var regMob = /^[6-9]{1}[0-9]{9}$/;

    if (!regName.test(full_name)) {
        document.getElementById("connect-agent-status-error-message").innerHTML = "Please enter full name";
        return;
    }

    if (!regMob.test(mobile_number)) {
        document.getElementById("connect-agent-status-error-message").innerHTML = "Please enter valid 10-digit mobile number";
        return;
    }

    parent.postMessage({
        event_id: 'connect-with-agent',
        data: {
            "full_name": full_name,
            "mobile_number": mobile_number
        }
    }, "*");

    document.getElementById("modal-connect-with-agent").style.display = "none";
}

// function append_connect_with_agent(){
//     var recommendations_html = '<div class="easychat-recommendation-wrapper" align="left">';
//     if(window.EASYCHAT_EASYASSIST_ENABLED=="True"){
//      recommendations_html+= "<div class=\"easychat-recommendation\" onmouseover='custom_button_change(this)' onmouseout='custom_button_change_normal(this)' style=\"border: 0.05em solid "+BOT_THEME_COLOR+";color: "+BOT_THEME_COLOR+"\" onclick=\"show_connect_with_agent_modal(this)\">Connect with expert</div>";
//     }else if(window.EASYCHAT_LIVECHAT_ENABLED=="True"){
//      recommendations_html+= "<div class=\"easychat-recommendation\" onmouseover='custom_button_change(this)' onmouseout='custom_button_change_normal(this)' style=\"border: 0.05em solid "+BOT_THEME_COLOR+";color: "+BOT_THEME_COLOR+"\" onclick=\"append_livechat_response(this)\">Chat with expert</div>";
//     }
//     recommendations_html+="</div>";
//     document.getElementById("easychat-chat-container").innerHTML += recommendations_html;
// }

// ############## Cobrowsing Integration End ########################

window.addEventListener('message', handle_parent_message, false);

function handle_parent_message(event) {
    try {
        data = JSON.parse(event.data);
        if (data.attachment == "None") {
            append_bot_text_response(data.message);
        } else {
            var html = '<a href="' + data.attachment + '" target="_blank"><img src="/static/EasyAssistApp/img/documents2.png" style="height: 100%;width: 100%;border-radius: 1em;object-fit: contain;"></a>';
            document.getElementById("easychat-chat-container").innerHTML += '<div style="width:98%;display:inline-block;"><div class="easychat-livechat-customer-attachment" style="float:left;">' + html + '<div class="easychat-livechat-message">' + data.message + '</div></div></div>';
        }
        scroll_to_bottom();
        is_cobrowsing_chat = true;
    } catch (err) {}
}



// #######################################       Typing preloader   #########################

function send_typing_message_to_agent() {

    if (is_chat_socket_open == true && chat_socket != null) {
        var sentence = JSON.stringify({
            'message': JSON.stringify({ "text_message": "", "type": "text", "channel": "Web", "path": "", "event_type": "CUSTOMER_TYPING" }),
            'sender': 'System',
        });
        chat_socket.send(sentence);
    }
}

function check_for_message_seen_signal() {

    $(window).focus(function() {

        if (is_chat_socket_open == true && chat_socket != null) {
            var sentence = JSON.stringify({
                'message': JSON.stringify({ "text_message": "", "type": "text", "channel": "Web", "path": "", "event_type": "CUSTOMER_MESSAGE_SEEN" }),
                'sender': 'System',
            });
            chat_socket.send(sentence);
        }
    });
}

function change_span_name_to_file_name_livechat(el) {

    if (el.files[0] != undefined || el.files[0] != null) {
        var file_ext = el.files[0].name.split(".");
        file_ext = el.files[0].name.split(".")[file_ext.length - 1];
        var file_name_malicious = false
        var check_file_more_than_one_fullstop = el.files[0].name.replace(" ", "").split(".");
        if (check_file_more_than_one_fullstop.length > 2) {
            file_name_malicious = true
        }

        allowed_file_extensions = ["png", "PNG", "JPG", "JPEG", "jpg", "jpeg", "svg", "bmp", "gif", "tiff", "exif", "jfif", "WEBM", "MPG", "MP2", "MPEG", "MPE", "MPV", "OGG", "MP4", "M4P", "M4V", "AVI", "WMV", "MOV", "QT", "FLV", "SWF", "AVCHD", "pdf", "docs", "docx", "doc", "PDF"]
        if (file_name_malicious == false && allowed_file_extensions.indexOf(file_ext) != -1) {


            var html =
                '<div class="easychat-drag-drop-after-select" style="background-color: white;padding: 1em;box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 6px;border-radius: 1em;margin-top: .7em; width:80%; float:right"">\
           <span id="easychat-drag-drop-alert-msg" style="width: 73%;word-break: break-all;padding-top: .5em;">Error Message</span>\
           <button onclick="save_attachment_to_data_models_livechat()" id="easychat-drag-drop-upload-btn" style="background-color:' + BOT_THEME_COLOR + ';display: inline-block;float: right;padding: .5em;border: none;color: white;border-radius: 5px;">Upload</button>\
           <div style="width:100%;float:left;display:none;" id="easychat-dragdropbottyping-loader"><img src="' + EASYCHAT_IMG_PATH + 'preloader.svg" style="height:3em;"></div>\
       </div></div>';
            scroll_to_bottom()
            if (el.files[0].size <= 5 * 1024 * 1024) {
                document.getElementById("easychat-chat-container").innerHTML += html;
                document.getElementsByClassName("easychat-drag-drop-after-select")[document.getElementsByClassName('easychat-drag-drop-after-select').length - 1].style.backgroundColor = "white"
                document.getElementById("easychat-drag-drop-alert-msg").style.fontSize = "unset"
                document.getElementsByClassName("easychat-drag-drop-after-select")[document.getElementsByClassName('easychat-drag-drop-after-select').length - 1].style.padding = "1em"
                document.getElementsByClassName("easychat-drag-drop-after-select")[document.getElementsByClassName('easychat-drag-drop-after-select').length - 1].style.boxShadow = "1px 1px 6px rgba(0, 0, 0, 0.2)"
                document.getElementsByClassName("easychat-drag-drop-after-select")[document.getElementsByClassName('easychat-drag-drop-after-select').length - 1].style.borderRadius = "1em"
                document.getElementById("easychat-drag-drop-alert-msg").style.display = "inline-block"
                document.getElementById("easychat-drag-drop-alert-msg").style.color = "black"
                file_name = el.files[0].name.split(".")
                file_length = file_name.length
                file_ext = parseInt(parseInt(file_length) - 1)
                if (el.files[0].name.length >= 15) {
                    file_name_mod = file_name[0].slice(0, 15) + "... ." + file_name[file_name.length - 1]
                } else {
                    file_name_mod = el.files[0].name
                }
                document.getElementById("easychat-drag-drop-alert-msg").innerHTML = file_name_mod + ' <span onclick="remove_file_from_attachment_livechat()" class="easychat-dragdropAlertMsgClose__XPS" style="color: ' + BOT_THEME_COLOR + ';">x</span>'
                document.getElementById("easychat-drag-drop-upload-btn").style.display = "inline-block"
                scroll_to_bottom()


            } else {
                // document.getElementById("easychat-drag-drop-alert-msg").style.display = "inline-block"
                // document.getElementById("easychat-drag-drop-alert-msg").style.fontSize = "unset"
                // document.getElementById("easychat-drag-drop-alert-msg").style.color = "red"
                // document.getElementById("easychat-drag-drop-alert-msg").textContent = "Please Select a file < 5MB*"
                // try{
                //  document.getElementsByClassName('easychat-drag-drop-after-select')[document.getElementsByClassName('easychat-drag-drop-after-select').length - 1].style.width = '55%';
                //  document.getElementsByClassName('easychat-drag-drop-after-select')[document.getElementsByClassName('easychat-drag-drop-after-select').length - 1].style.textAlign = 'center';
                //  }catch(err){}
                // document.getElementById("easychat-drag-drop-upload-btn").style.display = "none"
                // document.getElementById("easychat-chat-container").classList.remove("easychat-drag-drop-after-select");
                // console.log(document.getElementById("easychat-chat-container").classList)
                append_user_input("Please Select a file < 5MB*")
                scroll_to_bottom()

            }
        } else {
            playSound(STATIC_MP3_PATH + '/juntos1.mov');
            append_user_input("Please upload a valid file with a valid name (ex: jpeg,docs,pdf etc)")
            scroll_to_bottom()
        }
    }
}


function save_attachment_to_data_models_livechat() {
    var attached_file_src = "";
    disable_user_input();
    var formData = new FormData();
    var upload_attachment_data = document.querySelector('#easychat-livechat-uploadfile').files[0]
    formData.append("upload_attachment", upload_attachment_data);
    var xhttp = new XMLHttpRequest();
    var params = formData;
    xhttp.open("POST", "/chat/upload-attachment/", true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            response = this.response
            response = JSON.parse(response)
            response = custom_decrypt(response)
            response = JSON.parse(response);
            if (response.status == 200) {
                attached_file_src = response.src;
                attached_file_name = response.name;
                var html = get_file_path_html(attached_file_src)
                document.getElementsByClassName("easychat-drag-drop-after-select")[0].remove()
                playSound(STATIC_MP3_PATH + '/juntos1.mov');
                append_user_input("Your attachment has been uploaded")
                scroll_to_bottom()
                send_message_to_server("", user_id, bot_id, bot_name, "", attached_file_src);
                document.getElementById("easychat-livechat-uploadfile").value = ""
                enable_user_input();
            } else {
                playSound(STATIC_MP3_PATH + '/juntos1.mov');
                append_user_input("Malicious File not accepted")
            }
        }
    }
    xhttp.send(params);
}

function remove_file_from_attachment_livechat() {
    document.getElementById("easychat-drag-drop-alert-msg").innerHTML = ""
    document.getElementById("easychat-livechat-uploadfile").value = ""
    document.getElementById("easychat-drag-drop-upload-btn").style.display = "none"
    document.getElementsByClassName("easychat-drag-drop-after-select")[0].style.backgroundColor = "unset"
    document.getElementsByClassName("easychat-drag-drop-after-select")[0].style.padding = "0"
    document.getElementsByClassName("easychat-drag-drop-after-select")[0].style.boxShadow = "unset"
    document.getElementsByClassName("easychat-drag-drop-after-select")[0].style.borderRadius = "unset"
    document.getElementById("easychat-dragdropbottyping-loader").style.display = "none"
    document.getElementsByClassName("easychat-drag-drop-after-select")[0].remove()
}

function append_user_response(user_input, time) {
    html = '<div class="easychat-user-message-div"><div class="easychat-user-message easychat-user-message-line" style="background-color:' + BOT_THEME_COLOR + ';color: ' + USER_MESSAGE_COLOR + '">' + user_input + '<span class="message-time-user">' + time + '&nbsp;&nbsp;<div style="display:inline-block;" ><img class="doubletick_easychat" src="' + EASYCHAT_IMG_PATH + 'doubletick_black.svg" style="height:1.5em;"></div></span></div></div>';
    document.getElementById("easychat-chat-container").innerHTML += html;
}

function append_bot_response_livechat(agent_response, time) {
    var html = '<div class="easychat-bot-message-div" ><div class="easychat-bot-message easychat-bot-message-line" style="color: ' + BOT_MESSAGE_COLOR + '; word-break: break-word;box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2) !important;" ><div class="easychat-show-less-text">' + agent_response + '</div>'
    html += '<span class="message-time-bot">' + time + '</span></div></div>'
        // html += '<div style="margin-left: 45px;color: #757575;font-size: 10px">'+time+'</div> '
    document.getElementById("easychat-chat-container").innerHTML += html;
}


function livechat_previous_message_history(livechat_session_id) {
    var json_string = JSON.stringify({
        livechat_session_id: livechat_session_id,
    });
    json_string = encrypt_variable(json_string);
    json_string = encodeURIComponent(json_string);

    CSRF_TOKEN = get_csrf_token();
    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", "/livechat/get-livechat-previous-messages/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('X-CSRFToken', CSRF_TOKEN);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            response = custom_decrypt(response)
            response = JSON.parse(response);
            if (response['status'] == 200) {
                response_objs = response["message_history"]
                if (response_objs.length == 0) {

                    unset_livechat_cookies()
                    if (livechat_session_id != "") {

                        chat_socket.close()
                    }
                } else {

                    create_socket(livechat_session_id)
                    for (var i = 0; i < response_objs.length; i++) {

                        if (response_objs[i].sender == "Customer") {

                            append_user_response(response_objs[i].message, response_objs[i].time)
                        } else if (response_objs[i].sender == "Agent") {

                            append_bot_response_livechat(response_objs[i].message, response_objs[i].time)
                        }
                    }
                }
            }
            scroll_to_bottom();
        }
    }
    xhttp.send(params);
}

function sleep(milliseconds) {

    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

// ####################################### ####################################### #######################################