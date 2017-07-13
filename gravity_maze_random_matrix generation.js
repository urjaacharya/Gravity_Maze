//GRAVITY MAZE
//YAY! I finally started it. But not sure if and when I will complete it. 2017/06/28

var characters_to_choose_from = ['x', '1', 'g', ' ']; //As matrix should only have these charcters
var matrix_size = 5;       //Size of matrix
var maze = new Array(matrix_size);
maze_given = [['x','x','x','x','x'],['x','x','x','1','x'], ['x','x','x','2','x'], ['x','x','x',' ','x'], ['x','x','x','g','x']];
//maze = random_matrix_generator();   //call random number generator
display(maze_given);
var maze_drop = drop(maze_given);
display(maze_drop);
//Generate a matrix with X, 1 and G at random places . But '1' and 'G' should only occur once
function random_matrix_generator(){
  var row_index = 0, col_index = 0, random_num;

  while(row_index < matrix_size){
    maze[row_index] = new Array(matrix_size);
    col_index = 0;

    while(col_index < matrix_size){
      random_num = Math.floor((Math.random() * characters_to_choose_from.length) + 1); //generate random number in the range (1, matrix_size)
      maze[row_index][col_index] = characters_to_choose_from[random_num - 1];          //deduct one from random number in the index as index is from range (0, matrix_size - 1)
      process.stdout.write(maze[row_index][col_index]);
      process.stdout.write(" ");
      if (maze[row_index][col_index] == 'g' || maze[row_index][col_index] == '1'){
        characters_to_choose_from[random_num - 1] = characters_to_choose_from[random_num - 1].replace(maze[row_index][col_index], 'x');
      }
      col_index++;
    }
    console.log("\n");
    row_index++;
  }
  return maze;
}


//drop the player
function drop(maze) {
  var play_pos_i = new Array();        //position of player[i,j]
  var play_pos_j = new Array();
  var n1,g,flag=0,count=0,goal_i=0,goal_j=0,player_name;
  var player_value = new Array();

  //store the rotated matrix in rot rot = clock_rotate(maze);
  rot=maze;
  var player_count = 0; //player_count is the number or count of the players in the maze
  //Find the position of all players and goal
  for(i=0;i<rot.length-1;i++) {
    for(j=0;j<rot[0].length-1;j++) {
      //if player is found in maze
      if(!(rot[i][j]=='x'||rot[i][j]==' '||rot[i][j]=='g')){
        //store row and column index of player
        play_pos_i[player_count] = i; //row index
        play_pos_j[player_count] = j; //column index
        player_value[player_count] = rot[i][j]; //which player
        player_count++;
      }
      //if goal is encountered
      else if(rot[i][j]=='g'){
        //store row and column index of goal
        goal_i = i; //row index
        goal_j = j; //column index
      }
    }
  }

    //start dropping players found at the last and proceed upwards
    for(player_count = player_value.length - 1; player_count >= 0; player_count--) {
      player_row_index = play_pos_i[player_count];
      //drop the player
      for (k = player_row_index + 1; k < rot.length; k++) {
        if(rot[k][play_pos_j[player_count]] == ' ') {
          rot[k][play_pos_j[player_count]] = rot[play_pos_i[player_count]][play_pos_j[player_count]];
          rot[play_pos_i[player_count]][play_pos_j[player_count]] = ' ';
          play_pos_i[player_count] = k;
        }
        else if (rot[k][play_pos_j[player_count]] !== 'g' && rot[k][play_pos_j[player_count]] !== ' ') {
          k = rot.length;
        }
        else if (rot[k][play_pos_j[player_count]] == 'g') {
          rot[k][play_pos_j[player_count]] = 'x';
          flag = 1;
          goal_i = k;
          goal_j = play_pos_j[player_count];
          rot[play_pos_i[player_count]][play_pos_j[player_count]] = ' ';
          play_pos_i[player_count] = k;
          k = rot.length;
          player_name = player_value[player_count];
        }

        if(flag == 1) {
          rot[goal_i][goal_j] = player_name;
        }
      }
    }
    return rot;
  }

  function display(rot){
    for(i=0;i<=rot.length-1;i++) {
      for(j=0;j<=rot[0].length-1;j++) {
        process.stdout.write(rot[i][j]);
        process.stdout.write(" ");
      }
      console.log("\n");
  }
}
