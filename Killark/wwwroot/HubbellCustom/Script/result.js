$(document).ready(function () {
    //add click event to submit button
    $('.submitBtn').click(function () {
        onSubmitClick();
    });
});

function getStepOnefields() {
    $('enclouserForm input').each(function () { this.value = "" });
    $('#resEnclosureType').val($('#enclosureType').val());
    $('#resCatalogNum').val($('#enclosureDimension option:selected').text());
    $('#resIntDimension').val($('#iDimension').val());
    $('#resExtDimension').val($('#eDimension').val());
    $('#resOperators').val($('#operatorsCount').val());
    $('#resMaxSize').val($('#maxSize').val());
    $('#resWeight').val($('#weightLBS').val());
    $('#resMountingPan').val($("input[name='SelectedBackPanel']:checked").val());
    $('#resMountingFeet').val();

    if ($('input[name="hingeOption"][value="Yes"]').parent().hasClass('active')) {
        $('#resHinges').val('Yes');
        $('#resHingePlacement').val($('#hingeOrientation option:selected').text());
    }
    else {
        $('#resHinges').val('No');
        $('#resHingePlacement').val("No Hinge");
    }

    if ($('input[name="mountingPanel"][value="Yes"]').parent().hasClass('active')) {
        $('#resMountingPanel').val(globalEnclosureModel.backPanelNumber);
    }
    else {
        $('#resMountingPanel').val('No');
    }

    //Internal Grounding Kit
    if ($('input[name="internalGroundingKit"][value="Yes"]').parent().hasClass('active')) {
        $('#resIntGndKit').val(globalEnclosureModel.internalGroundingKit);
    }
    else {
        $('#resIntGndKit').val('No');
    }

    //External Grounding Kit
    if ($('input[name="externalGroundingKit"][value="Yes"]').parent().hasClass('active')) {
        $('#resExtGndKit').val(globalEnclosureModel.externalGroundingKit);
    }
    else {
        $('#resExtGndKit').val('No');
    }

    $('#resCertType').val($('#certificatetype').val());
    $('#resBoltType').val($('#bolttype').val());
    $('#resFinish').val($('#finishdropdown option:selected').text());
}

function onSubmitClick() {
    //Disable button
    $('.submitBtn').prop('disabled', true);

    //Start Loader
    startLoader();

    //Create PDF
    createPDF();
}

function createPDF() {
    //add pdf header
    var head = document.querySelector(".head-inner");
    var cln = head.cloneNode(true);
    var chld = document.querySelector(".loading-bar");
    var parant = document.querySelector(".ful-body");    
    parant.prepend(cln);    

    //fulwidth table and note
    var pdfTabel = document.querySelector("#step-4 .hc-info-data");
    pdfTabel.classList.add("hcb_fulwidth_pdf");

    var pdfNote_clear = document.querySelector(".cleardata");
    pdfNote_clear.classList.add("dnone");
    var pdfNote = document.querySelector("#step-4 .note_container");
    pdfNote.style.display = "none";

    var pdfTable_head = document.querySelectorAll(".result_data_head");
    pdfTable_head[0].style.display = "block";
    pdfTable_head[1].style.display = "block";

    var text_area_data = document.getElementById("comment");
    var datpart_note = document.getElementById("data_part").appendChild(text_area_data).value;

    var pdf_note_data_part = document.querySelector(".pdf_txt");
    pdf_note_data_part.style.display = "block";   

    //auto height table scroll
    var autoclass = document.getElementById("autoheight");
    autoclass.classList.add("setautoheight");
    var note_report = document.querySelector(".note_container");
    note_report.classList.add("note_block");

    //add footer
    var footer = document.querySelector(".pdf_Footer");
    footer.cloneNode(true);
    footer.style.display = "block";
    var last = document.querySelector("#canvas_div_pdf");
    last.appendChild(footer);

    var HTML_Width = $(".ful-body").width();
    var HTML_Height = $(".ful-body").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($(".ful-body")[0]).then(function (canvas) {
        var imgData = canvas.toDataURL("application/pdf", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,
            canvas_image_width, canvas_image_height, undefined, 'FAST');
        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(String(PDF_Width), String(PDF_Height));
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i)
                + (top_left_margin * 4), canvas_image_width, canvas_image_height, undefined, 'FAST');
        }

        globalEnclosureModel.summaryData = pdf.output('datauristring');

        //Stop Loader
        stopLoader();

        sendConfiguration(); 

        //Remove
        autoclass.classList.remove("setautoheight");
        note_report.classList.remove("note_block");
        parant.removeChild(cln);
        pdfTabel.classList.remove("hcb_fulwidth_pdf");
        pdfNote_clear.classList.remove("dnone");
        pdfTable_head[0].style.display = "none";
        pdfTable_head[1].style.display = "none";
        pdfNote.style.display = "block";
        pdf_note_data_part.style.display = "none";
        footer.style.display = "none";          
    });
}

function sendConfiguration() {
    var holes = [].concat(topConfigurationCollection, bottomConfigurationCollection,
        leftConfigurationCollection, rightConfigurationCollection);

    ajaxPOST("SubmitData", {
        AssemblyType: globalEnclosureModel.catalogNo,
        EnclosureData: JSON.stringify(globalEnclosureModel),
        OperatorData: JSON.stringify(coverConfigurationCollection),
        HoleData: JSON.stringify(holes)
    },
        onSuccess, null);

    function onSuccess(data) {
        $('#renderID').html(data);
        $("#sucess").css("display", "block");
        $("<div class='overlay_popup'></div>").insertBefore("#sucess");
    }
}