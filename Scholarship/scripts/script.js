﻿// JavaScript source code
var uri = 'api/scholarships';

$(document).ready(function () {
    $("#progressbar").progressbar({ value: false });
    $.getJSON("http://localhost:9301/api/dropdowndata")
        .done(function (data) {
            $('#department').append($('<option>').text("(Any Department)").attr('value', -1));
            $('#college').append($('<option>').text("(Any College)").attr('value', -1));
            $('#schoolyear').append($('<option>').text("(Any School Year)").attr('value', -1));
            console.log(data);
            $.each(data.departments, function (key, item) {
                $('#department').append($('<option>').text(item.FUND_DEPT_DESCR).attr('value', item.FUND_DEPT_ATTRB));
            });
            $.each(data.colleges, function (key, item) {
                $('#college').append($('<option>').text(item.FUND_COLL_DESCR).attr('value', item.FUND_COLL_ATTRB));
            });
            $.each(data.schoolyears, function (key, item) {
                $('#schoolyear').append($('<option>').text(item.USER_CD_DESCR).attr('value', item.USER_CD));
            });

        })
        .fail(function (jqXHR, textStatus, err) {
            $('#department').text('Error: ' + err);
        });

    $("#progressbar").progressbar({ value: true });


});

function getSearchString() {
    var search = "";
    var title = checkNull($("#title").val());
    var department = checkNull($("#department").val());
    var college = checkNull($("#college").val());
    var schoolyear = checkNull($("#schoolyear").val());
    var major = checkNull($("#major").val());
    var undergradGPA = checkNull($("#undergradGPA").val());
    var gradGPA = checkNull($("#gradGPA").val());
    var highschoolGPA = checkNull($("#highschoolGPA").val());
    if (title != "") search += (title + ",");
    if (department != "") search += (department + ",");
    if (college != "") search += (college + ",");
    if (schoolyear != "") search += (schoolyear + ",");
    if (major != "") search += (major + ",");
    if (undergradGPA != "") search += (undergradGPA + ",");
    if (gradGPA != "") search += (gradGPA + ",");
    if (highschoolGPA != "") search += (highschoolGPA + ",");
    search = search.substring(0, search.length - 1);
    search = "Your search results for " + search + " below...";
    return search;
}
function checkNull(strg) {
    return ((strg == null || strg == "-1" || strg == "") ? "" : strg);
}
function find() {
    var title = $('#title').val();
    $("#progressbar").progressbar({ value: false });
    $.post("http://localhost:9301/api/Search", //uri + "/post",
    {
        title: $('#title').val(),
        department: $('#department').val(),
        college: $('#college').val(),
        schoolYear: $('#schoolyear').val(),
        major: $('#major').val(),
        undergradGPA: $('#undergradGPA').val(),
        gradGPA: $('#gradGPA').val(),
        highschoolGPA: $('#highschoolGPA').val()
    },
    function (data, status) {
        $("#scholarship").empty();
        $.each(data, function (key, item) {
            // Add a list item for the product.
            linkurl = $('<a>', { text: item.FRML_SCHLRSHP_NAME, href: "ScholarshipPage.html?f=" + item.FUND_ACCT.trim() + "&s=" + item.SCHLRSHP_NUM.trim(), target: "_blank" }) //consider accordion
            $('<li>').append(linkurl).appendTo("#scholarship");
            //$('#scholarship').append("<li><a href='" + "ScholarshipPage.html" + "'>" + item.SCHLRSHP_TITLE + "</a></li>");
        });
        console.log(data.length);
        var num = data.length;
        $("#progressbar").progressbar({ value: true });
        $("#titledisplay").text($("#title").val());
        $("#departmentdisplay").text($("#department").val());
        $("#collegedisplay").text($("#college").val());
        $("#schoolyeardisplay").text($("#schoolyear").val());
        $("#majordisplay").text($("#major").val());
        $("#undergraddisplay").text($("#undergradGPA").val());
        $("#gradGPAdisplay").text($("#gradGPA").val());
        $("#highschoolGPAdisplay").text($("#highschoolGPA").val());
        //$("#searchinfo").removeClass("hide");
        $("#searchinfo").text(getSearchString());
        $("#msg").text(num + " Found.");
        //console.log("Data: " + data + "\nStatus: " + status);
    });

}

