/*
 * Simple Context (v2.0.0-alpha)
 */

/* global info, state, worldInfo, addWorldEntry, updateWorldEntry, removeWorldEntry */


/*
 * START SECTION - Configuration
 *
 * Various configuration that can be set to change the look and feel of the script, along
 * with determining the shortcuts used to control the menus and the placement of injected
 * context blocks.
 *
 * This section is intended to be modified for user preference.
 */

// Control over UI icons and labels
const SC_UI_ICON = {
  // Tracking Labels
  TRACK_MAIN: "✔️ ",
  TRACK_OTHER: "⭕ ",
  TRACK_EXTENDED: "🔗 ",
  TRACK_TITLES: "🏷️ ",

  // Main HUD Labels
  TRACK: " ",
  POV: "🕹️ ",
  SCENE: "🎬 ",
  THINK: "💭 ",
  FOCUS: "🧠 ",

  // Notes Labels
  NOTES: "✒️ ",
  NOTE_TEXT: "📚 ",
  NOTE: "📓 ",
  RATING: "📕 ",
  STYLE: "📙 ",
  GENRE: "📒 ",
  SETTING: "📗 ",
  THEME: "📘 ",
  SUBJECT: "📔 ",

  // Entry Labels
  LABEL: "🔖 ",
  KEYS: "🔍 ",
  MAIN: "📑 ",
  SEEN: "👁️ ",
  HEARD: "🔉 ",
  TOPIC: "💬 ",

  // Relationship Labels
  NOUN: "🤔 ",
  AREAS: "📌 ",
  THINGS: "📦",
  COMPONENTS: "⚙️ ",
  CONTACTS: "👋 ",
  PARENTS: "🧬 ",
  CHILDREN: "🧸 ",
  PROPERTY: "💰 ",
  OWNERS: "🙏 ",

  // Title Labels
  TITLE: "🏷️ ",
  MATCH: "🔍 ",
  SCOPE: "🧑‍🤝‍🧑 ",
  CATEGORY: "🎭👑🗺️📦💡 ",
  RELATABLE: "🎭👑 ",
  DISP: "🤬😒😐😀🤩 ",
  TYPE: "🤝💞✊💍🥊 ",
  MOD: "👍👎💥 ",
  PRONOUN: "🎗️➰🔱 ",
  ENTRY: "🔖 ",

  // Injected Icons
  INJECTED_SEEN: "👁️",
  INJECTED_HEARD: "🔉",
  INJECTED_TOPIC: "💬",

  // Relationship Disposition: 1-5
  HATE: "🤬",
  DISLIKE: "😒",
  NEUTRAL: "😐",
  LIKE: "😀",
  LOVE: "🤩",

  // Relationship Modifier: +-x
  MORE: "👍",
  LESS: "👎",
  EX: "💥",

  // Relationship Type: FLAME
  FRIENDS: "🤝",
  LOVERS: "💞",
  ALLIES: "✊",
  MARRIED: "💍",
  ENEMIES: "🥊",

  // Extended Relationships
  SIBLINGS: "(s) ",
  SIBLINGS_CHILDREN: "(sc) ",
  PARENTS_SIBLINGS: "(ps) ",
  GRANDPARENTS: "(gp) ",
  GRANDCHILDREN: "(gc) ",

  // Character Pronoun Icons
  YOU: "🕹️",
  HER: "🎗️",
  HIM: "➰",
  UNKNOWN: "🔱",

  // Entry Category Icons
  CHARACTER: "🎭",
  FACTION: "👑",
  LOCATION: "🗺️",
  THING: "📦",
  OTHER: "💡",

  // Character can have relationships
  // Location has many areas, location has layout to traverse areas, each area is a WI, can have owner, can have faction ownership
  // Faction has many roles, each role is subordinate to a role above, top role is faction leader
  // Thing can have location/area, can have owner, can have faction ownership
  // Other generic entry

  // General Icons
  CONFIRM: "✔️",
  SUCCESS: "🎉",
  INFO: "💡",
  SEARCH: "🔍",
  WARNING: "⚠️",
  ERROR: "💥",
  SEPARATOR: "  ∙∙ ",
  SELECTED: "🔅 ",
  EMPTY: "❔ ",
  BREAK: "〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️"
}

// Control over UI colors
const SC_UI_COLOR = {
  // Tracking UI
  TRACK: "chocolate",
  TRACK_MAIN: "chocolate",
  TRACK_EXTENDED: "dimgrey",
  TRACK_OTHER: "brown",
  TRACK_TITLES: "slategrey",

  // Story UI
  POV: "dimgrey",
  SCENE: "steelblue",
  THINK: "seagreen",
  FOCUS: "indianred",

  // Notes UI
  NOTES: "indianred",
  NOTE_TEXT: "slategrey",
  NOTE: "seagreen",
  RATING: "steelblue",
  STYLE: "steelblue",
  GENRE: "slategrey",
  SETTING: "slategrey",
  THEME: "dimgrey",
  SUBJECT: "dimgrey",

  // Entry UI,
  LABEL: "indianred",
  KEYS: "seagreen",
  MAIN: "steelblue",
  SEEN: "slategrey",
  HEARD: "slategrey",
  TOPIC: "slategrey",

  // Relationship UI
  CONTACTS: "seagreen",
  NOUN: "seagreen",
  COMPONENTS: "steelblue",
  AREAS: "steelblue",
  THINGS: "slategrey",
  CHILDREN: "steelblue",
  PARENTS: "steelblue",
  PROPERTY: "slategrey",
  OWNERS: "slategrey",

  // Title Labels
  TITLE: "indianred",
  MATCH: "seagreen",
  CATEGORY: "steelblue",
  DISP: "steelblue",
  TYPE: "steelblue",
  MOD: "steelblue",
  PRONOUN: "steelblue",
  ENTRY: "steelblue",
  SCOPE: "slategrey"
}

// Control over page titles
const SC_UI_PAGE = {
  NOTES_EDITOR: "Editor's Note ∙∙ Notes",
  NOTES_AUTHOR: "Author's Note ∙∙ Notes",
  ENTRY_INJECTIONS: "Entry",
  ENTRY_RELATIONS: "Relations",
  TITLE_TARGET: "Title ∙∙ Target",
  TITLE_SOURCE: "Title ∙∙ Source"
}

// Shortcut commands used to navigate the entry, family and contacts UI
const SC_SHORTCUT = { PREV: "<", NEXT: ">", PREV_PAGE: "<<", NEXT_PAGE: ">>", EXIT: "!", DELETE: "^", GOTO: "#", HINTS: "?" }


// @todo: convert to /config menu
// Control over UI element visibility and placement (TRACK, NOTES, POV, SCENE, THINK, FOCUS)
const SC_UI_ARRANGEMENT = {
  MAXIMIZED: ["POV/TRACK", "SCENE", "THINK", "FOCUS"],
  MINIMIZED: ["POV/TRACK", "THINK", "FOCUS"],
  HIDDEN: ["TRACK"]
}

// Determines context placement by character count from the front of context (rounds to full sentences)
const SC_CONTEXT_PLACEMENT = { FOCUS: 150, THINK: 500, SCENE: 1000 }

// Determines the maximum amount of relationship context to inject (measured in character length)
const SC_REL_SIZE_LIMIT = 800

// Signpost distancing (measure in characters, rounded to whole sentences)
const SC_SIGNPOST_DISTANCE = 300
const SC_SIGNPOST_INITIAL_DISTANCE = 50

// Minimum distance weight to insert main entry and relationships (measured in percentage from front of context)
const SC_METRIC_DISTANCE_THRESHOLD = 0.6

/*
 * END SECTION - Configuration
 */


/*
 * START SECTION - Hardcoded Settings - DO NOT EDIT THIS SECTION OR YOU WILL BREAK THE SCRIPT!
 *
 * DISPOSITION
 *  1 hate
 *  2 dislike
 *  3 neutral
 *  4 like
 *  5 love
 *
 * MODIFIER
 *  x ex
 *
 * TYPE
 *  F friends/extended family
 *  L lovers
 *  A allies
 *  M married
 *  E enemies
 *
 * [1-5][x][FLAME]
 *
 * eg: Jill [1] Jack [4F], Mary [2xL], John [3A]
 *
 */
const SC_DATA = {
  LABEL: "label", TRIGGER: "trigger", CATEGORY: "category", PRONOUN: "pronoun", NOUN: "noun", MAIN: "main", SEEN: "seen", HEARD: "heard", TOPIC: "topic",
  CONTACTS: "contacts", AREAS: "areas", THINGS: "things", COMPONENTS: "components", CHILDREN: "children", PARENTS: "parents", PROPERTY: "property", OWNERS: "owners"
}
const SC_SCOPE = {
  CONTACTS: SC_DATA.CONTACTS, AREAS: SC_DATA.AREAS, THINGS: SC_DATA.THINGS, COMPONENTS: SC_DATA.COMPONENTS, CHILDREN: SC_DATA.CHILDREN, PARENTS: SC_DATA.PARENTS, PROPERTY: SC_DATA.PROPERTY, OWNERS: SC_DATA.OWNERS,
  SIBLINGS: "siblings", GRANDPARENTS: "grandparents", GRANDCHILDREN: "grandchildren", PARENTS_SIBLINGS: "parents siblings", SIBLINGS_CHILDREN: "siblings children"
}
const SC_SCOPE_OPP = { CONTACTS: SC_SCOPE.CONTACTS, CHILDREN: SC_SCOPE.PARENTS, PARENTS: SC_SCOPE.CHILDREN, PROPERTY: SC_SCOPE.OWNERS, OWNERS: SC_SCOPE.PROPERTY }
const SC_SECTION = { FOCUS: "focus", THINK: "think", SCENE: "scene", POV: "pov", NOTES: "notes" }
const SC_CATEGORY = { CHARACTER: "character", FACTION: "faction", LOCATION: "location", THING: "thing", OTHER: "other" }
const SC_PRONOUN = { YOU: "you", HIM: "him", HER: "her", UNKNOWN: "unknown" }
const SC_RELATABLE = [ SC_CATEGORY.CHARACTER, SC_CATEGORY.FACTION ]

const SC_DISP = { HATE: 1, DISLIKE: 2, NEUTRAL: 3, LIKE: 4, LOVE: 5 }
const SC_TYPE = { FRIENDS: "F", LOVERS: "L", ALLIES: "A", MARRIED: "M", ENEMIES: "E" }
const SC_MOD = { LESS: "-", EX: "x", MORE: "+" }

const SC_ENTRY_ALL_KEYS = [ SC_DATA.MAIN, SC_DATA.SEEN, SC_DATA.HEARD, SC_DATA.TOPIC ]
const SC_ENTRY_CHARACTER_KEYS = [ SC_DATA.MAIN, SC_DATA.SEEN, SC_DATA.HEARD, SC_DATA.TOPIC ]
const SC_ENTRY_FACTION_KEYS = [ SC_DATA.MAIN, SC_DATA.TOPIC ]
const SC_ENTRY_LOCATION_KEYS = [ SC_DATA.MAIN, SC_DATA.SEEN, SC_DATA.TOPIC ]
const SC_ENTRY_THING_KEYS = [ SC_DATA.MAIN, SC_DATA.SEEN, SC_DATA.TOPIC ]
const SC_ENTRY_OTHER_KEYS = [ SC_DATA.MAIN, SC_DATA.SEEN, SC_DATA.HEARD, SC_DATA.TOPIC ]

const SC_REL_ALL_KEYS = [ SC_DATA.CONTACTS, SC_DATA.PARENTS, SC_DATA.CHILDREN, SC_DATA.AREAS, SC_DATA.THINGS, SC_DATA.COMPONENTS, SC_DATA.PROPERTY, SC_DATA.OWNERS ]
const SC_REL_CHARACTER_KEYS = [ SC_DATA.CONTACTS, SC_DATA.PARENTS, SC_DATA.CHILDREN, SC_DATA.PROPERTY, SC_DATA.OWNERS ]
const SC_REL_FACTION_KEYS = [ SC_DATA.CONTACTS, SC_DATA.PROPERTY, SC_DATA.OWNERS ]
const SC_REL_LOCATION_KEYS = [ SC_DATA.NOUN, SC_DATA.AREAS, SC_DATA.THINGS, SC_DATA.OWNERS ]
const SC_REL_THING_KEYS = [ SC_DATA.COMPONENTS, SC_DATA.OWNERS ]
const SC_REL_OTHER_KEYS = [ SC_DATA.OWNERS ]

const SC_TITLE_KEYS = [ "targetCategory", "targetDisp", "targetType", "targetMod", "targetPronoun", "targetEntry", "scope" ]
const SC_TITLE_SOURCE_KEYS = [ "sourceCategory", "sourceDisp", "sourceType", "sourceMod", "sourcePronoun", "sourceEntry" ]

const SC_NOTES_EDITOR_KEYS = [ "editorNote", "editorRating", "editorStyle", "editorGenre", "editorSetting", "editorTheme", "editorSubject" ]
const SC_NOTES_AUTHOR_KEYS = [ "authorNote", "authorRating", "authorStyle", "authorGenre", "authorSetting", "authorTheme", "authorSubject" ]
const SC_NOTES_ALL_KEYS = [ ...SC_NOTES_EDITOR_KEYS, ...SC_NOTES_AUTHOR_KEYS ]

const SC_VALID_SCOPE = Object.values(SC_SCOPE)
const SC_VALID_PRONOUN = Object.values(SC_PRONOUN).filter(p => p !== SC_PRONOUN.YOU)
const SC_VALID_DISP = Object.values(SC_DISP).map(v => `${v}`)
const SC_VALID_TYPE = Object.values(SC_TYPE)
const SC_VALID_MOD = Object.values(SC_MOD)
const SC_VALID_CATEGORY = Object.values(SC_CATEGORY)

const SC_SCOPE_REV = Object.assign({}, ...Object.entries(SC_SCOPE).map(([a,b]) => ({ [`${b}`]: a })))
const SC_DISP_REV = Object.assign({}, ...Object.entries(SC_DISP).map(([a,b]) => ({ [`${b}`]: a })))
const SC_TYPE_REV = Object.assign({}, ...Object.entries(SC_TYPE).map(([a,b]) => ({ [b]: a })))
const SC_MOD_REV = Object.assign({}, ...Object.entries(SC_MOD).map(([a,b]) => ({ [b]: a })))
const SC_FLAG_DEFAULT = `${SC_DISP.NEUTRAL}`

const SC_WI_SYSTEM = "#sc:system"
const SC_WI_JOINS = "#sc:joins"
const SC_WI_REGEX = "#sc:regex"
const SC_WI_NOTES = "#sc:notes"
const SC_WI_ENTRY = "#entry:"
const SC_WI_TITLE = "#title:"

const SC_DEFAULT_TITLES = [{"title":"mother","trigger":"/mother|m[uo]m(m[ya])?/","scope":"parents","target":{"category":"character","pronoun":"her"},"source":{"category":"character"}},{"title":"father","trigger":"/father|dad(dy|die)?|pa(pa)?/","scope":"parents","target":{"category":"character","pronoun":"him"},"source":{"category":"character"}},{"title":"daughter","trigger":"/daughter/","scope":"children","target":{"category":"character","pronoun":"her"},"source":{"category":"character"}},{"title":"son","trigger":"/son/","scope":"children","target":{"category":"character","pronoun":"him"},"source":{"category":"character"}},{"title":"sister","trigger":"/sis(ter)?/","scope":"siblings","target":{"category":"character","pronoun":"her"},"source":{"category":"character"}},{"title":"brother","trigger":"/bro(ther)?/","scope":"siblings","target":{"category":"character","pronoun":"him"},"source":{"category":"character"}},{"title":"niece","trigger":"/niece/","scope":"siblings children","target":{"category":"character","pronoun":"her"},"source":{"category":"character"}},{"title":"nephew","trigger":"/nephew/","scope":"siblings children","target":{"category":"character","pronoun":"him"},"source":{"category":"character"}},{"title":"aunt","trigger":"/aunt/","scope":"parents siblings","target":{"category":"character","pronoun":"her"},"source":{"category":"character"}},{"title":"uncle","trigger":"/uncle/","scope":"parents siblings","target":{"category":"character","pronoun":"him"},"source":{"category":"character"}},{"title":"grandmother","trigger":"/gran(dmother|dma|ny)/","scope":"grandparents","target":{"category":"character","pronoun":"her"},"source":{"category":"character"}},{"title":"grandfather","trigger":"/grand(father|pa|dad)/","scope":"grandparents","target":{"category":"character","pronoun":"him"},"source":{"category":"character"}},{"title":"granddaughter","trigger":"/granddaughter/","scope":"grandchildren","target":{"category":"character","pronoun":"her"},"source":{"category":"character"}},{"title":"grandson","trigger":"/grandson/","scope":"grandchildren","target":{"category":"character","pronoun":"him"},"source":{"category":"character"}},{"title":"wife","trigger":"/wife/","target":{"category":"character","pronoun":"her","type":"M"},"source":{"category":"character"}},{"title":"ex wife","trigger":"/ex wife/","target":{"category":"character","pronoun":"her","type":"M","mod":"x"},"source":{"category":"character"}},{"title":"husband","trigger":"/husband/","target":{"category":"character","pronoun":"him","type":"M"},"source":{"category":"character"}},{"title":"ex husband","trigger":"/ex husband/","target":{"category":"character","pronoun":"him","type":"M","mod":"x"},"source":{"category":"character"}},{"title":"lover","trigger":"/lover/","target":{"category":"character","type":"L","disp":"-5"},"source":{"category":"character"}},{"title":"ex lover","trigger":"/ex lover/","target":{"category":"character","type":"L","disp":"-5","mod":"x"},"source":{"category":"character"}},{"title":"girlfriend","trigger":"/girlfriend/","target":{"category":"character","pronoun":"her","type":"L","disp":5},"source":{"category":"character"}},{"title":"ex girlfriend","trigger":"/ex girlfriend/","target":{"category":"character","pronoun":"her","type":"L","disp":5,"mod":"x"},"source":{"category":"character"}},{"title":"boyfriend","trigger":"/boyfriend/","target":{"category":"character","pronoun":"him","type":"L","disp":5},"source":{"category":"character"}},{"title":"ex boyfriend","trigger":"/ex boyfriend/","target":{"category":"character","pronoun":"him","type":"L","disp":5,"mod":"x"},"source":{"category":"character"}},{"title":"ex friend","trigger":"/ex friend/","target":{"category":"character","type":"F","mod":"x"},"source":{"category":"character"}},{"title":"slave","trigger":"/slave/","scope":"property","target":{"category":"character"},"source":{"category":"character"}},{"title":"master","trigger":"/master/","scope":"owners","target":{"category":"character"},"source":{"category":"character"}},{"title":"member","trigger":"/member/","source":{"category":"character"},"target":{"type":"M","category":"faction"}},{"trigger":"/ally/","title":"ally","source":{"category":"character, faction"},"target":{"type":"A","category":"character, faction"}},{"trigger":"/friend/","title":"friend","source":{"category":"character, faction"},"target":{"type":"F","category":"character, faction"}},{"trigger":"/enemy/","title":"enemy","source":{"category":"character, faction"},"target":{"type":"E","category":"character, faction"}}]
const SC_DEFAULT_JOINS = { CHAR_CHAR: "relation", CHAR_FACTION: "faction", FACTION_FACTION: "relation", FACTION_CHAR: "position", THING_THING: "component", LOCATION_THING: "has", PROPERTY: "property", OWNERS: "owner", LIKE: "like", HATE: "hate" }
const SC_DEFAULT_REGEX = {
  YOU: "you(r|rself)?",
  HER: "she|her(self|s)?",
  HIM: "he|him(self)?|his",
  FEMALE: "♀|female|woman|lady|girl|gal|chick|mum|mom|mother|daughter",
  MALE: "♂|male|man|gentleman|boy|guy|lad|dude|dad|father|son",
  LOOK_AHEAD: "describ|display|examin|expos|eye|frown|gaz|glanc|glar|glimps|imagin|leer|look|notic|observ|ogl|peek|see|smil|spot|star(e|ing)|view|vision|watch",
  LOOK_BEHIND: "appear|body|describ|display|examin|expos|fac|hand|glimps|notic|observ|ogl|seen|spotted|sprawl|view|vision|watch|wear",
  INFLECTED: "(?:ing|ed|ate|es|s|'s|e's)?",
  PLURAL: "(?:es|s|'s|e's)?",
}

