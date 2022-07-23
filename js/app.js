// landingPage Elements
const landingPage = document.querySelector(".landing-page");
const settingBox = document.querySelector(".setting-box");
const toggle = document.querySelector(".toggle-setting i");
const contentColor = document.querySelector(".content-colors");
const imgsIconContainer = document.querySelector(".small-imgs");
const btnShowImgs = document.querySelector(".gk-btns .fa-images");
const imgsContainer = document.querySelector(".content-background");
const btns = imgsContainer.querySelectorAll("span");
const skillsContainer = document.querySelector(".skills-content");
const skillSection = document.querySelector(".skills");
const galleryContent = document.querySelector(".gallery-content");
const bulletsContainer = document.querySelector(".nav-bullets .bullets-container");
const bullets = document.querySelectorAll(".nav-bullets .bullets");
const btnBullets = document.querySelector(".nav-bullets .btn-bullets");
const links = document.querySelectorAll(".header-area .links li a");
const mainContainerBullets = document.querySelector(".nav-bullets");
const bulletsBtn = document.querySelectorAll(".bullets-btn");
const durationInput = document.querySelector(".duration input");
let duration = 1000;
let interval;
let inputInterval;
let backgroundOption = true;

// ==================== save & check for Local Storage:======================
if (localStorage.getItem("color-option") !== null) {
    document.documentElement.style.setProperty("--mainColor", localStorage.getItem("color-option"));
}

if (localStorage.getItem("bullets-option") !== null) {
    mainContainerBullets.style.display = localStorage.getItem("bullets-option");
    bulletsBtn.forEach(btn => {
        btn.classList.remove("active");
        bulletsBtn.forEach(btn => {
            if (localStorage.getItem("bullets-option") === "block") {
                if (btn.dataset.display === "yes") {
                    btn.classList.add("active");
                }
            } else {
                if (btn.dataset.display === "no") {
                    btn.classList.add("active");
                }
            }
        })
    })
}
// Reset Options :
document.querySelector(".reset-btn").onclick = ()=>{
    localStorage.clear();
    window.location.reload();
}
// =================

// ================ open setting Box:==========================
toggle.addEventListener("click", () => {
    settingBox.classList.toggle("open");
    toggle.classList.toggle("fa-spin")
});

// =========== bullets ===================
btnBullets.addEventListener("click", () => {
    btnBullets.classList.toggle("active");
    bulletsContainer.classList.toggle("active");
})

bulletsBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.classList.contains("run")) {
            mainContainerBullets.style.display = "block";
            localStorage.setItem("bullets-option", "block");
        } else {
            mainContainerBullets.style.display = "none";
            localStorage.setItem("bullets-option", "none");
        };
        bulletsBtn.forEach(btn => {
            btn.classList.remove("active");
        });
        btn.classList.add("active");
    })
})

