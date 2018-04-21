//index.js
window.onload = load;
function load(){
    var btn_run=document.getElementById("btn_run");

    btn_run.addEventListener('click', function() {
        var find_array= document.getElementById("txt_find").value.split(",");
        var replace_array=document.getElementById("txt_replace").value.split(",");
        //Check if ready
        document.getElementById('info').innerHTML = "Find= " + find_array.length + "<br>Replace=" + replace_array.length;

        var find_regex = "";
        var replace_regex = "";
        var iaux = 0;
        for (i = 0; i < find_array.length; i++) {
            console.log("f- " + find_array[i].trim() + "    r- " + replace_array[i].trim());
            find_regex += "(" + find_array[i].trim() + ")|";
            replace_regex += "(?" + (iaux + 1) + replace_array[i].trim() + ")";
            iaux += 1;

            if (iaux == 99) {
                iaux = 0;
                find_regex = find_regex.substring(0, find_regex.length - 1);
                find_regex += "<br>NEW LINE<br>";
                replace_regex += "<br>NEW LINE<br>";
            }

        }
        find_regex = find_regex.substring(0, find_regex.length - 1);
        document.getElementById('find_regex').innerHTML =find_regex;
        document.getElementById('replace_regex').innerHTML =replace_regex;

    }, false);

}
