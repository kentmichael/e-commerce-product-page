'use-strict'

/*
  Product class
*/
class Product {
  constructor() {
    this.products = [
      {
        id: 1,
        name: 'Fall Limited Edition Sneakers',
        info: 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
        price: 250,
        discount: 50,
        quantity: 1000,
        images: [
          {
            poster: 'images/image-product-1.jpg',
            thumbnail: 'images/image-product-1-thumbnail.jpg'
          },
          {
            poster: 'images/image-product-2.jpg',
            thumbnail: 'images/image-product-2-thumbnail.jpg'
          },
          {
            poster: 'images/image-product-3.jpg',
            thumbnail: 'images/image-product-3-thumbnail.jpg'
          },
          {
            poster: 'images/image-product-4.jpg',
            thumbnail: 'images/image-product-4-thumbnail.jpg'
          }
        ]
      }
    ];

  }

  // Product Info
  displayProductInfo = (id) => {
    const productContainer = document.querySelector('.product');
    const productCompany = document.createElement('p');
    const productName = document.createElement('h1');
    const productInfo = document.createElement('p');
    const productPriceDiv = document.createElement('div');
    const productPriceSpan1 = document.createElement('span');
    const productPriceSpan2 = document.createElement('span');
    const productPriceSpan3 = document.createElement('span');
    const productAdd = document.createElement('div');
    const productAddDiv = document.createElement('div');
    const productAddDivBtn1 = document.createElement('button');
    const productAddDivBtn2 = document.createElement('button');
    const productAddDivSpan = document.createElement('span');
    const productAddButton = document.createElement('button');
    const productAddBtnIcon = document.createElement('img');
    const {products} = this;
    productCompany.innerText = 'Sneaker Company';

    products.forEach((product) => {
      if(product.id === id) {
        productName.innerText = product.name;
        productInfo.innerText = product.info;
        if(product.discount!==0){
          productPriceSpan1.innerText = `$${(product.price - (product.price * (product.discount/100))).toFixed(2)}`;
          productPriceSpan2.innerText = `${product.discount}%`;
          productPriceSpan3.innerText = `$${product.price.toFixed(2)}`;
        }else {
          productPriceSpan1.innerText = `$${product.price.toFixed(2)}`;
        }
        productAddDivSpan.innerText = 0;
        productAddBtnIcon.src = 'images/icon-cart-white.svg';
        productAddButton.innerText = 'Add to cart';
      }
    })

    productCompany.classList.add('product__company');
    productName.classList.add('product__name');
    productInfo.classList.add('product__info');
    productPriceDiv.classList.add('product__price');
    productPriceSpan1.classList.add('product__price--new');
    productPriceSpan2.classList.add('product__price--discount');
    productPriceSpan3.classList.add('product__price--old');
    productAdd.classList.add('product__add');
    productAddDivBtn1.classList.add('product__add--minus');
    productAddDivSpan.classList.add('product__add--quantity');
    productAddDivBtn2.classList.add('product__add--plus');
    productAddButton.classList.add('product__add--tocart');
    
    productPriceSpan1.appendChild(productPriceSpan2);
    productPriceDiv.append(productPriceSpan1, productPriceSpan3);
    productAddDiv.append(productAddDivBtn1, productAddDivSpan, productAddDivBtn2);
    productAddButton.prepend(productAddBtnIcon);
    productAdd.append(productAddDiv, productAddButton);

    productContainer.append(productCompany, productName, productInfo, productPriceDiv, productAdd);
  }

  // Slider
  displayProductInSlider = (id) => {
    const sliderContainer = document.querySelector('.slider');
    const posterContainer = document.createElement('div');
    const posterContainerImg = document.createElement('div');
    const sliderNextBtn = document.createElement('button');
    const sliderPrevBtn = document.createElement('button');
    const {products} = this;

    products.forEach((product) => {
      if(product.id===id) {
        for(let image of product.images){
          const imageHolder = document.createElement('img');
          imageHolder.src = image.poster;
          imageHolder.classList.add('slider__poster--hide');
          posterContainerImg.appendChild(imageHolder);
        }
      }
    });

    posterContainer.classList.add('slider__poster');
    posterContainerImg.classList.add('slider__poster--imgs');
    sliderPrevBtn.classList.add('slider__poster--prev');
    sliderNextBtn.classList.add('slider__poster--next');
    sliderPrevBtn.addEventListener('click', this.prevImage);
    sliderNextBtn.addEventListener('click', this.nextImage);
    posterContainer.append(posterContainerImg, sliderPrevBtn, sliderNextBtn);
    sliderContainer.appendChild(posterContainer);

    this.slideIndex = 1;
    this.showImages();
  }

  showImages = () => {
    const imagesContainer = document.querySelector('.slider__poster--imgs');
    imagesContainer.childNodes.forEach((node) => {
      node.classList.remove('slider__poster--show');
    });
    if(this.slideIndex < 1) this.slideIndex = imagesContainer.childNodes.length;
    if(this.slideIndex > imagesContainer.childNodes.length) this.slideIndex = 1;

    imagesContainer.childNodes[this.slideIndex-1].classList.add('slider__poster--show');
  }

