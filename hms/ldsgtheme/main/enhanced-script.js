// Enhanced Portfolio JavaScript with Advanced Features

class PortfolioManager {
  constructor() {
    this.init()
    this.setupEventListeners()
    this.setupScrollEffects()
    this.setupAnimations()
    this.observeElements()
  }

  init() {
    // Initialize theme
    this.initializeTheme()

    // Initialize scroll effects
    this.setupScrollToTop()

    // Initialize navigation
    this.setupNavigation()

    // Initialize animations
    this.observeElements()
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem("portfolio-theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "light" || (!savedTheme && !prefersDark)) {
      this.applyLightTheme()
    } else {
      this.applyDarkTheme()
    }

    // Listen for OS theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("portfolio-theme")) {
        if (e.matches) {
          this.applyDarkTheme()
        } else {
          this.applyLightTheme()
        }
      }
    })
  }

  applyDarkTheme() {
    document.documentElement.setAttribute("data-theme", "dark")
    localStorage.setItem("portfolio-theme", "dark")

    const themeIcon = document.getElementById("theme-icon")
    if (themeIcon) {
      themeIcon.classList.remove("fa-moon")
      themeIcon.classList.add("fa-sun")
    }
  }

  applyLightTheme() {
    document.documentElement.setAttribute("data-theme", "light")
    localStorage.setItem("portfolio-theme", "light")

    const themeIcon = document.getElementById("theme-icon")
    if (themeIcon) {
      themeIcon.classList.remove("fa-sun")
      themeIcon.classList.add("fa-moon")
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme")

    if (currentTheme === "dark") {
      this.applyLightTheme()
    } else {
      this.applyDarkTheme()
    }

    // Add theme transition effect
    document.body.style.transition = "all 0.3s ease"
    setTimeout(() => {
      document.body.style.transition = ""
    }, 300)
  }

  setupEventListeners() {
    // Theme toggle
    const themeToggle = document.querySelector(".theme-toggle")
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme())
    }

    // Mobile menu toggle
    const mobileToggle = document.querySelector(".mobile-menu-toggle")
    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => this.toggleMobileMenu())
    }

    // Navigation links
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e))
    })

    // Project cards
    const projectCards = document.querySelectorAll(".project-card")
    projectCards.forEach((card) => {
      card.addEventListener("click", (e) => this.handleProjectClick(e))
    })

    // Search functionality
    const searchInput = document.querySelector(".search-input")
    if (searchInput) {
      searchInput.addEventListener("input", (e) => this.handleSearch(e.target.value))
    }

    // Window events
    window.addEventListener("scroll", () => this.handleScroll())
    window.addEventListener("resize", () => this.handleResize())
    window.addEventListener("click", (e) => this.handleOutsideClick(e))

    // Contact form submission
    const contactForm = document.querySelector(".contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => this.handleContactForm(e))
    }
  }

  setupNavigation() {
    // Header scroll effect
    const header = document.querySelector(".header")

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })

    // Active navigation highlighting
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")

    window.addEventListener("scroll", () => {
      let current = ""

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight

        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })

      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  }

  toggleMobileMenu() {
    const mobileToggle = document.querySelector(".mobile-menu-toggle")
    const mobileNav = document.querySelector(".mobile-nav")

    mobileToggle.classList.toggle("active")
    mobileNav.classList.toggle("active")

    // Prevent body scroll when menu is open
    if (mobileNav.classList.contains("active")) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  closeMobileMenu() {
    const mobileToggle = document.querySelector(".mobile-menu-toggle")
    const mobileNav = document.querySelector(".mobile-nav")

    mobileToggle.classList.remove("active")
    mobileNav.classList.remove("active")
    document.body.style.overflow = ""
  }

  toggleSearch() {
    const searchBar = document.querySelector(".search-bar")
    const searchInput = document.querySelector(".search-input")

    searchBar.classList.toggle("active")

    if (searchBar.classList.contains("active")) {
      setTimeout(() => searchInput.focus(), 300)
    }
  }

  toggleBookmarks() {
    const quickAccessPanel = document.querySelector(".quick-access-panel")
    quickAccessPanel.classList.toggle("active")
  }

  handleNavClick(e) {
    const href = e.target.getAttribute("href")

    if (href && href.startsWith("#")) {
      e.preventDefault()
      const target = document.querySelector(href)

      if (target) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = target.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }

      // Close mobile menu if open
      this.closeMobileMenu()
    }
  }

  handleProjectClick(e) {
    const card = e.currentTarget
    const onclick = card.getAttribute("onclick")

    if (onclick) {
      // Extract URL from onclick attribute
      const urlMatch = onclick.match(/navigateTo$$['"]([^'"]+)['"]$$/)
      if (urlMatch) {
        this.navigateTo(urlMatch[1])
      }
    }
  }

  navigateTo(url) {
    // Add loading state
    const card = event.currentTarget
    card.style.transform = "scale(0.98)"

    setTimeout(() => {
      window.open(url, "_blank")
      card.style.transform = ""
    }, 150)
  }

  downloadResume() {
    // Create a temporary link to download the resume
    const link = document.createElement("a")
    link.href = "assessts/pdfs/imuliro_Ranest_Version2_Project.pdf"
    link.download = "Isaac_Muliro_Resume.pdf"
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  handleSearch(query) {
    // Simple search functionality
    if (query.length < 2) return

    const searchableElements = document.querySelectorAll(".project-title, .skill-title, .blog-title, .section-title")

    searchableElements.forEach((element) => {
      const text = element.textContent.toLowerCase()
      const parent = element.closest(".project-card, .skill-card, .blog-card, .section")

      if (text.includes(query.toLowerCase())) {
        parent.style.display = "block"
        element.style.background = "rgba(16, 185, 129, 0.2)"
      } else {
        parent.style.display = "none"
        element.style.background = "transparent"
      }
    })
  }

  handleOutsideClick(e) {
    // Close search if clicking outside
    const searchBar = document.querySelector(".search-bar")
    if (searchBar && searchBar.classList.contains("active") && !searchBar.contains(e.target)) {
      const searchToggle = document.querySelector('[onclick="toggleSearch()"]')
      if (!searchToggle || !searchToggle.contains(e.target)) {
        searchBar.classList.remove("active")
      }
    }

    // Close quick access if clicking outside
    const quickAccessPanel = document.querySelector(".quick-access-panel")
    if (quickAccessPanel && quickAccessPanel.classList.contains("active") && !quickAccessPanel.contains(e.target)) {
      const quickAccessToggle = document.querySelector('[onclick="toggleBookmarks()"]')
      if (!quickAccessToggle || !quickAccessToggle.contains(e.target)) {
        quickAccessPanel.classList.remove("active")
      }
    }
  }

  setupScrollToTop() {
    const scrollButton = document.querySelector(".scroll-to-top")

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollButton.classList.add("visible")
      } else {
        scrollButton.classList.remove("visible")
      }
    })
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  setupScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector(".hero-section")

    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY
      const rate = scrolled * -0.5

      if (hero) {
        hero.style.transform = `translateY(${rate}px)`
      }
    })
  }

  setupAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
      ".project-card, .skill-card, .contact-item, .blog-card, .timeline-item",
    )

    animatedElements.forEach((el) => {
      el.classList.add("animate-on-scroll")
    })
  }

  observeElements() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))
  }

  handleScroll() {
    // Throttle scroll events
    if (!this.scrollTimeout) {
      this.scrollTimeout = setTimeout(() => {
        // Custom scroll handling here
        this.scrollTimeout = null
      }, 16)
    }
  }

  handleResize() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
      this.closeMobileMenu()
    }

    // Close other panels on resize
    document.querySelector(".search-bar")?.classList.remove("active")
    document.querySelector(".quick-access-panel")?.classList.remove("active")
  }

  handleContactForm(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)

    // Create mailto link
    const subject = encodeURIComponent(data.subject)
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)
    const mailtoLink = `mailto:isaac.muliro@purchase.edu?subject=${subject}&body=${body}`

    window.location.href = mailtoLink

    // Show success message
    alert("Thank you for your message! Your email client should open now.")

    // Reset form
    event.target.reset()
  }
}

