document.addEventListener('DOMContentLoaded', function() {
	// Particles Background
	const canvas = document.getElementById('particles-canvas');
	const ctx = canvas.getContext('2d');
	let particles = [];

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	function createParticles() {
		particles = [];
		const count = Math.floor((window.innerWidth * window.innerHeight) / 15000);

		for (let i = 0; i < count; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				size: Math.random() * 2 + 0.5,
				speedX: (Math.random() - 0.5) * 0.5,
				speedY: (Math.random() - 0.5) * 0.5,
				color: `rgba(123, 97, 255, ${Math.random() * 0.5 + 0.1})`
			});
		}
	}

	function drawParticles() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < particles.length; i++) {
			const p = particles[i];

			// Draw particle
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
			ctx.fillStyle = p.color;
			ctx.fill();

			// Update position
			p.x += p.speedX;
			p.y += p.speedY;

			// Boundary check
			if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
			if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

			// Draw connections
			for (let j = i + 1; j < particles.length; j++) {
				const p2 = particles[j];
				const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);

				if (distance < 100) {
					ctx.beginPath();
					ctx.strokeStyle = `rgba(123, 97, 255, ${0.2 * (1 - distance / 100)})`;
					ctx.lineWidth = 0.5;
					ctx.moveTo(p.x, p.y);
					ctx.lineTo(p2.x, p2.y);
					ctx.stroke();
				}
			}
		}

		requestAnimationFrame(drawParticles);
	}

	// Initialize particles
	resizeCanvas();
	createParticles();
	drawParticles();

	window.addEventListener('resize', function() {
		resizeCanvas();
		createParticles();
	});

	// Scroll effects
	const header = document.querySelector('.dakuta-header');
	const fadeElements = document.querySelectorAll('.fade-in');

	window.addEventListener('scroll', function() {
		// Header background on scroll
		if (window.scrollY > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}

		// Fade in elements on scroll
		fadeElements.forEach(element => {
			const elementTop = element.getBoundingClientRect().top;
			const elementVisible = 150;

			if (elementTop < window.innerHeight - elementVisible) {
				element.classList.add('visible');
			}
		});
	});

	// Trigger initial check for elements in view
	window.dispatchEvent(new Event('scroll'));

	// Modal functionality
	const modal = document.getElementById('dakuta-modal');
	const openBtns = document.querySelectorAll('#open-contact, #hero-order');
	const closeBtn = document.getElementById('modal-close');
	const cancelBtn = document.getElementById('modal-cancel');

	function openModal() {
		modal.style.display = 'flex';
		document.body.style.overflow = 'hidden';

		// Focus first input
		const firstInput = modal.querySelector('input');
		if (firstInput) firstInput.focus();
	}

	function closeModal() {
		modal.style.display = 'none';
		document.body.style.overflow = 'auto';
	}

	openBtns.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	closeBtn.addEventListener('click', closeModal);
	cancelBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', function(e) {
		if (e.target === modal) closeModal();
	});

	// SVG ring animation
	const ring = document.getElementById('ring-path');
	if (ring) {
		const len = ring.getTotalLength();
		ring.style.strokeDasharray = len;
		ring.style.strokeDashoffset = len;

		const brandInner = document.querySelector('.brand-inner');

		brandInner.addEventListener('mouseenter', function() {
			ring.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.2, 0.9, 0.3, 1)';
			ring.style.strokeDashoffset = '0';
		});

		brandInner.addEventListener('mouseleave', function() {
			ring.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.2, 0.9, 0.3, 1)';
			ring.style.strokeDashoffset = len;
		});
	}

	// Parallax effect for device card
	const deviceCard = document.querySelector('.device-card img');
	const heroSection = document.querySelector('.hero');

	if (deviceCard && heroSection) {
		heroSection.addEventListener('mousemove', function(e) {
			const { left, top, width, height } = heroSection.getBoundingClientRect();
			const x = (e.clientX - left) / width - 0.5;
			const y = (e.clientY - top) / height - 0.5;

			deviceCard.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(1.05)`;
		});

		heroSection.addEventListener('mouseleave', function() {
			deviceCard.style.transform = 'translateY(0) scale(1)';
		});
	}
});