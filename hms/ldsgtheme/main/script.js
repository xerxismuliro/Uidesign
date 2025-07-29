function navigateTo(url) {
  window.open(url, "_blank")
}

function toggleTheme() {
  const html = document.documentElement
  const themeIcon = document.getElementById("theme-icon")

  if (html.getAttribute("data-theme") === "light") {
    html.setAttribute("data-theme", "dark")
    themeIcon.classList.replace("fa-moon", "fa-sun")
  } else {
    html.setAttribute("data-theme", "light")
    themeIcon.classList.replace("fa-sun", "fa-moon")
  }
}

// Mobile Navigation Functions
function toggleMobileNav() {
  const sidebar = document.querySelector(".nav-sidebar")
  const overlay = document.querySelector(".mobile-nav-overlay")
  const hamburger = document.querySelector(".hamburger-menu")

  sidebar.classList.toggle("mobile-active")
  overlay.classList.toggle("active")
  hamburger.classList.toggle("active")

  // Prevent body scroll when menu is open
  if (sidebar.classList.contains("mobile-active")) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = ""
  }
}

function closeMobileNav() {
  const sidebar = document.querySelector(".nav-sidebar")
  const overlay = document.querySelector(".mobile-nav-overlay")
  const hamburger = document.querySelector(".hamburger-menu")

  sidebar.classList.remove("mobile-active")
  overlay.classList.remove("active")
  hamburger.classList.remove("active")
  document.body.style.overflow = ""
}

// Right Sidebar Toggle for Mobile
function toggleRightSidebar() {
  const rightSidebar = document.querySelector(".right-sidebar")
  const toggleButton = document.querySelector(".right-sidebar-toggle")

  rightSidebar.classList.toggle("mobile-active")
  toggleButton.classList.toggle("active")

  // Update button icon
  const icon = toggleButton.querySelector("i")
  if (rightSidebar.classList.contains("mobile-active")) {
    icon.className = "fas fa-times"
  } else {
    icon.className = "fas fa-info-circle"
  }
}

// Close mobile nav when clicking on nav items
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item")
  navItems.forEach((item) => {
    item.addEventListener("click", closeMobileNav)
  })

  // Close mobile nav on window resize if screen becomes larger
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileNav()
      // Also close right sidebar if open
      const rightSidebar = document.querySelector(".right-sidebar")
      const toggleButton = document.querySelector(".right-sidebar-toggle")
      if (rightSidebar && rightSidebar.classList.contains("mobile-active")) {
        rightSidebar.classList.remove("mobile-active")
        toggleButton.classList.remove("active")
        const icon = toggleButton.querySelector("i")
        icon.className = "fas fa-info-circle"
      }
    }
  })

  // Smooth scrolling for navigation links
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const href = item.getAttribute("href")
      if (href.startsWith("#")) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
        closeMobileNav()
      }
    })
  })
})
