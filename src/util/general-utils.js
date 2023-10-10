/**
 * Utility fu ction to enforce a delay before executing next line of code
 * @param {*} ms 
 * @returns 
 */

export const delay = (ms) => new Promise(res => setTimeout(res, ms));