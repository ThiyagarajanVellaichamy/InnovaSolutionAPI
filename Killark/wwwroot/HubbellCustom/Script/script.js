$(document).ready(function () {     

    //loader for ajax call
    $(document).bind("ajaxStart.mine", function () {
        startLoader(false);
    });

    $(document).bind("ajaxStop.mine", function () {
        stopLoader(false);
    });

    $('.btn-modal-ok').on('click', function () {
        $('.overlay_popup').trigger('click');
    });
    
    /* for Brower identification start*/
    if (/msie|trident|edge/g.test(navigator.userAgent.toLowerCase()) == true) {
        $('body').addClass("ie");
    }
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        $('body').addClass("fire");
    }
    if (navigator.userAgent.indexOf("Edge") != -1) {
        $('body').addClass("edge");
    }
    /* for Brower identification end*/

    /*Portright hide start  */
    if (window.innerHeight > window.innerWidth) {       
            $("body").css("opacity", "0.2");
            $("#portright_hide").css("display", "block");
        }
    /*Portright hide start  */

	function pophide() {
		$('.mpop').hide();
		$('.mpop').removeClass('actvp');
		$(".box1-menu ul ul li a").removeClass("active");
		$(".box1-menu ul ul li a").removeClass("arrow-active");
		$(".box-view ul li a").removeClass("arrow-active");
	}

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		pophide();
    });

	if ($('.cus-scroll-xy').length > 0) {
		$('.cus-scroll-xy').mCustomScrollbar({
			theme: "3d",
			axis: 'yx',
			autoHideScrollbar: true,
			scrollbarPosition: "outside",
		});
	}

	if ($('.cus-scroll-x').length > 0) {
		$('.cus-scroll-x').mCustomScrollbar({
			theme: "my-theme",
			axis: 'x',
			autoHideScrollbar: true,
		});
	}

	if ($('.cus-scroll-y').length > 0) {
		$('.cus-scroll-y').mCustomScrollbar({
			theme: "my-theme",
			axis: 'y',
			autoHideScrollbar: true,
		});
	}

	/* Hole Configrator page - Table starts */
	$('#show-table').click(function () {
		$('.hc-info-data').addClass('table-full');
		$('.hc-info-data div table').removeClass('hide-rows');
		$('.kil-inpage-wrap .pview-tab').addClass("hide-all");
		$('.box3-row .hc-box1').addClass("hide-all");
		$('.box3-row .hc-box2').addClass("hide-all");
        $('.box3-row .hc-box3').addClass("hide-all");
        /* Adding Scrolling Table starts*/
        var header = $('.kil-head').height();
        var windowheight = $(window).height();
        var tableheight = $('.table-responsive').height();
        if (tableheight > windowheight - 100) {
            $('.table-responsive').css({ "height": windowheight - header - 60 + "px", "overflow-y": "scroll", "overflow-x": "hidden" });
        }
        /* Adding Scrolling Table ends*/
        $('.box3-row').css({ "height": "0" });
        $('.box3-wrap').css({ "height": "0" });
    });

	$('#hide-table').click(function () {
		$('.hc-info-data').removeClass('table-full');
		$('.hc-info-data div table').addClass('hide-rows');
		$('.kil-inpage-wrap .pview-tab').removeClass("hide-all");
		$('.box3-row .hc-box1').removeClass("hide-all");
		$('.box3-row .hc-box2').removeClass("hide-all");
        $('.box3-row .hc-box3').removeClass("hide-all");
        heightsize();
	});
	/* Hole Configrator page - Table starts */
    
    function resetFormImgCheckbox() {
        //balnk hole
        $('.submenu6').find("img").attr("src", "./../Content/images/i3.png");
        $('.actvp').find('span.customCheckbox').removeClass('customCheckboxChecked');
        $('.actvp').find('.xy-values').removeClass('xy-enabled');
        //checkbox pre active
        $(".actvp .pfrm-xy-frm").addClass('pcheck-active');  
    }
    /*reset popup data end*/

	// Hole Configrator page popover starts  
    $(".b1-sub-menu li a").click(function (e) {        
        e.preventDefault();
        checkbox();
		$('.mpop').hide();
		$('.mpop').removeClass('actvp');
		$('body').prepend("<div class='poc'></div>");
		$('#' + $(this).attr('href')).show();
        $('#' + $(this).attr('href')).addClass("actvp");

        $("<div class='overlay_popup'></div>").insertBefore(".actvp");
        //reset popupdata
        $(".actvp").find("form").trigger('reset');   
    });

    $('.popup-cancel').click(function (event) {       
        pophide();       
        $(".poc").remove();
        $('.overlay_popup').remove();
        $('#sucess').hide();
        $('#step-3 .box1-menu ul li a').removeClass('active');        
    });   
    
	$("body").delegate(".poc", "click", function () {
		pophide();
		$(".poc").remove();
    });

    /* overlay with popup hide start*/

    $(document).on('click', '.overlay_popup', function () {
        $(".actvp").hide();
        $('.overlay_popup').remove();
        $('#popup,#sucess').hide();
        $('.box1-menu ul ul li a.arrow-active').removeClass('active');
        $('#step-3 .box1-menu ul li a.arrow-active').removeClass('active');
    });

    $(".noteBtn").click(function (e) {
        $("#popup").css("display", "block");
        $("<div class='overlay_popup'></div>").insertBefore("#popup");
    });

    $('.noteSaveBtn').click(function () {
        var note = $('.addnoteTextarea').val();
        $('.note_content').append('<p class="text_part">' + note + '</p>');
        $('#popup').hide();
        $('.overlay_popup').remove();
    });
    /* overlay with popup hide end*/   

    $(".b1-par-menu li a").click(function (e) {        
        e.preventDefault();        
        checkbox();
        $('.mpop').hide();
        $('.mpop').removeClass('actvp');
        $('body').prepend("<div class='poc'></div>");
        $('#' + $(this).attr('href')).show();
        $('#' + $(this).attr('href')).addClass("actvp");        
        $("<div class='overlay_popup'></div>").insertBefore(".actvp");
        //reset popupdata
        $(".actvp").find("form").trigger('reset');         
        resetFormImgCheckbox();        
    });

    $('.noOfHole_1').keyup(function () {
        var holes = $(this).val();
        if (holes) {
            if (holes == 1) {
                $(this).parent().parent().find(".pfrm-xy-frm").addClass('pcheck-active');
                if ($('.pfrm-xy-frm input[type=checkbox]').is(':checked')) {
                    $(this).parent().parent().find('.xy-values').addClass('xy-enabled');
                }
            }
            else {
                $(this).parent().parent().find(".pfrm-xy-frm").removeClass('pcheck-active');
                $(this).parent().parent().find('.xy-values').removeClass('xy-enabled');
            }
        }
        else {
            $(this).parent().parent().find(".pfrm-xy-frm").removeClass('pcheck-active');
            $(this).parent().parent().find('.xy-values').removeClass('xy-enabled');
        }
    });

    $('.pfrm-xy-frm input[type=checkbox]').change(function () {
        if ($(this).is(':checked')) {
            $(this).parent().parent().find('.xy-values').addClass('xy-enabled');
        }
        else {
            $(this).parent().parent().find('.xy-values').removeClass('xy-enabled');
        }
    });

    $('.noOfHole_1').trigger('keyup');
	// Hole Configrator page popover ends

	// Left side panel starts
	$(".box1-menu ul ul li a").click(function () {
		$(".box1-menu ul ul li a").removeClass("active");
		$(".box1-menu ul ul li a").removeClass("arrow-active");
		$(this).addClass("active");
        $(this).addClass("arrow-active");        
    });

    $(".box-view ul li a").click(function () {
        $(".box-view ul li a").removeClass("active");
        $(".box-view ul li a").removeClass("arrow-active");
        $(this).addClass("active");
        $(this).addClass("arrow-active");
        $('.actvp .pre-image img').attr('src', './../Content/images/i3.png');
	});
	// Left side panel ends

	$("input[type=radio]").each(function () {
		if ($(this).is(':checked')) {
			$(this).wrap('<span class="check active">');
		} else {
			$(this).wrap('<span class="check">');
		}
    });

	$("span.check").click(function () {
		rname = $(this).find("input").attr("name");
		$("span.check").find("input[name=" + rname + "]").parent('.check').removeClass('active');
        $(this).addClass('active');      
	});

    checkbox();

	/* Check Box Starts */
	function checkbox() {
		$('input[type=checkbox]').each(function () {
            if ($(this).parent().hasClass('customCheckbox')) {                
			} else {
				$(this).wrap('<span class="customCheckbox"></span>');
			}
        });

        $('input[type=checkbox]').change(function () {
            if ($(this).is(':checked')) {
                $(this).parent().addClass('customCheckboxChecked');
            } else {
                $(this).parent().removeClass('customCheckboxChecked');
            }
        });

        $('input[type=checkbox][name=gridOption]').change(function () {
			if ($(this).is(':checked')) {
                $(this).parent().addClass('customCheckboxChecked');                
                $(".customCheckbox.customCheckboxChecked").closest(".grid_opt_label").next().css({ "opacity":"1","pointer-events":"initial"});
			} else {
                $(this).parent().removeClass('customCheckboxChecked');                  
                $(".customCheckbox").closest(".grid_opt_label").next().css({ "opacity": "0.2", "pointer-events": "none" });
			}
        });

        //blanhole preview img and catlog number updated
        $('input[type=checkbox][name=plugged]').change(function () {
            if ($(this).is(':checked')) {
                $(this).parent().addClass('customCheckboxChecked');
                $(".customCheckbox.customCheckboxChecked").closest(".submenu6 ").
                    find("img").attr("src", "./../Content/images/GZOPERATOR/Cover_Hole_Plug.jpg");
                $("input[name='blankHoleReadoutString']").val("GO-8177");
            } else {                
                $(this).parent().removeClass('customCheckboxChecked');
                $(".customCheckbox").closest(".submenu6 ").find("img").attr("src", "./../Content/images/i3.png");
                $("input[name='blankHoleReadoutString']").val("");
            }
        });
	}
	/* Check Box Ends */

	if ($(window).width() >= 768) {
		var highestBox = 0;
		$('.same-height', this).each(function () {
			if ($(this).height() > highestBox) {
				highestBox = $(this).height();
			}

		});
		$('.same-height', this).height(highestBox + 30);
    }

	$('select').wrap("<div class='select-wraper'></div>");

	/* Open Hole configration page as modal into the index page - Starts */
	window.closeModal = function () {
		$('#holePage-modal').modal('hide');
	};
    /* Open Hole configration page as modal into the index page - Ends */

    /* Enclosure page scroll - nth child space start */
    $(".secttion_box").scroll(function () {
        $(".set-box:last-child").css("margin-bottom","15px");
    });
    /* Enclosure page scroll - nth child space end */

    /*==========note Clear section start============== */
    $("#clear").click(function (e) {
        e.preventDefault();
        $("#comment").val('');
    });
    /*=========note Clear section end ================= */  

});

