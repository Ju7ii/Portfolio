// ==================================================================== //
// ==================== MENU AND NAVIGATION SCRIPT ==================== //
// ==================================================================== //



    // =============== GLOBAL VARIABLES =============== //

        const navigationBar = document.getElementsByClassName("navigation");
        const navigationButton = document.querySelector(".menu-toggle-button");
        const menu = document.getElementById("menu");
        const menuItem = document.querySelectorAll(".menu-item");
        const html = document.documentElement;

    // =============== END GLOBAL VARIABLES =============== //



    // =============== EVENT LISTENERS =============== //

        // ========== PAGE IS SCROLLED CHECK ========== //

            window.onscroll = () => {
                if (window.scrollY > 100) {
                    addActiveNavbar();
                }
                else {
                    removeActiveNavbar();
                }
            };

        // ========== END PAGE IS SCROLLED CHECK ========== //



        // ========== HAMBURGER BUTTON CLICK CHECK ========== //

            navigationButton.addEventListener("click", () => {
                const menuIsOpen = navigationButton.getAttribute("aria-expanded");
                if (menuIsOpen === "false") {
                    openMenu();
                } else {
                    closeMenu();
                }
            });

        // ========== END HAMBURGER BUTTON CLICK CHECK ========== //



        // ========== MENU LINK CLICK CHECK ========== //

            menuItem.forEach( menuItem => {
                menuItem.addEventListener("click", () => {
                    setTimeout(closeMenu, 200);
                })
            });

        // ========== MENU LINK CLICK CHECK ========== //

    // =============== END EVENT LISTENERS =============== //



    // =============== FUNCTIONS =============== //

        // ========== OPEN MENU FUNCTION ========== //

            function openMenu() {
                html.style.overflowY = "hidden"; //* disable scrollbar
                navigationButton.setAttribute("aria-expanded", "true"); //* set aria state -> true
                menu.setAttribute("aria-expanded", "true"); //* set aria state -> true
                addActiveNavbar();
            }

        // ========== END OPEN MENU FUNCTION ========== //



        // ========== CLOSE MENU FUNCTION ========== //

            function closeMenu() {
                html.style.overflowY = ""; //* enable scrollbar
                navigationButton.setAttribute("aria-expanded", "false"); //* set aria state -> false
                menu.setAttribute("aria-expanded", "false"); //* set aria state -> false
                window.scrollY > 100 ? null : removeActiveNavbar(); //* only remove the navbar when on top of site
            }

        // ========== END CLOSE MENU FUNCTION ========== //



        // ========== ADD ACTIVE NAVBAR ========== //

            function addActiveNavbar() {
                navigationBar[0].classList.add("active-navbar");
            }

        // ========== END ADD ACTIVE NAVBAR ========== //



        // ========== REMOVE ACTIVE NAVBAR ========== //

            function removeActiveNavbar() {
                navigationBar[0].classList.remove("active-navbar");
            }

        // ========== END REMOVE ACTIVE NAVBAR ========== //



        // ========== MENU BACKGROUND ANIMATION  ========== //

            Array.from(document.getElementsByClassName("menu-item")) // LOOPING THE MENU ELEMENTS
                .forEach((item, index) => {
                    item.onmouseover = () => {
                        menu.dataset.activeIndex = index; // DEFINING THE ARIA ACTIVE INDEX
                    }
                });

        // ========== END MENU BACKGROUND ANIMATION  ========== //

    // =============== END FUNCTIONS =============== //



// ======================================================================== //
// ==================== END MENU AND NAVIGATION SCRIPT ==================== //
// ======================================================================== //
