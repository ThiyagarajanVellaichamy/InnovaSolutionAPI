$(document).ready(function () {
    $('a[href="ansi-popup"]').on('click', function () {
        updateNPTDropdown();

        boxOptionOnChange('ANSI');
    });

    $('a[href="metric-popup"]').on('click', function () {
        boxOptionOnChange('Metric');
    });

    ///*========= Update Ansi & Metric Dropdown value Start =====*/
    //$("a#ansi-popup").on('click', function () {
    //    updateNPTDropdown();
    //});

    /*
     * $("a#metric-popup").one('click', function () {
        updateMatricDropdown();
    });
    */
    /*========= Update Ansi & Metric Dropdown value End =====*/

});

function updateNPTDropdown() {
    $('#ansiHoleSize').find('option').remove().end();
    //Default option
    var defaultNPTData = ["1/2 NPT", "3/4 NPT", "1 NPT", "1 1/4 NPT", "1 1/2 NPT"];
    for (var i = 0; i < defaultNPTData.length; i++) {
        var valueMax = defaultNPTData[i];
        $('#ansiHoleSize').append($('<option>',
            {
                value: i + 1,
                text: valueMax
            }));
    }

    var nptData = ["2 NPT", "2 1/2 NPT", "3 NPT", "3 1/2 NPT", "4 NPT", "5 NPT", "6 NPT"];
    var maxVal = $('#maxSize').val();
    var maxData = maxVal.slice(0, 1) + " NPT";
    var Maxindex = nptData.indexOf(maxData);
    for (var i = 0; i <= Maxindex; i++) {
        var valueMax = nptData[i];        
        $('#ansiHoleSize').append($('<option>',
            {
                value: i + 1,
                text: valueMax
            }));
    }
}

function componentOnChange(component) {
    //Load Selected Component Image
    loadComponentImage(component);
}

