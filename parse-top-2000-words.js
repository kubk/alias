/**
 * https://www.talkenglish.com/vocabulary/top-2000-vocabulary.aspx
 *
 * Open this website, then open browser console and paste the script
 */
const clean = (text) => text.replace(/^\s+/, "").replace(/\s+$/, "");

const words = [];

$('tbody td[width="120"]').each((_, el) => {
  const word = clean(el.textContent);
  const frequency = clean(el.nextSibling.nextSibling.textContent);
  const type = clean(
    $(
      el.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
    ).text()
  );

  const isFirstRow = word === "From";
  const isNotGuessableWord = type.includes(`definite article`);

  if (isFirstRow || isNotGuessableWord) {
    return;
  }

  words.push(word);
});

// Focus page to get clipboard copy working
setTimeout(() => {
  navigator.clipboard.writeText(JSON.stringify(words));
}, 2000);
