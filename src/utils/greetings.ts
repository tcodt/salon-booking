type Username = {
  username: string;
};

export function getGreeting(username: Username): string {
  const hours = new Date().getHours();
  const greetings = [
    "صبح بخیر", // Morning
    "ظهر بخیر", // Noon
    "عصر بخیر", // Evening
    "شب بخیر", // Night
  ];
  let greeting = "";

  if (hours >= 5 && hours < 12) {
    greeting = greetings[0];
  } else if (hours >= 12 && hours < 17) {
    greeting = greetings[1];
  } else if (hours >= 17 && hours < 21) {
    greeting = greetings[2];
  } else {
    greeting = greetings[3];
  }

  return `${greeting} ${username || "کاربر"} 👋`;
}
