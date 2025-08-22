const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-image');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let currentIndex = 0;
let images = Array.from(galleryItems).map(item => item.querySelector('img'));

function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = 'flex';
  lightboxImg.src = images[currentIndex].src;
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

// Open lightbox on image click
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Filter functionality
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filter === 'all' || filter === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });

    // Refresh the image list for lightbox
    images = Array.from(document.querySelectorAll('.gallery-item'))
      .filter(item => item.style.display !== 'none')
      .map(item => item.querySelector('img'));
  });
});
