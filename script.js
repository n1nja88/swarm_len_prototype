// Modal functions
function openModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        contact: document.getElementById('contact').value,
        type: document.getElementById('type').value,
        description: document.getElementById('description').value
    };
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);
    
    // Show success message (you can customize this)
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    
    // Reset form and close modal
    document.getElementById('applicationForm').reset();
    closeModal();
}

// Smooth scroll animation on load
window.addEventListener('load', function() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Open chat function
function openChat(modelName) {
    // Here you would typically redirect to chat or open chat interface
    console.log('Opening chat for:', modelName);
    alert(`Открытие чата с моделью: ${modelName}`);
    // You can replace this with actual chat functionality
}

// Toggle more models visibility
function toggleMoreModels() {
    const hiddenRows = document.querySelectorAll('.model-row-hidden');
    const moreButton = document.querySelector('.more-button');
    let allVisible = true;
    
    hiddenRows.forEach(row => {
        if (!row.classList.contains('show')) {
            allVisible = false;
        }
    });
    
    if (allVisible) {
        // Hide all
        hiddenRows.forEach(row => {
            row.classList.remove('show');
        });
        moreButton.classList.remove('expanded');
    } else {
        // Show all
        hiddenRows.forEach(row => {
            row.classList.add('show');
        });
        moreButton.classList.add('expanded');
    }
}


