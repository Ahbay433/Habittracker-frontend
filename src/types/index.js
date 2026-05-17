// User type
/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */

// Habit type
/**
 * @typedef {Object} Habit
 * @property {string} _id
 * @property {string} userId
 * @property {string} name
 * @property {'health'|'learning'|'productivity'|'mindfulness'|'creative'|'social'} category
 * @property {'daily'|'weekdays'|'weekends'} frequency
 * @property {string} createdAt
 */

// Completion type
/**
 * @typedef {Object} Completion
 * @property {string} _id
 * @property {string} habitId
 * @property {string} userId
 * @property {string} date - YYYY-MM-DD format
 */

// Auth response type
/**
 * @typedef {Object} AuthResponse
 * @property {string} token
 * @property {User} user
 */

// Habits response type
/**
 * @typedef {Object} HabitsResponse
 * @property {Habit[]} habits
 * @property {Completion[]} completions
 */