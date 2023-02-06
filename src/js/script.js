$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 900,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/right.svg" alt="slick" /></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/left.svg" alt="slick" /></button>'
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__main').eq(i).toggleClass('catalog-item__main_active');
                $('.catalog-item__addition').eq(i).toggleClass('catalog-item__addition_active');
            })
          });
      }

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__addition_back');
  });