export const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'); 

export const validUsername = new RegExp('^[a-zA-Z0-9_.-]*$');

export const validPassword = new RegExp('^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$');