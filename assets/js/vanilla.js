function Minesweeper (config, debug = false) {
  var field = {};
  var mine = {};
  var lose = false;
  var flag;
  var mine_remain;

  var flag_counter = [
    document.getElementById('flag_digit1'),
    document.getElementById('flag_digit2'),
    document.getElementById('flag_digit3')
  ];
  var time_counter = [
    document.getElementById('time_digit1'),
    document.getElementById('time_digit2'),
    document.getElementById('time_digit3')
  ];

  init(config);

  function init (config) {
    flag = config.mine_count;
    mine_remain = config.mine_count;
    flag_counter[0].className = "display_digit digit0";
    flag_counter[1].className = "display_digit digit0";
    flag_counter[2].className = "display_digit digit0";
    time_counter[0].className = "display_digit digit0";
    time_counter[1].className = "display_digit digit0";
    time_counter[2].className = "display_digit digit0";

    var mine_field = document.getElementById('mine_field');
    var mine_row;
    for (var i = 0; i < config.field_row; i++) {
      mine_row = document.createElement('div');
      mine_row.id = 'mine_row_' + i;
      mine_row.className = 'mine-row';
      mine_field.appendChild(mine_row);
      for (var j = 0; j < config.field_column; j++) {
        field['mine_' + i + '_' + j] = document.createElement('div');
        field['mine_' + i + '_' + j].id = 'mine_' + i + '_' + j;
        field['mine_' + i + '_' + j].className = 'mine border';
        field['mine_' + i + '_' + j].addEventListener("click", mine_click);
        field['mine_' + i + '_' + j].addEventListener("contextmenu", mine_rclick);
        mine['mine_' + i + '_' + j] = false;
        mine_row.appendChild(field['mine_' + i + '_' + j]);
      }
    }

    var assign_mine = 0;
    while (assign_mine < config.mine_count) {

      var i = Math.floor(Math.random() * config.field_row);
      var j = Math.floor(Math.random() * config.field_column);
      if (!mine['mine_' + i + '_' + j]) {
        mine['mine_' + i + '_' + j] = true;
        assign_mine++;
      }

      if (debug) {
        document.getElementById('mine_' + i + '_' + j).style.backgroundColor = mine['mine_' + i + '_' + j] ? 'red' : '';
      }
    }
  }

  function mine_rclick(e) {
    e.preventDefault();
    if (lose) return 0;
    if (hasClass(e.target, 'open')) return 0;
    if (hasClass(e.target, 'flag')) {
      e.target.className = 'mine border questionmask';
      return 0;
    }
    if (hasClass(e.target, 'questionmask')) {
      e.target.className = 'mine border';
      return 0;
    }
    e.target.className = 'mine border flag';
  }

  function mine_click(e) {
    if (lose) return 0;

    if (hasClass(e.target, 'flag')) return 0;
    if (hasClass(e.target, 'open')) return 0;
    var id = e.target.id;
    if (mine[id]) {
      e.target.className = 'mine border open exploded';
      lose = true;
      return 0;
    }
    i = parseInt(id.split('_')[1]);
    j = parseInt(id.split('_')[2]);
    surround_check(i, j)

    function surround_check(i, j) {
      var el = document.getElementById('mine_' + i + '_' + j);
      if (!el) return 0;
      if (hasClass(el, 'open')) return 0;
      if (mine['mine_' + i + '_' + j]) return 0;

      var sum = 0;

      if (mine['mine_' + (i-1) + '_' + (j-1)]) sum++;
      if (mine['mine_' + (i-1) + '_' + (j)]) sum++;
      if (mine['mine_' + (i-1) + '_' + (j+1)]) sum++;
      if (mine['mine_' + (i) + '_' + (j-1)]) sum++;
      if (mine['mine_' + (i) + '_' + (j+1)]) sum++;
      if (mine['mine_' + (i+1) + '_' + (j-1)]) sum++;
      if (mine['mine_' + (i+1) + '_' + (j)]) sum++;
      if (mine['mine_' + (i+1) + '_' + (j+1)]) sum++;

      if (sum == 0) {
        el.className = 'mine border open';
        surround_check(i, j-1);
        surround_check(i, j+1);
        surround_check(i-1, j);
        surround_check(i+1, j);
      } else {
        el.className = 'mine border open open' + sum;
      }
    }
  }

}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
