document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader__items'),
          tabsContent = document.querySelectorAll('.tabcontent')


    function hideTabContent() {
        tabsContent.forEach(elem => {
            elem.style.display = 'none'
        })

        tabs.forEach(elem => {
            elem.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block'
        tabs[i].classList.add('tabheader__item_active')
    }

    tabsParent.addEventListener('click', (event) => {
        const target = event.target

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })

    hideTabContent()
    showTabContent()



    // Timer


    const deadline = '2024-12-28';



    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t / (1000 * 60 * 60 * 24)) ),
            hours = Math.floor( (t / (1000 * 60 * 60) %  24) ),
            minutes = Math.floor( (t / 1000 / 60) % 60),
            seconds = Math.floor( (t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours ,
            'minutes': minutes,
            'seconds': seconds
    };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function setClock(selector, endtime) {


    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

        updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);


        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }

    }

    }


    setClock('.timer', deadline);

    // modal window



    const modalTrigger = document.querySelectorAll('[data-modal]')
    const modal = document.querySelector('.modal')
    let modalTimerId;




    function openModal() {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimerId)
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal)
    })

    function closeModal() {
        modal.style.display = 'none'
        document.body.style.overflow = ''
    }


    modal.addEventListener('click', (event) => {
        if (event.target == modal || event.target.getAttribute('data-close') == '') {
            closeModal()
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.style.display === 'block') {
            closeModal()
        }
    })

    // const modalTimerId = setTimeout(openModal, 15000)

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector)
            this.transfer = 27;
            this.changeToUAH()
        }
        changeToUAH() {
            this.price = this.price * this.transfer
        }

        render() {
            const element = document.createElement('div')
            if (this.classes.length === 0) {
                this.element = 'menu__item'
                element.classList.add(this.element)
            } else {
                this.classes.forEach(className => element.classList.add(className))
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `
            this.parent.append(element)
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url)
            if (!res.ok) {
                throw new Error(`could not fetch ${url}, status ${res.status}`)
            }

            return await res.json()
        }

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, alt, title, descr, price})=> {
    //             new MenuCard(img, alt, title, descr, price, '.menu .container').render()
    //         })
    //     })

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, alt, title, descr, price})=> {
                new MenuCard(img, alt, title, descr, price, '.menu .container').render()
        })
        })

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container',
    //     'menu__item'
    // ).render()

    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     '"Меню “Премиум“',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     14,
    //     '.menu .container',
    //     'menu__item'
    // ).render()

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     10,
    //     '.menu .container',
    //     'menu__item'
    // ).render()

    //forms

    const forms = document.querySelectorAll('form')
    const message = {
        loading: './img/form/spinner.svg',
        success: 'Thanks, we will call you soon',
        failure: 'whats wrong...'
    }

    forms.forEach(item => {
        bindPostData(item)
    })

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            })
            return await res.json()
        }


    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault()

            const statusMessage = document.createElement('img')
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            form.append(statusMessage)


            const formData = new FormData(form)

            const json  = JSON.stringify(Object.fromEntries (formData.entries()))

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data)
                showThanksModal(message.success);
                statusMessage.remove()
            })
            .catch(() => {
                showThanksModal(message.failure)
            })
            .finally(() => {
                form.reset()
            })
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')

        prevModalDialog.style.display = 'none';
        openModal()

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
            <div class = "modal__content">
                <div class = "modal__close" data-close>×</div>
                <div class = "modal__title">${message}</div>
            </div>
        `
        document.querySelector('.modal').append(thanksModal)
        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.style.display = 'none';
            closeModal()
        }, 4000)
    }

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res))


    //slider

    const slides = document.querySelectorAll('.offer__slide')
    const prev = document.querySelector('.offer__slider-prev')
    const next = document.querySelector('.offer__slider-next')
    const total = document.querySelector('#total')
    const current = document.querySelector('#current')
    let slideIndex = 1

    showSlides(slideIndex)

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }

        slides.forEach(item => item.style.display = 'none')
        slides[slideIndex -1].style.display = 'block'
    }

    function plusSlides(n) {
        showSlides(slideIndex += n)
    }

    prev.addEventListener('click', () => {
        plusSlides(-1)
    })

    next.addEventListener('click', () => {
        plusSlides(1)
    })
})

