//GRAVITY MAZE
//YAY! I finally started it. But not sure if and when I will complete it. 2017/06/28

var characters_to_choose_from = ['X', '1', 'G', ' ']; //As matrix should only have these charcters
var matrix_size = 5;       //Size of matrix
var maze = new Array(matrix_size);
random_matrix_generator();   //call random number generator

//Generate a matrix with X, 1 and G at random places . But '1' and 'G' should only occur once
function random_matrix_generator(){
  var row_index = 0, col_index = 0, random_num;

  while(row_index < matrix_size){
    maze[row_index] = new Array(matrix_size);
    col_index = 0;

    while(col_index < matrix_size){
      random_num = Math.floor((Math.random() * characters_to_choose_from.length) + 1); //generate random number in the range (1, matrix_size)
      maze[row_index][col_index] = characters_to_choose_from[random_num - 1];          //deduct one from random number in the index as index is from range (0, matrix_size - 1)

      if (maze[row_index][col_index] == 'G' || maze[row_index][col_index] == '1'){
        characters_to_choose_from[random_num - 1] = characters_to_choose_from[random_num - 1].replace(maze[row_index][col_index], 'X');
      }
      col_index++;
    }
    console.log("\n");
    row_index++;
  }
}
