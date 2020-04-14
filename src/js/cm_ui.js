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

// SETTINGS formal map
const formalMap_slider_container = document.getElementById('slider-formalMap-container');
const formalMap_settings = document.getElementById('settings-formalMap');


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
    header_katex_info.innerHTML = func_data[current_index].katex_info || '';
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