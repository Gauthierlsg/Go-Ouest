// Countdown vers le début du tournoi GO OUEST 2026
// Date cible : 25 avril 2026 à 10h00

const EVENT_DATE = new Date('2026-04-25T10:00:00');

export function initCountdown() {
  const section = document.getElementById('countdown-banner');
  if (!section) return null;

  const daysEl    = section.querySelector('[data-cd="days"]');
  const hoursEl   = section.querySelector('[data-cd="hours"]');
  const minutesEl = section.querySelector('[data-cd="minutes"]');
  const secondsEl = section.querySelector('[data-cd="seconds"]');
  const labelEl   = section.querySelector('.cd-label');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  let intervalId = null;

  function tick() {
    const now  = Date.now();
    const diff = EVENT_DATE.getTime() - now;

    // Tournoi commencé → on retire la bannière et arrête l'intervalle
    if (diff <= 0) {
      cleanup();
      section.remove();
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days    = Math.floor(totalSeconds / 86400);
    const hours   = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent    = days;
    hoursEl.textContent   = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);

    // Singulier / pluriel pour le label
    if (labelEl) {
      labelEl.textContent = days === 1 ? 'jour avant le tournoi 🎾' : 'jours avant le tournoi 🎾';
    }
  }

  function cleanup() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  tick();
  intervalId = setInterval(tick, 1000);

  return cleanup;
}
