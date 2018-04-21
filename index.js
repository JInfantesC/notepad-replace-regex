//index.js
//GLOBAL
var MAX_REPLACEMENTS = 99;

window.onload = function load() {
	var form_element = document.getElementById("form_reg_exp");

	form_element.addEventListener('submit', function (e) {
		e.preventDefault();
		var find_array = document.getElementById("txt_find")
			.value.split(",");
		var replace_array = document.getElementById("txt_replace")
			.value.split(",");

		if (!isValid(find_array, replace_array)) {
			return;
		}
		var regex_obj = run_replace(find_array, replace_array);
		results(regex_obj);

		function run_replace(find_array, replace_array) {
			var regex = {
				find_regex: [""],
				replace_regex: [""],
				length: 1,
				current_regex: 0,
				init_current: function () {
					this.current_regex = 0;
				},
				get_current_find: function () {
					return this.get_find(this.current_regex);
				},
				get_current_replace: function () {
					return this.get_replace(this.current_regex);
				},
				next: function () {
					return (this.current_regex + 1 === this.length ? false : this.current_regex++);
				},
				get_find: function (index) {
					return this.find_regex[index];
				},
				get_replace: function (index) {
					return this.replace_regex[index];
				},
				set_find: function (text) {
					this.find_regex[this.current_regex] = text;
				},
				set_replace: function (text) {
					this.replace_regex[this.current_regex] = text;
				}
			}
			var current_replacements = 0;
			for (var i = 0; i < find_array.length; i++) {
				regex.set_find(regex.get_current_find() + "(" + find_array[i].trim() + ")|");
				regex.set_replace(regex.get_current_replace() + "(?" + (current_replacements + 1) + replace_array[i].trim() + ")");
				current_replacements++;
				if (current_replacements === MAX_REPLACEMENTS) {
					current_replacements = 0;
					regex.set_find(regex.get_current_find()
						.slice(0, -1));
					regex.length++;
					regex.current_regex++;
					regex.find_regex.push("");
					regex.replace_regex.push("");
				}
			}
			regex.set_find(regex.get_current_find()
				.slice(0, -1));
			return regex;
		}

		function isValid(find_array, replace_array) {
			var valid, info_element = document.getElementById('info');
			if (find_array.length === replace_array.length) {
				valid = true;
				info_element.innerHTML = "Number of strings to replace: " + find_array.length.toString();
				info_element.className = "mb-0 text-success";
			} else {
				valid = false;
				info_element.innerHTML = "Error, different number of strings: To find: " + find_array.length.toString() + "; To replace: " + replace_array.length.toString();
				info_element.className = "mb-0 text-danger";
				document.getElementById('results')
					.classList.add("d-none");
			}
			return valid;
		}

		function results(regex) {
			regex.init_current();

			var html_string = "";
			document.getElementById('results')
				.innerHTML = html_string;
			for (regex.current_regex = 0; regex.current_regex < regex.length; regex.current_regex++) {
				html_string += `
                    <div class="row ">
                        <div class="col-sm alert alert-primary d-flex flex-column">
                            <p id="find${regex.current_regex}">${regex.get_current_find()}</p>
                            <button class="btn btn-primary btn-sm btn-block mt-auto" data-clipboard-target="#find${regex.current_regex}") name="copy">Copy</button>
                        </div>
                        <div class="col-sm alert alert-success d-flex flex-column">
                            <p id="replace${regex.current_regex}">${regex.get_current_replace()}</p>
                            <button class="btn btn-primary btn-sm btn-block mt-auto" data-clipboard-target="#replace${regex.current_regex}" name="copy">Copy</button>
                        </div>
                    </div>`;
				document.getElementById('results')
					.innerHTML += html_string;
				html_string = "";
			}
			document.getElementById('results')
				.classList.remove("d-none");

			var btns = document.querySelectorAll('[name=copy]');
			var clipboard = new ClipboardJS(btns);
		}
	}, false);
}