document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.getElementById('main-nav');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
    
    // Slider functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length > 0) {
        // Initialize first slide
        showSlide(0);
        
        // Automatic slideshow
        setInterval(() => {
            slideIndex = (slideIndex + 1) % slides.length;
            showSlide(slideIndex);
        }, 5000);
        
        // Dot controls
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
    }
    
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        slideIndex = index;
    }
    
    // Law categories tabs
    const lawCategories = document.querySelectorAll('.law-category');
    const lawDetails = document.querySelectorAll('.law-detail');
    
    if (lawCategories.length > 0) {
        lawCategories.forEach(category => {
            category.addEventListener('click', () => {
                const targetId = category.getAttribute('data-category');
                
                lawCategories.forEach(cat => {
                    cat.classList.remove('active');
                });
                lawDetails.forEach(detail => {
                    detail.classList.remove('active');
                });
                
                category.classList.add('active');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
    
    // Challan form handling
    const challanForm = document.getElementById('challanForm');
    const challanResults = document.getElementById('challanResults');
    const resultContent = document.getElementById('result-content');
    
    if (challanForm) {
        challanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const plateNumber = document.getElementById('plateNumber').value;
            const ownerName = document.getElementById('ownerName').value;
            
            // Show loading indicator
            resultContent.innerHTML = `<div class="loading"><i class="fas fa-spinner fa-spin"></i> Checking records...</div>`;
            challanResults.classList.remove('hidden');
            
            // Simulate API check (this would be replaced with actual API call)
            setTimeout(() => {
                // Show results (this is dummy data for illustration)
                challanResults.classList.remove('hidden');
                resultContent.innerHTML = `
                    <div class="challan-details">
                        <p><strong>Vehicle:</strong> ${plateNumber}</p>
                        <p><strong>Owner:</strong> ${ownerName}</p>
                        <p><strong>Pending Challans:</strong> 2</p>
                        <table class="challan-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Violation</th>
                                    <th>Location</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Jan 15, 2025</td>
                                    <td>Helmet Violation</td>
                                    <td>City Center</td>
                                    <td>RS 5,000</td>
                                    <td><span class="status unpaid">Unpaid</span></td>
                                </tr>
                                <tr>
                                    <td>Feb 22, 2025</td>
                                    <td></td>
                                    <td>Main Road</td>
                                    <td>Rs 2,000</td>
                                    <td><span class="status unpaid">Unpaid</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="total-section">
                            <p><strong>Total Due:</strong> Rs 7,000</p>
                            <button class="btn primary-btn">Pay Now</button>
                            <button class="btn secondary-btn">Print Challan</button>
                        </div>
                    </div>
                `;
            }, 1000);
        });
    }
    
    // Animate statistics counters
    const statValues = document.querySelectorAll('.stat-value');
    
    function animateCounters() {
        statValues.forEach(statValue => {
            const target = parseInt(statValue.getAttribute('data-count'));
            const span = statValue.querySelector('span');
            const suffix = statValue.textContent.replace(span.textContent, '');
            let current = 0;
            const increment = Math.ceil(target / 50);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    span.textContent = target;
                    clearInterval(timer);
                } else {
                    span.textContent = current;
                }
            }, 30);
        });
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animate counters when statistics section comes into view
    let counterAnimated = false;
    window.addEventListener('scroll', () => {
        if (!counterAnimated && statValues.length > 0) {
            const statsSection = document.getElementById('statistics');
            if (isInViewport(statsSection)) {
                animateCounters();
                counterAnimated = true;
            }
        }
    });
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real implementation, you would send this data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            const formContainer = contactForm.parentElement;
            formContainer.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us, ${name}. We will get back to you within 24 hours.</p>
                </div>
            `;
        });
    }
    
    // Handle newsletter subscription
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real implementation, you would send this to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            const formContainer = newsletterForm.parentElement;
            const originalContent = formContainer.innerHTML;
            formContainer.innerHTML = `
                <h3>Thank You!</h3>
                <p>You have been successfully subscribed to our newsletter.</p>
            `;
            
            // Restore the form after 3 seconds
            setTimeout(() => {
                formContainer.innerHTML = originalContent;
                const restoredForm = formContainer.querySelector('form');
                restoredForm.addEventListener('submit', arguments.callee);
            }, 3000);
        });
    }
    
    // Initialize current slide function for slider dots
    window.currentSlide = function(n) {
        showSlide(n - 1);
    };
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
});