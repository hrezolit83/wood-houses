const SINGLE = {
  а: "a", б: "b", в: "v", г: "h", ґ: "g", д: "d", е: "e", ж: "zh", з: "z",
  и: "y", і: "i", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh",
  щ: "shch", ь: "", "'": "", "’": "", "ʼ": "",
};

const WORD_INITIAL = { є: "ye", ї: "yi", й: "y", ю: "yu", я: "ya" };
const WORD_INNER = { є: "ie", ї: "i", й: "i", ю: "iu", я: "ia" };

const LETTER = /[A-Za-zЀ-ӿ'’ʼ]/;

export function transliterate(input) {
  let out = "";
  let wordStart = true;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];

    if (!LETTER.test(char)) {
      out += char;
      wordStart = true;
      continue;
    }

    const lower = char.toLowerCase();
    const next = (input[i + 1] || "").toLowerCase();
    let mapped;

    if (lower === "з" && next === "г") {
      mapped = "zgh";
      i += 1;
    } else if (wordStart && lower in WORD_INITIAL) {
      mapped = WORD_INITIAL[lower];
    } else if (lower in WORD_INNER) {
      mapped = WORD_INNER[lower];
    } else if (lower in SINGLE) {
      mapped = SINGLE[lower];
    } else {
      out += char;
      wordStart = false;
      continue;
    }

    if (mapped && char !== lower) {
      mapped = mapped[0].toUpperCase() + mapped.slice(1);
    }

    out += mapped;
    wordStart = false;
  }

  return out;
}

export function projectTitleEn(title) {
  const inner = title
    .replace(/^Будинок\s*/i, "")
    .replace(/[«»„“”"]/g, "")
    .replace(/^(\d+)\s*[-–—]\s*/, "$1 ")
    .trim();

  return `House ${transliterate(inner)}`.replace(/\s{2,}/g, " ").trim();
}

export function getProjectTitle(project, locale) {
  if (locale !== "en") return project.title;
  return project.titleEn || projectTitleEn(project.title);
}

export function localizeProjects(projects, locale) {
  return projects.map(({ titleEn, ...project }) => ({
    ...project,
    title: getProjectTitle({ ...project, titleEn }, locale),
  }));
}
