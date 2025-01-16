function measurePasswordComplexity(password) {
  if (!password) {
    return "Password Strength";
  }

  let score = 0;

  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[\W_]/.test(password)) score++;

  if (score <= 1 || password.length < 6) {
    return "Weak Password";
  } else if (score === 2 || password.length < 8) {
    return "Medium Password";
  } else if (score > 2 || password.length > 10) {
    return "Strong Password";
  }

  return "Password Strength";
}

function validatePassword(password, newPassword = false) {
  if (newPassword) {
    const complexity = measurePasswordComplexity(password);
    if (complexity === "Weak Password") {
      return "Weak password, for the security of your account, improve it!";
    }
    if (complexity === "Medium Password") {
      return "Medium strength password. Consider making it stronger.";
    }
    return true;
  } else {
    if (!password) {
      return "Password cannot be empty!";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    return true;
  }
}

export { measurePasswordComplexity, validatePassword };
