"use strict";


$(document).ready( () => {


    const beginDate = document.getElementById("beginDate");
    const endDate = document.getElementById("endDate");

    beginDate.addEventListener("change", (evt) => {
        getDaysBetween();
        $("#beginDate").next().text(validStart);
        evt.preventDefault();
    });
    endDate.addEventListener("change", (evt) => {       
        getDaysBetween();
        evt.preventDefault();
    });


    function daysBetween(startDate, endDate) {
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        return Math.floor((treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay);
    }

    function treatAsUTC(date) {
        var result = null;
        
        if(date != "")
        {
        result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        }

        return result;
    }

    function isValidDate(date) {
        return (isNaN(date) ? true : null) ?? 'Invalid Date Entered';
    }

    function getDaysBetween() {
        let diff = null;
        let validStart = isValidDate($('#beginDate').val());
        let validEnd = isValidDate($('#endDate').val());
        if(validStart == true && validEnd == true)
        {
            let startStr = (validStart ? treatAsUTC($('#beginDate').val()) : null);

            let endSrt = (validEnd ? treatAsUTC($('#endDate').val()) : null);
    
            $("#beginDate").next().text('');
            $("#endDate").next().text('');
            diff = daysBetween(startStr, endSrt);           
        }
        else
        {
            if(validStart != true)
            {
                $("#beginDate").next().text(validStart);
            }
            if(validEnd != true)
            {
                $("#endDate").next().text(validEnd);
            }
        }

        diff = diff || '';    
        $("#daysBetween").val(diff);
    }
});