function startLoader(forceStart = false) {
    if (!forceWaitLoader) {
        forceWaitLoader = forceStart;
    }
    $('#loader_wrapper').show();
    $("<div class='overlay_loader'></div>").insertBefore("#loader_wrapper");
}

var forceWaitLoader = false;

function stopLoader(forceClose = false) {
    if ((!forceWaitLoader) || (forceWaitLoader && forceClose)) {
        $('#loader_wrapper').hide();
        $('.overlay_loader').remove();
        forceWaitLoader = false;
    }
    else {
        //Skip Stop
    }
}

function heightsize() {
    var highestBox = 0;
    highestBox = $('#same-height').height();

    $('.table-responsive').css({
        "height": "auto",
        "overflow-y": "hidden",
        "overflow-x": "hidden"
    });

    if (highestBox < 1000) {
        $('.full-height').css({ "height": highestBox - 200 + "px" });
        var addheight =$('.hc-box-innersp').height();
        $('.svgfull-height').css({ "height": highestBox - 230+ "px" });
    }
    else {
        $('.full-height').css({ "height": highestBox - 250 + "px" });
        var addheight =$('.hc-box-innersp').height();
        $('.svgfull-height').css({ "height": highestBox - 280 + "px" });
    }
}

function resizeTableHeight() {
    var header = $('.kil-head').height();
    var footer = $('.kil-footer').height();
    var enclosureForm = $('.enclouserForm').height();
    var windowheight = $(window).height();
    var requiredHeight = windowheight - header - footer - enclosureForm - 140;
    var tableheight = $('.resultTable').height();
    if (tableheight > requiredHeight) {
        $('.resultTable').css({ "height": requiredHeight + "px" });
    }
}


