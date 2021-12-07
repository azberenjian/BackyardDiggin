class Grass{
  constructor(){
    this.r = 50;
    this.x = random(w);
    //this.y = 0 - this.r;
    this.y = random(h-30);
  }

display(){
  image(grassImg, this.x, this.y, this.r, this.r);
}

move(){
  //this.y++;
}

}
