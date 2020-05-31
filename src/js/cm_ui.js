const dataList_panel = document.getElementById('dataList-panel');
const header_dataList_btn = document.getElementById('header-dataList-btn');

dataList_panel.style.display = 'none';

// DataList panel display toggle
let dataList_panel_visible = false;

function dataListPanelMakeInvisible() {
    dataList_panel_visible = false;
    setTimeout(
        () => {if (!dataList_panel_visible) dataList_panel.style.display = 'none'},
        150
    );
}

dataList_panel.addEventListener('mouseout', function (e) {
    dataListPanelMakeInvisible();
});

dataList_panel.addEventListener('mouseover', function(e) {
    dataList_panel_visible = true;
    dataList_panel.style.display = '';
});

header_dataList_btn.addEventListener('click', function (e) {
    if (dataList_panel.style.display === '') {
        dataList_panel.style.display = 'none';
    } else {
        dataList_panel.style.display = '';

        function headerDataListBtnMousout(e) {
            dataListPanelMakeInvisible();
            header_dataList_btn.removeEventListener('mouseout', headerDataListBtnMousout);
        }

        header_dataList_btn.addEventListener('mouseout', headerDataListBtnMousout);
    }
});

// Settings panel display toggle
const settings_panel = document.getElementById('settings-panel');
settings_panel.style.display = 'none';
document.getElementById('header-settings-btn').addEventListener('click', function (e) {
    settings_panel.style.display = settings_panel.style.display === '' ? 'none' : ''
});


// ==========================================================================================================
//  BUILD UI
// ==========================================================================================================

// DATALIST Create and Display list
const dataList = document.getElementById('dataList');
const dataList_count = func_data.length;
const katex_font = "\\sf ";

// katex format
function katex_str(str) {
    return katex_font + str;
}

const header_katex_func = document.getElementById('header-katex-func');
const header_katex_info = document.getElementById('header-katex-info');

// update text in header panel
function updateHeaderPanel() {
    katex.render(katex_str(func_data[current_index].katex_func), header_katex_func, {throwOnError: false});
    katex.render(katex_str(func_data[current_index].katex_info || ''), header_katex_info, {throwOnError: false});
    // header_katex_info.innerHTML = func_data[current_index].katex_info || '';
}

// run scripts on datalist item click
function dataListItemClick(item, index) {
    if (!item.classList.contains('active')) {
        dataList.querySelector('.active').classList.remove('active');
        item.classList.add('active');

        current_index = index;
        updateHeaderPanel();
        runNewFunction();
    }
}

(function buildDataListPanel(){
    const dataList_fragment = document.createDocumentFragment();

    for(let i=0; i<dataList_count; i++){
        let div = document.createElement('div');
        katex.render(katex_str(func_data[i].katex_func), div, {throwOnError: false});

        let li = document.createElement('li');
        li.addEventListener('click', dataListItemClick.bind(null, li, i));

        li.appendChild(div);
        dataList_fragment.appendChild(li);
    }

    dataList.appendChild(dataList_fragment);
})();   


// SETTINGS