const SC_RE = {
  INPUT_CMD: /^> You say "\/(\w+)\s?(.*)?"$|^> You \/(\w+)\s?(.*)?[.]$|^\/(\w+)\s?(.*)?$/,
  WI_REGEX_KEYS: /.?\/((?![*+?])(?:[^\r\n\[\/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*])+)\/((?:g(?:im?|mi?)?|i(?:gm?|mg?)?|m(?:gi?|ig?)?)?)|[^,]+/g,
  BROKEN_ENCLOSURE: /(")([^\w])(")|(')([^\w])(')|(\[)([^\w])(])|(\()([^\w])(\))|({)([^\w])(})|(<)([^\w])(>)/g,
  ENCLOSURE: /([^\w])("[^"]+")([^\w])|([^\w])('[^']+')([^\w])|([^\w])(\[[^]]+])([^\w])|([^\w])(\([^)]+\))([^\w])|([^\w])({[^}]+})([^\w])|([^\w])(<[^<]+>)([^\w])/g,
  SENTENCE: /([^!?.]+[!?.]+[\s]+?)|([^!?.]+[!?.]+$)|([^!?.]+$)/g,
  ESCAPE_REGEX: /[.*+?^${}()|[\]\\]/g,
  DETECT_FORMAT: /^[\[{<]|[\]}>]$/g,
  REL_KEYS: /([^,:]+)(:([1-5][FLAME]?[+\-x]?))|([^,]+)/gi,
  fromArray: (pattern, flags="g") => new RegExp(`${Array.isArray(pattern) ? pattern.join("|") : pattern}`, flags)
}
/*
 * END SECTION - Hardcoded Settings
 */


/*
 * Paragraph Formatter Plugin
 */
class ParagraphFormatterPlugin {
  constructor() {
    if (!state.paragraphFormatterPlugin) state.paragraphFormatterPlugin = {
      isDisabled: false,
      isSceneBreak: false
    }
    this.state = state.paragraphFormatterPlugin
  }

  inputModifier(text) {
    return this.displayModifier(text)
  }

  outputModifier(text) {
    return this.displayModifier(text)
  }

  displayModifier(text) {
    // Don't run if disabled
    if (this.state.isDisabled || !text) return text
    let modifiedText = text

    // Remove ending newline(s)
    modifiedText = modifiedText.replace(/([^\n])\n+$/g, "$1")

    // Replace starting newline
    modifiedText = modifiedText.replace(/^\n+([^\n])/g, "\n\n$1")

    // Find single newlines and replace with double
    modifiedText = modifiedText.replace(/([^\n])\n([^\n])/g, "$1\n\n$2")

    // Find three or more consecutive newlines and reduce
    modifiedText = modifiedText.replace(/[\n]{3,}/g, "\n\n")

    // Detect scene break at end for next input
    if (modifiedText.endsWith("--")) this.state.isSceneBreak = true
    // If scene break and next input, add newlines
    else if (this.state.isSceneBreak) {
      if (!modifiedText.startsWith("\n\n")) modifiedText = "\n\n" + modifiedText
      this.state.isSceneBreak = false
    }
    // Add whitespace to end if not there
    else modifiedText = modifiedText.replace(/(?<=[!?.])$/g, " ")

    return modifiedText
  }
}


/*
 * Simple Context Plugin
 */
class SimpleContextPlugin {
  sceneBreak = "\n\n--\n\n"
  signpost = "<<●>>>>"
  controlCommands = ["enable", "disable", "show", "hide", "min", "max", "spacing", "debug"] // Plugin Controls
  contextCommands = [
    "you", "at", "nearby", // PoV
    "scene", // Scene
    "think", // Think
    "focus" // Focus
  ]
  notesCommands = ["notes"]
  entryCommands = ["entry", "e"]
  relationsCommands = ["rel", "r"]
  findCommands = ["find", "f"]
  titleCommands = ["title"]
  youReplacements = [
    ["you is", "you are"],
    ["you was", "you were"],
    ["you has", "you have"],
    [/(^|[^.][.!?]\s+)you /g, "$1You "]
  ]
  memoryLength
  maxChars

  constructor() {
    // All state variables scoped to state.simpleContextPlugin
    // for compatibility with other plugins
    if (!state.simpleContextPlugin) state.simpleContextPlugin = {
      data: {},
      sections: {},
      you: {},
      context: this.getContextTemplate(),
      creator: {},
      lastMessage: "",
      exitCreator: false,
      isDebug: false,
      isHidden: false,
      isDisabled: false,
      isMinimized: false,
      isSpaced: true,
      showHints: true
    }
    this.state = state.simpleContextPlugin
  }

  initialize() {
    // Create master lists of commands
    this.commands = [...this.controlCommands, ...this.contextCommands]
    this.creatorCommands = [
      ...this.notesCommands,
      ...this.entryCommands,
      ...this.relationsCommands,
      ...this.titleCommands,
      ...this.findCommands
    ]

    // Setup external plugins
    this.paragraphFormatterPlugin = new ParagraphFormatterPlugin()

    // Initialize displayStats if not already done
    if (!state.displayStats) state.displayStats = []

    // Clear messages that are no longer required
    if (this.state.lastMessage && state.message) {
      state.message = state.message.replace(this.state.lastMessage, "")
      this.state.lastMessage = ""
    }

    // Tracking of modified context length to prevent 85% lockout
    this.originalSize = 0
    this.modifiedSize = 0

    // Check exit creator flag and do next turn exiting
    if (this.state.exitCreator) {
      this.menuExit(false)
      this.state.exitCreator = false
    }

    // Cache expanded world info
    this.loadWorldInfo()
  }

  loadWorldInfo() {
    // Various cached copies of world info entries for fast access
    this.worldInfo = {}
    this.entries = {}
    this.titles = {}

    this.entriesList = []
    this.titlesList = []

    // Other configuration data saved to world info
    this.notes = { editor: {}, author: {} }
    this.regex = {}
    this.joins = {}
    this.icons = {}

    // Main loop over worldInfo creating new entry objects with padded data
    for (let i = 0, l = worldInfo.length; i < l; i++) {
      const info = worldInfo[i]
      const entry = this.mergeWorldInfo(info, i)

      // Add system config mapping
      if (info.keys === SC_WI_SYSTEM) this.joins = entry

      // Add join text mapping
      else if (info.keys === SC_WI_JOINS) this.joins = entry

      // Add regex text mapping
      else if (info.keys === SC_WI_REGEX) this.regex = entry

      // Add notes text mapping
      else if (info.keys === SC_WI_NOTES) this.notes = entry

      // Add to main pool
      this.worldInfo[info.keys] = entry
    }

    // Secondary loop that pads with missing information
    let foundTitle = false
    for (const entry of Object.values(this.worldInfo)) {
      if (entry.keys.startsWith(SC_WI_TITLE)) {
        foundTitle = true
        this.titles[entry.data.title] = entry
        this.titlesList.push(entry)
        if (entry.data.icon) this.icons[entry.data.icon] = true
      }
      else if (entry.keys.startsWith(SC_WI_ENTRY)) {
        // Cache regex
        entry.regex = this.getEntryRegex(entry.data.trigger)
        entry.pattern = this.getRegexPattern(entry.regex)

        // Assign to buckets
        this.entriesList.push(entry)
        this.entries[entry.data.label] = entry
        if (entry.data.icon) this.icons[entry.data.icon] = true
      }
    }

    // If invalid title mapping data, reload from defaults
    if (!foundTitle) {
      const rules = SC_DEFAULT_TITLES.reduce((result, rule) => {
        if (rule.trigger) rule.trigger = rule.trigger.toString()
        else rule.trigger = (new RegExp(rule.title)).toString()
        if (rule.title) result.push(rule)
        return result
      }, [])

      for (const rule of rules) this.saveWorldInfo({ keys: `${SC_WI_TITLE}${rule.title}`, data: rule })
    }

    // If invalid title mapping data, reload from defaults
    if (!this.joins.data) {
      this.joins.keys = SC_WI_JOINS
      this.joins.data = Object.assign({}, SC_DEFAULT_JOINS)
      this.saveWorldInfo(this.joins)
    }

    // If invalid regex mapping data, reload from defaults
    if (!this.regex.data) {
      this.regex.keys = SC_WI_REGEX
      this.regex.data = Object.assign({}, SC_DEFAULT_REGEX)
      this.saveWorldInfo(this.regex)
    }

    // Keep track of all icons so that we can clear display stats properly
    this.icons = Object.keys(this.icons)
  }

  mergeWorldInfo(info, idx) {
    const existing = this.worldInfo[info.keys]
    const merged = Object.assign(existing || { idx: [] }, info)
    const data = this.getJson(info.entry)
    if (this.isObject(data)) merged.data = this.deepMerge(merged.data || {}, data)
    else if (Array.isArray(data)) merged.data = (merged.data && merged.data.length) ? merged.data.concat(data) : data
    else merged.data = Object.assign(merged.data || {}, {[SC_DATA.MAIN]: info.entry})
    merged.entry = JSON.stringify(merged.data)
    merged.idx.push(idx)
    return merged
  }

  saveWorldInfo(entry) {
    // Remove old entries
    this.removeWorldInfo(entry)

    // Handle array data
    if (Array.isArray(entry.data)) {
      let chunk = []
      for (const item of entry.data) {
        const test = JSON.stringify([...chunk, item])
        if (test.length > 500) {
          addWorldEntry(entry.keys, JSON.stringify(chunk))
          chunk = []
        }
        chunk.push(item)
      }
      addWorldEntry(entry.keys, JSON.stringify(chunk))
    }

    // Handle object data
    else {
      let chunk = {}
      for (const key of Object.keys(entry.data)) {
        const value = entry.data[key]
        const test = JSON.stringify(Object.assign({}, chunk, { [key]: value }))
        if (test.length > 500) {
          addWorldEntry(entry.keys, JSON.stringify(chunk))
          chunk = {}
        }
        chunk[key] = value
      }
      addWorldEntry(entry.keys, JSON.stringify(chunk))
    }
  }

  removeWorldInfo(entry) {
    if (entry.idx) {
      const indexes = entry.idx.sort((a, b) => b - a)
      for (const idx of indexes) removeWorldEntry(idx)
    }
    entry.idx = []
  }

  getJson(text) {
    try { return JSON.parse(text) }
    catch (e) {}
  }

  getEntryRegex(text) {
    let flags = "g"
    let brokenRegex = false
    let pattern = [...text.matchAll(SC_RE.WI_REGEX_KEYS)].map(match => {
      if (!match[1] && match[0].startsWith("/")) brokenRegex = true
      if (match[2]) flags = match[2].includes("g") ? match[2] : `g${match[2]}`
      return match[1] ? (match[1].includes("|") ? `(${match[1]})` : match[1]) : this.getEscapedRegex(match[0].trim())
    })
    if (brokenRegex) return
    return new RegExp(pattern.join("|"), flags)
  }

  getEscapedRegex(text) {
    return text.replace(SC_RE.ESCAPE_REGEX, '\\$&'); // $& means the whole matched string
  }

  getRegexPattern(regex) {
    const string = regex instanceof RegExp ? regex.toString() : regex
    return string.split("/").slice(1, -1).join("/")
  }

  getSentences(text) {
    // Add temporary space to each end of the string for matching start and end enclosures
    let modifiedText = ` ${text} `

    // Fix enclosures with less than 2 characters between them
    modifiedText = modifiedText.replace(SC_RE.BROKEN_ENCLOSURE, "$1$2@$3")

    // Insert all enclosures found into an array and replace existing text with a reference to it's index
    let enclosures = []
    modifiedText = modifiedText.replace(SC_RE.ENCLOSURE, (_, prefix, match, suffix) => {
      if (!prefix || !match || !suffix) return _
      enclosures.push(match)
      return `${prefix === "@" ? "" : prefix}{${enclosures.length - 1}}${suffix}`
    })

    // Remove temporary space at start and end
    modifiedText = modifiedText.slice(1, -1)

    // Split into sentences and insert enclosures to return
    let sentences = modifiedText.match(SC_RE.SENTENCE) || []
    return sentences.map(s => enclosures.reduce((a, c, i) => a.replace(`{${i}}`, c), s))
  }

  getInfoMatch(text) {
    // WARNING: Only use this sparingly!
    // Currently in use for entry lookup on the `/you Jack` command
    for (let i = 0, l = this.entriesList.length; i < l; i++) {
      const entry = this.entriesList[i]
      const matches = [...text.matchAll(entry.regex)]
      if (matches.length) return entry
    }
  }

  getPronoun(text) {
    if (!text) return SC_PRONOUN.UNKNOWN
    if (!text.includes(":")) text = text.split(".")[0]
    if (text.match(new RegExp(`\\b(${this.regex.data.FEMALE})\\b`, "gi"))) return SC_PRONOUN.HER
    if (text.match(new RegExp(`\\b(${this.regex.data.MALE})\\b`, "gi"))) return SC_PRONOUN.HIM
    return SC_PRONOUN.UNKNOWN
  }

  getWeight(score, goal) {
    return score !== 0 ? ((score <= goal ? score : goal) / goal) : 0
  }

  getRelFlag(disp, type="", mod="") {
    if (disp > 5 || disp < 1) disp = 3
    return this.getRelFlagByText(`${disp}${type || ""}${mod || ""}`)
  }

  getRelFlagByText(text) {
    text = text.toString().toUpperCase().slice(0, 3)
    if (text.length === 2 && text[1] === "x") text = text.slice(0, -1)
    const disp = Number(text[0])
    const type = text.length >= 2 ? text[1].toUpperCase() : ""
    const mod = text.length >= 3 ? text[2].toLowerCase() : ""
    return { disp, mod, type, text: `${disp}${type}${mod}` }
  }

  getRelFlagWeights(rel) {
    const { disp, type, mod } = rel.flag
    const { LOVE, HATE, LIKE, DISLIKE } = SC_DISP
    const { MARRIED, LOVERS, FRIENDS } = SC_TYPE
    const { LESS, EX, MORE } = SC_MOD

    // Determine score based on relationship disposition
    const dispScore = [LOVE, HATE].includes(disp) ? 1 : ([LIKE, DISLIKE].includes(disp) ?  0.5 : 0.1)

    // Score based on relationship type
    let typeScore
    if ([MARRIED, LOVERS].includes(type)) typeScore = 0.8
    else if (type === FRIENDS) typeScore = 0.6
    else typeScore = 0.4

    if (mod === EX) typeScore /= 2.5
    else if (mod === LESS) typeScore /= 1.25
    else if (mod === MORE) typeScore *= 1.25

    return { disp: dispScore, type: typeScore }
  }

  getRelKeys(scope, data, within) {
    const text = data && (within ? data[within] : data[scope])
    if (!text) return []

    const entry = this.entries[data.label]
    if (!entry) return []

    const labels = []
    return [...text.matchAll(SC_RE.REL_KEYS)]
      // Remove invalid keys
      .map(m => m.filter(k => !!k))
      // Get relationship object
      .map(m => this.getRelTemplate(scope, entry.data.label, m[1].split(":")[0].trim(), m.length >= 3 ? m[3] : SC_FLAG_DEFAULT))
      // Remove duplicates
      .reduce((result, rel) => {
        if (!labels.includes(rel.label)) {
          labels.push(rel.label)
          result.push(rel)
        }
        return result
      }, [])
  }

  getRelAllKeys(data) {
    return SC_REL_ALL_KEYS.reduce((result, scope) => result.concat(data[scope] ? this.getRelKeys(scope, data) : []), [])
  }

  getRelText(rel) {
    return `${rel.label}${rel.flag.text !== SC_FLAG_DEFAULT ? `:${rel.flag.text}` : ""}`
  }

  getRelCombinedText(relationships) {
    return relationships.map(rel => this.getRelText(rel)).join(", ")
  }

  getRelExpKeys(data) {
    let relationships = this.getRelAllKeys(data)
    if (!relationships.length) return []

    // Get immediate family to cross reference
    const family = [
      ...this.getRelKeys(SC_DATA.CHILDREN, data),
      ...this.getRelKeys(SC_DATA.PARENTS, data)
    ].map(r => r.label)

    // Get expanded relationships, relationship flag with contact flag if found
    relationships = relationships.reduce((result, rel) => this.reduceRelations(result, rel, data, family), [])

    // Overwrite expanded relationship flag with contact flag if found
    return relationships.reduce((result, rel) => {
      if (rel.label === data.label) return result
      const existing = relationships.find(r => r.scope === SC_SCOPE.CONTACTS && r.label === rel.label)
      if (existing) rel.flag = existing.flag
      result.push(rel)
      return result
    }, [])
  }

  getRelAdjusted(text, data, scope, categories=[]) {
    if (!data) return []

    // Handle deletion
    if (text.startsWith(SC_SHORTCUT.DELETE)) {
      const removeRel = this.getRelKeys(scope, {label: data.label, [scope]: text.slice(1)}).map(r => r.label)
      return this.getRelKeys(scope, data).filter(r => !removeRel.includes(r.label))
    }

    // Get relationships
    const adjusted = this.getRelKeys(scope, { label: data.label, [scope]: data[scope] ? `${text}, ${data[scope]}` : text })

    // Filter by category
    if (categories.length) return adjusted.filter(rel => {
      const target = this.entries[rel.label]
      if (!target || categories.includes(target.data.category)) return true
    })

    return adjusted
  }

  getRelRule(text, validValues=[], implicitlyExcluded=[]) {
    const rule = (text || "").split(",").reduce((result, value) => {
      value = value.trim()
      let scope = "included"
      if (value.startsWith("-")) {
        value = value.slice(1)
        scope = "excluded"
      }
      if (!validValues.length || validValues.includes(value)) result[scope].push(value)
      return result
    }, { included: [], excluded: [] })

    rule.excluded = implicitlyExcluded.reduce((result, value) => {
      if (!rule.included.includes(value)) result.push(value)
      return result
    }, rule.excluded)

    if (rule.included.length || rule.excluded.length) return rule
  }

  getRelReverse(entry, target) {
    const regex = new RegExp(`${target}(:([^,]+))?`, "i")

    for (const scope of SC_REL_ALL_KEYS) {
      if (!entry.data[scope]) continue
      const match = entry.data[scope].match(regex)
      if (!match) continue
      const flag = this.getRelFlagByText(match[2] ? match[2] : SC_FLAG_DEFAULT)
      return this.getRelTemplate(scope, entry.data.label, target, flag)
    }
  }

  getRelMatches(rel, pronoun) {
    const target = this.entries[rel.label]
    const data = { source: rel }

    if (target) data.target = this.getRelReverse(target, rel.source)

    return this.titlesList.reduce((result, entry) => {
      const rule = entry.data
      if (!rule.title) return result

      let fieldRule = rule.scope && this.getRelRule(rule.scope, SC_VALID_SCOPE)
      if (!this.isValidRuleValue(fieldRule, rel.scope)) return result

      for (const i of Object.keys(data)) {
        if (!rule[i] || !data[i]) continue

        fieldRule = rule[i].category && this.getRelRule(rule[i].category, SC_VALID_CATEGORY)
        if (!this.isValidRuleValue(fieldRule, data[i].category)) return result

        fieldRule = rule[i].pronoun && this.getRelRule(rule[i].pronoun, SC_VALID_PRONOUN)
        if (!this.isValidRuleValue(fieldRule, data[i].pronoun)) return result

        fieldRule = rule[i].entry && this.getRelRule(rule[i].entry)
        if (!this.isValidRuleValue(fieldRule, data[i].source)) return result

        fieldRule = rule[i].disp && this.getRelRule(`${rule[i].disp}`, SC_VALID_DISP)
        if (!this.isValidRuleValue(fieldRule, `${data[i].flag.disp}`)) return result

        fieldRule = rule[i].type && this.getRelRule(rule[i].type, SC_VALID_TYPE)
        if (!this.isValidRuleValue(fieldRule, data[i].flag.type)) return result

        fieldRule = this.getRelRule(rule[i].mod, SC_VALID_MOD, [SC_MOD.EX])
        if (!this.isValidRuleValue(fieldRule, data[i].flag.mod)) return result
      }

      result.push({ pronoun, title: rule.title, pattern: `(${rule.trigger ? this.getRegexPattern(rule.trigger) : rule.title})` })
      return result
    }, [])
  }

  getRelMapping(entry, categories=[]) {
    return this.getRelExpKeys(entry.data).reduce((result, rel) => {
      const target = this.entries[rel.label]
      if (!target || (categories.length && !categories.includes(target.data.category))) return result

      for (let match of this.getRelMatches(rel)) {
        const existing = result.find(m => m.title === match.title)
        const mapping = existing || Object.assign({ targets: [] }, match)
        mapping.targets.push(rel.label)
        if (!existing) result.push(mapping)
      }

      return result
    }, [])
  }

  getRelTemplate(scope, sourceLabel, targetLabel, flagText) {
    const { creator } = this.state
    let flag = typeof flagText === "object" ? flagText : this.getRelFlagByText(flagText)
    let target = this.entries[targetLabel] && this.entries[targetLabel].data
    let source = this.entries[sourceLabel] && this.entries[sourceLabel].data
    if (!target && creator.data) target = creator.data
    if (!SC_RELATABLE.includes(source.category)) flag = this.getRelFlag(SC_DISP.NEUTRAL)
    else if (target && !SC_RELATABLE.includes(target.category)) flag = this.getRelFlag(flag.disp)
    return {
      scope,
      label: targetLabel,
      source: sourceLabel,
      category: source.category,
      pronoun: source.pronoun,
      flag
    }
  }

  getContextTemplate(text) {
    return {
      // Extrapolated matches and relationship data
      sizes: {}, metrics: [], relations: [], tree: {}, candidates: [], injected: [], pronouns: [],
      // Grouped sentences by section
      header: [], sentences: [], history: [],
      // Original text stored for parsing outside of contextModifier
      text: text || ""
    }
  }

  getFormattedEntry(text, insertNewlineBefore=false, insertNewlineAfter=false, replaceYou=true) {
    if (!text) return

    // You replacement
    if (replaceYou) text = this.replaceYou(text)

    // Encapsulation of entry in brackets
    const match = [...text.matchAll(SC_RE.DETECT_FORMAT)]
    if (!match.length) text = text.split("\n").map(l => `<< ${this.toTitleCase(this.appendPeriod(l.trim()))}>>>>`).join("\n")

    // Final forms
    text = `${insertNewlineBefore ? "\n" : ""}${text}${insertNewlineAfter ? "\n" : ""}`

    return text
  }

  getNotes(section, notesData) {
    const data = notesData ? notesData[section] : (this.notes.data && this.notes.data[section])
    if (!data) return []

    const notes = []
    if (data.hasOwnProperty("note")) notes.push(`${section === "editor" ? "Editor's note" : "Author's note"}: ${this.toTitleCase(this.appendPeriod(data.note))}`)
    if (data.hasOwnProperty("genre")) notes.push(`Genre: ${this.appendPeriod(data.genre)}`)
    if (data.hasOwnProperty("setting")) notes.push(`Setting: ${this.appendPeriod(data.setting)}`)
    if (data.hasOwnProperty("theme")) notes.push(`Theme: ${this.appendPeriod(data.theme)}`)
    if (data.hasOwnProperty("subject")) notes.push(`Subject: ${this.appendPeriod(data.subject)}`)
    if (data.hasOwnProperty("style")) notes.push(`Writing Style: ${this.appendPeriod(data.style)}`)
    if (data.hasOwnProperty("rating")) notes.push(`Rating: ${this.appendPeriod(data.rating)}`)
    return notes
  }

  isValidRuleValue(rule, value) {
    const isIncluded = !rule || !rule.included.length || rule.included.includes(value)
    const notExcluded = !rule || !rule.excluded.length || !rule.excluded.includes(value)
    return isIncluded && notExcluded
  }

  isValidEntrySize(text) {
    return (text && this.originalSize !== 0) ? (((this.modifiedSize + text.length) / this.originalSize) < 0.85) : false
  }

  isValidTreeSize(tree) {
    const relations = Object.keys(tree).reduce((a, c) => a.concat(JSON.stringify([{[c]: tree[c]}])), [])
    const text = `\n${relations.join("\n")}\n`
    return text.length <= SC_REL_SIZE_LIMIT && this.isValidEntrySize(text)
  }

  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item)
  }

  deepMerge(target, ...sources) {
    if (!sources.length) return target
    const source = sources.shift()

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (source.hasOwnProperty(key) && this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.deepMerge(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return this.deepMerge(target, ...sources);
  }

  reduceRelations(result, rel, data, family=[]) {
    result.push(rel)
    const entry = this.entries[rel.label]
    if (!entry || data.label === rel.label) return result

    // Grandparents/Siblings
    if (rel.scope === SC_SCOPE.PARENTS) {
      result = result.concat([
        ...this.getRelKeys(SC_SCOPE.GRANDPARENTS, entry.data, SC_DATA.PARENTS),
        ...this.getRelKeys(SC_SCOPE.SIBLINGS, entry.data, SC_DATA.CHILDREN)
      ].reduce((result, rel) => this.reduceRelations(result, rel, data, family), []))
    }

    // Grandchildren
    else if (rel.scope === SC_SCOPE.CHILDREN) {
      result = result.concat(this.getRelKeys(SC_SCOPE.GRANDCHILDREN, entry.data, SC_DATA.CHILDREN)
        .reduce((result, rel) => this.reduceRelations(result, rel, data, family), []))
    }

    // Aunts/Uncles
    else if (rel.scope === SC_SCOPE.GRANDPARENTS) {
      result = result.concat(this.getRelKeys(SC_SCOPE.PARENTS_SIBLINGS, entry.data, SC_DATA.CHILDREN)
        .reduce((result, rel) => family.includes(rel.label) ? result : this.reduceRelations(result, rel, data, family), []))
    }

    // Nieces/Nephews
    else if (rel.scope === SC_SCOPE.SIBLINGS) {
      result = result.concat(this.getRelKeys(SC_SCOPE.SIBLINGS_CHILDREN, entry.data, SC_DATA.CHILDREN)
        .reduce((result, rel) => this.reduceRelations(result, rel, data, family), []))
    }

    return result
  }

  excludeRelations(relationships, data, scope) {
    if (!data[scope]) return relationships
    const targetRelLabels = this.getRelKeys(scope, data).map(r => r.label)
    return relationships.filter(r => !targetRelLabels.includes(r.label))
  }

  exclusiveRelations(relationships, data, scope) {
    if (!data[scope]) return false
    const relLabels = relationships.map(r => r.label)
    const targetRel = this.getRelKeys(scope, data).filter(r => !relLabels.includes(r.label))
    const targetText = this.getRelCombinedText(targetRel)
    if (data[scope] === targetText) return false
    data[scope] = targetText
    return true
  }

  syncEntry(entry) {
    // WARNING: Does full check of World Info. Only use this sparingly!
    // Currently used to get all World Info that references `entry`
    const processedLabels = []

    // Updated associations after an entries relations is changed
    for (let rel of this.getRelAllKeys(entry.data)) {
      const targetEntry = this.entries[rel.label]
      if (!targetEntry) continue

      // Save for later
      processedLabels.push(targetEntry.data.label)

      // Determine the reverse scope of the relationship
      const revScope = SC_SCOPE_OPP[rel.scope.toUpperCase()]
      if (!revScope) continue
      if (!targetEntry.data[revScope]) targetEntry.data[revScope] = ""

      // Attempt to find existing relationship
      let targetKeys = this.getRelKeys(revScope, targetEntry.data)
      const foundSelf = targetKeys.find(r => r.label === entry.data.label)

      // Reciprocal entry found, sync relationship flags
      if (foundSelf) {
        if (foundSelf.flag.mod === rel.flag.mod && foundSelf.flag.type === rel.flag.type) continue
        const mod = rel.flag.mod === SC_MOD.EX ? rel.flag.mod : (foundSelf.flag.mod === SC_MOD.EX ? "" : foundSelf.flag.mod)
        foundSelf.flag = this.getRelFlag(foundSelf.flag.disp, rel.flag.type, mod)
      }

      // No reciprocal entry found, create new entry
      else {
        const flag = this.getRelFlag(SC_DISP.NEUTRAL, rel.flag.type, rel.flag.mod === SC_MOD.EX ? rel.flag.mod : "")
        targetKeys.push(this.getRelTemplate(revScope, targetEntry.data.label, entry.data.label, flag))

        // Ensure entry label isn't in other scopes
        for (let scope of SC_REL_ALL_KEYS.filter(k => k !== revScope)) {
          this.exclusiveRelations([{label: entry.data.label}], targetEntry.data, scope)
        }
      }

      // Create final text, remove if empty and update World Info
      targetEntry.data[revScope] = this.getRelCombinedText(targetKeys)
      if (!targetEntry.data[revScope]) delete targetEntry.data[revScope]
      this.saveWorldInfo(targetEntry)
    }

    for (let i = 0, l = this.entriesList.length; i < l; i++) {
      const checkEntry = this.entriesList[i]
      if (checkEntry.id === entry.id || processedLabels.includes(checkEntry.data.label)) continue

      let update = false
      for (let scope of SC_REL_ALL_KEYS) {
        const rel = this.getRelKeys(scope, checkEntry.data)
        const modifiedRel = rel.filter(r => r.label !== entry.data.label && r.scope === scope)

        if (rel.length !== modifiedRel.length) {
          checkEntry.data[scope] = this.getRelCombinedText(modifiedRel)
          if (!checkEntry.data[scope]) delete checkEntry.data[scope]
          update = true
        }
      }

      if (update) this.saveWorldInfo(checkEntry)
    }
  }

  appendPeriod(content) {
    if (!content) return ""
    return !content.match(/[.!?]$/) ? content + "." : content
  }

  toTitleCase(content) {
    return content.charAt(0).toUpperCase() + content.slice(1)
  }

  replaceYou(text) {
    const { you } = this.state
    if (!you.id) return text

    // Match contents of /you and if found replace with the text "you"
    const youMatch = new RegExp(`\\b${you.data.label}${this.regex.data.PLURAL}\\b`, "gi")
    if (text.match(youMatch)) {
      text = text.replace(youMatch, "you")
      for (let [find, replace] of this.youReplacements) text = text.replace(find, replace)
    }

    return text
  }

  messageOnce(text) {
    if (!text.startsWith("\n")) text = `\n${text}`
    if (!state.message) state.message = ""
    state.message += text
    this.state.lastMessage += text
  }


  /*
   * CONTEXT MODIFIER
   * - Removes excess newlines so the AI keeps on track
   * - Takes existing set state and dynamically injects it into the context
   * - Is responsible for injecting custom World Info entries, including regex matching of keys where applicable
   * - Keeps track of the amount of modified context and ensures it does not exceed the 85% rule
   *   while injecting as much as possible
   * - Scene break detection
   */
  contextModifier(text) {
    if (this.state.isDisabled || !text) return text;
    this.initialize()
    this.parseContext(text)
    return this.getModifiedContext()
  }

  parseContext(context) {
    // Store new context if one was passed
    if (context) this.state.context.text = context

    // Split into sectioned sentences, inject custom context information (author's note, pov, scene, think, focus)
    this.splitContext()

    // Match world info found in context including dynamic expanded pronouns
    this.gatherMetrics()

    // Determine relationship tree of matched entries
    this.mapRelations()

    // Get relationship tree that respects limit and 85% context rule
    this.mapRelationsTree()

    // Determine injection candidates from metrics
    this.determineCandidates()

    // Inject all matched world info and relationship data (keeping within 85% cutoff)
    this.injectCandidates()

    // Inject signposts
    this.injectSignposts()

    // Truncate by full sentence to ensure context is within max length (info.maxChars - info.memoryLength)
    this.truncateContext()

    // Display HUD
    this.displayHUD()

    // Display debug output
    this.displayDebug()
  }

  splitContext() {
    const { sections } = this.state
    const { text } = this.state.context

    // Set the original context length for later calculation
    this.originalSize = text.length

    let sceneBreak = false
    const context = (info.memoryLength ? text.slice(info.memoryLength) : text)
      .replace(/([\n]{2,})/g, "\n")
      .split("\n").filter(l => !!l).join("\n")

    // Account for signpost usage
    this.modifiedSize += (info.memoryLength && text.length > SC_SIGNPOST_INITIAL_DISTANCE) ? this.signpost.length : 0
    this.modifiedSize += (Math.ceil(text.length / SC_SIGNPOST_DISTANCE) + 2) * this.signpost.length

    // Split on scene break
    const split = this.getSentences(context).reduceRight((result, sentence) => {
      if (!sceneBreak && sentence.startsWith(this.sceneBreak)) {
        result.sentences.unshift(sentence.slice(this.sceneBreak.length))
        result.history.unshift(this.sceneBreak)
        sceneBreak = true
      }
      else if (sceneBreak) result.history.unshift(sentence)
      else result.sentences.unshift(sentence)
      return result
    }, this.getContextTemplate(text))

    // Build author's note entry
    const editorEntry = this.getFormattedEntry(this.getNotes("editor").join(" "), false, true, false)
    if (this.isValidEntrySize(editorEntry)) {
      split.header.push(editorEntry)
      this.modifiedSize += editorEntry.length
    }

    // Build author's note entry
    const authorEntry = this.getFormattedEntry(this.getNotes("author").join(" "), false, true, false)
    if (this.isValidEntrySize(authorEntry)) {
      split.header.push(authorEntry)
      this.modifiedSize += authorEntry.length
    }

    // Build pov entry
    const povEntry = this.getFormattedEntry(sections.pov, false, true, false)
    if (this.isValidEntrySize(povEntry)) {
      split.header.push(povEntry)
      this.modifiedSize += povEntry.length
    }

    if (split.header.length) split.header.push(`${this.signpost}\n`)

    // Do sentence injections (scene, think, focus)
    let charCount = 0
    const injectedItems = []
    split.sentences = split.sentences.reduceRight((result, sentence, idx) => {
      charCount += sentence.length
      result.unshift(sentence)

      // Determine whether to put newlines before or after injection
      const newlineBefore = idx !== 0 ? !split.sentences[idx - 1].endsWith("\n") : false
      const newlineAfter = !sentence.startsWith("\n")

      // Build focus entry
      if (charCount > SC_CONTEXT_PLACEMENT.FOCUS && !injectedItems.includes(SC_SECTION.FOCUS)) {
        injectedItems.push(SC_SECTION.FOCUS)
        const focusEntry = this.getFormattedEntry(sections.focus, newlineBefore, newlineAfter)
        if (this.isValidEntrySize(focusEntry)) {
          result.unshift(focusEntry)
          this.modifiedSize += focusEntry.length
        }
      }

      // Build think entry
      else if (charCount > SC_CONTEXT_PLACEMENT.THINK && !injectedItems.includes(SC_SECTION.THINK)) {
        injectedItems.push(SC_SECTION.THINK)
        const thinkEntry = this.getFormattedEntry(sections.think, newlineBefore, newlineAfter)
        if (this.isValidEntrySize(thinkEntry)) {
          result.unshift(thinkEntry)
          this.modifiedSize += thinkEntry.length
        }
      }

      // Build scene entry
      else if (charCount > SC_CONTEXT_PLACEMENT.SCENE && !injectedItems.includes(SC_SECTION.SCENE)) {
        injectedItems.push(SC_SECTION.SCENE)
        const sceneEntry = this.getFormattedEntry(sections.scene, newlineBefore, newlineAfter)
        if (this.isValidEntrySize(sceneEntry)) {
          result.unshift(sceneEntry)
          this.modifiedSize += sceneEntry.length
        }
      }

      return result
    }, [])

    this.state.context = split
  }

  gatherMetrics() {
    // WARNING: Only use this sparingly!
    // Currently used to parse all the context for world info matches
    const { context } = this.state
    const cache = { pronouns: {}, relationships: {}, parsed: {}, entries: [], history: [] }

    // Cache only world entries that are applicable
    for (let i = 0, l = this.entriesList.length; i < l; i++) {
      const entry = this.entriesList[i]
      const text = [...context.header, ...context.sentences].join("")
      const regex = new RegExp(`\\b${entry.pattern}${this.regex.data.PLURAL}\\b`, entry.regex.flags)
      const matches = [...text.matchAll(regex)]
      if (matches.length) cache.entries.push([entry, regex])
    }

    context.metrics = context.header.reduceRight((result, sentence, idx) => {
      return this.reduceMetrics(result, sentence, idx, context.header.length, "header", cache)
    }, context.metrics)

    context.metrics = context.sentences.reduce((result, sentence, idx) => {
      return this.reduceMetrics(result, sentence, idx, context.sentences.length, "sentences", cache)
    }, context.metrics)

    // Score metrics
    for (const metric of context.metrics) {
      const weights = Object.values(metric.weights)
      metric.score = weights.reduce((a, i) => a + i) / weights.length
    }

    context.pronouns = cache.pronouns

    // Sort by score desc, sentenceIdx desc,
    context.metrics.sort((a, b) => b.score - a.score || b.sentenceIdx - a.sentenceIdx)
  }

  reduceMetrics(metrics, sentence, idx, total, section, cache) {
    const metricTemplate = {
      type: SC_DATA.MAIN, section, sentence, sentenceIdx: idx, entryLabel: "", matchText: "", pattern: "",
      weights: { distance: this.getWeight(idx + 1, total), strength: 1 }
    }

    // Iterate through cached entries for main keys matching
    for (const [entry, mainRegex] of cache.entries) {
      // Match against world info keys
      const mainMatches = [...sentence.matchAll(mainRegex)]

      // Main match found
      if (mainMatches.length) {
        const metric = Object.assign({}, metricTemplate, {
          entryLabel: entry.data.label, matchText: mainMatches[0][0], pattern: this.getRegexPattern(mainRegex)
        })
        metrics.push(metric)
        if (this.state.you.id !== entry.id) cache.history.unshift(entry)
        this.matchMetrics(metrics, metric, entry, entry.regex)
        this.cachePronouns(metric, entry, cache)
      }
    }

    // Match all cached pronouns
    for (const pronoun of Object.keys(cache.pronouns)) {
      const { regex, metric } = cache.pronouns[pronoun]

      // Determine which entry to use
      const targets = metric.entryLabel.split("|")
      const existing = cache.history.find(e => targets.includes(e.data.label))
      const target = existing ? existing.data.label : targets[0]

      // Do expanded matching on pronoun
      const expMetric = Object.assign({}, metric, {
        section, sentence, sentenceIdx: idx, entryLabel: target, pronoun,
        weights: { distance: this.getWeight(idx + 1, total), strength: metric.weights.strength }
      })
      this.matchMetrics(metrics, expMetric, this.entries[target], regex, true)
    }

    // Match new pronouns
    const expMetrics = []
    for (const pronoun of Object.keys(cache.pronouns)) {
      const { regex, metric } = cache.pronouns[pronoun]

      // Determine which entry to use
      const targets = metric.entryLabel.split("|")
      const existing = cache.history.find(e => targets.includes(e.data.label))
      const target = existing ? existing.data.label : targets[0]

      // Skip YOU, HIS and HER top level pronouns
      if (!pronoun.includes(" ")) continue

      // Skip if already parsed
      const parsedKey = `${pronoun}:${section}:${idx}:${target}`
      if (cache.parsed[parsedKey]) continue
      else cache.parsed[parsedKey] = true

      // Detect expanded pronoun in context
      const expMatches = [...sentence.matchAll(regex)]
      if (!expMatches.length) continue

      // Create new metric based on match
      const expMetric = Object.assign({}, metric, {
        section, sentence, sentenceIdx: idx, entryLabel: target, matchText: expMatches[0][0],
        weights: { distance: this.getWeight(idx + 1, total), strength: 0.2 }
      })
      metrics.push(expMetric)
      expMetrics.push(expMetric)
    }

    // Get new pronouns before continuing
    for (const expMetric of expMetrics) {
      this.cachePronouns(expMetric, this.entries[expMetric.entryLabel], cache)
    }

    return metrics
  }

  matchMetrics(metrics, metric, entry, regex, pronounLookup=false) {
    // Get structured entry object, only perform matching if entry key's found
    const pattern = this.getRegexPattern(regex)
    const injPattern = pronounLookup ? pattern : `\\b(${pattern})${this.regex.data.PLURAL}\\b`

    // combination of match and specific lookup regex, ie (glance|look|observe).*(pattern)
    if (entry.data[SC_DATA.SEEN]) {
      const expRegex = SC_RE.fromArray([
        `\\b(${this.regex.data.LOOK_AHEAD})${this.regex.data.INFLECTED}\\b.*${injPattern}`,
        `${injPattern}.*\\b(${this.regex.data.LOOK_BEHIND})${this.regex.data.INFLECTED}\\b`
      ], regex.flags)

      const match = metric.sentence.match(expRegex)
      if (match) {
        const expMetric = {
          type: SC_DATA.SEEN, matchText: match[0], pattern: this.getRegexPattern(expRegex),
          weights: { distance: metric.weights.distance, strength: 0.4 }
        }
        metrics.push(Object.assign({}, metric, expMetric))
      }
    }

    // determine if match is owner of quotations, ie ".*".*(pattern)  or  (pattern).*".*"
    if (entry.data[SC_DATA.HEARD]) {
      const expRegex = SC_RE.fromArray([
        `(\".*\"|'.*')(?=[^\\w]).*${injPattern}`,
        `${injPattern}.*(?=[^\\w])(\".*\"|'.*')`
      ], regex.flags)

      const match = metric.sentence.match(expRegex)
      if (match) {
        const expMetric = {
          type: SC_DATA.HEARD, matchText: match[0], pattern: this.getRegexPattern(expRegex),
          weights: { distance: metric.weights.distance, strength: 0.4 }
        }
        metrics.push(Object.assign({}, metric, expMetric))
      }
    }

    // match within quotations, ".*(pattern).*"
    // do NOT do pronoun lookups on this
    if (!pronounLookup && entry.data[SC_DATA.TOPIC]) {
      const expRegex = SC_RE.fromArray([
        `(?<=[^\\w])".*${injPattern}.*"(?=[^\\w])`,
        `(?<=[^\\w])'.*${injPattern}.*'(?=[^\\w])`
      ], regex.flags)

      const match = metric.sentence.match(expRegex)
      if (match) {
        const expMetric = {
          type: SC_DATA.TOPIC, matchText: match[0], pattern: this.getRegexPattern(expRegex),
          weights: { distance: metric.weights.distance, strength: 0.4 }
        }
        metrics.push(Object.assign({}, metric, expMetric))
      }
    }
  }

  cachePronouns(metric, entry, cache) {
    const { you } = this.state
    const { pronoun, label } = entry.data

    // Determine pronoun type
    let lookupPattern, lookupPronoun
    if (you.id === entry.id) {
      lookupPattern = "your"
      lookupPronoun = SC_PRONOUN.YOU
    }
    else {
      if (pronoun === SC_PRONOUN.UNKNOWN) return
      lookupPattern = `${pronoun === SC_PRONOUN.HER ? "her" : "his"}`
      lookupPronoun = pronoun
    }

    // Add base pronoun
    const pattern = `\\b(${this.regex.data[lookupPronoun.toUpperCase()]})\\b`
    const regex = new RegExp(pattern, "gi")
    cache.pronouns[lookupPronoun] = { regex, metric: Object.assign({}, metric, { pattern }) }

    // Get cached relationship data
    if (!cache.relationships[label]) cache.relationships[label] = this.getRelMapping(entry, [SC_CATEGORY.CHARACTER])
    const relationships = cache.relationships[label]

    // Add relationship pronoun extensions for type character
    for (let relationship of relationships) {
      const pattern = `\\b${lookupPattern}\\b.*\\b(${relationship.pattern})${this.regex.data.PLURAL}\\b`
      const regex = new RegExp(pattern, "gi")
      const target = relationship.targets.join("|")

      cache.pronouns[`${lookupPattern} ${relationship.title}`] = {
        regex, metric: Object.assign({}, metric, { pattern, entryLabel: target })
      }
    }
  }

  mapRelations() {
    const { context } = this.state
    const degreesGoal = 4
    const topLabels = []

    // Get all top level metrics with a unique entryLabel
    const firstPass = context.metrics.reduce((result, metric) => {
      const existing = result.find(b => b.entry.data.label === metric.entryLabel)
      const item = existing || { scores: [] }
      item.scores.push(metric.score)
      if (!existing) {
        topLabels.push(metric.entryLabel)
        item.entry = this.entries[metric.entryLabel]
        result.push(item)
      }
      return result
    }, [])

    // Prepare branch nodes and weighting
    const secondPass = firstPass.reduce((result, branch) => {
      const { data } = branch.entry
      const { label, pronoun } = data

      // Get total score for weighting
      const metricsWeight = branch.scores.reduce((a, c) => a + c, 0) / branch.scores.length

      // Otherwise add it to the list for consideration
      return result.concat({
        label, pronoun, weights: { metrics: metricsWeight },
        nodes: this.getRelExpKeys(data).reduce((result, rel) => {
          const entry = this.entries[rel.label]
          if (entry) result.push({
            label: rel.label, pronoun: entry.data.pronoun, rel,
            weights: Object.assign({ metrics: (metricsWeight / (topLabels.includes(rel.label) ? 1 : 2)) }, this.getRelFlagWeights(rel))
          })
          return result
        }, [])
      })
    }, [])

    // Cross match top level keys to figure out degrees of separation (how many people know the same people)
    const degrees = secondPass.reduce((result, branch) => {
      if (!result[branch.label]) result[branch.label] = 0
      result[branch.label] += 1
      for (let node of branch.nodes) {
        if (!result[node.label]) result[node.label] = 0
        result[node.label] += 1
      }
      return result
    }, {})

    // Update total weights to account for degrees of separation, calculate total score
    const thirdPass = secondPass.map(branch => {
      branch.weights.degrees = this.getWeight(degrees[branch.label], degreesGoal)
      let weight = Object.values(branch.weights)
      branch.score = weight.reduce((a, i) => a + i) / weight.length
      for (let node of branch.nodes) {
        node.weights.degrees = this.getWeight(degrees[node.label], degreesGoal)
        weight = Object.values(node.weights)
        node.score = weight.reduce((a, i) => a + i) / weight.length
      }
      return branch
    }, [])

    // Create master list
    context.relations = thirdPass.reduce((result, branch) => {
      return result.concat(branch.nodes.reduce((result, node) => {
        const relations = this.getRelMatches(node.rel, branch.pronoun).map(r => r.title)
        result.push({
          score: node.score, source: branch.label, target: node.label, relations: relations,
          scope: node.rel.scope, flag: node.rel.flag, weights: node.weights
        })
        return result
      }, []))
    }, [])

    // Sort all relations by score desc
    context.relations.sort((a, b) => b.score - a.score)
  }

  mapRelationsTree() {
    const { context } = this.state
    const { data: JOIN_TEXT } = this.joins
    const branches = context.relations.reduce((a, c) => a.includes(c.source) ? a : a.concat(c.source), [])
    let tree = {}, tmpTree

    const relations = context.relations.filter(r => this.entries[r.source] && this.entries[r.target])

    // Ownership takes top priority
    for (const rel of relations) {
      // Skip adding if relation is not a branch level entry
      if (rel.relations.length && !branches.includes(rel.target)) continue

      // Build tree of owners
      if (rel.scope === SC_SCOPE.OWNERS) {
        tmpTree = this.mapRelationsFacet(tree, rel.source, JOIN_TEXT.OWNERS, rel.target)
        if (!this.isValidTreeSize(tmpTree)) break
        tree = tmpTree
      }
    }

    // Character and faction relationships usually take up the most
    for (const rel of relations) {
      // Check already tracked
      if (this.hasRelationsBranchTarget(tree, rel, [
        JOIN_TEXT.CHAR_CHAR, JOIN_TEXT.FACTION_FACTION,
        JOIN_TEXT.FACTION_CHAR, JOIN_TEXT.CHAR_FACTION,
        JOIN_TEXT.THING_THING, JOIN_TEXT.LOCATION_THING
      ])) continue

      const entry = this.entries[rel.source]
      const target = this.entries[rel.target]

      // Location to Location
      if (entry.data.category === SC_CATEGORY.LOCATION && target.data.category === SC_CATEGORY.LOCATION) {
        const regex = new RegExp(`\\b${this.getEscapedRegex(target.data[SC_DATA.NOUN])}\\b`, "gi")
        const targetText = rel.target.replace(regex, "").replace(/\s{2,}/g, " ").trim()
        tmpTree = this.mapRelationsFacet(tree, rel.source, target.data[SC_DATA.NOUN], targetText)
        if (!this.isValidTreeSize(tmpTree)) break
        tree = tmpTree
        continue
      }

      // Location to Thing
      if (entry.data.category === SC_CATEGORY.LOCATION && target.data.category === SC_CATEGORY.THING) {
        tmpTree = this.mapRelationsFacet(tree, rel.source, JOIN_TEXT.LOCATION_THING, rel.target)
        if (!this.isValidTreeSize(tmpTree)) break
        tree = tmpTree
        continue
      }

      // Thing to Thing
      if (entry.data.category === SC_CATEGORY.THING && target.data.category === SC_CATEGORY.THING) {
        tmpTree = this.mapRelationsFacet(tree, rel.source, JOIN_TEXT.THING_THING, rel.target)
        if (!this.isValidTreeSize(tmpTree)) break
        tree = tmpTree
        continue
      }

      // Add various relationship titles (one by one)
      let limitReach = false
      const titleCount = rel.relations.length
      for (let i = 0; i < titleCount; i++) {
        tmpTree = Object.assign({}, tree)

        // Char to Char
        if (entry.data.category === SC_CATEGORY.CHARACTER && target.data.category === SC_CATEGORY.CHARACTER) {
          tmpTree = this.mapRelationsBranch(tree, rel.source, JOIN_TEXT.CHAR_CHAR, rel.target, rel.relations[i])
        }

        // Char to Faction
        else if (entry.data.category === SC_CATEGORY.CHARACTER && target.data.category === SC_CATEGORY.FACTION) {
          tmpTree = this.mapRelationsBranch(tree, rel.source, JOIN_TEXT.CHAR_FACTION, rel.target, rel.relations[i])
        }

        // Faction to Faction
        else if (entry.data.category === SC_CATEGORY.FACTION && target.data.category === SC_CATEGORY.FACTION) {
          tmpTree = this.mapRelationsBranch(tree, rel.source, JOIN_TEXT.FACTION_FACTION, rel.target, rel.relations[i])
        }

        // Faction to Char
        else if (entry.data.category === SC_CATEGORY.FACTION && target.data.category === SC_CATEGORY.CHARACTER) {
          tmpTree = this.mapRelationsBranch(tree, rel.source, JOIN_TEXT.FACTION_CHAR, rel.relations[i], rel.target)
        }

        if (!this.isValidTreeSize(tmpTree)) {
          limitReach = true
          break
        }

        tree = tmpTree
      }
      if (limitReach) break
    }

    // Next in priority is likes and dislikes
    for (const rel of relations) {
      // Skip adding if relation is not a branch level entry
      if (rel.relations.length && !branches.includes(rel.target)) continue

      // Build tree of likes/dislikes
      if (rel.flag.disp === SC_DISP.HATE || rel.flag.disp === SC_DISP.LOVE) {
        if (rel.flag.disp === SC_DISP.HATE) tmpTree = this.mapRelationsFacet(tree, rel.source, JOIN_TEXT.HATE, rel.target)
        else tmpTree = this.mapRelationsFacet(tree, rel.source, JOIN_TEXT.LIKE, rel.target)
        if (!this.isValidTreeSize(tmpTree)) break
        tree = tmpTree
      }
    }

    // Lastly we do property
    for (const rel of relations) {
      // Skip adding if relation is not a branch level entry
      if (rel.relations.length && !branches.includes(rel.target)) continue

      // Build tree of property
      if (rel.scope === SC_SCOPE.PROPERTY) {
        tmpTree = this.mapRelationsFacet(tree, rel.source, JOIN_TEXT.PROPERTY, rel.target)
        if (!this.isValidTreeSize(tmpTree)) break
        tree = tmpTree
      }
    }

    // Clean up tree (remove ending array's if only 1 item)
    for (const source of Object.keys(tree)) {
      const sourceNode = tree[source]
      for (const join of Object.keys(sourceNode)) {
        const joinNode = sourceNode[join]
        if (Array.isArray(joinNode)) {
          if (joinNode.length === 1) sourceNode[join] = joinNode[0]
          continue
        }
        for (const target of Object.keys(joinNode)) {
          const targetNode = joinNode[target]
          if (targetNode.length === 1) joinNode[target] = targetNode[0]
        }
      }
    }

    context.tree = tree
  }

  mapRelationsFacet(tree, source, join, value) {
    const tmpTree = Object.assign({}, tree)
    if (!tmpTree[source]) tmpTree[source] = {}
    if (!tmpTree[source][join]) tmpTree[source][join] = []
    if (value) tmpTree[source][join].push(value)
    return tmpTree
  }

  mapRelationsBranch(tree, source, join, target, value) {
    const tmpTree = Object.assign({}, tree)
    if (!tmpTree[source]) tmpTree[source] = {}
    if (!tmpTree[source][join]) tmpTree[source][join] = {}
    if (!tmpTree[source][join][target]) tmpTree[source][join][target] = []
    if (value) tmpTree[source][join][target].push(value)
    return tmpTree
  }

  hasRelationsBranchTarget(tree, rel, joins) {
    for (const join of joins) if (!tree[rel.source] || !tree[rel.source][join] || !tree[rel.source][join][rel.target]) return false
    return true
  }

  determineCandidates() {
    const { context } = this.state

    // Pick out main entries for initial injection
    const split = context.metrics.reduce((result, metric) => {
      if (metric.type === SC_DATA.MAIN) result.main.push(metric)
      else result.other.push(metric)
      return result
    }, { main: [], other: [] })

    // Sort main entries by sentenceIdx asc, score desc
    split.main.sort((a, b) => a.sentenceIdx - b.sentenceIdx || b.score - a.score)
    // Bubble all entries that meets distance threshold to top
    split.main.sort((a, b) => b.weights.distance < SC_METRIC_DISTANCE_THRESHOLD ? -1 : 1)

    // Split main entries
    split.main = split.main.reduce((result, metric) => {
      result[metric.section].push(metric)
      return result
    }, { header: [], sentences: [] })

    // Determine candidates for entry injection
    const injectedIndexes = {}
    context.candidates = split.main.sentences.reduce((a, c, i) => this.reduceCandidates(a, c, i, injectedIndexes), [])
    context.candidates = split.main.header.reduce((a, c, i) => this.reduceCandidates(a, c, i, injectedIndexes), context.candidates)
    context.candidates = split.other.reduce((a, c, i) => this.reduceCandidates(a, c, i, injectedIndexes), context.candidates)
  }

  reduceCandidates(result, metric, idx, injectedIndexes) {
    const { context } = this.state
    const { data: JOIN_TEXT } = this.joins

    const entry = this.entries[metric.entryLabel]
    if (!injectedIndexes[metric.sentenceIdx]) injectedIndexes[metric.sentenceIdx] = []
    const candidateList = injectedIndexes[metric.sentenceIdx]
    const lastEntryText = candidateList.length ? candidateList[candidateList.length - 1] : (metric.sentenceIdx ? context[metric.section][metric.sentenceIdx - 1] : "")

    // Track injected items and skip if already done
    const existing = context.injected.find(i => i.label === metric.entryLabel)
    const item = existing || { label: metric.entryLabel, types: [] }
    if (item.types.includes(metric.type)) return result
    item.types.push(metric.type)

    // Determine whether to put newlines before or after injection
    const insertNewlineBefore = !lastEntryText.endsWith("\n")
    const insertNewlineAfter = !metric.sentence.startsWith("\n")
    const injectEntry = this.getFormattedEntry(entry.data[metric.type], insertNewlineBefore, insertNewlineAfter)
    const validMain = this.isValidEntrySize(injectEntry)

    // Return if unable to inject
    if (validMain) {
      result.push({ metric, text: injectEntry })
      this.modifiedSize += injectEntry.length
      candidateList.push(injectEntry)
      if (!existing) context.injected.push(item)
    }

    // Inject relationships when MAIN entry is inserted
    if (metric.type !== SC_DATA.MAIN || !context.tree[metric.entryLabel]) return result

    const relText = JSON.stringify([{[metric.entryLabel]: context.tree[metric.entryLabel]}])
    const relNewlineBefore = validMain ? !insertNewlineAfter : !lastEntryText.endsWith("\n")
    const relNewlineAfter = validMain ? insertNewlineAfter : !metric.sentence.startsWith("\n")
    const relEntry = this.getFormattedEntry(relText, relNewlineBefore, relNewlineAfter)

    if (this.isValidEntrySize(relEntry)) {
      result.push({ metric: Object.assign({}, metric, { type: JOIN_TEXT.CHAR_CHAR }), text: relEntry })
      this.modifiedSize += relEntry.length
      item.types.push(JOIN_TEXT.CHAR_CHAR)
    }

    return result
  }

  injectCandidates() {
    this.injectSection("header")
    this.injectSection("sentences")

    // Add sizes to context object for debugging
    const { sizes } = this.state.context
    sizes.modified = this.modifiedSize
    sizes.original = this.originalSize
  }

  injectSection(section) {
    const { context } = this.state
    const sectionCandidates = context.candidates.filter(m => m.metric.section === section)

    context[section] = context[section].reduce((result, sentence, idx) => {
      const candidates = sectionCandidates.filter(m => m.metric.sentenceIdx === idx)
      result = result.concat(candidates.map(c => c.text))
      result.push(sentence)
      return result
    }, [])
  }

  injectSignposts() {
    const { context } = this.state

    // Insert signposts
    let charCount = 0
    let signpostDistance = SC_SIGNPOST_INITIAL_DISTANCE
    context.sentences = context.sentences.reduceRight((result, sentence, idx) => {
      charCount += sentence.length
      result.unshift(sentence)

      const newlineBefore = idx !== 0 ? !context.sentences[idx - 1].endsWith("\n") : false
      const newlineAfter = !sentence.startsWith("\n")
      const signpost = this.getFormattedEntry(this.signpost, newlineBefore, newlineAfter, false)

      if ((charCount + (idx !== 0 ? context.sentences[idx - 1].length : 0)) >= signpostDistance) {
        charCount = 0
        signpostDistance = SC_SIGNPOST_DISTANCE
        result.unshift(signpost)
      }

      return result
    }, [])
  }

  truncateContext() {
    const { context } = this.state

    let charCount = 0
    let cutoffReached = false
    const headerSize = context.header.join("").length
    const maxSize = info.maxChars - info.memoryLength

    // Sentence reducer
    const reduceSentences = (result, sentence) => {
      if (cutoffReached) return result
      if ((charCount + sentence.length + headerSize) >= maxSize) {
        cutoffReached = true
        return result
      }
      charCount += sentence.length
      result.unshift(sentence)
      return result
    }

    // Reduce sentences and history to be within maxSize
    context.sentences = context.sentences.reduceRight(reduceSentences, [])
    context.history = cutoffReached ? [] : context.history.reduceRight(reduceSentences, [])
  }

  getModifiedContext() {
    const { history, header, sentences, text } = this.state.context

    // Restore memory, clean context
    const contextMemory = (text && info.memoryLength) ? text.slice(0, info.memoryLength) : ""
    const rebuiltContext = [...history, ...header, ...sentences].join("")
    const finalContext = contextMemory && text.length > SC_SIGNPOST_INITIAL_DISTANCE ? `${contextMemory}${this.signpost}\n${rebuiltContext}` : contextMemory + rebuiltContext
    return finalContext.startsWith("\n") ? finalContext.slice(1) : finalContext
  }


  /*
   * INPUT MODIFIER
   * - Takes new command and refreshes context and HUD (if visible and enabled)
   * - Updates when valid command is entered into the prompt (ie, `/you John Smith`)
   * - Can clear state by executing the command without any arguments (ie, `/you`)
   * - Paragraph formatting is applied
   * - Scene break detection
   */
  inputModifier(text) {
    if (this.state.isDisabled && !text.startsWith("\n/enable")) return text
    this.initialize()

    let modifiedText = text

    // Check if no input (ie, prompt AI)
    if (!modifiedText) return modifiedText

    // Handle entry and relationship menus
    modifiedText = this.menuHandler(text)
    if (!modifiedText) return modifiedText

    // Detection for multi-line commands, filter out double ups of newlines
    modifiedText = text.split("\n").map(l => this.commandHandler(l)).join("\n")

    // Cleanup for commands
    if (["\n", "\n\n"].includes(modifiedText)) modifiedText = ""

    // Paragraph formatting
    if (this.state.isSpaced) modifiedText = this.paragraphFormatterPlugin.inputModifier(modifiedText)

    return modifiedText
  }

  /*
   * Input Modifier: Default Command Handler
   * - Handles all passed commands such as `/scene`, `/you` etc
   */
  commandHandler(text) {
    const { data, sections } = this.state

    // Check if a command was inputted
    let match = SC_RE.INPUT_CMD.exec(text)
    if (match) match = match.filter(v => !!v)
    if (!match || match.length < 2) return text

    // Check if the command was valid
    const cmd = match[1].toLowerCase()
    const params = match.length > 2 && match[2] ? match[2].trim() : undefined
    if (!this.commands.includes(cmd)) return text

    // Detect for Controls, handle state and perform actions (ie, hide HUD)
    if (this.controlCommands.includes(cmd)) {
      if (cmd === "debug") {
        this.state.isDebug = !this.state.isDebug
        if (this.state.isDebug) this.displayDebug()
        else state.message = ""
      }
      else if (cmd === "enable" || cmd === "disable") this.state.isDisabled = (cmd === "disable")
      else if (cmd === "show" || cmd === "hide") this.state.isHidden = (cmd === "hide")
      else if (cmd === "min" || cmd === "max") this.state.isMinimized = (cmd === "min")
      else if (cmd === "spacing") this.state.isSpaced = !this.state.isSpaced
      this.displayHUD()
      return ""
    } else {
      // If value passed assign it to the data store, otherwise delete it
      if (params) {
        data[cmd] = params
        if (cmd === "you") this.state.you = this.getInfoMatch(data.you) || {}
      }
      else {
        delete data[cmd]
        if (cmd === "you") this.state.you = {}
      }
    }

    // POV - Name, location and present company
    // Placed directly under Author's Notes
    const pov = []
    delete sections.pov
    if (data.you) pov.push(`You are ${this.appendPeriod(data.you)}`)
    if (data.at) pov.push(`You are at ${this.appendPeriod(data.at)}`)
    if (data.nearby) pov.push(`Nearby ${this.appendPeriod(data.nearby)}`)
    if (pov.length) sections.pov = pov.join(" ")

    // Scene - Used to provide the premise for generated context
    // Placed 1000 characters from the front of context
    delete sections.scene
    if (data.scene) sections.scene = this.replaceYou(this.toTitleCase(this.appendPeriod(data.scene)))

    // Think - Use to nudge a story in a certain direction
    // Placed 550 characters from the front of context
    delete sections.think
    if (data.think) sections.think = this.replaceYou(this.toTitleCase(this.appendPeriod(data.think)))

    // Focus - Use to force a narrative or story direction
    // Placed 150 characters from the front of context
    delete sections.focus
    if (data.focus) sections.focus = this.replaceYou(this.toTitleCase(this.appendPeriod(data.focus)))

    // Update context
    this.parseContext()

    return ""
  }

  /*
   * Input Modifier: Entry and Relationship Command Handler
   * - Used for updating and creating new entries/relationships
   */
  menuHandler(text) {
    const { creator, you } = this.state
    const modifiedText = text.slice(1)

    // Already processing input
    if (creator.step) {
      this.menuNavHandler(modifiedText)
      return ""
    }

    // Quick refresh key
    if (modifiedText === SC_SHORTCUT.EXIT) {
      this.parseContext()
      return ""
    }

    // Quick check to return early if possible
    if (!modifiedText.startsWith("/") || modifiedText.includes("\n")) return text

    // Match a command
    let match = SC_RE.INPUT_CMD.exec(modifiedText)
    if (match) match = match.filter(v => !!v)
    if (!match || match.length < 2) return text

    // Ensure correct command is passed, grab label if applicable
    let cmd = match[1].toLowerCase()
    if (!this.creatorCommands.includes(cmd)) return text

    // Do find/search and display
    if (this.findCommands.includes(cmd)) {
      creator.cmd = cmd
      creator.searchPattern = match.length >= 3 ? match[2] : ".*"
      this.state.exitCreator = true
      this.displayHUD()
      this.state.creator = {}
      return ""
    }

    // Label and icon matching for most commands
    let [label, icon] = match.length >= 3 ? match[2].split(":").map(m => m.trim()) : ["you"]
    label = label && label.trim()
    icon = icon && icon.trim()

    // Store current message away to restore once done
    creator.previousMessage = state.message
    creator.cmd = cmd
    creator.originalLabel = label

    if (this.notesCommands.includes(cmd)) {
      // Setup page
      creator.page = SC_UI_PAGE.NOTES_EDITOR
      creator.currentPage = 1
      creator.totalPages = 2
      creator.data = Object.assign({}, this.notes.data)
      this.menuEditorNoteStep()
      return ""
    }

    // Shortcuts for "/e you"
    if (!label || label.toLowerCase() === "you") {
      if (you.id && !this.titleCommands.includes(cmd)) label = you.data.label
      else {
        this.menuExit()
        return ""
      }
    }

    const existing = this.entries[label]
    if (this.relationsCommands.includes(cmd) && !existing) {
      this.messageOnce(`${SC_UI_ICON.ERROR} ERROR! Entry with that label does not exist, try creating it with '/entry ${label}${icon ? `:${icon}` : ""}' before continuing.`, false)
      this.menuExit()
      return ""
    }

    // Do title menu init
    if (this.titleCommands.includes(cmd)) {
      this.setTitleSource(label)

      // Add/update icon
      this.menuHandleIcon(icon)

      // Setup page
      creator.page = SC_UI_PAGE.TITLE_TARGET
      creator.currentPage = 1
      creator.totalPages = 2

      // Direct to correct menu
      this.menuTargetCategoryStep()
    }
    else {
      // Preload entry if found, otherwise setup default values
      this.setEntrySource(existing || label)

      // Add/update icon
      this.menuHandleIcon(icon)

      // Setup page
      creator.page = this.entryCommands.includes(cmd) ? SC_UI_PAGE.ENTRY_INJECTIONS : SC_UI_PAGE.ENTRY_RELATIONS
      creator.currentPage = this.entryCommands.includes(cmd) ? 1 : 2
      creator.totalPages = 2

      // Direct to correct menu
      if (this.entryCommands.includes(cmd)) {
        if (!creator.data.category) this.menuCategoryStep()
        else this.menuMainStep()
      }
      else {
        this.menuRelationsFirstStep()
      }
    }

    return ""
  }

  menuHandleIcon(icon) {
    const { creator } = this.state
    if (icon === undefined) return
    if (creator.data.icon) this.removeStat(creator.data.icon)
    if (!icon) delete creator.data.icon
    else creator.data.icon = icon
    creator.hasChanged = true
  }

  menuCurrentStep() {
    const { creator } = this.state
    const handlerString = `menu${creator.step}Step`
    if (typeof this[handlerString] === 'function') this[handlerString]()
    else this.menuExit()
  }

  menuRelationsFirstStep() {
    const { creator } = this.state
    if (SC_RELATABLE.includes(creator.data.category)) this.menuContactsStep()
    else if (creator.data.category === SC_CATEGORY.LOCATION) this.menuNounStep()
    else if (creator.data.category === SC_CATEGORY.THING) this.menuComponentsStep()
    else this.menuOwnersStep()
  }

  menuNavHandler(text) {
    const { creator } = this.state

    // Exit handling
    if (text === SC_SHORTCUT.EXIT) {
      if (creator.hasChanged) return this.menuConfirmStep()
      else return this.menuExit()
    }

    // Previous page (and next page since all menu's only have the 2 pages so far)
    else if (text === SC_SHORTCUT.PREV_PAGE || text === SC_SHORTCUT.NEXT_PAGE) {
      if (creator.page === SC_UI_PAGE.ENTRY_INJECTIONS) {
        if (!creator.data) return this.menuCategoryStep()
        creator.currentPage = 2
        creator.page = SC_UI_PAGE.ENTRY_RELATIONS
        this.menuRelationsFirstStep()
      }

      else if (creator.page === SC_UI_PAGE.ENTRY_RELATIONS) {
        creator.currentPage = 1
        creator.page = SC_UI_PAGE.ENTRY_INJECTIONS
        this.menuMainStep()
      }

      else if (creator.page === SC_UI_PAGE.TITLE_TARGET) {
        creator.currentPage = 2
        creator.page = SC_UI_PAGE.TITLE_SOURCE
        this.menuSourceCategoryStep()
      }

      else if (creator.page === SC_UI_PAGE.TITLE_SOURCE) {
        creator.currentPage = 1
        creator.page = SC_UI_PAGE.TITLE_TARGET
        this.menuTargetCategoryStep()
      }

      else if (creator.page === SC_UI_PAGE.NOTES_EDITOR) {
        creator.currentPage = 2
        creator.page = SC_UI_PAGE.NOTES_AUTHOR
        this.menuAuthorNoteStep()
      }

      else if (creator.page === SC_UI_PAGE.NOTES_AUTHOR) {
        creator.currentPage = 1
        creator.page = SC_UI_PAGE.NOTES_EDITOR
        this.menuEditorNoteStep()
      }
    }

    // Goto field
    else if (text.startsWith(SC_SHORTCUT.GOTO)) {
      const index = Number(text.slice(1))
      if (!(index > 0)) return this.menuCurrentStep()

      if (creator.page === SC_UI_PAGE.ENTRY_INJECTIONS) {
        if (!creator.data) return this.menuCategoryStep()
        const { category } = creator.data

        let keys
        if (category === SC_CATEGORY.CHARACTER) keys = SC_ENTRY_CHARACTER_KEYS
        else if (category === SC_CATEGORY.FACTION) keys = SC_ENTRY_FACTION_KEYS
        else if (category === SC_CATEGORY.LOCATION) keys = SC_ENTRY_LOCATION_KEYS
        else if (category === SC_CATEGORY.THING) keys = SC_ENTRY_THING_KEYS
        else keys = SC_ENTRY_OTHER_KEYS
        keys = ["keys", ...keys]

        if (index > keys.length) return this.menuCurrentStep()
        creator.step = this.toTitleCase(keys[index - 1])
        return this.menuCurrentStep()
      }
      else if (creator.page === SC_UI_PAGE.ENTRY_RELATIONS) {
        if (!creator.data) return this.menuCategoryStep()
        const { category } = creator.data

        let keys
        if (category === SC_CATEGORY.CHARACTER) keys = SC_REL_CHARACTER_KEYS
        else if (category === SC_CATEGORY.FACTION) keys = SC_REL_FACTION_KEYS
        else if (category === SC_CATEGORY.LOCATION) keys = SC_REL_LOCATION_KEYS
        else if (category === SC_CATEGORY.THING) keys = SC_REL_THING_KEYS
        else keys = SC_REL_OTHER_KEYS

        if (index > keys.length) return this.menuCurrentStep()
        creator.step = this.toTitleCase(keys[index - 1])
        return this.menuCurrentStep()
      }
      else if ([SC_UI_PAGE.TITLE_TARGET, SC_UI_PAGE.TITLE_SOURCE].includes(creator.page)) {
        const keys = creator.page === SC_UI_PAGE.TITLE_TARGET ? SC_TITLE_KEYS : SC_TITLE_SOURCE_KEYS
        if (index > keys.length) return this.menuCurrentStep()
        creator.step = this.toTitleCase(keys[index - 1])
        return this.menuCurrentStep()
      }
      else {
        const keys = creator.page === SC_UI_PAGE.NOTES_EDITOR ? SC_NOTES_EDITOR_KEYS : SC_NOTES_AUTHOR_KEYS
        if (index > keys.length) return this.menuCurrentStep()
        creator.step = this.toTitleCase(keys[index - 1])
        return this.menuCurrentStep()
      }
    }

    // Hints toggling
    else if (text === SC_SHORTCUT.HINTS) {
      this.state.showHints = !this.state.showHints
      return this.menuCurrentStep()
    }

    // Dynamically execute function based on step
    else {
      const handlerString = `menu${creator.step}Handler`
      if (typeof this[handlerString] === 'function') this[handlerString](text)
      else this.menuExit()
    }
  }

  // noinspection JSUnusedGlobalSymbols
  menuCategoryHandler(text) {
    const { creator } = this.state
    const cmd = text.slice(0, 1).toUpperCase()

    // Must fill in this field
    if (cmd === "C") this.setEntryJson(SC_DATA.CATEGORY, SC_CATEGORY.CHARACTER)
    else if (cmd === "F") this.setEntryJson(SC_DATA.CATEGORY, SC_CATEGORY.FACTION)
    else if (cmd === "L") {
      this.setEntryJson(SC_DATA.CATEGORY, SC_CATEGORY.LOCATION)
      if (text !== SC_SHORTCUT.DELETE) this.state.creator.data[SC_DATA.NOUN] = "room"
    }
    else if (cmd === "T") this.setEntryJson(SC_DATA.CATEGORY, SC_CATEGORY.THING)
    else if (cmd === "O") this.setEntryJson(SC_DATA.CATEGORY, SC_CATEGORY.OTHER)
    else return this.menuCategoryStep()

    creator.hasChanged = true
    this.menuMainStep()
  }

  menuCategoryStep() {
    const { creator } = this.state
    creator.step = "Category"
    this.displayMenuHUD(`${SC_UI_ICON.CATEGORY} Enter the CATEGORY for this entry: (c/f/l/t/o)`, true, false, SC_VALID_CATEGORY)
  }

  // noinspection JSUnusedGlobalSymbols
  menuLabelHandler(text) {
    const { creator } = this.state

    if (text === SC_SHORTCUT.PREV) return this.menuLabelStep()
    else if (text === SC_SHORTCUT.NEXT) return this.menuKeysStep()
    else if (text === SC_SHORTCUT.DELETE) return this.menuConfirmStep(true)

    let [label, icon] = text.split(",")[0].split(":").map(m => m.trim())
    if (!label) return this.menuLabelStep()

    if (label !== creator.originalLabel && label !== creator.data.label && this.entries[label]) {
      return this.displayMenuHUD(`${SC_UI_ICON.ERROR} ERROR! Entry with that label already exists, try again!`)
    }

    creator.keys = `${SC_WI_ENTRY}${label}`
    creator.data.label = label
    creator.hasChanged = true

    // Add/update icon
    if (creator.data.icon) this.removeStat(creator.data.icon)
    if (!icon) delete creator.data.icon
    else creator.data.icon = icon

    this.menuLabelStep()
  }

  menuLabelStep() {
    const { creator } = this.state
    creator.step = "Label"
    this.displayMenuHUD(`${SC_UI_ICON.LABEL} Enter the LABEL used to refer to this entry: `)
  }

  // noinspection JSUnusedGlobalSymbols
  menuKeysHandler(text) {
    const { creator } = this.state

    if (text === SC_SHORTCUT.PREV) return this.menuLabelStep()
    else if (text === SC_SHORTCUT.NEXT) return this.menuMainStep()

    // Ensure valid regex
    const trigger = this.getEntryRegex(text)
    if (!trigger) return this.displayMenuHUD(`${SC_UI_ICON.ERROR} ERROR! Invalid regex detected in keys, try again!`)
    this.setEntryJson(SC_DATA.TRIGGER, trigger.toString())
    creator.hasChanged = true
    return this.menuKeysStep()
  }

  menuKeysStep() {
    const { creator } = this.state
    creator.step = "Keys"
    this.displayMenuHUD(`${SC_UI_ICON.KEYS} Enter the KEYS used to trigger entry injection:`)
  }

  // noinspection JSUnusedGlobalSymbols
  menuMainHandler(text) {
    const { creator } = this.state
    const { category } = creator.data

    if (text === SC_SHORTCUT.PREV) return this.menuKeysStep()
    else if (text !== SC_SHORTCUT.NEXT) {
      this.setEntryJson(SC_DATA.MAIN, text)
      creator.data.pronoun = this.getPronoun(creator.data[SC_DATA.MAIN])
      creator.hasChanged = true
    }

    if (category === SC_CATEGORY.FACTION) return this.menuTopicStep()
    else return this.menuSeenStep()
  }

  menuMainStep() {
    const { creator } = this.state
    creator.step = this.toTitleCase(SC_DATA.MAIN)
    this.displayMenuHUD(`${SC_UI_ICON[SC_DATA.MAIN.toUpperCase()]} Enter MAIN content to inject when this entries keys are found:`)
  }

  // noinspection JSUnusedGlobalSymbols
  menuSeenHandler(text) {
    const { creator } = this.state
    const { category } = creator.data

    if (text === SC_SHORTCUT.PREV) return this.menuMainStep()
    else if (text !== SC_SHORTCUT.NEXT) {
      this.setEntryJson(SC_DATA.SEEN, text)
      creator.hasChanged = true
    }

    if (category === SC_CATEGORY.LOCATION) this.menuTopicStep()
    else if (category === SC_CATEGORY.THING) this.menuTopicStep()
    else this.menuHeardStep()
  }

  menuSeenStep() {
    const { creator } = this.state
    creator.step = this.toTitleCase(SC_DATA.SEEN)
    this.displayMenuHUD(`${SC_UI_ICON[SC_DATA.SEEN.toUpperCase()]} Enter content to inject when this entry is SEEN:`)
  }

  // noinspection JSUnusedGlobalSymbols
  menuHeardHandler(text) {
    const { creator } = this.state
    if (text === SC_SHORTCUT.PREV) return this.menuSeenStep()
    else if (text !== SC_SHORTCUT.NEXT) {
      this.setEntryJson(SC_DATA.HEARD, text)
      creator.hasChanged = true
    }
    this.menuTopicStep()
  }

  menuHeardStep() {
    const { creator } = this.state
    creator.step = this.toTitleCase(SC_DATA.HEARD)
    this.displayMenuHUD(`${SC_UI_ICON[SC_DATA.HEARD.toUpperCase()]} Enter content to inject when this entry is HEARD:`)
  }

  // noinspection JSUnusedGlobalSymbols
  menuTopicHandler(text) {
    const { creator } = this.state
    const { category } = creator.data

    if (text === SC_SHORTCUT.PREV) {
      if (category === SC_CATEGORY.FACTION) return this.menuMainStep()
      else if (category === SC_CATEGORY.LOCATION) return this.menuSeenStep()
      else if (category === SC_CATEGORY.THING) return this.menuSeenStep()
      return this.menuHeardStep()
    }
    else if (text !== SC_SHORTCUT.NEXT) {
      this.setEntryJson(SC_DATA.TOPIC, text)
      creator.hasChanged = true
    }

    this.menuTopicStep()
  }

  menuTopicStep() {
    const { creator } = this.state
    creator.step = this.toTitleCase(SC_DATA.TOPIC)
    this.displayMenuHUD(`${SC_UI_ICON[SC_DATA.TOPIC.toUpperCase()]} Enter content to inject when this entry is the TOPIC of conversation:`)
  }

  // noinspection JSUnusedGlobalSymbols
  menuContactsHandler(text) {
    const { creator } = this.state
    const { category } = creator.data

    if (text === SC_SHORTCUT.PREV) return this.menuContactsStep()
    else if (text === SC_SHORTCUT.NEXT) {
      if (category === SC_CATEGORY.FACTION) return this.menuPropertyStep()
      else return this.menuParentsStep()
    }
    else if (text === SC_SHORTCUT.DELETE) {
      if (creator.data[SC_DATA.CONTACTS]) {
        delete creator.data[SC_DATA.CONTACTS]
        creator.hasChanged = true
      }
      return this.menuContactsStep()
    }

    let rel = this.getRelAdjusted(text, creator.data, SC_DATA.CONTACTS, SC_RELATABLE)
    rel = this.excludeRelations(rel, creator.data, SC_DATA.PARENTS)
    rel = this.excludeRelations(rel, creator.data, SC_DATA.CHILDREN)
    const relText = this.getRelCombinedText(rel)
    if (!relText) delete creator.data[SC_DATA.CONTACTS]
    else creator.data[SC_DATA.CONTACTS] = relText
    creator.hasChanged = true
    this.menuContactsStep()
  }

  menuContactsStep() {
    const { creator } = this.state
    creator.step = this.toTitleCase(SC_DATA.CONTACTS)
    this.displayMenuHUD(`${SC_UI_ICON[SC_DATA.CONTACTS.toUpperCase()]} Enter comma separated list of CONTACTS:`, true, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuNounHandler(text) {
    const { creator } = this.state

    if (text === SC_SHORTCUT.PREV) return this.menuNounStep()
    else if (text === SC_SHORTCUT.NEXT) {
      if (!creator.data[SC_DATA.NOUN]) return this.menuNounStep()
      return this.menuAreasStep()
    }
    else if (text === SC_SHORTCUT.DELETE) {
      if (creator.data[SC_DATA.NOUN]) {
        delete creator.data[SC_DATA.NOUN]
        creator.hasChanged = true
      }
      return this.menuNounStep()
    }

    creator.data[SC_DATA.NOUN] = text
    creator.hasChanged = true
    this.menuNounStep()
  }

  menuNounStep() {
    const { creator } = this.state
    creator.step = this.toTitleCase(SC_DATA.NOUN)
    this.displayMenuHUD(`${SC_UI_ICON[SC_DATA.NOUN.toUpperCase()]} Enter the NOUN used to describe this location (ie, room):`, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuAreasHandler(text) {
    const { creator } = this.state

    if (text === SC_SHORTCUT.PREV) return this.menuNounStep()
    else if (text === SC_SHORTCUT.NEXT) return this.menuThingsStep()
    else if (text === SC_SHORTCUT.DELETE) {
      if (creator.data[SC_DATA.AREAS]) {
        delete creator.data[SC_DATA.AREAS]
        creator.hasChanged = true
      }
      return this.menuAreasStep()
    }

    let rel = this.getRelAdjusted(text, creator.data, SC_DATA.AREAS, [SC_CATEGORY.LOCATION])
    const relText = this.getRelCombinedText(rel)
    if (!relText) delete creator.data[SC_DATA.AREAS]
    else creator.data[SC_DATA.AREAS] = relText
    creator.hasChanged = true
    this.menuAreasStep()
  }

  menuAreasStep() {
    const { creator } = this.state
    creator.step = this.toTitleCase(SC_DATA.AREAS)
    this.displayMenuHUD(`${SC_UI_ICON[SC_DATA.AREAS.toUpperCase()]} Enter comma separated list of AREAS:`, true, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuThingsHandler(text) {
    const { creator } = this.state

    if (text === SC_SHORTCUT.PREV) return this.menuAreasStep()
    else if (text === SC_SHORTCUT.NEXT) return this.menuOwnersStep()
    else if (text === SC_SHORTCUT.DELETE) {
      if (creator.data[SC_DATA.THINGS]) {
        delete creator.data[SC_DATA.THINGS]
        creator.hasChanged = true
      }
      return this.menuThingsStep()
    }

    let rel = this.getRelAdjusted(text, creator.data, SC_DATA.THINGS, [SC_CATEGORY.THING])
    const relText = this.getRelCombinedText(rel)
    if (!relText) delete creator.data[SC_DATA.THINGS]
    else creator.data[SC_DATA.THINGS] = relText
    creator.hasChanged = true
    this.menuThingsStep()
  }

  menuThingsStep() {
    const { creator } = this.state
    creator.step = this.toTitleCase(SC_DATA.THINGS)
    this.displayMenuHUD(`${SC_UI_ICON[SC_DATA.THINGS.toUpperCase()]} Enter comma separated list of THINGS:`, true, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuComponentsHandler(text) {
    const { creator } = this.state

    if (text === SC_SHORTCUT.PREV) return this.menuComponentsStep()
    else if (text === SC_SHORTCUT.NEXT) return this.menuOwnersStep()
    else if (text === SC_SHORTCUT.DELETE) {
      if (creator.data[SC_DATA.COMPONENTS]) {
        delete creator.data[SC_DATA.COMPONENTS]
        creator.hasChanged = true
      }
      return this.menuComponentsStep()
    }

    let rel = this.getRelAdjusted(text, creator.data, SC_DATA.COMPONENTS, [SC_CATEGORY.THING])
    const relText = this.getRelCombinedText(rel)
    if (!relText) delete creator.data[SC_DATA.COMPONENTS]
    else creator.data[SC_DATA.COMPONENTS] = relText
    creator.hasChanged = true
    this.menuComponentsStep()
  }

  menuComponentsStep() {
    const { creator } = this.state
    creator.step = this.toTitleCase(SC_DATA.COMPONENTS)
    this.displayMenuHUD(`${SC_UI_ICON[SC_DATA.COMPONENTS.toUpperCase()]} Enter comma separated list of COMPONENTS:`, true, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuParentsHandler(text) {
    const { creator } = this.state

    if (text === SC_SHORTCUT.PREV) return this.menuContactsStep()
    else if (text === SC_SHORTCUT.NEXT) return this.menuChildrenStep()
    else if (text === SC_SHORTCUT.DELETE) {
      if (creator.data[SC_DATA.PARENTS]) {
        delete creator.data[SC_DATA.PARENTS]
        creator.hasChanged = true
      }
      return this.menuParentsStep()
    }

    let rel = this.getRelAdjusted(text, creator.data, SC_DATA.PARENTS, [SC_CATEGORY.CHARACTER])
    rel = this.excludeRelations(rel, creator.data, SC_DATA.CHILDREN)
    this.exclusiveRelations(rel, creator.data, SC_DATA.CONTACTS)
    const relText = this.getRelCombinedText(rel)
    if (!relText) delete creator.data[SC_DATA.PARENTS]
    else creator.data[SC_DATA.PARENTS] = relText
    creator.hasChanged = true
    this.menuParentsStep()
  }

  menuParentsStep() {
    const { creator } = this.state
    creator.step = this.toTitleCase(SC_DATA.PARENTS)
    this.displayMenuHUD(`${SC_UI_ICON[SC_DATA.PARENTS.toUpperCase()]} Enter comma separated list of PARENTS:`, true, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuChildrenHandler(text) {
    const { creator } = this.state

    if (text === SC_SHORTCUT.PREV) return this.menuParentsStep()
    else if (text === SC_SHORTCUT.NEXT) return this.menuPropertyStep()
    else if (text === SC_SHORTCUT.DELETE) {
      if (creator.data[SC_DATA.CHILDREN]) {
        delete creator.data[SC_DATA.CHILDREN]
        creator.hasChanged = true
      }
      return this.menuChildrenStep()
    }

    let rel = this.getRelAdjusted(text, creator.data, SC_DATA.CHILDREN, [SC_CATEGORY.CHARACTER])
    rel = this.excludeRelations(rel, creator.data, SC_DATA.PARENTS)
    this.exclusiveRelations(rel, creator.data, SC_DATA.CONTACTS)
    const relText = this.getRelCombinedText(rel)
    if (!relText) delete creator.data[SC_DATA.CHILDREN]
    else creator.data[SC_DATA.CHILDREN] = relText
    creator.hasChanged = true
    this.menuChildrenStep()
  }

  menuChildrenStep() {
    const { creator } = this.state
    creator.step = this.toTitleCase(SC_DATA.CHILDREN)
    this.displayMenuHUD(`${SC_UI_ICON[SC_DATA.CHILDREN.toUpperCase()]} Enter comma separated list of CHILDREN:`, true, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuPropertyHandler(text) {
    const { creator } = this.state
    const { category } = creator.data

    if (text === SC_SHORTCUT.PREV) {
      if (category === SC_CATEGORY.FACTION) return this.menuContactsStep()
      else return this.menuChildrenStep()
    }
    else if (text === SC_SHORTCUT.NEXT) return this.menuOwnersStep()
    else if (text === SC_SHORTCUT.DELETE) {
      if (creator.data[SC_DATA.PROPERTY]) {
        delete creator.data[SC_DATA.PROPERTY]
        creator.hasChanged = true
      }
      return this.menuPropertyStep()
    }

    let rel = this.getRelAdjusted(text, creator.data, SC_DATA.PROPERTY)
    rel = this.excludeRelations(rel, creator.data, SC_DATA.OWNERS)
    this.exclusiveRelations(rel, creator.data, SC_DATA.CONTACTS)
    const relText = this.getRelCombinedText(rel)
    if (!relText) delete creator.data[SC_DATA.PROPERTY]
    else creator.data[SC_DATA.PROPERTY] = relText
    creator.hasChanged = true
    this.menuPropertyStep()
  }

  menuPropertyStep() {
    const { creator } = this.state
    creator.step = this.toTitleCase(SC_DATA.PROPERTY)
    this.displayMenuHUD(`${SC_UI_ICON[SC_DATA.PROPERTY.toUpperCase()]} Enter comma separated list of PROPERTY:`, true, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuOwnersHandler(text) {
    const { creator } = this.state
    const { category } = creator.data

    if (text === SC_SHORTCUT.PREV) {
      if (SC_RELATABLE.includes(category)) return this.menuPropertyStep()
      else if (category === SC_CATEGORY.LOCATION) return this.menuThingsStep()
      else if (category === SC_CATEGORY.THING) return this.menuComponentsStep()
      else return this.menuOwnersStep()
    }
    else if (text === SC_SHORTCUT.NEXT) return this.menuOwnersStep()
    else if (text === SC_SHORTCUT.DELETE) {
      if (creator.data[SC_DATA.OWNERS]) {
        delete creator.data[SC_DATA.OWNERS]
        creator.hasChanged = true
      }
      return this.menuOwnersStep()
    }

    let rel = this.getRelAdjusted(text, creator.data, SC_DATA.OWNERS, SC_RELATABLE)
    rel = this.excludeRelations(rel, creator.data, SC_DATA.PROPERTY)
    this.exclusiveRelations(rel, creator.data, SC_DATA.CONTACTS)
    const relText = this.getRelCombinedText(rel)
    if (!relText) delete creator.data[SC_DATA.OWNERS]
    else creator.data[SC_DATA.OWNERS] = relText
    creator.hasChanged = true
    this.menuOwnersStep()
  }

  menuOwnersStep() {
    const { creator } = this.state
    creator.step = this.toTitleCase(SC_DATA.OWNERS)
    this.displayMenuHUD(`${SC_UI_ICON[SC_DATA.OWNERS.toUpperCase()]} Enter comma separated list of OWNERS:`, true, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuTitleHandler(text) {
    const { creator } = this.state

    if (text === SC_SHORTCUT.PREV) return this.menuTitleStep()
    else if (text === SC_SHORTCUT.NEXT) return this.menuMatchStep()
    else if (text === SC_SHORTCUT.DELETE) return this.menuConfirmStep(true)

    let [title, icon] = text.split(",")[0].split(":").map(m => m.trim())
    if (!title) return this.menuTitleStep()

    if (title !== creator.originalLabel && title !== creator.data.title && this.titles[title]) {
      return this.displayMenuHUD(`${SC_UI_ICON.ERROR} ERROR! Title with that name already exists, try again!`)
    }

    creator.keys = `${SC_WI_TITLE}${title}`
    creator.data.title = title
    creator.hasChanged = true

    // Add/update icon
    if (creator.data.icon) this.removeStat(creator.data.icon)
    if (!icon) delete creator.data.icon
    else creator.data.icon = icon

    this.menuTitleStep()
  }

  menuTitleStep() {
    const { creator } = this.state
    creator.step = "Title"
    this.displayMenuHUD(`${SC_UI_ICON.TITLE} Enter the TITLE to display: `)
  }

  // noinspection JSUnusedGlobalSymbols
  menuMatchHandler(text) {
    const { creator } = this.state

    if (text === SC_SHORTCUT.PREV) return this.menuTitleStep()
    else if (text === SC_SHORTCUT.NEXT) {
      if (creator.page === SC_UI_PAGE.TITLE_TARGET) return this.menuTargetCategoryStep()
      else return this.menuSourceCategoryStep()
    }
    else if (text === SC_SHORTCUT.DELETE) {
      creator.data.keys = (new RegExp(creator.data.title)).toString()
      return this.menuMatchStep()
    }

    // Ensure valid regex if regex key
    const key = this.getEntryRegex(text)
    if (!key) return this.displayMenuHUD(`${SC_UI_ICON.ERROR} ERROR! Invalid regex detected in match, try again!`)

    // Update keys to regex format
    creator.data.trigger = key.toString()
    creator.hasChanged = true
    this.menuMatchStep()
  }

  menuMatchStep() {
    const { creator } = this.state
    creator.step = "Match"
    this.displayMenuHUD(`${SC_UI_ICON.MATCH} Enter the keys to MATCH when doing extended pronoun matching: `)
  }

  // noinspection JSUnusedGlobalSymbols
  menuTargetCategoryHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuMatchStep()
    else if (text !== SC_SHORTCUT.NEXT) {
      if (this.setTitleJson(text, "target", "category", SC_VALID_CATEGORY)) this.menuTargetDispStep()
    }
    else this.menuTargetDispStep()
  }

  menuTargetCategoryStep() {
    const { creator } = this.state
    creator.step = "TargetCategory"
    this.displayMenuHUD(`${SC_UI_ICON.CATEGORY} (Target) Enter the CATEGORIES to filter by: `, true, false, SC_VALID_CATEGORY)
  }

  // noinspection JSUnusedGlobalSymbols
  menuTargetDispHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuTargetCategoryStep()
    else if (text !== SC_SHORTCUT.NEXT) {
      if (this.setTitleJson(text, "target", "disp", SC_VALID_DISP)) this.menuTargetTypeStep()
    }
    else this.menuTargetTypeStep()
  }

  menuTargetDispStep() {
    const { creator } = this.state
    creator.step = "TargetDisp"
    this.displayMenuHUD(`${SC_UI_ICON.DISP} (Target) Enter the relationship DISPOSITIONS to filter by: `, true, false, SC_VALID_DISP)
  }

  // noinspection JSUnusedGlobalSymbols
  menuTargetTypeHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuTargetDispStep()
    else if (text !== SC_SHORTCUT.NEXT) {
      if (this.setTitleJson(text, "target", "type", SC_VALID_TYPE)) this.menuTargetModStep()
    }
    else this.menuTargetModStep()
  }

  menuTargetTypeStep() {
    const { creator } = this.state
    creator.step = "TargetType"
    this.displayMenuHUD(`${SC_UI_ICON.TYPE} (Target) Enter the relationship TYPES to filter by: `, true, false, SC_VALID_TYPE)
  }

  // noinspection JSUnusedGlobalSymbols
  menuTargetModHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuTargetTypeStep()
    else if (text !== SC_SHORTCUT.NEXT) {
      if (this.setTitleJson(text, "target", "mod", SC_VALID_MOD)) this.menuTargetPronounStep()
    }
    else this.menuTargetPronounStep()
  }

  menuTargetModStep() {
    const { creator } = this.state
    creator.step = "TargetMod"
    this.displayMenuHUD(`${SC_UI_ICON.MOD} (Target) Enter the relationship MODIFIERS to filter by: `, true, false, SC_VALID_MOD)
  }

  // noinspection JSUnusedGlobalSymbols
  menuTargetPronounHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuTargetModStep()
    else if (text !== SC_SHORTCUT.NEXT) {
      if (this.setTitleJson(text, "target", "pronoun", SC_VALID_PRONOUN)) this.menuTargetEntryStep()
    }
    else this.menuTargetEntryStep()
  }

  menuTargetPronounStep() {
    const { creator } = this.state
    creator.step = "TargetPronoun"
    this.displayMenuHUD(`${SC_UI_ICON.PRONOUN} (Target) Enter the PRONOUNS to filter by: `, true, false, SC_VALID_PRONOUN)
  }

  // noinspection JSUnusedGlobalSymbols
  menuTargetEntryHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuTargetPronounStep()
    else if (text !== SC_SHORTCUT.NEXT) {
      if (this.setTitleJson(text, "target", "entry")) this.menuScopeStep()
    }
    else this.menuScopeStep()
  }

  menuTargetEntryStep() {
    const { creator } = this.state
    creator.step = "TargetEntry"
    this.displayMenuHUD(`${SC_UI_ICON.ENTRY} (Target) Enter the entry LABELS to filter by: `)
  }

  // noinspection JSUnusedGlobalSymbols
  menuScopeHandler(text) {
    const { creator } = this.state

    if (text === SC_SHORTCUT.PREV) return this.menuTargetEntryStep()
    else if (text === SC_SHORTCUT.NEXT) return this.menuScopeStep()
    else if (text === SC_SHORTCUT.DELETE) {
      delete creator.data.scope
      creator.hasChanged = true
      return this.menuScopeStep()
    }

    // Validate data
    const values = text.toLowerCase().split(",").map(i => i.trim()).reduce((a, c) => a.concat(SC_VALID_SCOPE.includes(c) ? [c] : []), [])
    if (!values.length) return this.displayMenuHUD(`${SC_UI_ICON.ERROR} ERROR! Invalid scope detected, options are: ${SC_VALID_SCOPE.join(", ")}`)

    // Update data
    creator.data.scope = values.join(", ")
    creator.hasChanged = true
    return this.menuScopeStep()
  }

  menuScopeStep() {
    const { creator } = this.state
    creator.step = "Scope"
    this.displayMenuHUD(`${SC_UI_ICON.SCOPE} (Target) Enter the SCOPES to filter by: `, true, false, SC_VALID_SCOPE)
  }

  // noinspection JSUnusedGlobalSymbols
  menuSourceCategoryHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuMatchStep()
    else if (text !== SC_SHORTCUT.NEXT) {
      if (this.setTitleJson(text, "source", "category", SC_VALID_CATEGORY)) this.menuSourceDispStep()
    }
    else this.menuSourceDispStep()
  }

  menuSourceCategoryStep() {
    const { creator } = this.state
    creator.step = "SourceCategory"
    this.displayMenuHUD(`${SC_UI_ICON.CATEGORY} (Source) Enter the CATEGORIES to filter by: `, true, false, SC_VALID_CATEGORY)
  }

  // noinspection JSUnusedGlobalSymbols
  menuSourceDispHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuSourceCategoryStep()
    else if (text !== SC_SHORTCUT.NEXT) {
      if (this.setTitleJson(text, "source", "disp", SC_VALID_DISP)) this.menuSourceTypeStep()
    }
    else this.menuSourceTypeStep()
  }

  menuSourceDispStep() {
    const { creator } = this.state
    creator.step = "SourceDisp"
    this.displayMenuHUD(`${SC_UI_ICON.DISP} (Source) Enter the relationship DISPOSITIONS to filter by: `, true, false, SC_VALID_DISP)
  }

  // noinspection JSUnusedGlobalSymbols
  menuSourceTypeHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuSourceDispStep()
    else if (text !== SC_SHORTCUT.NEXT) {
      if (this.setTitleJson(text, "source", "type", SC_VALID_TYPE)) this.menuSourceModStep()
    }
    else this.menuSourceModStep()
  }

  menuSourceTypeStep() {
    const { creator } = this.state
    creator.step = "SourceType"
    this.displayMenuHUD(`${SC_UI_ICON.TYPE} (Source) Enter the relationship TYPES to filter by: `, true, false, SC_VALID_TYPE)
  }

  // noinspection JSUnusedGlobalSymbols
  menuSourceModHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuSourceTypeStep()
    else if (text !== SC_SHORTCUT.NEXT) {
      if (this.setTitleJson(text, "source", "mod", SC_VALID_MOD)) this.menuSourcePronounStep()
    }
    else this.menuSourcePronounStep()
  }

  menuSourceModStep() {
    const { creator } = this.state
    creator.step = "SourceMod"
    this.displayMenuHUD(`${SC_UI_ICON.MOD} (Source) Enter the relationship MODS to filter by: `, true, false, SC_VALID_MOD)
  }

  // noinspection JSUnusedGlobalSymbols
  menuSourcePronounHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuSourceModStep()
    else if (text !== SC_SHORTCUT.NEXT) {
      if (this.setTitleJson(text, "source", "pronoun", SC_VALID_PRONOUN)) this.menuSourceEntryStep()
    }
    else this.menuSourceEntryStep()
  }

  menuSourcePronounStep() {
    const { creator } = this.state
    creator.step = "SourcePronoun"
    this.displayMenuHUD(`${SC_UI_ICON.PRONOUN} (Source) Enter the PRONOUNS to filter by: `, true, false, SC_VALID_PRONOUN)
  }

  // noinspection JSUnusedGlobalSymbols
  menuSourceEntryHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuSourcePronounStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setTitleJson(text, "source", "entry")
    this.menuSourceEntryStep()
  }

  menuSourceEntryStep() {
    const { creator } = this.state
    creator.step = "SourceEntry"
    this.displayMenuHUD(`${SC_UI_ICON.ENTRY} (Source) Enter the entry LABELS to filter by: `)
  }

  // noinspection JSUnusedGlobalSymbols
  menuEditorNoteHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuEditorNoteStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setNotesJson(text, "editor", "note")
    return this.menuEditorRatingStep()
  }

  menuEditorNoteStep() {
    const { creator } = this.state
    creator.step = "EditorNote"
    this.displayMenuHUD(`${SC_UI_ICON.NOTE} (Editor) Enter the NOTE to insert: `, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuEditorRatingHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuEditorNoteStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setNotesJson(text, "editor", "rating")
    return this.menuEditorStyleStep()
  }

  menuEditorRatingStep() {
    const { creator } = this.state
    creator.step = "EditorRating"
    this.displayMenuHUD(`${SC_UI_ICON.RATING} (Editor) Enter the RATING to insert: `, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuEditorStyleHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuEditorRatingStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setNotesJson(text, "editor", "style")
    return this.menuEditorGenreStep()
  }

  menuEditorStyleStep() {
    const { creator } = this.state
    creator.step = "EditorStyle"
    this.displayMenuHUD(`${SC_UI_ICON.STYLE} (Editor) Enter the STYLE to insert: `, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuEditorGenreHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuEditorStyleStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setNotesJson(text, "editor", "genre")
    return this.menuEditorSettingStep()
  }

  menuEditorGenreStep() {
    const { creator } = this.state
    creator.step = "EditorGenre"
    this.displayMenuHUD(`${SC_UI_ICON.GENRE} (Editor) Enter the GENRE to insert: `, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuEditorSettingHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuEditorGenreStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setNotesJson(text, "editor", "setting")
    return this.menuEditorThemeStep()
  }

  menuEditorSettingStep() {
    const { creator } = this.state
    creator.step = "EditorSetting"
    this.displayMenuHUD(`${SC_UI_ICON.SETTING} (Editor) Enter the SETTING to insert: `, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuEditorThemeHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuEditorSettingStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setNotesJson(text, "editor", "theme")
    return this.menuEditorSubjectStep()
  }

  menuEditorThemeStep() {
    const { creator } = this.state
    creator.step = "EditorTheme"
    this.displayMenuHUD(`${SC_UI_ICON.THEME} (Editor) Enter the THEME to insert: `, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuEditorSubjectHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuEditorThemeStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setNotesJson(text, "editor", "subject")
    return this.menuEditorSubjectStep()
  }

  menuEditorSubjectStep() {
    const { creator } = this.state
    creator.step = "EditorSubject"
    this.displayMenuHUD(`${SC_UI_ICON.SUBJECT} (Editor) Enter the SUBJECT to insert: `, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuAuthorNoteHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuAuthorNoteStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setNotesJson(text, "author", "note")
    return this.menuAuthorRatingStep()
  }

  menuAuthorNoteStep() {
    const { creator } = this.state
    creator.step = "AuthorNote"
    this.displayMenuHUD(`${SC_UI_ICON.NOTE} (Author) Enter the NOTE to insert: `, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuAuthorRatingHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuAuthorNoteStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setNotesJson(text, "author", "rating")
    return this.menuAuthorStyleStep()
  }

  menuAuthorRatingStep() {
    const { creator } = this.state
    creator.step = "AuthorRating"
    this.displayMenuHUD(`${SC_UI_ICON.RATING} (Author) Enter the RATING to insert: `, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuAuthorStyleHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuAuthorRatingStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setNotesJson(text, "author", "style")
    return this.menuAuthorGenreStep()
  }

  menuAuthorStyleStep() {
    const { creator } = this.state
    creator.step = "AuthorStyle"
    this.displayMenuHUD(`${SC_UI_ICON.STYLE} (Author) Enter the STYLE to insert: `, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuAuthorGenreHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuAuthorStyleStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setNotesJson(text, "author", "genre")
    return this.menuAuthorSettingStep()
  }

  menuAuthorGenreStep() {
    const { creator } = this.state
    creator.step = "AuthorGenre"
    this.displayMenuHUD(`${SC_UI_ICON.GENRE} (Author) Enter the GENRE to insert: `, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuAuthorSettingHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuAuthorGenreStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setNotesJson(text, "author", "setting")
    return this.menuAuthorThemeStep()
  }

  menuAuthorSettingStep() {
    const { creator } = this.state
    creator.step = "AuthorSetting"
    this.displayMenuHUD(`${SC_UI_ICON.SETTING} (Author) Enter the SETTING to insert: `, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuAuthorThemeHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuAuthorSettingStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setNotesJson(text, "author", "theme")
    return this.menuAuthorSubjectStep()
  }

  menuAuthorThemeStep() {
    const { creator } = this.state
    creator.step = "AuthorTheme"
    this.displayMenuHUD(`${SC_UI_ICON.THEME} (Author) Enter the THEME to insert: `, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuAuthorSubjectHandler(text) {
    if (text === SC_SHORTCUT.PREV) return this.menuAuthorThemeStep()
    else if (text !== SC_SHORTCUT.NEXT) this.setNotesJson(text, "author", "subject")
    return this.menuAuthorSubjectStep()
  }

  menuAuthorSubjectStep() {
    const { creator } = this.state
    creator.step = "AuthorSubject"
    this.displayMenuHUD(`${SC_UI_ICON.SUBJECT} (Author) Enter the SUBJECT to insert: `, true)
  }

  // noinspection JSUnusedGlobalSymbols
  menuConfirmHandler(text) {
    const { creator } = this.state

    if ([SC_SHORTCUT.PREV, SC_SHORTCUT.NEXT, SC_SHORTCUT.DELETE].includes(text)) return this.menuConfirmStep()

    // Exit without saving if anything other than "y" passed
    if (text.toLowerCase().startsWith("n")) return this.menuExit()
    if (!text.toLowerCase().startsWith("y")) return this.menuConfirmStep()

    if (this.titleCommands.includes(creator.cmd)) this.menuConfirmTitleHandler()
    else if (this.notesCommands.includes(creator.cmd)) this.menuConfirmNotesHandler()
    else this.menuConfirmEntryHandler()
  }

  menuConfirmEntryHandler() {
    const { creator } = this.state
    const { data } = creator

    // Add missing data
    if (!data.pronoun) data.pronoun = this.getPronoun(data[SC_DATA.MAIN])

    // Lower for storage
    data.pronoun = data.pronoun.toLowerCase()
    data.category = data.category.toLowerCase()

    // Add new World Info
    if (!creator.remove) {
      if (creator.source && creator.source.keys !== creator.keys) {
        this.removeWorldInfo(creator.source)
        delete creator.source
      }
      this.saveWorldInfo({ idx: (creator.source && creator.source.idx) ? creator.source.idx : [], keys: creator.keys, data: creator.data })
    }
    else if (creator.source) this.removeWorldInfo(creator.source)

    // Confirmation message
    let successMessage = ""
    if (creator.source) {
      // Reload cached World Info
      this.loadWorldInfo()

      if (!creator.conversion) {
        // Sync relationships and status
        if (!creator.remove) this.syncEntry(this.worldInfo[creator.keys])
        else this.syncEntry(creator.source)

        // Reload cached World Info
        this.loadWorldInfo()
      }

      // Update preloaded info
      if (!this.state.you.id && this.state.data.you) this.state.you = this.getInfoMatch(this.state.data.you) || {}

      // Confirmation message
      successMessage = `${SC_UI_ICON.SUCCESS} Entry '${creator.data.label}' was ${creator.remove ? "deleted" : (creator.source ? "updated" : "created")} successfully!`
    }

    // Reset everything back
    this.menuExit(false)

    // Update context
    this.parseContext()

    // Show message
    if (successMessage) this.messageOnce(successMessage)
  }

  menuConfirmTitleHandler() {
    const { creator } = this.state

    // Add new World Info
    if (!creator.remove) {
      if (creator.source && creator.source.keys !== creator.keys) {
        this.removeWorldInfo(creator.source)
        delete creator.source
      }
      this.saveWorldInfo({ idx: (creator.source && creator.source.idx) ? creator.source.idx : [], keys: creator.keys, data: creator.data })
    }
    else if (creator.source) this.removeWorldInfo(creator.source)

    // Confirmation message
    const successMessage = `${SC_UI_ICON.SUCCESS} Title '${creator.data.title}' was ${creator.remove ? "deleted" : (creator.source ? "updated" : "created")} successfully!`

    // Reset everything back
    this.menuExit(false)

    // Update context
    this.parseContext()

    // Show message
    this.messageOnce(successMessage)
  }

  menuConfirmNotesHandler() {
    const { creator } = this.state

    // Save data
    this.notes.data = creator.data
    if (!this.notes.keys) this.notes.keys = SC_WI_NOTES
    this.saveWorldInfo(this.notes)

    // Confirmation message
    const successMessage = `${SC_UI_ICON.SUCCESS} Notes was updated successfully!`

    // Reset everything back
    this.menuExit(false)

    // Update context
    this.parseContext()

    // Show message
    this.messageOnce(successMessage)
  }

  menuConfirmStep(remove=false) {
    const { creator } = this.state
    creator.step = "Confirm"
    creator.remove = remove
    if (!remove) this.displayMenuHUD(`${SC_UI_ICON.CONFIRM} Do you want to save these changes? (y/n)`, false)
    else this.displayMenuHUD(`${SC_UI_ICON.WARNING} Warning! Are you sure you want to delete this entry? (y/n)`, false)
  }

  menuExit(update=true) {
    const { creator } = this.state
    if (creator.data && creator.data.icon) this.removeStat(creator.data.icon)
    state.message = creator.previousMessage
    this.state.creator = {}
    if (update) this.displayHUD()
  }

  displayMenuHUD(promptText, hints=true, relHints=false, validInputs=[]) {
    const { creator } = this.state
    const { showHints } = this.state
    const output = []
    if (hints && showHints) {
      const paged = creator.totalPages > 1 ? `${SC_SHORTCUT.PREV_PAGE} and ${SC_SHORTCUT.NEXT_PAGE} to navigate pages, ` : ""
      output.push(`Hints: Type ${paged}${SC_SHORTCUT.PREV} and ${SC_SHORTCUT.NEXT} to navigate fields, ${SC_SHORTCUT.GOTO} followed by a number for a specific field, ${SC_SHORTCUT.DELETE} to delete, ${SC_SHORTCUT.EXIT} to exit and ${SC_SHORTCUT.HINTS} to toggle hints.${(relHints || validInputs.length) ? "" : "\n\n"}`)
      if (relHints) output.push(`Extra: You can type '${SC_SHORTCUT.DELETE}entry1, entry2' to remove one or more individual items.${validInputs.length ? "" : "\n"}`)
    }
    if (validInputs.length) {
      const lastInput = validInputs.pop()
      output.push(`Choices: ${validInputs.join(", ")} or ${lastInput}.\n`)
    }
    output.push(`${promptText}`)
    state.message = output.join("\n")
    this.displayHUD()
  }

  setTitleSource(title) {
    const { creator } = this.state
    creator.source = this.titles[title]
    creator.keys = `${SC_WI_TITLE}${title}`
    creator.data = creator.source ? Object.assign({}, creator.source.data) : { title }
    if (!creator.data.trigger) creator.data.trigger = (new RegExp(title)).toString()
  }

  setEntrySource(source) {
    const { creator } = this.state

    if (typeof source === "object") {
      creator.source = source
      creator.keys = creator.conversion ? `${SC_WI_ENTRY}${source.keys.split(",")[0].trim()}` : source.keys
      if (creator.data) creator.data = Object.assign({ label: creator.data.label }, source.data, { category: source.data.category || creator.data.category })
      else creator.data = Object.assign({ }, source.data, creator.conversion ? { label: source.keys.split(",")[0].trim(), pronoun: this.getPronoun(source.entry) } : source.data)
      creator.data.trigger = creator.conversion ? this.getEntryRegex(source.keys).toString() : creator.data.trigger
      creator.data.pronoun = (creator.data.pronoun && creator.data.pronoun.toLowerCase()) || SC_PRONOUN.UNKNOWN
      creator.data.category = (creator.data.category && creator.data.category.toLowerCase()) || ""
    }

    else {
      if (this.worldInfo[source]) {
        creator.conversion = true
        return this.setEntrySource(this.worldInfo[source])
      }
      creator.data = { label: source, trigger: this.getEntryRegex(source).toString(), category: "", pronoun: SC_PRONOUN.UNKNOWN }
      const keys = `${SC_WI_ENTRY}${source}`
      if (!this.worldInfo[keys]) creator.keys = keys
    }
  }

  setEntryJson(key, text) {
    const { data } = this.state.creator
    if (data[key] && text === SC_SHORTCUT.DELETE) delete data[key]
    else if (JSON.stringify({[key]: text}).length <= 500) data[key] = text
    else this.messageOnce(`${SC_UI_ICON.ERROR} ERROR! Length of field '${key}' exceeds maximum allowed! Please reduce text size and try again.`, false)
  }

  setTitleJson(text, section, field, validItems=[]) {
    const { creator } = this.state

    if (text === SC_SHORTCUT.DELETE) {
      delete creator.data[section][field]
      creator.hasChanged = true
      return true
    }

    // Validate data
    if (field === "category") text = text.toUpperCase()
    else if (field !== "entry") text = text.toLowerCase()
    const values = text.split(",").map(i => i.trim()).reduce((a, c) => a.concat((!validItems.length || validItems.includes(c.startsWith("-") ? c.slice(1) : c)) ? [c] : []), [])
    if (!values.length) {
      this.displayMenuHUD(`${SC_UI_ICON.ERROR} ERROR! Invalid ${field} detected, options are: ${validItems.join(", ")}`)
      return false
    }

    // Update data
    if (!creator.data[section]) creator.data[section] = {}
    creator.data[section][field] = values.join(", ")
    creator.hasChanged = true
    return true
  }

  setNotesJson(text, section, field) {
    const { creator } = this.state

    if (text === SC_SHORTCUT.DELETE) {
      delete creator.data[section][field]
      creator.hasChanged = true
      return
    }

    if (!creator.data[section]) creator.data[section] = {}
    creator.data[section][field] = text
    creator.hasChanged = true
  }


  /*
   * OUTPUT MODIFIER
   * - Handles paragraph formatting.
   */
  outputModifier(text) {
    if (this.state.isDisabled || !text) return text
    this.initialize()

    let modifiedText = text
    if (this.state.isSpaced) modifiedText = this.paragraphFormatterPlugin.outputModifier(modifiedText)
    return modifiedText
  }


  /*
   * UI Rendering
   */
  displayHUD() {
    const { creator } = this.state

    // Clear out Simple Context stats, keep stats from other scripts for compatibility
    const labels = Object.values(SC_UI_ICON).concat((creator.data && creator.data.icon) ? [creator.data.icon] : []).concat(this.icons)
    state.displayStats = state.displayStats.filter(s => !labels.includes((s.key || "").replace(SC_UI_ICON.SELECTED, "")))

    // Get correct stats to display
    let hudStats
    if (creator.page === SC_UI_PAGE.ENTRY_INJECTIONS) hudStats = this.getEntryStats()
    else if (creator.page === SC_UI_PAGE.ENTRY_RELATIONS) hudStats = this.getRelationsStats()
    else if (this.titleCommands.includes(creator.cmd)) hudStats = this.getTitleStats()
    else if (this.notesCommands.includes(creator.cmd)) hudStats = this.getNotesStats()
    else if (this.findCommands.includes(creator.cmd)) hudStats = this.getFindStats()
    else hudStats = this.getInfoStats()

    // Add newline at end for spacing
    if (hudStats.length) hudStats[hudStats.length - 1].value = hudStats[hudStats.length - 1].value + "\n"

    // Display stats
    state.displayStats = [...hudStats, ...state.displayStats]
  }

  getInfoStats() {
    const { context, sections, isDisabled, isHidden, isMinimized } = this.state
    const { injected } = context
    const { data: JOIN_TEXT } = this.joins

    const displayStats = []
    if (isDisabled) return displayStats

    // Display relevant HUD elements
    const contextKeys = isHidden ? SC_UI_ARRANGEMENT.HIDDEN : (isMinimized ? SC_UI_ARRANGEMENT.MINIMIZED : SC_UI_ARRANGEMENT.MAXIMIZED)

    for (let keys of contextKeys) {
      keys = keys.toUpperCase().split("/")
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i]
        const newline = i === (l - 1) ? "\n" : " "

        if (key === "TRACK") {
          // Setup tracking information
          const track = injected.map(inj => {
            const entry = this.entries[inj.label]
            const injectedEmojis = inj.types.filter(t => ![SC_DATA.MAIN, JOIN_TEXT.CHAR_CHAR].includes(t)).map(t => SC_UI_ICON[`INJECTED_${t.toUpperCase()}`]).join("")
            return `${this.getEntryEmoji(entry)} ${entry.data.label}${injectedEmojis ? ` [${injectedEmojis}]` : ""}`
          })

          // Display World Info injected into context
          if (track.length) displayStats.push({
            key: SC_UI_ICON.TRACK, color: SC_UI_COLOR.TRACK,
            value: `${track.join(SC_UI_ICON.SEPARATOR)}${!SC_UI_ICON.TRACK.trim() ? " :" : ""}${newline}`
          })
        }

        else if (sections[key.toLowerCase()]) displayStats.push({
          key: SC_UI_ICON[key], color: SC_UI_COLOR[key],
          value: `${sections[key.toLowerCase()]}${newline}`
        })
      }
    }

    return displayStats
  }

  getEntryStats() {
    const { creator } = this.state
    const { category } = creator.data
    let displayStats = []

    // Get combined text to search for references
    const text = SC_ENTRY_ALL_KEYS.reduce((a, c) => a.concat(creator.data[c] ? ` ${creator.data[c]}` : ""), "")

    // Find references
    const track = this.entriesList.reduce((result, entry) => {
      if (entry.data.label === creator.data.label) return result
      if (text.match(entry.regex)) result.push(`${this.getEntryEmoji(entry)} ${entry.data.label}`)
      return result
    }, [])

    // Display label and tracked world info
    displayStats = displayStats.concat(this.getLabelTrackStats([], track))

    // Only show type and label if on first step
    if (!creator.data.category) return displayStats

    // Display all ENTRIES
    for (let key of SC_ENTRY_ALL_KEYS) {
      let validKey = false
      if (category === SC_CATEGORY.CHARACTER && SC_ENTRY_CHARACTER_KEYS.includes(key)) validKey = true
      if (category === SC_CATEGORY.FACTION && SC_ENTRY_FACTION_KEYS.includes(key)) validKey = true
      if (category === SC_CATEGORY.LOCATION && SC_ENTRY_LOCATION_KEYS.includes(key)) validKey = true
      if (category === SC_CATEGORY.THING && SC_ENTRY_THING_KEYS.includes(key)) validKey = true
      if (category === SC_CATEGORY.OTHER && SC_ENTRY_OTHER_KEYS.includes(key)) validKey = true
      if (validKey) displayStats.push({
        key: this.getSelectedLabel(SC_UI_ICON[key.toUpperCase()]), color: SC_UI_COLOR[key.toUpperCase()],
        value: `${creator.data[key] || SC_UI_ICON.EMPTY}\n`
      })
    }

    return displayStats
  }

  getRelationsStats() {
    const { creator } = this.state
    const { category } = creator.data
    const scopesExtended = [SC_SCOPE.SIBLINGS, SC_SCOPE.GRANDPARENTS, SC_SCOPE.GRANDCHILDREN, SC_SCOPE.PARENTS_SIBLINGS, SC_SCOPE.SIBLINGS_CHILDREN]
    let displayStats = []

    // Scan each rel entry for matching labels in index
    const relationships = this.getRelExpKeys(creator.data)

    const trackOther = relationships
      .filter(r => !this.entries[r.label])
      .map(r => this.getRelationshipLabel(r))

    const trackExtendedRel = relationships.filter(r => !!this.entries[r.label] && scopesExtended.includes(r.scope))
    const trackExtendedLabels = trackExtendedRel.map(r => r.label)
    const trackExtended = trackExtendedRel.map(r => this.getRelationshipLabel(r, SC_UI_ICON[SC_SCOPE_REV[r.scope]]))

    const track = relationships
      .filter(r => !!this.entries[r.label] && SC_REL_ALL_KEYS.includes(r.scope) && !trackExtendedLabels.includes(r.label))
      .map(r => this.getRelationshipLabel(r))

    // Display label and tracked world info
    displayStats = displayStats.concat(this.getLabelTrackStats(track, trackExtended, trackOther))

    // Display all ENTRIES
    for (let key of [SC_DATA.NOUN, ...SC_REL_ALL_KEYS]) {
      let validKey = false
      if (category === SC_CATEGORY.CHARACTER && SC_REL_CHARACTER_KEYS.includes(key)) validKey = true
      if (category === SC_CATEGORY.FACTION && SC_REL_FACTION_KEYS.includes(key)) validKey = true
      if (category === SC_CATEGORY.LOCATION && SC_REL_LOCATION_KEYS.includes(key)) validKey = true
      if (category === SC_CATEGORY.THING && SC_REL_THING_KEYS.includes(key)) validKey = true
      if (category === SC_CATEGORY.OTHER && SC_REL_OTHER_KEYS.includes(key)) validKey = true
      if (validKey) displayStats.push({
        key: this.getSelectedLabel(SC_UI_ICON[key.toUpperCase()]), color: SC_UI_COLOR[key.toUpperCase()],
        value: `${creator.data[key] || SC_UI_ICON.EMPTY}\n`
      })
    }

    return displayStats
  }

  getFindStats() {
    const { creator } = this.state
    let displayStats = []

    // Setup search
    let searchRegex
    if (creator.searchPattern !== ".*") {
      try { searchRegex = new RegExp(creator.searchPattern, "i") }
      catch (e) {
        this.messageOnce(`${SC_UI_ICON.ERROR} ERROR! Invalid regex detected in '${creator.searchPattern}', try again!`)
        return this.getInfoStats()
      }
    }

    // Find references
    const trackEntries = this.entriesList.reduce((result, entry) => {
      if (creator.searchPattern !== ".*" && !entry.entry.match(searchRegex)) return result
      return result.concat([`${this.getEntryEmoji(entry)} ${entry.data.label}`])
    }, [])

    const trackTitles = this.titlesList.reduce((result, rule) => {
      if (!rule.data.title || (creator.searchPattern !== ".*" && !(JSON.stringify(rule.data)).match(searchRegex))) return result
      return result.concat([`${this.getTitleEmoji(rule, "")}${rule.data.title}`])
    }, [])

    // Sorting
    const sortAlpha = (a, b) => a < b ? -1 : (a > b ? 1 : 0)
    trackEntries.sort(sortAlpha)
    trackTitles.sort(sortAlpha)

    this.messageOnce(`${SC_UI_ICON.SEARCH} Found ${trackEntries.length} ${trackEntries.length === 1 ? "entry" : "entries"} and ${trackTitles.length} ${trackTitles.length === 1 ? "title" : "titles"} matching the pattern: ${creator.searchPattern}`)
    if (!trackEntries.length && !trackTitles.length) return this.getInfoStats()

    // Display label and tracked world info
    displayStats = displayStats.concat(this.getLabelTrackStats(trackEntries, [], [], trackTitles, false, "  "))

    return displayStats
  }

  getTitleStats() {
    const { creator } = this.state
    let displayStats = []

    // Find references
    const entryLabels = [
      ...((creator.data.source && creator.data.source.entry) ? creator.data.source.entry.split(", ") : []),
      ...((creator.data.target && creator.data.target.entry) ? creator.data.target.entry.split(", ") : [])
    ]
    const track = this.entriesList.reduce((a, c) => a.concat(entryLabels.includes(c.data.label) ? `${this.getEntryEmoji(c)} ${c.data.label}` : []), [])

    // Display label and tracked world info
    displayStats = displayStats.concat(this.getLabelTrackStats([], track))

    // Display all ENTRIES SC_TITLE_TARGET_KEYS
    const keys = creator.page === SC_UI_PAGE.TITLE_TARGET ? SC_TITLE_KEYS : SC_TITLE_SOURCE_KEYS
    displayStats = displayStats.concat(this.getTitleEntryStats(keys))

    return displayStats
  }

  getNotesStats() {
    const { creator } = this.state
    let displayStats = []

    // Get combined text to search for references
    const text = SC_NOTES_ALL_KEYS.reduce((result, key) => {
      return result.concat(["editor", "author"].reduce((result, section) => {
        const data = creator.data[section] && creator.data[section][key.replace(section, "").toLowerCase()]
        if (data) result += ` ${data}`
        return result
      }, ""))
    }, "")

    // Find references
    const track = this.entriesList.reduce((result, entry) => {
      if (entry.data.label === creator.data.label) return result
      if (text.match(entry.regex)) result.push(`${this.getEntryEmoji(entry)} ${entry.data.label}`)
      return result
    }, [])

    // Display label and tracked world info
    displayStats = displayStats.concat(this.getLabelTrackStats(track))

    // Show generated text
    const notesText = this.getNotes(creator.page === SC_UI_PAGE.NOTES_EDITOR ? "editor" : "author", creator.data).join(" ")
    if (notesText) displayStats.push({
      key: SC_UI_ICON.NOTE_TEXT, color: SC_UI_COLOR.NOTE_TEXT,
      value: `${notesText}\n${SC_UI_ICON.BREAK}\n`
    })

    // Display all fields
    const keys = creator.page === SC_UI_PAGE.NOTES_EDITOR ? SC_NOTES_EDITOR_KEYS : SC_NOTES_AUTHOR_KEYS
    displayStats = displayStats.concat(this.getNotesEntryStats(keys))

    return displayStats
  }

  getNotesEntryStats(keys) {
    const { creator } = this.state
    let displayStats = []

    for (let key of keys) {
      const cleanKey = key.replace("editor", "").replace("author", "").toLowerCase()

      let data
      if (key.startsWith("editor") && creator.data.editor) data = creator.data.editor[cleanKey]
      else if (key.startsWith("author") && creator.data.author) data = creator.data.author[cleanKey]
      else data = creator.data[cleanKey]

      displayStats.push({
        key: this.getSelectedLabel(SC_UI_ICON[cleanKey.toUpperCase()]), color: SC_UI_COLOR[cleanKey.toUpperCase()],
        value: `${data || SC_UI_ICON.EMPTY}\n`
      })
    }

    return displayStats
  }

  getTitleEntryStats(keys) {
    const { creator } = this.state
    let displayStats = []

    for (let key of keys) {
      const cleanKey = key.replace("source", "").replace("target", "").toLowerCase()

      let data
      if (key.startsWith("source") && creator.data.source) data = creator.data.source[cleanKey]
      else if (key.startsWith("target") && creator.data.target) data = creator.data.target[cleanKey]
      else data = creator.data[cleanKey]

      displayStats.push({
        key: this.getSelectedLabel(SC_UI_ICON[cleanKey.toUpperCase()]), color: SC_UI_COLOR[cleanKey.toUpperCase()],
        value: `${data || SC_UI_ICON.EMPTY}\n`
      })
    }

    return displayStats
  }

  getLabelTrackStats(track=[], extended=[], other=[], titles=[], showLabel=true, separator=SC_UI_ICON.SEPARATOR) {
    const { creator } = this.state
    const displayStats = []
    const validData = creator.data && (creator.data.title || creator.data.label)
    const validPage = [SC_UI_PAGE.NOTES_EDITOR, SC_UI_PAGE.NOTES_AUTHOR].includes(creator.page)

    if (showLabel && (validData || validPage)) {
      const status = !creator.source && !validPage ? "New " : ""
      const pagination = creator.totalPages > 1 ? ` (${creator.currentPage}/${creator.totalPages})` : ""
      const label = creator.page === SC_UI_PAGE.ENTRY_INJECTIONS && creator.data.category ? this.toTitleCase(creator.data.category.toLowerCase()) : (creator.source ? creator.page.replace("Title ∙∙ ", "") : creator.page)
      const pageText = creator.page ? `${!validPage ? `${separator} ` : ""}${status}${label}${pagination}` : ""
      const newline = creator.page === SC_UI_PAGE.ENTRY_RELATIONS ? `\n${SC_UI_ICON.BREAK}\n` : "\n"

      if (creator.data.label) displayStats.push({
        key: this.getSelectedLabel(SC_UI_ICON.LABEL), color: SC_UI_COLOR.LABEL,
        value: `${creator.data.label}${pageText}${newline}`
      })

      else if (creator.data.title) displayStats.push({
        key: this.getSelectedLabel(SC_UI_ICON.TITLE), color: SC_UI_COLOR.TITLE,
        value: `${creator.data.title}${pageText}${newline}`
      })

      else displayStats.push({
        key: this.getSelectedLabel(SC_UI_ICON.NOTES), color: SC_UI_COLOR.NOTES,
        value: `${pageText}\n${SC_UI_ICON.BREAK}\n`
      })
    }

    // Display MATCH
    if ([SC_UI_PAGE.TITLE_TARGET, SC_UI_PAGE.TITLE_SOURCE].includes(creator.page)) {
      displayStats.push({
        key: this.getSelectedLabel(SC_UI_ICON.MATCH), color: SC_UI_COLOR.MATCH,
        value: `${creator.data.trigger || SC_UI_ICON.EMPTY}\n${SC_UI_ICON.BREAK}\n`
      })
    }

    if (creator.page === SC_UI_PAGE.ENTRY_INJECTIONS && !creator.data.category) return displayStats

    // Display KEYS
    if (creator.page === SC_UI_PAGE.ENTRY_INJECTIONS) {
      displayStats.push({
        key: this.getSelectedLabel(SC_UI_ICON.KEYS), color: SC_UI_COLOR.KEYS,
        value: `${creator.data.trigger || SC_UI_ICON.EMPTY}\n${SC_UI_ICON.BREAK}\n`
      })
    }

    // Display tracked recognised entries
    if (track.length) {
      const newline = (showLabel && !extended.length && !other.length) ? `\n${SC_UI_ICON.BREAK}\n` : "\n"
      displayStats.push({
        key: SC_UI_ICON.TRACK_MAIN, color: SC_UI_COLOR.TRACK_MAIN,
        value: `${track.join(separator)}${newline}`
      })
    }

    // Display tracked unrecognised entries
    if (other.length) {
      const newline = (showLabel && !extended.length) ? `\n${SC_UI_ICON.BREAK}\n` : "\n"
      displayStats.push({
        key: SC_UI_ICON.TRACK_OTHER, color: SC_UI_COLOR.TRACK_OTHER,
        value: `${other.join(separator)}${newline}`
      })
    }

    // Display tracked extended family entries
    if (extended.length) {
      const newline = showLabel ? `\n${SC_UI_ICON.BREAK}\n` : "\n"
      displayStats.push({
        key: SC_UI_ICON.TRACK_EXTENDED, color: SC_UI_COLOR.TRACK_EXTENDED,
        value: `${extended.join(separator)}${newline}`
      })
    }

    // Display tracked titles (only on find page)
    if (titles.length) {
      displayStats.push({
        key: SC_UI_ICON.TRACK_TITLES, color: SC_UI_COLOR.TRACK_TITLES,
        value: `${titles.join(", ")}\n`
      })
    }

    return displayStats
  }

  getRelationshipLabel(rel, extended="") {
    const pronounEmoji = this.getEntryEmoji(this.entries[rel.label])
    const dispEmoji = SC_RELATABLE.includes(rel.category) ? SC_UI_ICON[SC_DISP_REV[rel.flag.disp]] : ""
    const modEmoji = rel.flag.mod ? SC_UI_ICON[SC_MOD_REV[rel.flag.mod]] : ""
    const typeEmoji = rel.flag.type ? SC_UI_ICON[SC_TYPE_REV[rel.flag.type]] : ""
    const flag = (dispEmoji || typeEmoji || modEmoji) ? `[${dispEmoji}${typeEmoji}${modEmoji}]` : ""
    return `${pronounEmoji} ${rel.label} ${extended}${flag}`
  }

  getTitleEmoji(rule, defaultIcon=SC_UI_ICON.TITLE) {
    return (rule && rule.icon) ? rule.icon : defaultIcon
  }

  getEntryEmoji(entry) {
    if (!entry) return SC_UI_ICON.EMPTY

    const { you } = this.state
    const { category, icon, pronoun } = entry.data

    if (you.id && you.id === entry.id) return SC_UI_ICON[SC_PRONOUN.YOU.toUpperCase()]
    if (icon) return icon
    if (category === SC_CATEGORY.CHARACTER) return SC_UI_ICON[pronoun.toUpperCase()]
    return SC_UI_ICON[category.toUpperCase() || "EMPTY"]
  }

  getSelectedLabel(label) {
    const { creator } = this.state
    const step = SC_UI_ICON[creator.step.replace(/^(source|target|editor|author)/i, "").toUpperCase()]
    const icon = (!this.titleCommands.includes(creator.cmd) && label === SC_UI_ICON.LABEL) ? this.getEntryEmoji(creator) : (label === SC_UI_ICON.TITLE ? this.getTitleEmoji(creator.data) : label)
    return step === label ? `${SC_UI_ICON.SELECTED}${icon}` : icon
  }

  removeStat(key) {
    state.displayStats = state.displayStats.filter(s => key !== (s.key || "").replace(SC_UI_ICON.SELECTED, ""))
  }

  displayDebug() {
    const { isDebug, context, creator } = this.state

    // Output to AID Script Diagnostics
    console.log(context)

    if (!isDebug) return

    // Don't hijack state.message while doing creating/updating a World Info entry
    if (creator.step) return

    // Output context to state.message with numbered lines
    let debugLines = this.getModifiedContext().split("\n")
    debugLines.reverse()
    debugLines = debugLines.map((l, i) => "(" + (i < 9 ? "0" : "") + `${i + 1}) ${l}`)
    debugLines.reverse()
    state.message = debugLines.join("\n")
  }
}
const simpleContextPlugin = new SimpleContextPlugin()
