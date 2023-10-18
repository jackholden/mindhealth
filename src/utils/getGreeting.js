/**
 * @file Greeting based on time of day
 * @author Jack Holden
 */
/**
 * Returns different greeting depending on time of day
 *
 * @param {*} append  - Optional ending character
 * @returns
 */
export function getGreeting(append = "") {
  /**
   * Based on device data, get the hours
   */
  const currentHour = new Date().getHours();

  let ending = !append ? "!" : append; // Default ending
  let timeGreeting = "Good Evening" + ending; // Default greeting

  /**
   * Return different greeting between specified times
   * e.g. 5am and 11:59am - Good Morning
   */
  if (currentHour >= 5 && currentHour < 12) {
    timeGreeting = "Good Morning" + ending;
  } else if (currentHour >= 12 && currentHour < 18) {
    timeGreeting = "Good Afternoon" + ending;
  }

  return timeGreeting;
}
