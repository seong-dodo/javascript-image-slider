export default class ImageSlider {
  #currentPostion = 0;
  
  #sliderNumber = 0;

  #sliderWidth = 0;
  
  #intervalId;
  
  #autoPlay = true;

  sliderWrapEl;

  sliderListEl;

  nextButtonEl;

  previousButtonEl;

  indicatorWrapEl;

  controlWrapEl;
 
  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSliderWidth();
    this.initSliderListWidth();
    this.addEvnet();
    this.createIndicator();
    this.setIndicator();
    this.initAutoPlay();
  } 

  assignElement() {
    this.sliderWrapEl = document.getElementById("slider-wrap");
    this.sliderListEl = this.sliderWrapEl.querySelector("#slider");
    this.nextButtonEl = this.sliderWrapEl.querySelector("#next");
    this.previousButtonEl = this.sliderWrapEl.querySelector("#previous");
    this.indicatorWrapEl = this.sliderWrapEl.querySelector("#indicator-wrap");
    this.controlWrapEl = this.sliderWrapEl.querySelector("#control-wrap");
  }

  initAutoPlay() {
    this.#intervalId = setInterval(this.moveToRight.bind(this), 1000);
  }

  initSliderNumber() {
    this.#sliderNumber = this.sliderListEl.querySelectorAll('li').length;
  }

  initSliderWidth() {
    this.#sliderWidth = this.sliderListEl.clientWidth;
  }

  initSliderListWidth() {
    this.sliderListEl.style.width = `${this.#sliderNumber * this.#sliderWidth}px`
  }
 
  addEvnet() {
    this.nextButtonEl.addEventListener("click", this.moveToRight.bind(this));
    this.previousButtonEl.addEventListener("click", this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener("click", this.onClickIndicator.bind(this));
    this.controlWrapEl.addEventListener("click", this.togglePlay.bind(this));
  }

  togglePlay(event) {
    if (event.target.dataset.status === 'play') {
      this.#autoPlay = true;
      this.controlWrapEl.classList.add('play');
      this.controlWrapEl.classList.remove('pause');
      this.initAutoPlay();
    } else if (event.target.dataset.status === 'pause') {
      this.#autoPlay = false;
      this.controlWrapEl.classList.remove('play');
      this.controlWrapEl.classList.add('pause');
      clearInterval(this.#intervalId);
    }
  }

  onClickIndicator(e) {
    const indexPostion = parseInt(e.target.dataset.index, 10);
    if(Number.isInteger(indexPostion)){
      this.#currentPostion = indexPostion;
      this.sliderListEl.style.left = `-${this.#sliderWidth * this.#currentPostion}px`
      this.setIndicator();
    }
  }

  moveToRight() {
    this.#currentPostion += 1;
    if(this.#currentPostion === this.#sliderNumber) {
      this.#currentPostion = 0
    }
    this.sliderListEl.style.left = `-${this.#sliderWidth * this.#currentPostion}px`
    if(this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.initAutoPlay();
    }
    this.setIndicator();
  }

  moveToLeft(){
    this.#currentPostion -= 1;
    if(this.#currentPostion === -1) {
      this.#currentPostion = this.#sliderNumber -1;
    }
    this.sliderListEl.style.left = `-${this.#sliderWidth * this.#currentPostion}px`
    if(this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.initAutoPlay();
    }
    this.setIndicator();
  }

  createIndicator() {
    const docFragment = document.createDocumentFragment();
    for(let i = 0; i < this.#sliderNumber; i+=1) {
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
  }

  setIndicator() {
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicatorWrapEl.querySelector(`ul li:nth-child(${this.#currentPostion + 1})`).classList.add('active');
  }
}