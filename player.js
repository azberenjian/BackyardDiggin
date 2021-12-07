class Player{
  constructor(){
    this.r = 58;
    this.x = w/2;
    this.y = h - this.r - 37;
    this.speed = 2;
    this.direction = 'still';
  }

display(){
  image(dogImg, this.x, this.y, this.r, this.r + 37);
//rect(this.x, this.y, this.r, this.r);
}

move(){

  switch(this.direction){
    case 'still':
    //dont move anything
    break;
    case 'up':
    if(this.y > 0){
      this.y -= this.speed;
    }
    //decrease y pos
    break;
    case 'down':
    if (this.y < h - this.r - 37){
    this.y += this.speed;
    }
    break;
    case 'right':
      if (this.x < w - this.r){
      this.x += this.speed;
    }
    //increase x pos
    break;
    case 'left':
    if (this.x > 0){
      this.x -= this.speed;
      }
    //decrease x pos
    break;
    default:
    break;

  }
}

}
