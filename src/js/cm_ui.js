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

for(let i=0; i<dataList_count; i++){
    let div = document.createElement('div');
    katex.render(katex_str(func_data[i].katex_func), div, {throwOnError: false});

    let li = document.createElement('li');
    li.addEventListener('click', dataListItemClick.bind(null, li, i));

    li.appendChild(div);
    dataList.appendChild(li);
}