(function buildSettingsPanel() {
    let container = document.createElement('div');
    container.classList.add('settings-panel');
    container.classList.add('settings-container');

    let settings_html = '';

    // color check
    settings_html += '<div id="settings-checkbox" class="settings-container">'+
                        '<input id="color-check" class="settings-checkbox" type="checkbox">'+
                        '<label for="color-check">color</label>'+
                    '</div>';

    // step frequency
    settings_html += '<div id="settings-animation-frequency" class="settings-container">'+
                        '<span class="settings-container-info">Step frequency</span>'+
                        '<span class="settings-container-info">[1, 700]</span>'+
                        '<input id="numbers-ConformalMap-frequency" class="settings-numbers" type="number" min="1" max="700" step="1">'+
                        '<label for="numbers-ConformalMap-frequency">count</label>'+
                    '</div>';

    // ranges
    settings_html += '<div id="settings-coordinates-ranges" class="settings-container">'+
                        '<span class="settings-container-info">x(s, t), y(s, t)</span>'+
                        '<span class="settings-container-info">ranges [-40, 40]</span>'+
                        '<span class="settings-container-info">counts [1, 300]</span>'+

                        '<fieldset>'+
                            '<legend>s</legend>'+
                            '<div>'+
                                '<input id="numbers-s-min" class="settings-numbers" type="number" min="-40" max="40" step="0.02">'+
                                '<label for="numbers-s-min">min</label>'+
                            '</div>'+
                            '<div>'+
                                '<input id="numbers-s-max" class="settings-numbers" type="number" min="-40" max="40" step="0.02">'+
                                '<label for="numbers-s-max">max</label><br>'+
                            '</div>'+
                            '<div>'+
                                '<input id="numbers-s-count" class="settings-numbers" type="number" min="1" max="300" step="1">'+
                                '<label for="numbers-s-count">count</label>'+
                            '</div>'+
                        '</fieldset>'+

                        '<fieldset>'+
                            '<legend>t</legend>'+
                            '<div>'+
                                '<input id="numbers-t-min" class="settings-numbers" type="number" min="-40" max="40" step="0.02">'+
                                '<label for="numbers-t-min">min</label><br>'+
                            '</div>'+
                            '<div>'+
                                '<input id="numbers-t-max" class="settings-numbers" type="number" min="-40" max="40" step="0.02">'+
                                '<label for="numbers-t-max">max</label><br>'+
                            '</div>'+
                            '<div>'+
                                '<input id="numbers-t-count" class="settings-numbers" type="number" min="1" max="300" step="1">'+
                                '<label for="numbers-t-count">count</label>'+
                            '</div>'+
                        '</fieldset>'+
                    '</div>';

    // button reset
    settings_html += '<button id="settings-reset-btn" class="controll-btn settings-btn">'+
                        '<span>Reset</span>'+
                    '</button>';

    container.innerHTML = settings_html;

    settings_panel.appendChild(container);
})();

// ==========================================================================================================
// ==========================================================================================================


// SETTINGS rainbow/red check
document.getElementById('color-check').addEventListener('change', function() {
    coloredTransform(this.checked);
})


// SETTINGS formal map coordinates' ranges
function numberIsValid(num, obj) {
    return num >= obj.min && num <= obj.max;
}

// move frequency
const numbers_ConformalMap_frequency = document.getElementById('numbers-ConformalMap-frequency');
numbers_ConformalMap_frequency.oninput = function() {
    let num = Number(this.value);

    if (numberIsValid(num, this))
        setConformalMapFrequency(num);
}

// inputs for s variable
const numbers_s_min = document.getElementById('numbers-s-min');
numbers_s_min.oninput = function() {
    let num = Number(this.value);

    if (numberIsValid(num, this))
        setOptionSMin(num);
}

const numbers_s_max = document.getElementById('numbers-s-max');
numbers_s_max.oninput = function() {
    let num = Number(this.value);

    if (numberIsValid(num, this))
        setOptionSMax(num);
}

const numbers_s_count = document.getElementById('numbers-s-count');
numbers_s_count.oninput = function() {
    let num = Number(this.value);

    if (numberIsValid(num, this))
        setOptionSCount(num);
}

// inputs for t variable
const numbers_t_min = document.getElementById('numbers-t-min');
numbers_t_min.oninput = function() {
    let num = Number(this.value);

    if (numberIsValid(num, this))
        setOptionTMin(num);
}

const numbers_t_max = document.getElementById('numbers-t-max');
numbers_t_max.oninput = function() {
    let num = Number(this.value);

    if (numberIsValid(num, this))
        setOptionTMax(num);
}

const numbers_t_count = document.getElementById('numbers-t-count');
numbers_t_count.oninput = function() {
    let num = Number(this.value);

    if (numberIsValid(num, this))
        setOptionTCount(num);
}

// update all panel settings
function updateUITemplates(obj) {
    numbers_ConformalMap_frequency.value = obj.moves_count;

    let round2 = (num) => Math.round(num*100)/100;

    numbers_s_min.value = round2(obj.s.min);
    numbers_s_max.value = round2(obj.s.max);
    numbers_s_count.value = round2(obj.s.count);

    numbers_t_min.value = round2(obj.t.min);
    numbers_t_max.value = round2(obj.t.max);
    numbers_t_count.value = round2(obj.t.count);
}

document.getElementById('header-q-btn').onclick = function() {
    alert('@DarthCoon5 2020\n'+
        'Visualization of conformal maps\n\n'+
        'Pick the function on the List and press Play or move the slider to start animation, set parameters values (ranges, frequency) in the Settings.\n'+
        'Have fun!');
}