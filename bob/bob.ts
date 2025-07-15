export function hey(message: string): string {
  /* Given a message, return Bob's response */

  const lastCharacter = message.trimEnd().slice(-1)
  const isEmpty = !message.trim()
  const isUpperCase = !/[a-z]/.test(message) && /[A-Z]/.test(message)

  if (isUpperCase && lastCharacter === '?') { return "Calm down, I know what I'm doing!" }
  if (isUpperCase) { return 'Whoa, chill out!' }
  if (!isUpperCase && lastCharacter === '?') { return 'Sure.' }
  if (isEmpty) { return 'Fine. Be that way!' }
  else { return 'Whatever.' }
}
