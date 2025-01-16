export default function validateEmail(email) {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regexEmail.test(email)) {
    return "Format Inválid";
  }

  const domain = email.split("@")[1];
  if (!domain || domain.split(".").some((part) => part.length < 2)) {
    return "This email must contain '@' to be valid!";
  }

  return true;
}
