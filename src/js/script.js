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

      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('fast')
      });
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
      });

      $('.button__mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__title').eq(i).text());
          $('.overlay, #order').fadeIn('fast');
        })
      }); 

      function validateForm(form) {
        $(form).validate({
          rules: {
            name: {
              required: true,
              minlength: 2
            },
            phone: 'required',
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: {
              required: 'Введите свое имя!',
              minlength: jQuery.validator.format('Введите {0} символа!')
            },
            phone: 'Введите номер телефона!',
            email: {
              required: 'Введите свой email',
              email: 'Неправильно введен email!'
            }
          }
        });
      }

      validateForm('#consultation-form');
      validateForm('#consultation form');
      validateForm('#order form');

      $("input[name=phone]").mask("+380 (99) 999-99-99");

      $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1200) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $("a").on('click', function(event) {

      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });

    new WOW().init();
  });