// Initialize portfolio manager
document.addEventListener("DOMContentLoaded", () => {
  window.portfolioManager = new PortfolioManager()
})

// Global functions for HTML onclick handlers
function toggleTheme() {
  if (window.portfolioManager) {
    window.portfolioManager.toggleTheme()
  }
}

function toggleMobileMenu() {
  if (window.portfolioManager) {
    window.portfolioManager.toggleMobileMenu()
  }
}

function closeMobileMenu() {
  if (window.portfolioManager) {
    window.portfolioManager.closeMobileMenu()
  }
}

function toggleSearch() {
  if (window.portfolioManager) {
    window.portfolioManager.toggleSearch()
  }
}

function toggleBookmarks() {
  if (window.portfolioManager) {
    window.portfolioManager.toggleBookmarks()
  }
}

function downloadResume() {
  if (window.portfolioManager) {
    window.portfolioManager.downloadResume()
  }
}

function navigateTo(url) {
  if (window.portfolioManager) {
    window.portfolioManager.navigateTo(url)
  } else {
    window.open(url, "_blank")
  }
}

function scrollToTop() {
  if (window.portfolioManager) {
    window.portfolioManager.scrollToTop()
  }
}

function handleContactForm(event) {
  if (window.portfolioManager) {
    window.portfolioManager.handleContactForm(event)
  }
}

// Smooth scrolling polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const smoothScrollPolyfill = () => {
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()

        const target = document.querySelector(link.getAttribute("href"))
        if (target) {
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = target.offsetTop - headerHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  }

  smoothScrollPolyfill()
}

// Performance optimization: Lazy load images
const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[loading="lazy"]')

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src || img.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages)
