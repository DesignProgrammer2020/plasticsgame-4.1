class Trash {
  constructor(){
    this.r = 50;
    this.x = 0 - this.r;
    this.y = random(400, 500);
  }

  display(){
    fill(80);
    noStroke();
    square(this.x, this.y, this.r);
  }

  move(){
    this.x++;
  }

}
