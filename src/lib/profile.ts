export const CONTACT_EMAIL = 'tiwariprasoon173@gmail.com';
export const CONTACT_PHONE_DISPLAY = '+91 9555907140';
export const CONTACT_PHONE_HREF = 'tel:+919555907140';
export const CONTACT_LOCATION = 'Jhansi, Uttar Pradesh, India';

export const PROFILE_LINKS = {
  linkedin: 'https://www.linkedin.com/in/prasoon-tiwari-20a99b329/',
  github: 'https://github.com/Prasoontiwari7',
  leetcode: 'https://leetcode.com/u/GNjgoKchC9/',
} as const;

export const RESUME_MODAL_EVENT = 'prasoon:open-resume-modal';

export function openResumeModal() {
  window.dispatchEvent(new Event(RESUME_MODAL_EVENT));
}