  prevImage = () => {
    this.slideIndex--;
    this.showImages();
  }

  nextImage = () => {
    this.slideIndex++;
    this.showImages();
  }

  // Gallery
  displayProductInGallery = (id) => {
    const galleryContainer = document.querySelector('.gallery');
    const galleryPoster = document.createElement('div');
    const galleryThumbnail = document.createElement('div');
    const {products} = this;

    products.forEach((product) => {
      if(product.id === id){
        product.images.forEach((posters, idx) => {
          const galleryPosterImg = document.createElement('img');
          const galleryThumbnailImg = document.createElement('img');
          galleryPosterImg.classList.add('gallery__poster--hide');
          galleryPosterImg.src = posters.poster;
          galleryPoster.appendChild(galleryPosterImg);
          galleryThumbnailImg.src = posters.thumbnail;
          galleryThumbnailImg.classList.add('gallery__thumbnail--img');
          galleryThumbnailImg.addEventListener('click', () => {
            this.showPoster(idx);
            this.selectedThumbnail(idx);
          });
          galleryThumbnail.appendChild(galleryThumbnailImg);
        })
      }
    });

    galleryPoster.classList.add('gallery__poster');
    galleryThumbnail.classList.add('gallery__thumbnail');
    galleryContainer.append(galleryPoster, galleryThumbnail);

    this.showPoster();
    this.selectedThumbnail();
  }

  showPoster = (idx=0) => {
    const galleryPoster = document.querySelector('.gallery__poster');
    galleryPoster.childNodes.forEach((element) => {
      element.classList.remove('gallery__poster--show');
    });

    galleryPoster.childNodes[idx].classList.add('gallery__poster--show');
  }

  selectedThumbnail = (idx=0) => {
    const galleryThumbnail = document.querySelector('.gallery__thumbnail');
    galleryThumbnail.childNodes.forEach((element) => {
      element.classList.remove('gallery__thumbnail--selected');
    });

    galleryThumbnail.childNodes[idx].classList.add('gallery__thumbnail--selected');
  }

}

const productId = 1;
const inventoryProduct = new Product();
// Selected product id from main page
inventoryProduct.displayProductInfo(productId);
inventoryProduct.displayProductInSlider(productId);
inventoryProduct.displayProductInGallery(productId);

/*
  User class
*/
class User {
  constructor(inventoryProduct, productId, addToMyCart, showMyCart, setQuantityPlus, setQuantityMinus) {
    this.user = {
      name: 'User 1',
      cart: []
    };
    this.prodId = productId;
    this.addToCart = addToMyCart;
    this.inventory = inventoryProduct;
    this.addQuantity = setQuantityPlus;
    this.minusQuantity = setQuantityMinus;
    this.quantityCount = 0;
    this.showCart = showMyCart;

    this.addToCart.addEventListener('click', this.addProductToCart);
    this.addQuantity.addEventListener('click', this.addProductQuantity);
    this.minusQuantity.addEventListener('click', this.minusProductQuantity);
    this.showCart.addEventListener('click', this.showCartModal);
    }

  addProductToCart = () => {
    const {products} = this.inventory;
    const {user, prodId, quantityCount} = this;

    if(this.quantityCount){
      let productExist = false;

      user.cart.forEach((item) => {
        if(item.id === prodId) productExist=true;
      });

      if(productExist){
        this.updateCartProduct();
      }else{
        products.forEach((product) => {
          if(product.id === prodId){
            this.user.cart.push({
              id: product.id,
              name: product.name,
              price: product.price,
              discount: product.discount,
              quantity: quantityCount,
              image: product.images[0].thumbnail
            });
          }
        });
      }
      this.setQuantity(true);
      this.quantityCount = 0;
    }
  }

  updateCartProduct = () => {
    const {user, prodId, quantityCount} = this;
    const updatedCart = user.cart.map((item) => {
      if(item.id===prodId) item.quantity = item.quantity + quantityCount;
      return item;
    });
    this.user.cart = updatedCart.slice();
  }

  addProductQuantity = () => {
    this.quantityCount++;
    this.setQuantity();
  }

  minusProductQuantity = () => {
    const {quantityCount} = this;
    if(quantityCount > 0){
      this.quantityCount--;
      this.setQuantity();
    }
  }

  setQuantity = (reset = false) => {
    const {quantityCount} = this;
    const currentQuantity = document.querySelector('.product__add--quantity');
    reset ? 
    currentQuantity.innerText = 0 :
    currentQuantity.innerText = quantityCount;
  }

  showCartModal = () => {
    const nav = document.querySelector('.nav');
    const cartDialog = document.createElement('dialog');


    nav.appendChild(cartDialog);
  }
}

const showMyCart = document.querySelector('.nav__cart');
const addToMyCart = document.querySelector('.product__add--tocart');
const setQuantityPlus = document.querySelector('.product__add--plus');
const setQuantityMinus = document.querySelector('.product__add--minus');

const customer = new User(inventoryProduct, productId, addToMyCart, showMyCart, setQuantityPlus, setQuantityMinus);