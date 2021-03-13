/*
 * Configuration
 */
const statsFormatterConfig = {
  order: ["Author's Note", "Scene", "Think", "Focus", "World Info"],
  alignVertical: true,
  truncateLabels: true
}


/*
 * Stats Formatter Plugin
 */
class StatsFormatterPlugin {
  constructor() {
    if (!state.displayStats) state.displayStats = []
    if (!state.statsFormatterPlugin) state.statsFormatterPlugin = {
      isDisabled: false,
      displayStats: []
    }
    this.state = state.statsFormatterPlugin
  }

  execute(options = {}) {
    // Set defaults
    options.order = options.order || []
    options.alignVertical = !!options.alignVertical
    options.truncateLabels = !!options.truncateLabels

    // Don't run if disabled
    if (this.state.isDisabled) return

    // Detect new stats and add them to state
    const existingKeys = this.state.displayStats.map(s => s.key)
    const newStats = state.displayStats.filter(s => s.key !== "" && !existingKeys.includes(s.key))
    if (newStats.length) this.state.displayStats = this.state.displayStats.concat(newStats)

    // Detect stats that are updated
    const newStatsKeys = newStats.map(s => s.key)
    const updateStats = state.displayStats.filter(s => s.key !== "" && !newStatsKeys.includes(s.key))
    if (updateStats.length) this.state.displayStats.map(stat => {
      for (let updateStat of updateStats) {
        if (updateStat.key === stat.key) {
          stat.value = updateStat.value
          return stat
        }
      }
      return stat
    })

    // Remove stats with undefined value
    this.state.displayStats = this.state.displayStats.filter(s => s.value !== undefined)

    // Do ordering
    const orderedStats = []
    for (let statName of options.order) {
      const stat = this.state.displayStats.find(s => s.key.toLowerCase() === statName.toLowerCase())
      if (stat) orderedStats.push(stat)
    }
    const orderedKeys = orderedStats.map(s => s.key)
    this.state.displayStats = orderedStats.concat(this.state.displayStats.filter(s => !orderedKeys.includes(s.key)))

    // Do formatting
    if (options.truncateLabels) {
      state.displayStats = this.state.displayStats.map(stat => Object.assign({}, stat, {
        key: "",
        value: stat.value + " :" + (options.alignVertical ? "\n" : "")
      }))
    } else {
      let allStatsButLast = this.state.displayStats.slice(0, -1)
      let suffix = options.alignVertical ? "\n" : " "
      allStatsButLast = allStatsButLast.map(s => Object.assign({}, s, {value: s.value + suffix}))
      state.displayStats = allStatsButLast.concat(this.state.displayStats.slice(-1))
    }
  }
}
const statsFormatterPlugin = new StatsFormatterPlugin()


/*
 * Simple Context Plugin
 */
class SimpleContextPlugin {
  SECTION_SIZE = { focus: 150, think: 500, header: 1200 }

  STAT_STORY_TEMPLATE = { key: "Author's Note", color: "dimgrey" }
  STAT_SCENE_TEMPLATE = { key: "Scene", color: "lightsteelblue" }
  STAT_THINK_TEMPLATE = { key: "Think", color: "darkseagreen" }
  STAT_FOCUS_TEMPLATE = { key: "Focus", color: "indianred" }
  STAT_TRACK_TEMPLATE = { key: "World Info", color: "goldenrod" }

  controlList = ["enable", "disable", "show", "hide", "reset", "debug"] // Plugin Controls
  commandList = [
    "note", "title", "author", "genre", "setting", "theme", "subject", "style", "rating", // Story
    "you", "at", "with", "time", "desc", // Scene
    "think", // Think
    "focus" // Focus
  ]

