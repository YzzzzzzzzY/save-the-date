// Update after creating the RSVP Google Form (see README.md).
const RSVP_FORM_CONFIG = {
    action: 'https://docs.google.com/forms/d/e/REPLACE_WITH_FORM_ID/formResponse',
    fields: {
        yourName: 'entry.REPLACE_YOUR_NAME',
        partnerName: 'entry.REPLACE_PARTNER_NAME',
        attending: 'entry.REPLACE_ATTENDING',
        guestCount: 'entry.REPLACE_GUEST_COUNT',
        notes: 'entry.REPLACE_NOTES'
    },
    fbzx: 'REPLACE_FBZX',
    partialResponse: '[null,null,"REPLACE_FBZX"]'
};

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToForm() {
    scrollToSection('form-section');
}

function bindGoogleFormFields(form) {
    const { action, fields, fbzx, partialResponse } = RSVP_FORM_CONFIG;

    form.action = action;
    document.getElementById('yourName').name = fields.yourName;
    document.getElementById('partnerName').name = fields.partnerName;

    form.querySelectorAll('input[name="attending"]').forEach((radio) => {
        radio.name = fields.attending;
    });

    document.getElementById('guestCount').name = fields.guestCount;
    document.getElementById('notes').name = fields.notes;

    let fbzxInput = form.querySelector('input[name="fbzx"]');
    if (!fbzxInput) {
        fbzxInput = document.createElement('input');
        fbzxInput.type = 'hidden';
        fbzxInput.name = 'fbzx';
        form.appendChild(fbzxInput);
    }
    fbzxInput.value = fbzx;

    let partialInput = form.querySelector('input[name="partialResponse"]');
    if (!partialInput) {
        partialInput = document.createElement('input');
        partialInput.type = 'hidden';
        partialInput.name = 'partialResponse';
        form.appendChild(partialInput);
    }
    partialInput.value = partialResponse;
}

function isAttendingYes(form) {
    const attendingField = form.querySelector('input[type="radio"]:checked');
    return attendingField && attendingField.value.startsWith('Yes');
}

function updateGuestCountVisibility(form, guestCountGroup) {
    guestCountGroup.style.display = isAttendingYes(form) ? 'block' : 'none';
}

function syncGuestCountFromPartner(partnerInput, guestCountInput, form) {
    if (!isAttendingYes(form)) {
        return;
    }

    const partnerName = partnerInput.value.trim();
    const currentCount = Number(guestCountInput.value);

    if (partnerName && currentCount < 2) {
        guestCountInput.value = '2';
    } else if (!partnerName && currentCount === 2) {
        guestCountInput.value = '1';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvpForm');
    const successMessage = document.getElementById('successMessage');
    const guestCountGroup = document.getElementById('guestCountGroup');
    const guestCountInput = document.getElementById('guestCount');
    const partnerInput = document.getElementById('partnerName');
    const attendingRadios = form.querySelectorAll('input[name="attending"]');

    bindGoogleFormFields(form);
    updateGuestCountVisibility(form, guestCountGroup);

    partnerInput.addEventListener('input', () => {
        syncGuestCountFromPartner(partnerInput, guestCountInput, form);
    });

    attendingRadios.forEach((radio) => {
        radio.addEventListener('change', () => {
            updateGuestCountVisibility(form, guestCountGroup);
            syncGuestCountFromPartner(partnerInput, guestCountInput, form);
        });
    });

    document.getElementById('decreaseGuest').addEventListener('click', () => {
        guestCountInput.value = Math.max(1, Number(guestCountInput.value) - 1);
    });

    document.getElementById('increaseGuest').addEventListener('click', () => {
        guestCountInput.value = Math.min(10, Number(guestCountInput.value) + 1);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.detail-card, .rsvp-intro, .form-section').forEach((section) => {
        observer.observe(section);
    });

    const scrollButton = document.querySelector('.scroll-button');
    if (scrollButton) {
        scrollButton.addEventListener('mouseenter', () => {
            scrollButton.style.transform = 'translateY(-3px) scale(1.02)';
        });
        scrollButton.addEventListener('mouseleave', () => {
            scrollButton.style.transform = 'translateY(0) scale(1)';
        });
    }

    form.addEventListener('submit', function() {
        if (!isAttendingYes(form)) {
            guestCountInput.value = '0';
        }

        const btnText = form.querySelector('.btn-text');
        const btnLoading = form.querySelector('.btn-loading');

        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';

        setTimeout(() => {
            form.style.display = 'none';
            successMessage.style.display = 'block';
        }, 1500);
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translate3d(0, ${scrolled * -0.5}px, 0)`;
        }
    });
});
