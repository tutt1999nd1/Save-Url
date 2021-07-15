// chrome.tabs.getSelected(null, function(tab) {
//     myFunction(tab.url);
// });
//
// function myFunction(tablink) {
//     // do stuff here
//     document.getElementById("current_url").innerHTML = tablink;
//     document.getElementById("current_url").innerHTML = tablink;
//     document.getElementById("current_url").innerHTML = tablink;
// }

//
// function getURL() {
//     //document.getElementById("current_url").innerHTML = "/////SKSKSKSKSKSKSKSKSKSK";
//     alert('t')
// }
// window.onload = function () {
//     document.getElementById("btn_get_URL").onclick = getURL();
// }
<!-- The core Firebase JS SDK is always required and must be listed first -->


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBJAJ7aZEBywAbEsfO7fEMg9DlKTeamFUE",
    authDomain: "save-url-424a8.firebaseapp.com",
    projectId: "save-url-424a8",
    storageBucket: "save-url-424a8.appspot.com",
    databaseURL: "https://save-url-424a8-default-rtdb.firebaseio.com",
    messagingSenderId: "957184934732",
    appId: "1:957184934732:web:98c7c278e7679036a345e9",
    measurementId: "G-8BVXT4K669"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var firebaseRef = firebase.database().ref();
var firebaseRef2 ;
var list_url = [];
var type_forder;
//once : nghe 1 lần, on luôn nghe
firebaseRef.on("value", function (snapshot) {
    $("#list_url").innerHTML = "";
    list_url = []
    $('#list_type').empty();

    for (const folder in snapshot.val()) {
        var data = {};
        data.text = folder;
        $('#list_type').append(`
        <option value="${folder}">
            ${folder}
        </option>
        `)
        data.children = [];
        for (const url in snapshot.val()[folder]) {
            data.children.push({text: snapshot.val()[folder][url].name, data: snapshot.val()[folder][url].url})
        }
        list_url.push(data);
        $("#jstree_demo_div").jstree("destroy");
        $('#jstree_demo_div').jstree({
            "plugins" : [ "search" ],
            'core' : {
                'data' :
                    {
                        'state' : {
                            'opened' : true,
                            'selected' : true
                        },
                        'text' : 'Saved',
                        'children' : list_url
                    }

            } }).on(
            "select_node.jstree", function(evt, data){
                if(data.node.data!=null){
                    window.open(data.node.data, '_blank').focus();
                }
            });


    }
})

document.getElementById("btn_get_URL").addEventListener("click", function () {
    $('#name_type').css('display','none')
    chrome.tabs.getSelected(null, function (tab) {
        if ($('#name_type').val() !=""){
            type_forder = $('#name_type').val();
        }else {
            type_forder = $('#list_type').val();
        }
        // document.getElementById("current_url").setAttribute("href", tab.url);
        //  document.getElementById("current_url").innerHTML = tab.url;
        firebaseRef2 = firebase.database().ref(type_forder);
        firebaseRef2.push({
            name: $('#decription').val(),
            url: tab.url
        });

    });

});
document.getElementById('add_type').addEventListener('click',function () {
    $('#name_type').css('display','block')
})

console.log("list_url",list_url)

// $('#jstree_demo_div').jstree({
//     "plugins" : [ "search" ],
//     'core' : {
//         'data' :
//             {
//                 'text' : 'Saved',
//                 'children' : list_url
//             }
//
//     } }).on(
//     "select_node.jstree", function(evt, data){
//         if(data.node.data!=null){
//             console.log(data.node.data)
//
//         }
//     });
var to = false;

$('#plugins4_q').keyup(function () {
    if(to) { clearTimeout(to); }
    to = setTimeout(function () {
        var v = $('#plugins4_q').val();
        $('#jstree_demo_div').jstree(true).search(v);
    }, 100);
});





$(function () {
    $("#plugins4").jstree({
        "plugins" : [ "search" ]
    });
    var to = false;

});