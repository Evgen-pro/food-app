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


    const deadline = '2024-02-28';



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
    const modalCloseBtn = document.querySelector('[data-close]')

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => {
            modal.style.display = 'block'
            document.body.style.overflow = 'hidden'
        })
    })

    function closeModal() {
        modal.style.display = 'none'
        document.body.style.overflow = ''
    }
    modalCloseBtn.addEventListener('click', closeModal)

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal()
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.style.display === 'block') {
            closeModal()
        }
    })
})

