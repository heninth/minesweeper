function Minesweeper (config) {
  var field = {};
  var mine = {};
  init(config);

  console.log(mine);

  function init (config) {
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
        mine['mine_' + i + '_' + j] = false;
        mine_row.appendChild(field['mine_' + i + '_' + j]);
      }
    }

    var assign_mine = 0;
    var assign_chance = config.mine_count / (config.field_row * config.field_column);
    while (assign_mine <= config.mine_count) {
      for (var i = 0; i < config.field_row; i++) {
        for (var j = 0; j < config.field_column; j++) {
          if (Math.random() <= assign_chance) {
            if (!mine['mine_' + i + '_' + j]) {
              mine['mine_' + i + '_' + j] = true;
              assign_mine++;
              console.log(assign_mine);
            }
          }
        }
      }
    }
  }

  function mine_click(e) {
    var id = e.target.id;
    if (mine[id]) {
      e.target.className += ' exploded';
      //lose();
    }
    e.target.className += ' open';
  }
}
