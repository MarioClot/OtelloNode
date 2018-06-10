var xhr;

function inici() {
    try {
        // Firefox, Opera 8.0+, Safari, Chrome
        xhr = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
            //ie6+
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
                //ie5
            } catch (e) {
                alert("El teu navegador no suporta AJAX!");
                return false;
            }
        }
    }
    var id = "";
    var cell = document.querySelectorAll('.cell');
    for (var i = 0; i < cell.length; i++) {
        cell[i].addEventListener('click', callback, false);
    }
    function callback() {
        var id = this.id;
        ajaxFunction(id);
    }

    //setInterval(callback(), 1000);
}

function ajaxFunction(contingut) {
    console.log(contingut);
    
    var contingut_list = contingut.split("_");
    //callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            //////
            taulell_actual = JSON.parse(xhr.responseText);
            for (var i = 0; i < taulell_actual.length; i++) {
                var obj = taulell_actual[i];
                for (var key in obj) {
                    if (key == "imatge") {
                        var attrNameImatge = key;
                        var attrValueImatge = obj[attrNameImatge];
                         console.log(attrValueImatge);
                    } if (key == "posicio") {
                        var attrNamePosicio = key;
                        var attrValuePosicio = obj[attrNamePosicio];
                         console.log(attrValuePosicio);
                        for (var posicio in attrValuePosicio) {
                            if (posicio == "x") {
                                var attrNameX = posicio;
                                var attrValueX = attrValuePosicio[attrNameX];
                                // console.log(attrValueX);
                            } if (posicio == "y") {
                                var attrNameY = posicio;
                                var attrValueY = attrValuePosicio[attrNameY];
                                // console.log(attrValueY);
                                ////
                                var value = attrValueX + "," + attrValueY;
                                var posicio = value.split(",")
                                // console.log("posicio x: " + posicio[0]);
                                // console.log("posicio y: " + posicio[1]);
                                /////
                                // document.getElementById("cell_" + posicio[0] + "_" +
                                // posicio[1]).innerHTML = attrValueImatge;
                                
                                document.getElementById("cell_" + posicio[0] + "_" +
                                posicio[1]).setAttribute("class", "cell " + attrValueImatge);
                                 //document.getElementById("cell_" + posicio[0] + "_" +
                                 //posicio[1]).setAttribute("class", attrValueImatge);
                            
                            }
                        }
                    }
                }
            }

            //////
            data = JSON.parse(xhr.responseText);
            //document.getElementById("cell_" + contingut_list[1] + "_" +
            //    contingut_list[2]).innerHTML = data;
        }
    };

    xhr.open("GET", "taulell?x=" + contingut_list[1] + "&y=" + contingut_list[2], true);
    xhr.send(null);
}

window.addEventListener("load", inici, true);