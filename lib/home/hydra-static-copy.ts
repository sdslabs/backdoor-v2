/** Hardcoded public copy (backend strings are not formatted for this UI). */

export const HYDRA_ABOUT_PARAGRAPHS = [
  'Hydra is a specialized competition platform built to test your mastery of Linux internals and real-time system stabilization. Unlike standard security-focused events, Hydra places you directly into the heat of complex, failing infrastructure environments where you must navigate, debug, and restore functionality under pressure.',
  'Upon spawning an instance, each participant receives a unique server via SSH. Your objective is to diagnose the root cause of service failures, resource leaks, or infinite loops and restore the system to satisfy an automated, on-box checker. With a focus on small-stack operations and dynamic debugging, you won\'t know the exact nature of the failure until you log in, making every challenge a race against the clock to "make it work again".',
] as const;

export const HYDRA_PRIZES_INTRO =
  'The competition features a live leaderboard to track both individual and Bhawan performance. Rewards are structured as follows:';

export const HYDRA_PRIZE_BULLETS = [
  {
    title: 'Freshers Track',
    body: 'The top 3 participants from the first-year batch will receive a fast-track invitation for an interview with SDSLabs.',
  },
  {
    title: 'Top 3 Bhawans',
    body: 'Recognition for the top three bhawans will be determined based on the highest scorer from each.',
  },
  {
    title: 'Scoring Mechanics',
    body: 'Points are awarded through Dynamic Decay, meaning challenges are worth more if solved early.',
  },
  {
    title: 'Tie-Breakers',
    body: 'In the event of equal scores, the higher rank is awarded to the participant who reached their final score earliest.',
  },
] as const;
