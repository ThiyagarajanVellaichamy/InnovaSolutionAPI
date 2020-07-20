var currentSelectedStep = null;

$(document).ready(function () {

    var navListItems = $('div.setup-panel div a'),         
        allWells = $('.setup-content'),
        stepBackBtn = $('.backBtn'),
        stepNextBtn = $('.nextBtn'),
        resetBtn = $('.resetBtn'),
        submitBtn = $('.submitBtn'),
        noteBtn = $('.noteBtn'),
        allNavBtn = $('.stepViewBtn');     
    
    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var stepID = $(this).attr('href');
        if (stepID == '#step-2' || stepID == '#step-3') {
            $('#step-configuration').show();
        }
        else {
            $('#step-configuration').hide();
        }

        var $target = $($(this).attr('href')),
            $item = $(this);
            $greyItem = $('div.setup-panel div a[href="' + currentSelectedStep + '"] + span');

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('kil-active');
            navListItems.parent().removeClass('kil-active');
            $item.addClass("kil-active");
            //$greyItem.addClass("green_fill");            
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();

            allNavBtn.hide();

            if (stepID == '#step-1') {           
                
                stepNextBtn.show(); 
                $("#stepwizard-step-1").next().css("pointer-events", "initial");
                $("#stepwizard-step-3,#stepwizard-step-4").css("pointer-events", "none");
            }

            if (stepID == '#step-2') {
                loadSVGContent();

                resetBtn.show();
                stepBackBtn.show();
                stepNextBtn.show();  
                $("#cmd").hide();
                $("#stepwizard-step-1,#stepwizard-step-3").css("pointer-events", "initial");
                $("#stepwizard-step-4").css("pointer-events", "none");    
            }

            if (stepID == '#step-3') {
                loadSVGContent();

                resetBtn.show();
                stepBackBtn.show();
                stepNextBtn.show();
                $("#cmd").hide();
                $("#stepwizard-step-1,#stepwizard-step-2,#stepwizard-step-4").css("pointer-events", "initial");               
            }

            if (stepID == '#step-4') {
                resizeTableHeight();
                getStepOnefields();
                stepBackBtn.show();
                submitBtn.show();
                noteBtn.hide();  
                $("#cmd").show();    
            }

            currentSelectedStep = stepID;            
        }
    });

    stepNextBtn.click(function () {
       
        if (currentSelectedStep != null) {            
            $('div.setup-panel div a[href="' + currentSelectedStep + '"]')
                .parent().next().children("a").removeAttr('disabled').trigger('click'); 
        }          
    });

    stepBackBtn.click(function () {
        if (currentSelectedStep != null) {            
            $('div.setup-panel div a[href="' + currentSelectedStep + '"]')
                .parent().prev().children("a").removeAttr('disabled').trigger('click');             
        }
    });

    $('div.setup-panel div a.kil-active').trigger('click');
});

