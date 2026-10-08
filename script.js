const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const dialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#dialog-content');
const dialogClose = document.querySelector('.dialog-close');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const projectDetails = {
  cloud: {
    eyebrow: 'Cloud engineering / deployed project',
    title: 'Cloud-Native Order API',
    text: 'A production-minded order service designed to remain correct when networks fail, requests are retried, or a response is lost after a successful database commit.',
    points: [
      'Implemented idempotency keys and request fingerprints to prevent duplicate orders and double charges.',
      'Containerized the service and deployed it across AWS EC2 and ECS/Fargate with PostgreSQL on RDS.',
      'Added health checks, an Application Load Balancer, CloudWatch logging, and failure-recovery demonstrations.',
    ],
  },
  ems: {
    eyebrow: 'Backend systems / private project',
    title: 'Expenses Management System',
    text: 'A backend-focused expense platform built around reliable APIs, useful reporting, and a data model ready to scale with larger transaction volumes.',
    points: [
      'Designed RESTful APIs for expense tracking, reporting, analytics, and cost-trend comparisons.',
      'Built a MongoDB and Mongoose data layer with clear separation of concerns.',
      'Added local persistence as an offline fail-safe to improve reliability under poor connectivity.',
    ],
  },
  fall: {
    eyebrow: 'Current research / computer vision',
    title: 'Privacy-Preserving Fall Detection',
    text: 'A modular research system that studies whether a fall can be detected from body movement while reducing dependence on raw appearance and personal identity.',
    points: [
      'Explores pose estimation, person tracking, and short-term pose-history buffers.',
      'Separates the fall detector from privacy rendering so the system can compare different privacy methods.',
      'Investigates structured, privacy-safe event information that can support human-readable alerts.',
    ],
  },
};

document.querySelectorAll('.project-details').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projectDetails[button.dataset.project];
    if (!project || !dialog || !dialogContent) return;
    dialogContent.innerHTML = `
      <p class="dialog-eyebrow">${project.eyebrow}</p>
      <h2>${project.title}</h2>
      <p>${project.text}</p>
      <ul class="dialog-list">${project.points.map((point) => `<li>${point}</li>`).join('')}</ul>
    `;
    dialog.showModal();
  });
});

dialogClose?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.querySelector('#current-year').textContent = new Date().getFullYear();
