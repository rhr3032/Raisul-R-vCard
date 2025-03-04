document.addEventListener("DOMContentLoaded", () => {
    // Card entrance animation
    const card = document.querySelector(".card")
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
  
    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, 100)
  
    // Staggered content animation
    const animateElements = [
      document.querySelector(".profile-info"),
      document.querySelector(".tabs"),
      document.querySelector(".tab-content"),
      document.querySelector(".card-footer"),
    ]
  
    animateElements.forEach((element, index) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(15px)"
      element.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out"
  
      setTimeout(
        () => {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        },
        200 + index * 150,
      )
    })
  
    // Tab switching with animations
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabPanes = document.querySelectorAll(".tab-pane")
  
    function animateTabTransition(oldTab, newTab) {
      // Fade out current tab
      oldTab.style.opacity = "1"
      oldTab.style.transition = "opacity 0.3s ease-out"
      oldTab.style.opacity = "0"
  
      setTimeout(() => {
        oldTab.style.display = "none"
  
        // Prepare new tab for animation
        newTab.style.display = "block"
        newTab.style.opacity = "0"
        newTab.style.transform = "translateX(10px)"
        newTab.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out"
  
        // Trigger animation after a small delay
        setTimeout(() => {
          newTab.style.opacity = "1"
          newTab.style.transform = "translateX(0)"
        }, 50)
      }, 300)
    }
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // If already active, do nothing
        if (button.classList.contains("active")) return
  
        // Get current active tab
        const currentActiveTab = document.querySelector(".tab-pane.active")
  
        // Remove active class from all buttons
        tabButtons.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        button.classList.add("active")
  
        // Get target tab and animate transition
        const tabId = button.getAttribute("data-tab")
        const targetTab = document.getElementById(tabId)
  
        // Animate tab indicator
        animateTabIndicator(button)
  
        // Animate tab content transition
        animateTabTransition(currentActiveTab, targetTab)
  
        // Update active class after animation
        setTimeout(() => {
          tabPanes.forEach((pane) => pane.classList.remove("active"))
          targetTab.classList.add("active")
        }, 300)
      })
    })
  
    // Animate tab indicator
    function animateTabIndicator(activeButton) {
      // Remove existing indicator
      const existingIndicator = document.querySelector(".tab-indicator")
      if (existingIndicator) {
        existingIndicator.remove()
      }
  
      // Create and position new indicator
      const indicator = document.createElement("span")
      indicator.classList.add("tab-indicator")
      indicator.style.position = "absolute"
      indicator.style.bottom = "0"
      indicator.style.height = "2px"
      indicator.style.backgroundColor = "#7c3aed"
      indicator.style.transition = "all 0.3s ease-in-out"
  
      // Add to DOM
      activeButton.style.position = "relative"
      activeButton.appendChild(indicator)
  
      // Animate width and position
      setTimeout(() => {
        indicator.style.width = "100%"
        indicator.style.left = "0"
      }, 10)
    }
  
    // Initialize tab indicator for default active tab
    animateTabIndicator(document.querySelector(".tab-btn.active"))
  
    // Animate skill bars when skills tab becomes visible
    function animateSkillBars() {
      const skillBars = document.querySelectorAll(".skill-progress-bar")
      const percentages = document.querySelectorAll(".skill-percentage")
  
      skillBars.forEach((bar, index) => {
        const width = bar.style.width
        bar.style.width = "0"
  
        setTimeout(
          () => {
            bar.style.transition = "width 1s ease-out"
            bar.style.width = width
  
            // Animate percentage counter
            const targetPercentage = Number.parseInt(percentages[index].textContent)
            animateCounter(percentages[index], 0, targetPercentage, 1000)
          },
          300 + index * 150,
        )
      })
    }
  
    // Counter animation for percentages
    function animateCounter(element, start, end, duration) {
      let startTimestamp = null
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        const currentCount = Math.floor(progress * (end - start) + start)
        element.textContent = `${currentCount}%`
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
  
    // Trigger skill bar animation when skills tab is clicked
    document.querySelector('[data-tab="skills"]').addEventListener("click", animateSkillBars)
  
    // Portfolio item hover animations
    const portfolioItems = document.querySelectorAll(".portfolio-item")
  
    portfolioItems.forEach((item) => {
      const overlay = item.querySelector(".portfolio-overlay")
      const image = item.querySelector("img")
  
      item.addEventListener("mouseenter", () => {
        // Animate overlay
        overlay.style.opacity = "0"
        overlay.style.transform = "translateY(10px)"
        overlay.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out"
  
        setTimeout(() => {
          overlay.style.opacity = "1"
          overlay.style.transform = "translateY(0)"
        }, 50)
  
        // Animate image
        image.style.transition = "transform 0.5s ease-out"
        image.style.transform = "scale(1.05)"
      })
  
      item.addEventListener("mouseleave", () => {
        overlay.style.opacity = "0"
        image.style.transform = "scale(1)"
      })
    })
  
    // Animate activity timeline items
    function animateActivityTimeline() {
      const activityItems = document.querySelectorAll(".activity-item")
  
      activityItems.forEach((item, index) => {
        item.style.opacity = "0"
        item.style.transform = "translateX(-10px)"
        item.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out"
  
        setTimeout(
          () => {
            item.style.opacity = "1"
            item.style.transform = "translateX(0)"
          },
          200 + index * 150,
        )
      })
    }
  
    // Trigger activity timeline animation when activity tab is clicked
    document.querySelector('[data-tab="activity"]').addEventListener("click", animateActivityTimeline)
  
    // Button hover animations
    const primaryButton = document.querySelector(".btn-primary")
  
    primaryButton.addEventListener("mouseenter", () => {
      primaryButton.style.transition = "transform 0.2s ease-out, box-shadow 0.2s ease-out"
      primaryButton.style.transform = "translateY(-2px)"
      primaryButton.style.boxShadow = "0 4px 12px rgba(124, 58, 237, 0.3)"
    })
  
    primaryButton.addEventListener("mouseleave", () => {
      primaryButton.style.transform = "translateY(0)"
      primaryButton.style.boxShadow = "none"
    })
  
    // Add pulse animation to the avatar
    const avatar = document.querySelector(".avatar")
  
    function pulseAvatar() {
      avatar.style.transition = "transform 0.5s ease-out, box-shadow 0.5s ease-out"
      avatar.style.transform = "scale(1.05)"
      avatar.style.boxShadow = "0 0 0 4px rgba(124, 58, 237, 0.2)"
  
      setTimeout(() => {
        avatar.style.transform = "scale(1)"
        avatar.style.boxShadow = "none"
      }, 500)
    }
  
    // Pulse avatar every 5 seconds
    setInterval(pulseAvatar, 5000)
  
    // Add fallback for avatar if image fails to load
    const avatarImg = document.querySelector(".avatar img")
    const avatarFallback = document.querySelector(".avatar-fallback")
  
    avatarImg.addEventListener("error", () => {
      avatarImg.style.display = "none"
      avatarFallback.style.display = "flex"
    })
  
    // Create and animate notification badge
    function createNotificationBadge() {
      const badge = document.createElement("span")
      badge.classList.add("notification-badge")
      badge.textContent = "1"
      badge.style.position = "absolute"
      badge.style.top = "-5px"
      badge.style.right = "-5px"
      badge.style.backgroundColor = "#e11d48"
      badge.style.color = "white"
      badge.style.fontSize = "10px"
      badge.style.fontWeight = "bold"
      badge.style.width = "16px"
      badge.style.height = "16px"
      badge.style.borderRadius = "50%"
      badge.style.display = "flex"
      badge.style.alignItems = "center"
      badge.style.justifyContent = "center"
      badge.style.opacity = "0"
      badge.style.transform = "scale(0)"
      badge.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out"
  
      const messageBtn = document.querySelector(".btn-icon")
      messageBtn.style.position = "relative"
      messageBtn.appendChild(badge)
  
      setTimeout(() => {
        badge.style.opacity = "1"
        badge.style.transform = "scale(1)"
      }, 2000)
  
      // Add pulse animation to notification badge
      setInterval(() => {
        badge.style.transform = "scale(1.2)"
        setTimeout(() => {
          badge.style.transform = "scale(1)"
        }, 300)
      }, 3000)
    }
  
    createNotificationBadge()
  
    // Dark mode toggle with animation
    const createDarkModeToggle = () => {
      const toggle = document.createElement("button")
      toggle.classList.add("dark-mode-toggle")
      toggle.innerHTML = '<i class="fas fa-moon"></i>'
      toggle.style.position = "fixed"
      toggle.style.bottom = "20px"
      toggle.style.right = "20px"
      toggle.style.width = "40px"
      toggle.style.height = "40px"
      toggle.style.borderRadius = "50%"
      toggle.style.backgroundColor = "#1f2937"
      toggle.style.color = "#ffffff"
      toggle.style.border = "none"
      toggle.style.display = "flex"
      toggle.style.alignItems = "center"
      toggle.style.justifyContent = "center"
      toggle.style.cursor = "pointer"
      toggle.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
      toggle.style.zIndex = "100"
      toggle.style.opacity = "0"
      toggle.style.transform = "scale(0)"
      toggle.style.transition = "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
  
      document.body.appendChild(toggle)
  
      // Animate toggle entrance
      setTimeout(() => {
        toggle.style.opacity = "1"
        toggle.style.transform = "scale(1)"
      }, 1000)
  
      // Check for user preference
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDarkMode) {
        document.documentElement.classList.add("dark-mode")
        toggle.innerHTML = '<i class="fas fa-sun"></i>'
      }
  
      toggle.addEventListener("click", () => {
        // Animate toggle button
        toggle.style.transform = "scale(0.8)"
        setTimeout(() => {
          toggle.style.transform = "scale(1)"
        }, 200)
  
        // Toggle dark mode with transition
        document.body.style.transition = "background-color 0.5s ease"
        document.documentElement.classList.toggle("dark-mode")
  
        // Update icon with animation
        if (document.documentElement.classList.contains("dark-mode")) {
          toggle.innerHTML = '<i class="fas fa-sun"></i>'
        } else {
          toggle.innerHTML = '<i class="fas fa-moon"></i>'
        }
      })
    }
  
    createDarkModeToggle()
  
    // Add typing animation to the profile name
    function typeWriterEffect(element, text, speed) {
      let i = 0
      element.textContent = ""
  
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i)
          i++
          setTimeout(type, speed)
        }
      }
  
      setTimeout(() => {
        type()
      }, 1000)
    }
  
    const profileName = document.querySelector(".profile-name")
    const originalText = profileName.textContent
    typeWriterEffect(profileName, originalText, 100)
  })
  
  