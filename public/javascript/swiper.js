var swiper = new Swiper('.swiper-container',{

    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 50,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
if (this.innerWidth < 900) {
    var swiper = new Swiper('.swiper-container',{

        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 10,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}
window.onresize = () => {
    if (this.innerWidth < 900) {
        var swiper = new Swiper('.swiper-container',{

            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 10,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
    else {
        var swiper = new Swiper('.swiper-container',{

            slidesPerView: 4,
            centeredSlides: true,
            spaceBetween: 50,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
}
