function submitForm() {
    event.preventDefault();
    var a = $("#dataform").parent(),
        e = {
            total: $("#total-value").val(),
            perioada: $("#perioada").val(),
            nume: $("#nume").val(),
            prenume: $("#prenume").val(),
            email: $("#email").val(),
            telefon: $("#telefon").val(),
            comerciant: comerciant,
            sendto: adresaemail
        };

    $.ajax({
        type: "GET",
        url: "https://www.tbibank.ro/Form_p/send#ancora",
        dataType: "jsonp",
        data: e,
        context: {},
        error: function() {
            a.html('<div class="response"><h1>Cererea nu a putut fi procesata</h1><br/><p>Va rugam sa incercati mai tarziu.</p></div>')
        },
        complete: function(data) {
            a.html('<div class="response"><h1>Cererea dvs a fost trimisa!</h1><br/><p>Va multumim!</p></div>'), $("html,body").animate({
                scrollTop: $("#ancora").offset().top
            }, "slow")
        }
    })
}
$(document).ready(function() {
    // document.getElementById("dobanda").innerText = dobanda*100;

    a();
    $(document).keypress(
        function(event){
            if (event.which == '13') {
                event.preventDefault();
            }
        });

    function a() {
        var valTotal = parseInt($("#total-value").val());
        var perioada = $("#perioada").val();

        if(valTotal < 1000){
            dobanda = 0.348;
            comision = 170;
        }else if(valTotal < 3500 && valTotal > 1000){
            dobanda = 0.348;
            comision = 200;
        }else{
            dobanda = 0.348;
            comision = 200;
        }

        var a = {
            amount: valTotal,
            period: perioada,
            dobanda: dobanda,
            comision: comision,
            alico: alico
        };
        $.ajax({
            type: "GET",
            url: "https://www.tbibank.ro/Calc/ecomm_parteneri",
            dataType: "jsonp",
            data: a,
            context: {},
            complete: function(a) {
                JSON.stringify(a);
                document.getElementById("rata").innerText = a.responseJSON.mpay;
                document.getElementById("dae").innerText = a.responseJSON.apr,
                    document.getElementById("dobanda").innerText = dobanda*100,
                    document.getElementById("comision").innerText = comision,
                    document.getElementById("total").innerText = (a.responseJSON.mpay*perioada).toFixed(2)
            }
        })
    }
         $("#total-value").on("input", function() {
             if($("#total-value").val() < 300){
                 document.getElementById("rata").innerText = '0.00';
                 document.getElementById("dae").innerText = '0.00';
                 document.getElementById("total").innerText = '0.00';
                 document.getElementById("comision").innerText = '0.00';
             }else{
                 a()
             }
            }), $("#perioada").change(function() {
             if($("#total-value").val() < 300){
                 document.getElementById("rata").innerText = '0.00';
                 document.getElementById("dae").innerText = '0.00';
                 document.getElementById("total").innerText = '0.00';
                 document.getElementById("comision").innerText = '0.00';
             }else{
                 a()
             }
            }),

         $('form input').on('keypress', function(e) {
             return e.which !== 13;
         });
    $('.gotop').on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    })
});