function loadComponentImage(component) {
    component = '#' + component;

    var selected = $(component).find(":selected").text();
    var prviewCatlogNoAnsi = $('.preview_img_number input');
    var prviewCatlogNoMetric = $('.preview_img_number.catlog-Metric input');
    var currentPopup = $('.actvp').attr("id");

    var certicateType = $('#certificatetype').val();
    var holeSize = $(".actvp [uid=holeSize] option:selected").text();

    //Load Images
    if (selected == 'PLUG') {
        var holeValue = $(".actvp [uid=holeSize] option:selected").text().replace("/", "_");
        var newholeValue = holeValue.replace(/ /g, "_");
        if (currentPopup == "ansi-popup") {
            $('.actvp .pre-image img').attr('src', './../Content/images/Ansi/' + newholeValue + '.jpg');
            if (certicateType == "NEC") {
                if (holeSize == "1/4 NPT") {
                    prviewCatlogNoAnsi.val("CUP-250");
                }
                else if (holeSize == "3/8 NPT") {
                    prviewCatlogNoAnsi.val("CUP-375");
                }
                else if (holeSize == "1/2 NPT") {
                    prviewCatlogNoAnsi.val("CUP-1");
                }
                else if (holeSize == "3/4 NPT") {
                    prviewCatlogNoAnsi.val("CUP-2");
                }
                else if (holeSize == "1 NPT") {
                    prviewCatlogNoAnsi.val("CUP-3");
                }
                else if (holeSize == "1 1/4 NPT") {
                    prviewCatlogNoAnsi.val("CUP-4");
                }
                else if (holeSize == "1 1/2 NPT") {
                    prviewCatlogNoAnsi.val("CUP-5");
                }
                else if (holeSize == "2 NPT") {
                    prviewCatlogNoAnsi.val("CUP-6");
                }
                else if (holeSize == "2 1/2 NPT") {
                    prviewCatlogNoAnsi.val("CUP-7");
                }
                else if (holeSize == "3 NPT") {
                    prviewCatlogNoAnsi.val("CUP-8");
                }
                else if (holeSize == "3 1/2 NPT") {
                    prviewCatlogNoAnsi.val("CUP-9");
                }
                else if (holeSize == "4 NPT") {
                    prviewCatlogNoAnsi.val("CUP-0");
                }
                else {
                    prviewCatlogNoAnsi.val("");
                }
            }
            else if (certicateType == "NEC/ATEX/IECEx") {
                if (holeSize == "1/4 NPT") {
                    prviewCatlogNoAnsi.val("CUP-250-EX");
                }
                else if (holeSize == "3/8 NPT") {
                    prviewCatlogNoAnsi.val("CUP-375-EX");
                }
                else if (holeSize == "1/2 NPT") {
                    prviewCatlogNoAnsi.val("CUP-1-EX");
                }
                else if (holeSize == "3/4 NPT") {
                    prviewCatlogNoAnsi.val("CUP-2-EX");
                }
                else if (holeSize == "1 NPT") {
                    prviewCatlogNoAnsi.val("CUP-3-EX");
                }
                else if (holeSize == "1 1/4 NPT") {
                    prviewCatlogNoAnsi.val("CUP-4-EX");
                }
                else if (holeSize == "1 1/2 NPT") {
                    prviewCatlogNoAnsi.val("CUP-5-EX");
                }
                else if (holeSize == "2 NPT") {
                    prviewCatlogNoAnsi.val("CUP-6-EX");
                }
                else if (holeSize == "2 1/2 NPT") {
                    prviewCatlogNoAnsi.val("CUP-7-EX");
                }
                else if (holeSize == "3 NPT") {
                    prviewCatlogNoAnsi.val("CUP-8-EX");
                }
                else if (holeSize == "3 1/2 NPT") {
                    prviewCatlogNoAnsi.val("NA");
                }
                else if (holeSize == "4 NPT") {
                    prviewCatlogNoAnsi.val("NA");
                }
                else {
                    prviewCatlogNoAnsi.val("");
                }
            }
        }
        else if (currentPopup == "metric-popup") {
            $('.actvp .pre-image img').attr('src', './../Content/images/Metric/' + newholeValue + '.jpg');
            if (newholeValue == "M16") {
                prviewCatlogNoMetric.val("HP487M16SS");
            }
            else if (newholeValue == "M20") {
                prviewCatlogNoMetric.val("HP487M20SS");
            }
            else if (newholeValue == "M25") {
                prviewCatlogNoMetric.val("HP487M25SS");
            }
            else if (newholeValue == "M32") {
                prviewCatlogNoMetric.val("HP487M32SS");
            }
            else if (newholeValue == "M40") {
                prviewCatlogNoMetric.val("HP487M40SS");
            }
            else if (newholeValue == "M50") {
                prviewCatlogNoMetric.val("HP487M50SS");
            }
            else if (newholeValue == "M63") {
                prviewCatlogNoMetric.val("HP487M63SS");
            }
            else if (newholeValue == "M75") {
                prviewCatlogNoMetric.val("HP487M75SS");
            }
            else {
                //do nothing
            }

        }
        else {
            //do nothing
        }

    }
    else if (selected == 'DRAIN' || selected == 'BREATHER') {
        if (currentPopup == "ansi-popup") {
            if (certicateType == "NEC") {
                if (holeSize == "1/2 NPT") {
                    prviewCatlogNoAnsi.val("KB1-4X");
                    $('.actvp .pre-image img').attr('src', './../Content/images/Ansi/KB1-4X-1.jpg');
                }
            }
            else if (certicateType == "NEC/ATEX/IECEx") {
                if (selected == 'BREATHER') {
                    if (holeSize == "1/2 NPT") {
                        prviewCatlogNoAnsi.val("KB1BCEN");
                        $('.actvp .pre-image img').attr('src', './../Content/images/Ansi/KB1BCEN.jpg');
                    }
                }
                else if (selected == 'DRAIN') {
                    if (holeSize == "1/2 NPT") {
                        prviewCatlogNoAnsi.val("KB1DCEN");
                        $('.actvp .pre-image img').attr('src', './../Content/images/Ansi/KB1DCEN.jpg');
                    }
                }
            }

        }
        else if (currentPopup == "metric-popup") {
            if (certicateType == "NEC") {
                if (selected == 'BREATHER') {
                    if (holeSize == "M20") {
                        prviewCatlogNoMetric.val("KBM20BCEN");
                        $('.actvp .pre-image img').attr('src', './../Content/images/Metric/KBM20BCEN.jpg');
                    }
                }
                else if (selected == 'DRAIN') {
                    if (holeSize == "M20") {
                        prviewCatlogNoMetric.val("KBM20DCEN");
                        $('.actvp .pre-image img').attr('src', './../Content/images/Metric/KBM20DCEN.jpg');
                    }
                }
            }
            else if (certicateType == "NEC/ATEX/IECEx") {
                //do nothing
            }
        }
    }
    else if (selected == "FLAME ARRESTOR") {
        if (currentPopup == "ansi-popup") {
            if (certicateType == "NEC" || certicateType == "NEC/ATEX/IECEx") {
                if (holeSize == "1/2 NPT") {
                    prviewCatlogNoAnsi.val("KB1FA25");
                    $('.actvp .pre-image img').attr('src', './../Content/images/Ansi/KB1FA25-1.jpg');
                }
            }
        }
        else if (currentPopup == "metric-popup") {
            if (certicateType == "NEC" || certicateType == "NEC/ATEX/IECEx") {
                if (holeSize == "M20") {
                    prviewCatlogNoAnsi.val("KBM20FAM16");
                    $('.actvp .pre-image img').attr('src', './../Content/images/Metric/KBM20FAM16.jpg');
                }
            }
        }
    }
    else if (selected == "NONE") {
        $('.actvp .pre-image img').attr('src', './../Content/images/i3.png');
        prviewCatlogNoAnsi.val("");
    }
}

