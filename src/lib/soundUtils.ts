// Sound utility functions for Windows XP audio effects

export const playStartupSound = () => {
  try {
    const audio = new Audio('/src/assets/audio/windows-xp-startup.mp3');
    audio.volume = 0.7;
    audio.play().catch(console.error);
  } catch (error) {
    console.error('Failed to play startup sound:', error);
  }
};

export const playStartupSoundWithCallback = (callback: () => void) => {
  try {
    const audio = new Audio('/src/assets/audio/windows-xp-startup.mp3');
    audio.volume = 0.7;

    // Set up event listeners
    audio.addEventListener('ended', callback);
    audio.addEventListener('error', e => {
      console.error('Startup sound error:', e);
      // Fallback: trigger callback after estimated duration if audio fails
      setTimeout(callback, 3000);
    });

    audio.play().catch(error => {
      console.error('Failed to play startup sound:', error);
      // Fallback: trigger callback after estimated duration
      setTimeout(callback, 3000);
    });
  } catch (error) {
    console.error('Failed to play startup sound:', error);
    // Fallback: trigger callback after estimated duration
    setTimeout(callback, 3000);
  }
};

export const playBalloonSound = () => {
  try {
    const audio = new Audio('/src/assets/audio/windows-xp-balloon.wav');
    audio.volume = 0.5;
    audio.play().catch(console.error);
  } catch (error) {
    console.error('Failed to play balloon sound:', error);
  }
};

export const playLogoffSound = () => {
  try {
    const audio = new Audio('/src/assets/audio/windows-xp-logoff.wav');
    audio.volume = 0.6;
    audio.play().catch(console.error);
  } catch (error) {
    console.error('Failed to play logoff sound:', error);
  }
};
