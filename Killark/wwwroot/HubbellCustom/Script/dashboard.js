//Application Selection
$(document).ready(function () {

    $(".go-btn").attr("onclick", "window.location.href = '../HoleConfiguration/EXBLTIndex'");

    //Search Event
    $("input[id='inputSearchField']").on('keyup', function () {
        searchOnKeyup();
    });

    $('.tile-box input:radio').change(
        function () {
            if ($(this).val() == 'EXB') {
                $(".go-btn").attr("onclick", "window.location.href = '../HoleConfiguration/EXBIndex'");
            }
            else {
                $(".go-btn").attr("onclick", "window.location.href = '../HoleConfiguration/EXBLTIndex'");
            }
        }
    );

    //Load Dashboard Data
    //loadDashboardData();
});

function loadDashboardData() {

    $('.stepview').hide();

    ajaxPOST("DisplayDashboardDetails", null, onSuccess, null);

    function onSuccess(data) {
        var sno, id, producttype, timestamp, download, status, remarks;
        for (var i = 0; i < data.length; i++) {
            var tr = document.createElement('tr');
            tr.setAttribute('class', 'item');
            download = document.createElement('td');
            sno = document.createElement('td');
            id = document.createElement('td');
            producttype = document.createElement('td');
            timestamp = document.createElement('td');
            status = document.createElement('td');
            remarks = document.createElement('td');

            sno.innerHTML = i + 1;
            id.innerHTML = data[i].Id;
            producttype.innerHTML = data[i].ProductType;
            timestamp.innerHTML = data[i].TimeStamp;
            status.innerHTML = data[i].Status;
            var downloadEvent = "class='text-DownloadDisabled'";
            if (data[i].Status.includes('COMPLETED')) {
                downloadEvent = "class='text-Download' onClick = 'downloadfile(this)'";
            }

            download.innerHTML = "<span " + downloadEvent + ">PDF</span>"
                + "<span " + downloadEvent + ">STP</span>"
                + "<span " + downloadEvent + ">DXF</span>";
            remarks.innerHTML = " ";

            tr.setAttribute("uniqueID", id.innerHTML);
            tr.appendChild(sno);
            tr.appendChild(id);
            tr.appendChild(producttype);
            tr.appendChild(timestamp);
            tr.appendChild(download);
            tr.appendChild(status);
            tr.appendChild(remarks);
            $("#dash-boardtable").append(tr);
        }
        addScrollToTable();
    }
}

function downloadfile(object) {
    var uniqueID = $(object).parent().parent().attr("uniqueid");
    var filetype = $(object).html().toLowerCase();
    window.location.href = "./../Dashboard/GetFile?filetype=" + filetype + "&uniqueID=" + uniqueID;
}

function addScrollToTable() {
    var header = $('.kil-head').height();
    var windowheight = $(window).height();
    var headerheight = $('.top-sec').height();
    var tableheight = $('.table-responsive').height();
    if (tableheight > windowheight-100)
        $('.table-responsive').css({ "height": windowheight - header - headerheight - 40 + "px", "overflow-y": "scroll" });
}

function searchOnKeyup() {
    var $rows = $('#dash-boardtable tr');
    $('#inputDatabaseName').keyup(function () {
        var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
        $rows.show().filter(function () {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });
}