//Change event for ANSI Face
function boxOptionOnChange(holetype) {
    var side = '';
    var holesize = '';
    if (holetype == 'ANSI') {
        holesize = $('#ansiHoleSize').find(":selected").text();
        side = $("a[name='ansiHole']").parent().parent().find('#ansiSide').find(":selected").text();
    }
    else {
        holesize = $('#metricHoleSize').find(":selected").text();
        side = $("a[name='metricHole']").parent().parent().find('#metricSide').find(":selected").text();
    }

    ajaxPOST("GetBoxComponent", { HoleSize: holesize, HoleType: holetype, Side: side },
        onSuccess, null);

    function onSuccess(data) {
        if (holetype == 'ANSI') {
            $('#ansiComponent').find('option').remove().end();
            for (var i = 0; i < data.length; i++) {
                $('#ansiComponent').append($('<option></option>').text(data[i]));
            }

            componentOnChange("ansiComponent");
        }
        else {
            $('#metricComponent').find('option').remove().end();
            for (var i = 0; i < data.length; i++) {
                $('#metricComponent').append($('<option></option>').text(data[i]));
            }

            componentOnChange("metricComponent");
        }
    }
}

/*
function updateMatricDropdown() {
    var metricWholeData = ["M16", "M20", "M25", "M32", "M40", "M50", "M63", "M75", "M100"];
    var metricVal = $('#maxSize').val();
    var metricValSplit = metricVal.split("/");
    var metricData = metricValSplit[1].trim();

    var metricindex = metricWholeData.indexOf(metricData);

    for (var i = 0; i <= metricindex; i++) {
        var valueMetric = metricWholeData[i];
        //alert(valueMax);

        $('#metricHoleSize').append($('<option>',
            {
                value: i,
                text: valueMetric
            }));
    }
}
*/