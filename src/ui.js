const datepicker = document.getElementById("datepicker");
const timepicker = document.getElementById("timepicker");
const website_previous_node = document.getElementById("website-previous-node");
const website_next_node = document.getElementById("website-next-node");
let boom_datetime = new Date(1970, 0, 1, 0, 0, 0, 0);
let boomed = false;
let changed_date = false;
let changed_time = false;

datepicker.addEventListener('dateChange.mdb.datepicker', (e) => {
    boom_datetime.setFullYear(e.date.getFullYear(), e.date.getMonth(), e.date.getDate());

    changed_date = true;
    boomed = false;
});


timepicker.addEventListener('input.mdb.timepicker', (e) => {
    let time = e.target.value.split(/[ :]/);
    if (time[2] == "PM") {
        time[0] = parseInt(time[0]) + 12;
    }

    boom_datetime.setHours(time[0], time[1]);
    console.log(boom_datetime);

    changed_time = true;
    boomed = false;
});

function addRow() {
    website_next_node.insertAdjacentHTML("beforebegin", `
    <div class="flex my-2">
        <div class="flex-auto mx-3">
            <input class="website-input" placeholder="Website" type="text" value="">
        </div>
        <div class="flex-none mr-3">
            <button onclick="deleteRow(this)" class="generic-button remove bg-red-500 hover:bg-red-600 focus:bg-red-600 active:bg-red-700">X</button>
        </div>
    </div>
    `);
}

function deleteRow(e) {
    document.body.removeChild(e.parentNode.parentNode);
}

function openAll() {
    let website_inputs = document.getElementsByClassName("website-input");
    console.log(website_inputs);
    for (let el of website_inputs) {
        if (el.value != "") {
            console.log(el.value);
            window.open(el.value);
        }
    }
}

function save() {
    let data = {};
    data.boom_datetime = boom_datetime;
    data.inputs = [];
    let i = 0;
    let website_inputs = document.getElementsByClassName("website-input");
    for (let el of website_inputs) {
        if (el.value != "") {
            data.inputs[i] = el.value;
            i++;
        }
    }

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 4)], {
        type: "text/plain"
    }));
    a.setAttribute("download", "fff-data.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function load() {
    finput = document.getElementById("finput");
    finput.type = "file";

    finput.addEventListener("change", () => {
        const selectedFile = finput.files[0];

        const fr = new FileReader();
        fr.addEventListener("load", () => {
            const data = JSON.parse(fr.result);
            boom_datetime = new Date(data.boom_datetime);

            // Set date
            dp_input = datepicker.getElementsByClassName("datepicker-input")[0];
            dp_input.value = boom_datetime.getDate().toString().padStart(2, '0') + 
                "/" + (parseInt(boom_datetime.getMonth()) + 1).toString().padStart(2, '0') + 
                "/" + boom_datetime.getFullYear();
            tp_input = timepicker.getElementsByClassName("datepicker-input")[0];

            // Set time
            let hours = boom_datetime.getHours();
            let minutes = boom_datetime.getMinutes();
            let dayhalf = "AM";
            if (hours == 0 && minutes == 0) {
                hours += 12;
                dayhalf = "PM";
            } else if (hours == 12 && minutes == 0) {
                dayhalf = "AM";
            } else if (hours >= 12) {
                hours -= 12;
                dayhalf = "PM";
            }
            tp_input.value = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + " " + dayhalf; 

            // Parse inputs
            if (!data.inputs) return

            let website_inputs = document.getElementsByClassName("website-input");
            let delete_buttons = document.getElementsByClassName("remove");
            // Remove all inputs
            for (let butt of delete_buttons) {
                butt.click();
            }
            // Add all inputs
            for (let i = website_inputs.length; i <= data.inputs.length - 1; i++) {
                addRow();
            }

            // Set all values
            website_inputs = document.getElementsByClassName("website-input");
            let i = 0;
            for (let val of data.inputs) {
                website_inputs[i].value = val;
                i++;
            }
        });

        if (selectedFile) {
            fr.readAsText(selectedFile);
        }
    });

    finput.click();
}

function test() {
    if (changed_date && changed_time && !boomed) {
        if (boom_datetime <= new Date()) {
            openAll();
            boomed = true;
        }
    }
}

setInterval(test, 1);