  commandMatch = /^> You say "\/(\w+)( .*)?"$|^> You \/(\w+)( .*)?[.]$|^\/(\w+)( .*)?$/
  keyMatch = /.?\/((?![*+?])(?:[^\r\n\[\/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*])+)\/((?:g(?:im?|mi?)?|i(?:gm?|mg?)?|m(?:gi?|ig?)?)?)|[^,]+/g
  enclosureMatch = /([^\w])("[^"]+")([^\w])|([^\w])('[^']+')([^\w])|([^\w])(\[[^]]+])([^\w])|([^\w])(\([^)]+\))([^\w])|([^\w])({[^}]+})([^\w])|([^\w])(<[^<]+>)([^\w])/g
  sentenceMatch = /([^!?.]+[!?.]+[\s]+?)|([^!?.]+[!?.]+$)|([^!?.]+$)/g

  constructor() {
    this.commandList = this.controlList.concat(this.commandList)
    if (!state.simpleContextPlugin) state.simpleContextPlugin = {
      isDebug: false,
      isHidden: false,
      isDisabled: false,
      shuffleContext: false,
      data: {},
      context: {}
    }
    this.state = state.simpleContextPlugin
    if (!state.displayStats) state.displayStats = []
  }

  /*
   * Helper Functions
   */
  isVisible() {
    return !this.state.isDisabled && !this.state.isHidden
  }

  appendPeriod(content) {
    return !content.endsWith(".") ? content + "." : content
  }

  removePeriod(content) {
    return content.endsWith(".") ? content.slice(0, -1) : content
  }

  toTitleCase(content) {
    return content.charAt(0).toUpperCase() + content.slice(1)
  }

  hasKey(text, key) {
    if (key instanceof RegExp) return text.match(key)
    return text.includes(key)
  }

  getKeys(keys) {
    const matches = [...keys.matchAll(this.keyMatch)]
    if (!matches.length) return [keys]
    return matches.map(m => (m.length === 3 && m[1]) ? new RegExp(m[1], m[2]) : m[0].trim())
  }

  getEntry(entry, replaceYou=false) {
    if (replaceYou && this.state.data.you) entry = entry.replace(this.state.data.you, "you")
    return `\n{{${entry}#!#}}\n`
  }

  replaceEnclosures(text) {
    const enclosures = []
    let modifiedText = `#${text}#`
    modifiedText = modifiedText.replace(this.enclosureMatch, (_, prefix, match, suffix) => {
      if (!prefix || !match || !suffix) return _
      enclosures.push(match)
      return `${prefix}{{${enclosures.length - 1}}}${suffix}`
    })
    modifiedText = modifiedText.slice(1, -1)
    return { modifiedText, enclosures }
  }

  insertEnclosures(text, matches) {
    for (let idx = 0; idx < matches.length; idx++) text = text.replace(`{{${idx}}}`, matches[idx])
    return text
  }

  getSentences(text) {
    let { modifiedText, enclosures } = this.replaceEnclosures(text)
    let sentences = modifiedText.match(this.sentenceMatch) || []
    return sentences.map(s => this.insertEnclosures(s, enclosures))
  }

  displayStat(template, value) {
    const stat = state.displayStats.find(s => s.key === template.key)
    if (stat) stat.value = value
    else state.displayStats.push(Object.assign({ value }, template))
  }

  updateHUD() {
    if (this.isVisible()) {
      state.statsFormatterPlugin.isDisabled = false
      this.displayStat(this.STAT_STORY_TEMPLATE, this.state.context.story)
      this.displayStat(this.STAT_SCENE_TEMPLATE, this.state.context.scene)
      this.displayStat(this.STAT_THINK_TEMPLATE, this.state.context.think)
      this.displayStat(this.STAT_FOCUS_TEMPLATE, this.state.context.focus)
      this.displayStat(this.STAT_TRACK_TEMPLATE, this.state.context.track)
    } else {
      state.statsFormatterPlugin.isDisabled = true
      state.displayStats = []
    }
  }

  /*
   * Returns: false, if new context entry exceeds 85% limit.
   * Where:
   *   originalSize is the length of the original, unmodified text.
   *   entrySize is the length of the world entry being inserted.
   *   totalSize is the total modified size so far.
   */
  validEntrySize(originalSize, entrySize, totalSize) {
    if (originalSize === 0) return false
    const modifiedPercent = (totalSize + entrySize) / originalSize
    return modifiedPercent < 0.85
  }

  /*
   * Input Handler
   * - Takes new command and refreshes context and HUD (if visible and enabled)
   * - Updates when valid command is entered into the prompt (ie, `/name John Smith`)
   * - Can clear state by executing the command without any arguments (ie, `/name`)
   */
  inputModifier(text) {
    // Check if no input (ie, prompt AI)
    if (!text) {
      this.state.shuffleContext = true
      return text
    }

    // Detection for multi-line commands, filter out double ups of newlines
    let modifiedText = text.split("\n").map(l => this.inputHandler(l)).join("\n")
      .replace(/[\n]{2,}/g, "\n")

    // Cleanup for multi commands
    if (modifiedText === "\n") modifiedText = ""

    return modifiedText
  }

  inputHandler(text) {
    // Check if a command was inputted
    let match = this.commandMatch.exec(text)
    if (match) match = match.filter(v => !!v)
    if (!match || match.length < 2) return text

    // Check if the command was valid
    const cmd = match[1].toLowerCase()
    const value = match.length > 2 && match[2] ? match[2].trim() : undefined
    if (!this.commandList.includes(cmd)) return text

    // Detect for Controls, handle state and perform actions (ie, hide HUD)
    if (this.controlList.includes(cmd)) {
      if (cmd === "debug") {
        this.state.isDebug = !this.state.isDebug
        if (!this.state.isDebug) state.message = ""
        else if (this.isVisible()) state.message = "Enter something into the prompt to start debugging the context.."
      }
      else if (cmd === "enable" || cmd === "disable") this.state.isDisabled = (cmd === "disable")
      else if (cmd === "show" || cmd === "hide") this.state.isHidden = (cmd === "hide")
      else if (cmd === "reset") {
        this.state.context = {}
        this.state.data = {}
      }
      this.updateHUD()
      return
    } else {
      // If value passed assign it to the data store, otherwise delete it (ie, `/name`)
      if (value) this.state.data[cmd] = value
      else delete this.state.data[cmd]
    }

    // Story - Author's Notes, Title, Author, Genre, Setting, Theme, Subject, Writing Style and Rating
    const story = []
    delete this.state.context.story
    if (this.state.data.note) story.push(this.appendPeriod(this.state.data.note))
    if (this.state.data.title) story.push(`Title: ${this.appendPeriod(this.state.data.title)}`)
    if (this.state.data.author) story.push(`Author: ${this.appendPeriod(this.state.data.author)}`)
    if (this.state.data.genre) story.push(`Genre: ${this.appendPeriod(this.state.data.genre)}`)
    if (this.state.data.setting) story.push(`Setting: ${this.appendPeriod(this.state.data.setting)}`)
    if (this.state.data.theme) story.push(`Theme: ${this.appendPeriod(this.state.data.theme)}`)
    if (this.state.data.subject) story.push(`Subject: ${this.appendPeriod(this.state.data.subject)}`)
    if (this.state.data.style) story.push(`Writing Style: ${this.appendPeriod(this.state.data.style)}`)
    if (this.state.data.rating) story.push(`Rating: ${this.appendPeriod(this.state.data.rating)}`)
    if (story.length) this.state.context.story = story.join(" ")

    // Scene - Name, location, present company, time and scene description
    const scene = []
    delete this.state.context.scene
    if (this.state.data.you) scene.push(`You are ${this.appendPeriod(this.state.data.you)}`)
    if (this.state.data.at && this.state.data.with) scene.push(`You are at ${this.removePeriod(this.state.data.at)} with ${this.appendPeriod(this.state.data.with)}`)
    else if (this.state.data.at) scene.push(`You are at ${this.appendPeriod(this.state.data.at)}`)
    else if (this.state.data.with) scene.push(`You are with ${this.appendPeriod(this.state.data.with)}`)
    if (this.state.data.time) scene.push(`It is ${this.appendPeriod(this.state.data.time)}`)
    if (this.state.data.desc) scene.push(this.toTitleCase(this.appendPeriod(this.state.data.desc)))
    if (scene.length) this.state.context.scene = scene.join(" ")

    // Think - This input is placed six positions back in context
    delete this.state.context.think
    if (this.state.data.think) this.state.context.think = this.toTitleCase(this.appendPeriod(this.state.data.think))

    // Focus - This input is pushed to the front of context
    delete this.state.context.focus
    if (this.state.data.focus) this.state.context.focus = this.toTitleCase(this.appendPeriod(this.state.data.focus))

    this.updateHUD()
    return ""
  }

  /*
   * Context Injector
   * - Takes existing set state and dynamically injects it into the context
   * - Is responsible for injecting custom World Info entries, including regex matching of keys where applicable
   * - Keeps track of the amount of modified context and ensures it does not exceed the 85% rule
   *   while injecting as much as possible
   */
  contextModifier(text) {
    if (this.state.isDisabled) return text;

    // Split context and memory
    const contextMemory = info.memoryLength ? text.slice(0, info.memoryLength) : ""
    const context = info.memoryLength ? text.slice(info.memoryLength) : text

    // Setup character limits for each group
    const originalSize = context.length
    const sentenceGroups = { focus: [], think: [], header: [], rest: [] }

    // Break context into sentences and reverse for easier traversal
    const contextSentences = this.getSentences(context)
    contextSentences.reverse()

    // Group sentences by character length
    let totalSize = 0
    let firstEntry = true
    for (let sentence of contextSentences) {
      totalSize += sentence.length
      if (firstEntry || totalSize <= this.SECTION_SIZE.focus) sentenceGroups.focus.push(sentence)
      else if (totalSize <= this.SECTION_SIZE.think) sentenceGroups.think.push(sentence)
      else if (totalSize <= this.SECTION_SIZE.header) sentenceGroups.header.push(sentence)
      else sentenceGroups.rest.push(sentence)
      firstEntry = false
    }

    // Account for characters that will be removed later
    const lengthMod = 6

    // Inject pre focus sentences
    totalSize = 0
    let finalSentences = [...sentenceGroups.focus]

    // Insert focus
    if (this.state.context.focus) {
      const entry = this.getEntry(`[ ${this.state.context.focus}]`)
      const entryLength = (entry.length - lengthMod)
      if (this.validEntrySize(originalSize, entryLength, totalSize)) {
        finalSentences.push(entry)
        totalSize += entryLength
      }
    }

    // Inject pre think sentences
    finalSentences = [...finalSentences, ...sentenceGroups.think]

    // Insert think
    if (this.state.context.think) {
      const entry = this.getEntry(`[ ${this.state.context.think}]`)
      const entryLength = (entry.length - lengthMod)
      if (this.validEntrySize(originalSize, entryLength, totalSize)) {
        finalSentences.push(entry)
        totalSize += entryLength // Account for characters that will be removed later
      }
    }

    // Inject pre header sentences
    finalSentences = [...finalSentences, ...sentenceGroups.header]

    // Insert header - character and scene
    if (this.state.context.scene) {
      const entry = this.getEntry(`[ ${this.state.context.scene}]`)
      const entryLength = (entry.length - lengthMod)
      if (this.validEntrySize(originalSize, entryLength, totalSize)) {
        finalSentences.push(entry)
        totalSize += entryLength
      }
    }

    // Insert header - author's note
    if (this.state.context.story) {
      const entry = this.getEntry(`[ Author's note: ${this.state.context.story}]`)
      const entryLength = (entry.length - lengthMod)
      if (this.validEntrySize(originalSize, entryLength, totalSize)) {
        finalSentences.push(entry)
        totalSize += entryLength
      }
    }

    // Inject the remaining sentences
    finalSentences = [...finalSentences, ...sentenceGroups.rest]

    // Create string of combined (plugin specific) context
    const pluginContext = [
      (this.state.context.story || ""), (this.state.context.scene || ""),
      (this.state.context.think || ""), (this.state.context.focus || "")
    ].join("")
    const combinedContext = finalSentences.join(" ")

    // Parse combined context for world info keys
    const trackedInfo = []
    const detectedInfo = []
    for (let info of worldInfo) {
      for (let key of this.getKeys(info.keys)) {
        if (key instanceof RegExp) {
          const match = combinedContext.match(key)
          if (match && match.length) {
            trackedInfo.push(match[0])
            detectedInfo.push(info)
            break
          }
        } else {
          if (pluginContext.includes(key)) {
            if (combinedContext.includes(key)) trackedInfo.push(key)
            if (!context.includes(key)) detectedInfo.push(info)
            break
          }
        }
      }
    }

    // Setup world info stat in HUD
    const trackedCounts = {}
    for (let match of trackedInfo) trackedCounts[match] = (trackedCounts[match] || 0) + 1
    this.state.context.track = Object.entries(trackedCounts).map(e => `${e[0]}` + (e[1] > 1 ? ` [x${e[1]}]` : "")).join(", ")

    // Reverse order of info so it inserts correctly
    detectedInfo.reverse()

    // Remember to reverse the array again to get the correct order
    finalSentences.reverse()

    // Insert World Info
    if (detectedInfo.length) {
      const injectedKeys = []
      const parseSentences = [...finalSentences]
      finalSentences = []
      for (let sentence of parseSentences) {
        for (let info of detectedInfo) {
          if (injectedKeys.includes(info.keys)) continue
          for (let key of this.getKeys(info.keys)) {
            const entry = this.getEntry(info.entry, true)
            const entryLength = (entry.length - lengthMod)
            if (this.hasKey(sentence, key) && this.validEntrySize(originalSize, entryLength, totalSize)) {
              finalSentences.push(entry)
              injectedKeys.push(info.keys)
              totalSize += entryLength
              break
            }
          }
        }
        finalSentences.push(sentence)
      }
    }

    // Dynamically change position of header based on suspected normal world info injections

    // Create new context and fix newlines for injected entries
    const entireContext = finalSentences.join("")
      .replace(/}}\n\n{{|\n\n{{|}}\n\n|\n{{|}}\n/g, "\n")
      .replace(/^\n/g, "")

    // Keep within maxChars and remove last entry if it is a custom entry
    let lines = entireContext.slice(-(info.maxChars - info.memoryLength)).split("\n")
    if (lines.length && lines[0].endsWith("#!#")) lines.shift()
    lines = lines.map(l => l.replace(/#!#$/, ""))
    const finalContext = lines.join("\n")

    // Debug output
    if (this.state.isDebug) {
      console.log({
        detectedInfo,
        originalContext: context.split("\n"),
        contextSentences,
        finalSentences,
        entireContext: entireContext.split("\n"),
        finalContext: finalContext.split("\n")
      })
      if (this.isVisible()) {
        let debugLines = finalContext.split("\n")
        debugLines.reverse()
        debugLines = debugLines.map((l, i) => `(${i + 1}) ${l}..`)
        debugLines.reverse()
        state.message = debugLines.join("\n")
      }
    }

    // Display HUD
    this.updateHUD()

    return [contextMemory, finalContext].join("")
  }
}
const simpleContextPlugin = new SimpleContextPlugin()