function moveSmooth(elements) {
    elements.forEach(element => {
        element.addEventListener("click", (e) => {
            e.preventDefault()
            document.querySelector(element.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}
moveSmooth(bullets);
moveSmooth(links);

// ================== Change Color:===================
window.addEventListener("load", () => {
    const colorsArray = ["#ff5722", "#009688", "#4caf50", "#e91e63", "#2196f3"];
    for (i = 0; i < colorsArray.length; i++) {
        contentColor.innerHTML += `<span data-color = "${colorsArray[i]}"></span>`;
    }
    const spans = contentColor.querySelectorAll("span");
    spans[0].classList.add("active");
    spans.forEach(span => {

        span.style.backgroundColor = span.dataset.color;
        span.classList.remove("active");
        if (span.dataset.color === localStorage.getItem("color-option")) {
            span.classList.add("active");
        }
        if (localStorage.getItem("color-option") === null) {
            if (span.dataset.color === "#ff5722") {
                span.classList.add("active")
            }
        }
        span.addEventListener("click", () => {

            span.classList.remove("active");
            document.querySelectorAll(".content-colors span").forEach(element => {
                element.classList.remove("active");

            });
            span.classList.add("active");
            document.documentElement.style.setProperty("--mainColor", span.dataset.color);
            localStorage.setItem("color-option", span.dataset.color);
        })
    })
});


// ============== Change Background Image:==================
const bgks = [
    {
        src: "01.jpeg",
    },
    {
        src: "02.jpg",

    },
    {
        src: "03.jpg",
    },
    {
        src: "04.jpg",
    },
    {
        src: "05.png",
    }
];
function getImgs() {

    function randomImg() {
        durationInput.value = 5;
        if (backgroundOption === true) {
            interval = setInterval(() => {
                let randomNum = Math.floor(Math.random() * bgks.length);
                landingPage.style.background = "url(./images/" + bgks[randomNum].src + ") center/cover";
            }, durationInput.value * 1000);
            durationInput.onclick = () => {
                clearInterval(interval);
                clearInterval(inputInterval);
                btns.forEach(btn => {
                    btn.classList.remove("active");
                    if (btn.classList.contains("run")) {
                        btn.classList.add("active");
                    }
                });
                if (durationInput.value == 0 || durationInput.value < 0) {
                    btns.forEach(btn => {
                        btn.classList.remove("active");
                        if (btn.classList.contains("stop")) {
                            btn.classList.add("active");
                        }
                    });
                    clearInterval(interval);
                    clearInterval(inputInterval);
                    let randomNum = Math.floor(Math.random() * bgks.length);
                    landingPage.style.background = "url(./images/" + bgks[randomNum].src + ") center/cover";
                } else {
                    clearInterval(interval);
                    clearInterval(inputInterval);
                    inputInterval = setInterval(() => {
                        let randomNum = Math.floor(Math.random() * bgks.length);
                        landingPage.style.background = "url(./images/" + bgks[randomNum].src + ") center/cover";
                        console.log(durationInput.value)
                    }, duration = durationInput.value * 1000);
                }
            }
        }
    }
    randomImg();
    const imgsArray = bgks.map(item => {
        return `<img src="./images/${item.src}" alt="">`;
    });
    imgsIconContainer.innerHTML = imgsArray.join("");

}
getImgs();

// ============== Show img icon ==================
btnShowImgs.addEventListener("click", () => {
    imgsContainer.classList.toggle("show");
});
// ======== save To Local Storage =================
if (localStorage.getItem("background-option") !== null) {
    btns.forEach(btn => {
        btn.classList.remove("active");
    });
    if (localStorage.getItem("background-option") === "true") {
        backgroundOption = true;
        document.querySelector(".content-background .run").classList.add("active");
    } else {
        backgroundOption = false;
        document.querySelector(".content-background .stop").classList.add("active");
    }
}
if (localStorage.getItem("src-background") !== null) {
    landingPage.style.background = "url(" + localStorage.getItem("src-background") + ") center/cover";
}

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        btns.forEach(btn => {
            btn.classList.remove("active");
        });
        btn.classList.add("active");
        if (btn.classList.contains("run")) {
            backgroundOption = true;
            localStorage.setItem("background-option", true);
            getImgs();
        } else {
            backgroundOption = false;
            durationInput.value = 0;
            clearInterval(interval);
            clearInterval(inputInterval);
            localStorage.setItem("background-option", false);

        };
    });
});

imgsContainer.addEventListener("click", (e) => {
    const img = e.target;
    if (img.getAttribute('src')) {
        durationInput.value = 0;
        landingPage.style.background = "url(" + img.getAttribute('src') + ") center/cover";
        backgroundOption = false;
        clearInterval(interval);
        clearInterval(inputInterval);
        localStorage.setItem("background-option", false);
        localStorage.setItem("src-background", img.getAttribute("src"));
        btns.forEach(btn => {
            if (btn.classList.contains("run")) {
                btn.classList.remove("active");
            } else {
                btn.classList.add("active");
            };
        });
    }
});

// Start Skills:==

const skillsObj = [
    {
        name: "HTML",
        progress: 80
    },
    {
        name: "CSS",
        progress: 75
    },
    {
        name: "Javascript",
        progress: 60
    },
    {
        name: "Python",
        progress: 85
    },
    {
        name: "MySQL",
        progress: 50
    },
    {
        name: "PHP",
        progress: 70
    }
];
window.addEventListener("load", getProgress);
function getProgress() {
    const skillsMap = skillsObj.map(item => {
        return `<div class="skills-box">
                    <div class="skills-name">${item.name}</div>
                    <div class="skills-progress">
                        <span data-width="${item.progress}%"></span>
                    </div>
                </div>`;
    });
    skillsContainer.innerHTML = skillsMap.join("");
    const spans = skillsContainer.querySelectorAll("span");
};

window.onscroll = () => {
    let skillsOffsetTop = skillSection.offsetTop;
    let skillsHeight = skillSection.offsetHeight;
    let widowHeight = this.innerHeight;
    let scrollHeight = this.pageYOffset;
    const spans = skillsContainer.querySelectorAll("span");
    if (scrollHeight >= (skillsOffsetTop + skillsHeight - widowHeight)) {
        spans.forEach(span => {
            span.style.width = span.dataset.width;
        })
    }
};
const galleryArray = [
    {
        src: "01.jpeg",
        text: "Img One"
    },
    {
        src: "02.jpg",
        text: "Img Two"

    },
    {
        src: "03.jpg",
        text: "Img Three"
    },
    {
        src: "04.jpg",
        text: "Img Four"
    },
    {
        src: "05.png",
        text: "Img Five"
    },
    {
        src: "06.jpg",
        text: "Img Six"
    },
    {
        src: "07.jpg",
        text: "Img Seven"
    },
    {
        src: "08.jpg",
        text: "Img Eight"
    },
    {
        src: "09.jpg",
        text: "Img Nine"
    },
    {
        src: "010.jpeg",
        text: "Img Ten"
    }
];
window.onload = () => {
    const galleryMap = galleryArray.map(item => {
        return `<img src="./images/${item.src}" alt="${item.text}">`
    });
    galleryContent.innerHTML = galleryMap.join("");
    const imgs = document.querySelectorAll(".gallery-content img");
    imgs.forEach(img => {
        img.addEventListener("click", getPopup);
    });
};

function getPopup(e) {
    const overLay = document.createElement("div");
    const popupBox = document.createElement("div");
    const closeBtn = document.createElement("span");
    const alternate = document.createElement("h3");
    const alternateText = document.createTextNode(e.target.alt);
    const img = document.createElement("img");

    overLay.className = "overlay";
    popupBox.className = "popup-box";
    closeBtn.className = "close-btn";
    closeBtn.innerHTML = "X";
    img.src = e.target.src;

    document.body.appendChild(overLay);
    overLay.appendChild(popupBox);
    popupBox.appendChild(closeBtn);
    alternate.appendChild(alternateText);
    popupBox.appendChild(alternate);
    popupBox.appendChild(img);
    closeBtn.addEventListener("click", () => {
        closeBtn.parentElement.parentElement.remove();
    });
};

// ================== nav bar ===========================

const toggleBtn = document.querySelector(".links-container .toggle");
const linksContainer = document.querySelector(".links-container .links");
const linksChild = linksContainer.querySelectorAll("li");

toggleBtn.onclick = (e) => {
    e.stopPropagation()
    toggleBtn.classList.toggle("active-menu");
    linksContainer.classList.toggle("open");
    const numOfLinks = linksContainer.childElementCount;
    const childHeight = linksChild[6].offsetHeight;
    if (toggleBtn.classList.contains("active-menu")) {
        linksContainer.style.height = numOfLinks * childHeight + "px";
    } else {
        linksContainer.style.height = 0 + "px";
    }
}
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== linksContainer && e.target !== linksChild && linksContainer.classList.contains("open")) {
        linksContainer.classList.remove("open");
        linksContainer.style.height = 0 + "px";
        toggleBtn.classList.remove("active-menu");
    };
})
linksContainer.onclick = (e) => {
    e.stopPropagation()
}