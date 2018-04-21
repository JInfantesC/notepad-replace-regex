
jQuery(window).load(function() {
    jQuery("#get_regex").bind("click", function() {
        var find_array = jQuery("#find").val().split(",");
        var replace_array = jQuery("#replace").val().split(",");

        jQuery("#info").html("Find= " + find_array.length + "<br>Replace=" + replace_array.length);

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

        jQuery("#find_regex").html(find_regex);
        jQuery("#replace_regex").html(replace_regex);
    });
});
