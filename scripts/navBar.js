let navData = {
    logoLink: "https://google.com",
    logo: "./images/logo.svg",
    logoText: "GDSC RCOEM",
    navLinks: [
        {
            name: "Home",
            link: "./index.html"
        },
        {
            name: "Event",
            link: "./event.html"
        },
        {
            name: "Team",
            link: "./team.html"
        },
        {
            name: "About",
            link: "./index.html#about"
        }
    ],
    selectedColor: "#0f9d58"
}

const makeClick = (link) => {
    let a = document.createElement("a")
    a.href = link
    a.click()
}

class navBar extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        const wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'container')

        let burger = document.createElement('div')
        burger.setAttribute('class', 'burger')
        burger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `

        let logoDiv = document.createElement('div')
        logoDiv.setAttribute('class', 'logoDiv')

        let logo = document.createElement('img')
        logo.src = navData.logo
        logoDiv.addEventListener("click", () => {
            makeClick(navData.logoLink)
        })

        let logoTxt = document.createElement('div')
        logoTxt.innerText = navData.logoText


        logoDiv.appendChild(logo)
        logoDiv.appendChild(logoTxt)

        let navLinks = document.createElement('ul')
        navLinks.setAttribute("class", "nav-links")

        burger.addEventListener("click", () => {
            burger.classList.toggle("menuAnimate")
            navLinks.classList.toggle("open")
        })


        for (let i = 0; i < navData.navLinks.length; i++) {
            let tab = navData.navLinks[i]
            let l = document.createElement("li")
            l.innerText = tab.name
            l.addEventListener("click", () => {
                makeClick(tab.link)

                if (window.innerWidth < 770) {
                    burger.classList.toggle("menuAnimate")
                    navLinks.classList.toggle("open")
                }

            })
            navLinks.appendChild(l)
        }

        wrapper.appendChild(burger)
        wrapper.appendChild(logoDiv)
        wrapper.appendChild(navLinks)

        const linkElem = document.createElement('link')
        linkElem.setAttribute('rel', 'stylesheet')
        linkElem.setAttribute('href', './styles/navBar.min.css')

        this.shadowRoot.append(linkElem, wrapper)
    }

    connectedCallback() {
        let selectedTab = this.getAttribute('selected')
        for (let i = 0; i < navData.navLinks.length; i++) {
            let tab = navData.navLinks[i]
            let l = this.shadowRoot.querySelectorAll("li")[i]
            if (tab.name.toLowerCase() == selectedTab.toLowerCase()) {
                l.style.borderBottomColor = navData.selectedColor
            }
        }
    }
}

// custom component navBar
window.customElements.define('nav-bar', navBar)
