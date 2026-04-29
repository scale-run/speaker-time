const timerApp = document.querySelector(".timer-app");
const segmentList = document.getElementById("segmentList");
const sessionNameInput = document.getElementById("sessionNameInput");
const presentationSelect = document.getElementById("presentationSelect");
const presentationMenuButton = document.getElementById("presentationMenuButton");
const activePresentationName = document.getElementById("activePresentationName");
const presentationMenu = document.getElementById("presentationMenu");
const menuPresentationRows = document.getElementById("menuPresentationRows");
const newPresentationButton = document.getElementById("newPresentationButton");
const duplicatePresentationButton = document.getElementById("duplicatePresentationButton");
const renamePresentationButton = document.getElementById("renamePresentationButton");
const deletePresentationButton = document.getElementById("deletePresentationButton");
const menuImportPresentationButton = document.getElementById("menuImportPresentationButton");
const menuExportActivePresentationButton = document.getElementById("menuExportActivePresentationButton");
const menuExportPresentationButton = document.getElementById("menuExportPresentationButton");
const openPresentationManagerButton = document.getElementById("openPresentationManagerButton");
const statusLabel = document.getElementById("statusLabel");
const timeDisplay = document.getElementById("timeDisplay");
const targetTime = document.getElementById("targetTime");
const elapsedTime = document.getElementById("elapsedTime");
const remainingTime = document.getElementById("remainingTime");
const elapsedPercent = document.getElementById("elapsedPercent");
const remainingPercent = document.getElementById("remainingPercent");
const progressCircle = document.getElementById("progressCircle");
const linearValue = document.getElementById("linearValue");
const timerRing = document.getElementById("timerRing");
const tickRail = document.getElementById("tickRail");
const startPauseButton = document.getElementById("startPauseButton");
const resetButton = document.getElementById("resetButton");
const plusMinuteButton = document.getElementById("plusMinuteButton");
const minusMinuteButton = document.getElementById("minusMinuteButton");
const fullscreenButton = document.getElementById("fullscreenButton");
const setCustomButton = document.getElementById("setCustomButton");
const saveSegmentButton = document.getElementById("saveSegmentButton");
const addSegmentButton = document.getElementById("addSegmentButton");
const editSegmentButton = document.getElementById("editSegmentButton");
const deleteSegmentButton = document.getElementById("deleteSegmentButton");
const cancelSegmentButton = document.getElementById("cancelSegmentButton");
const closeSegmentViewButton = document.getElementById("closeSegmentViewButton");
const segmentView = document.getElementById("segmentView");
const segmentViewTitle = document.getElementById("segmentViewTitle");
const segmentNameInput = document.getElementById("segmentNameInput");
const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const warningInput = document.getElementById("warningInput");
const finalInput = document.getElementById("finalInput");
const markers = document.querySelector(".markers");
const warningMarker = document.getElementById("warningMarker");
const finalMarker = document.getElementById("finalMarker");
const warningSummary = document.getElementById("warningSummary");
const finalSummary = document.getElementById("finalSummary");
const soundSummary = document.getElementById("soundSummary");
const openAlertSettingsButton = document.getElementById("openAlertSettingsButton");
const closeAlertSettingsButton = document.getElementById("closeAlertSettingsButton");
const doneAlertSettingsButton = document.getElementById("doneAlertSettingsButton");
const alertSettingsView = document.getElementById("alertSettingsView");
const soundCueToggle = document.getElementById("soundCueToggle");
const soundSelect = document.getElementById("soundSelect");
const testWarningButton = document.getElementById("testWarningButton");
const testFinalButton = document.getElementById("testFinalButton");
const toggleWarningSoundButton = document.getElementById("toggleWarningSoundButton");
const toggleFinalSoundButton = document.getElementById("toggleFinalSoundButton");
const notesInput = document.getElementById("notesInput");
const notesCount = document.getElementById("notesCount");
const notesSegmentName = document.getElementById("notesSegmentName");
const timerModeButton = document.getElementById("timerModeButton");
const rehearsalModeButton = document.getElementById("rehearsalModeButton");
const rehearsalStageName = document.getElementById("rehearsalStageName");
const rehearsalStatus = document.getElementById("rehearsalStatus");
const rehearsalCurrentSegment = document.getElementById("rehearsalCurrentSegment");
const rehearsalTotalElapsed = document.getElementById("rehearsalTotalElapsed");
const rehearsalPlannedTotal = document.getElementById("rehearsalPlannedTotal");
const rehearsalVariance = document.getElementById("rehearsalVariance");
const startRehearsalButton = document.getElementById("startRehearsalButton");
const nextSectionButton = document.getElementById("nextSectionButton");
const endRunButton = document.getElementById("endRunButton");
const resetRunButton = document.getElementById("resetRunButton");
const rehearsalLatest = document.getElementById("rehearsalLatest");
const rehearsalResults = document.getElementById("rehearsalResults");
const rehearsalTotals = document.getElementById("rehearsalTotals");
const presentationManagerView = document.getElementById("presentationManagerView");
const closePresentationManagerButton = document.getElementById("closePresentationManagerButton");
const managerNewPresentationButton = document.getElementById("managerNewPresentationButton");
const managerDuplicatePresentationButton = document.getElementById("managerDuplicatePresentationButton");
const managerRenamePresentationButton = document.getElementById("managerRenamePresentationButton");
const managerDeletePresentationButton = document.getElementById("managerDeletePresentationButton");
const importPresentationButton = document.getElementById("importPresentationButton");
const exportActivePresentationButton = document.getElementById("exportActivePresentationButton");
const exportPresentationButton = document.getElementById("exportPresentationButton");
const presentationImportInput = document.getElementById("presentationImportInput");
const presentationRows = document.getElementById("presentationRows");
const presentationError = document.getElementById("presentationError");

const ringLength = 2 * Math.PI * 144;
const storageKey = "speaker-timer-state";
const presentationsStorageKey = "speaker-timer-presentations";
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const defaultSegments = [
  { id: "intro", name: "Intro", seconds: 5 * 60, icon: "person" },
  { id: "main-talk", name: "Main Talk", seconds: 30 * 60, icon: "message" },
  { id: "qa", name: "Q&A", seconds: 15 * 60, icon: "users" },
  { id: "custom", name: "Custom", seconds: 12 * 60, icon: "spark" },
];

let segments = defaultSegments.map((segment) => ({ ...segment }));
let selectedSegmentId = "custom";
let totalSeconds = 12 * 60;
let remainingSeconds = totalSeconds;
let isRunning = false;
let lastTick = 0;
let frameId = 0;
let audioContext = null;
let firedWarning = false;
let firedFinal = false;
let firedComplete = false;
let warningSoundEnabled = true;
let finalSoundEnabled = true;
let editorMode = "edit";
let editingSegmentId = null;
let draggedSegmentId = null;
let activeView = "timer";
let rehearsalRun = {
  active: false,
  startedAt: null,
  currentSegmentId: null,
  currentIndex: 0,
  entries: [],
  completed: false,
};
let activePresentationId = "";
let presentations = [];
let isApplyingPresentation = false;

progressCircle.style.strokeDasharray = `${ringLength}`;
tickRail.innerHTML = Array.from({ length: 33 }, () => "<span></span>").join("");

const iconSvg = {
  person: '<path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="7" r="4"></circle>',
  message: '<path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>',
  spark: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>',
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (match) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[match]);

const formatTime = (seconds, forceHours = false) => {
  const normalized = Math.max(0, Math.round(seconds));
  const hours = Math.floor(normalized / 3600);
  const minutes = Math.floor((normalized % 3600) / 60);
  const secs = normalized % 60;

  if (hours > 0 || forceHours) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const formatCountdown = (seconds, forceHours = false) => {
  if (seconds < 0) return `+${formatTime(Math.abs(seconds), forceHours)}`;
  return formatTime(seconds, forceHours);
};

const formatSignedTime = (seconds, forceHours = false) => {
  const rounded = Math.round(seconds);
  if (rounded === 0) return formatTime(0, forceHours);
  return `${rounded > 0 ? "+" : "-"}${formatTime(Math.abs(rounded), forceHours)}`;
};

const parseNumber = (input, fallback = 0) => {
  const value = Number.parseInt(input.value, 10);
  return Number.isFinite(value) ? value : fallback;
};

const editorDurationSeconds = () => {
  const hours = Math.min(9, Math.max(0, parseNumber(hoursInput)));
  const minutes = Math.min(99, Math.max(0, parseNumber(minutesInput)));
  const seconds = Math.min(59, Math.max(0, parseNumber(secondsInput)));
  return hours * 3600 + minutes * 60 + seconds;
};

const warningSeconds = () => Math.max(0, parseNumber(warningInput, 2) * 60);
const finalSeconds = () => Math.max(0, parseNumber(finalInput, 1) * 60);
const selectedSegment = () => segments.find((segment) => segment.id === selectedSegmentId) || segments[0];
const plannedTalkSeconds = () => segments.reduce((sum, segment) => sum + segment.seconds, 0);
const presentationName = () => sessionNameInput.value.trim().slice(0, 40) || "Presentation";

const createId = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const emptyRehearsalRun = () => ({
  active: false,
  startedAt: null,
  currentSegmentId: null,
  currentIndex: 0,
  entries: [],
  completed: false,
});

const normalizeSegments = (value) => {
  const normalized = Array.isArray(value) ? value
    .filter((segment) => segment && segment.name && Number.isFinite(Number(segment.seconds)))
    .map((segment, index) => ({
      id: String(segment.id || `segment-${index}`),
      name: String(segment.name).slice(0, 32),
      seconds: Math.max(1, Math.round(Number(segment.seconds))),
      icon: segment.icon || "spark",
      notes: String(segment.notes || "").slice(0, 1000),
    })) : [];

  return normalized.length ? normalized : defaultSegments.map((segment) => ({ ...segment, notes: "" }));
};

const normalizeRehearsalRun = (value, nextSegments) => {
  if (!value || typeof value !== "object") return emptyRehearsalRun();
  const currentIndex = Math.min(nextSegments.length - 1, Math.max(0, Math.round(Number(value.currentIndex) || 0)));
  return {
    active: Boolean(value.active) && !value.completed,
    startedAt: Number.isFinite(Number(value.startedAt)) ? Number(value.startedAt) : null,
    currentSegmentId: value.currentSegmentId ? String(value.currentSegmentId) : null,
    currentIndex,
    entries: Array.isArray(value.entries) ? value.entries.map((entry) => ({
      segmentId: String(entry.segmentId || ""),
      name: String(entry.name || "Untitled").slice(0, 32),
      plannedSeconds: Math.max(0, Math.round(Number(entry.plannedSeconds) || 0)),
      actualSeconds: Math.max(0, Math.round(Number(entry.actualSeconds) || 0)),
      varianceSeconds: Math.round(Number(entry.varianceSeconds) || 0),
    })) : [],
    completed: Boolean(value.completed),
  };
};

const sanitizePresentation = (value, fallbackName = "Presentation") => {
  const nextSegments = normalizeSegments(value?.segments);
  const nextSelectedId = value?.selectedSegmentId && nextSegments.some((segment) => segment.id === String(value.selectedSegmentId))
    ? String(value.selectedSegmentId)
    : nextSegments[0].id;
  const selected = nextSegments.find((segment) => segment.id === nextSelectedId) || nextSegments[0];
  const legacyNotes = String(value?.notes || "").slice(0, 1000);
  if (legacyNotes && !selected.notes) selected.notes = legacyNotes;
  const nextTotal = Math.max(1, Math.round(Number(value?.totalSeconds) || selected.seconds));
  const run = normalizeRehearsalRun(value?.rehearsalRun, nextSegments);
  const restoredRemaining = Number.isFinite(Number(value?.remainingSeconds)) ? Math.round(Number(value.remainingSeconds)) : nextTotal;

  return {
    id: String(value?.id || createId("presentation")),
    name: String(value?.name || value?.sessionName || fallbackName).slice(0, 40) || "Presentation",
    updatedAt: Number.isFinite(Number(value?.updatedAt)) ? Number(value.updatedAt) : Date.now(),
    segments: nextSegments,
    selectedSegmentId: run.active ? nextSegments[run.currentIndex].id : nextSelectedId,
    totalSeconds: nextTotal,
    remainingSeconds: run.active ? restoredRemaining : Math.min(nextTotal, Math.max(0, restoredRemaining)),
    warningMinutes: String(value?.warningMinutes ?? "2"),
    finalMinutes: String(value?.finalMinutes ?? "1"),
    warningSoundEnabled: value?.warningSoundEnabled ?? true,
    finalSoundEnabled: value?.finalSoundEnabled ?? true,
    soundEnabled: value?.soundEnabled ?? true,
    sound: value?.sound || "chime",
    notes: selected.notes,
    activeView: value?.activeView === "rehearsal" ? "rehearsal" : "timer",
    rehearsalRun: run,
  };
};

const selectedSegmentNotes = () => String(selectedSegment()?.notes || "").slice(0, 1000);

const syncNotesToSelectedSegment = () => {
  const segment = selectedSegment();
  if (!segment) return;
  segment.notes = notesInput.value.slice(0, 1000);
};

const renderNotesForSelectedSegment = () => {
  const segment = selectedSegment();
  const notes = selectedSegmentNotes();
  notesInput.value = notes;
  notesInput.disabled = !segment;
  notesInput.placeholder = segment ? `Notes for ${segment.name}...` : "Add your notes here...";
  notesCount.textContent = String(notes.length);
  notesSegmentName.textContent = segment?.name || "No segment";
};

const captureCurrentPresentation = (updatedAt = Date.now()) => {
  syncNotesToSelectedSegment();
  return sanitizePresentation({
    id: activePresentationId || createId("presentation"),
    name: presentationName(),
    updatedAt,
    segments,
    selectedSegmentId,
    totalSeconds,
    remainingSeconds,
    warningMinutes: warningInput.value,
    finalMinutes: finalInput.value,
    warningSoundEnabled,
    finalSoundEnabled,
    soundEnabled: soundCueToggle.checked,
    sound: soundSelect.value,
    notes: selectedSegmentNotes(),
    activeView,
    rehearsalRun,
  }, presentationName());
};

const currentPresentation = () => presentations.find((presentation) => presentation.id === activePresentationId) || presentations[0];

const formatDateTime = (timestamp) =>
  new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp || Date.now()));

const setPresentationError = (message = "") => {
  presentationError.textContent = message;
  presentationError.hidden = !message;
};

const setPresentationMenuOpen = (open) => {
  presentationMenu.hidden = !open;
  presentationMenuButton.setAttribute("aria-expanded", String(open));
};

const closePresentationMenu = () => setPresentationMenuOpen(false);

const syncEditorFromSegment = (segment) => {
  segmentNameInput.value = segment.name;
  const hours = Math.floor(segment.seconds / 3600);
  const minutes = Math.floor((segment.seconds % 3600) / 60);
  const secs = segment.seconds % 60;
  hoursInput.value = String(hours);
  minutesInput.value = String(minutes);
  secondsInput.value = String(secs);
};

const stateClass = () => {
  if (remainingSeconds <= 0) return "done-state";
  if (remainingSeconds <= finalSeconds()) return "final-state";
  if (remainingSeconds <= warningSeconds()) return "warning-state";
  return "";
};

const setStatus = (status) => {
  statusLabel.classList.remove("running", "paused", "done");
  statusLabel.textContent = status;

  if (status === "Running") statusLabel.classList.add("running");
  if (status === "Paused") statusLabel.classList.add("paused");
  if (status === "Complete") statusLabel.classList.add("done");
};

const resetCueFlags = () => {
  firedWarning = false;
  firedFinal = false;
  firedComplete = false;
};

const renderPresentationControls = () => {
  const active = currentPresentation();
  activePresentationName.textContent = active?.name || "Presentation";
  presentationSelect.innerHTML = presentations.map((presentation) => `
    <option value="${escapeHtml(presentation.id)}" ${presentation.id === activePresentationId ? "selected" : ""}>${escapeHtml(presentation.name)}</option>
  `).join("");

  const deleteDisabled = presentations.length <= 1;
  deletePresentationButton.disabled = deleteDisabled;
  managerDeletePresentationButton.disabled = deleteDisabled;
  duplicatePresentationButton.disabled = !active;
  renamePresentationButton.disabled = !active;
  managerDuplicatePresentationButton.disabled = !active;
  exportActivePresentationButton.disabled = !active;
  menuExportActivePresentationButton.disabled = !active;

  menuPresentationRows.innerHTML = presentations.map((presentation) => {
    const isActive = presentation.id === activePresentationId;
    const duration = presentation.segments.reduce((sum, segment) => sum + segment.seconds, 0);
    return `
      <button class="presentation-menu-row ${isActive ? "active" : ""}" type="button" data-presentation-id="${escapeHtml(presentation.id)}" aria-pressed="${String(isActive)}">
        <span>
          <strong>${escapeHtml(presentation.name)}</strong>
          ${isActive ? "<em>Active</em>" : ""}
        </span>
        <small>${formatTime(duration, duration >= 3600)} · ${presentation.segments.length} sections</small>
      </button>
    `;
  }).join("");

  presentationRows.innerHTML = presentations.map((presentation) => {
    const isActive = presentation.id === activePresentationId;
    const duration = presentation.segments.reduce((sum, segment) => sum + segment.seconds, 0);
    return `
      <button class="presentation-row ${isActive ? "active" : ""}" type="button" data-presentation-id="${escapeHtml(presentation.id)}" aria-pressed="${String(isActive)}">
        <span class="presentation-name-cell">
          <span class="presentation-radio" aria-hidden="true"></span>
          <strong>${escapeHtml(presentation.name)}</strong>
          ${isActive ? '<em>Active</em>' : ""}
        </span>
        <span>${formatTime(duration, duration >= 3600)}</span>
        <span>${presentation.segments.length}</span>
        <span>${escapeHtml(formatDateTime(presentation.updatedAt))}</span>
      </button>
    `;
  }).join("");
};

const setActiveView = (view, persist = true) => {
  activeView = view === "rehearsal" ? "rehearsal" : "timer";
  timerApp.classList.toggle("rehearsal-mode", activeView === "rehearsal");
  timerModeButton.setAttribute("aria-selected", String(activeView === "timer"));
  rehearsalModeButton.setAttribute("aria-selected", String(activeView === "rehearsal"));
  if (persist) saveState();
};

const saveState = () => {
  if (isApplyingPresentation) return;
  if (!activePresentationId) activePresentationId = createId("presentation");

  const nextPresentation = captureCurrentPresentation();
  const existingIndex = presentations.findIndex((presentation) => presentation.id === activePresentationId);
  if (existingIndex >= 0) presentations[existingIndex] = nextPresentation;
  else presentations.push(nextPresentation);

  localStorage.setItem(presentationsStorageKey, JSON.stringify({
    version: 1,
    activePresentationId,
    presentations,
  }));
  renderPresentationControls();
};

const applyPresentation = (presentation) => {
  const next = sanitizePresentation(presentation);
  isApplyingPresentation = true;
  activePresentationId = next.id;
  segments = next.segments.map((segment) => ({ ...segment }));
  selectedSegmentId = next.selectedSegmentId;
  totalSeconds = next.totalSeconds;
  remainingSeconds = next.remainingSeconds;
  isRunning = false;
  lastTick = 0;
  cancelAnimationFrame(frameId);
  warningSoundEnabled = next.warningSoundEnabled;
  finalSoundEnabled = next.finalSoundEnabled;
  rehearsalRun = { ...next.rehearsalRun, entries: next.rehearsalRun.entries.map((entry) => ({ ...entry })) };
  sessionNameInput.value = next.name;
  warningInput.value = next.warningMinutes;
  finalInput.value = next.finalMinutes;
  soundCueToggle.checked = next.soundEnabled;
  soundSelect.value = next.sound;
  renderNotesForSelectedSegment();
  setActiveView(next.activeView || (rehearsalRun.active ? "rehearsal" : "timer"), false);
  syncEditorFromSegment(selectedSegment());
  renderSegments();
  setStatus(rehearsalRun.active ? "Paused" : "Not Running");
  resetCueFlags();
  updateUI();
  isApplyingPresentation = false;
  renderPresentationControls();
};

const renderSegments = () => {
  segmentList.innerHTML = segments.map((segment, index) => {
    const active = segment.id === selectedSegmentId;
    const icon = iconSvg[segment.icon] || iconSvg.spark;
    return `
      <div class="preset ${active ? "active" : ""}" role="option" aria-selected="${String(active)}" draggable="${String(!rehearsalRun.active)}" data-drag-segment="${escapeHtml(segment.id)}">
        <span class="drag-handle" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"></path></svg>
        </span>
        <button class="preset-main" type="button" data-segment-id="${escapeHtml(segment.id)}">
          <span class="segment-index">${index + 1}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg>
          <span>${escapeHtml(segment.name)}</span>
          <strong>${formatTime(segment.seconds)}</strong>
        </button>
      </div>
    `;
  }).join("");
  deleteSegmentButton.disabled = segments.length <= 1;
  addSegmentButton.disabled = rehearsalRun.active;
  editSegmentButton.disabled = rehearsalRun.active;
};

const openSegmentView = (mode) => {
  editorMode = mode;
  if (mode === "add") {
    editingSegmentId = null;
    segmentViewTitle.textContent = "Add Segment";
    segmentNameInput.value = "New Segment";
    hoursInput.value = "0";
    minutesInput.value = "5";
    secondsInput.value = "0";
    deleteSegmentButton.hidden = true;
    setCustomButton.hidden = true;
  } else {
    const segment = selectedSegment();
    editingSegmentId = segment.id;
    segmentViewTitle.textContent = "Edit Segment";
    syncEditorFromSegment(segment);
    deleteSegmentButton.hidden = false;
    setCustomButton.hidden = false;
    deleteSegmentButton.disabled = segments.length <= 1;
  }

  segmentView.setAttribute("aria-hidden", "false");
  document.body.classList.add("segment-view-open");
  segmentNameInput.focus();
  segmentNameInput.select();
};

const closeSegmentView = () => {
  segmentView.setAttribute("aria-hidden", "true");
  if (alertSettingsView.getAttribute("aria-hidden") === "true" && presentationManagerView.getAttribute("aria-hidden") === "true") {
    document.body.classList.remove("segment-view-open");
  }
  editingSegmentId = null;
};

const openAlertSettings = () => {
  alertSettingsView.setAttribute("aria-hidden", "false");
  document.body.classList.add("segment-view-open");
  warningInput.focus();
};

const closeAlertSettings = () => {
  alertSettingsView.setAttribute("aria-hidden", "true");
  if (segmentView.getAttribute("aria-hidden") === "true" && presentationManagerView.getAttribute("aria-hidden") === "true") {
    document.body.classList.remove("segment-view-open");
  }
};

const updateAlertButtons = () => {
  toggleWarningSoundButton.classList.toggle("active", warningSoundEnabled);
  toggleFinalSoundButton.classList.toggle("active", finalSoundEnabled);
  toggleWarningSoundButton.setAttribute("aria-pressed", String(warningSoundEnabled));
  toggleFinalSoundButton.setAttribute("aria-pressed", String(finalSoundEnabled));
  warningSummary.textContent = formatTime(warningSeconds());
  finalSummary.textContent = formatTime(finalSeconds());
  soundSummary.textContent = `${soundSelect.options[soundSelect.selectedIndex]?.text || "Sound"} ${soundCueToggle.checked ? "On" : "Off"}`;
};

const updateMarkers = () => {
  const warningPercent = totalSeconds > 0 ? ((totalSeconds - warningSeconds()) / totalSeconds) * 100 : 0;
  const finalPercent = totalSeconds > 0 ? ((totalSeconds - finalSeconds()) / totalSeconds) * 100 : 0;
  const warningLabel = formatTime(warningSeconds());
  const finalLabel = formatTime(finalSeconds());

  warningMarker.style.left = `${Math.min(100, Math.max(0, warningPercent))}%`;
  finalMarker.style.left = `${Math.min(100, Math.max(0, finalPercent))}%`;
  warningMarker.dataset.label = warningLabel;
  finalMarker.dataset.label = finalLabel;
  warningMarker.querySelector(".marker-label").textContent = warningLabel;
  finalMarker.querySelector(".marker-label").textContent = finalLabel;
  warningMarker.title = `Warning: ${warningLabel}`;
  finalMarker.title = `Final minute: ${finalLabel}`;
  warningMarker.setAttribute("aria-label", `Warning at ${warningLabel}`);
  finalMarker.setAttribute("aria-label", `Final minute at ${finalLabel}`);
};

const updateStartButton = () => {
  const label = startPauseButton.querySelector("span");
  const icon = startPauseButton.querySelector("svg");
  startPauseButton.classList.toggle("paused", isRunning);
  startPauseButton.classList.toggle("done", remainingSeconds <= 0 && !rehearsalRun.active);

  if (remainingSeconds <= 0 && !rehearsalRun.active) {
    label.textContent = "Restart";
    startPauseButton.title = "Restart timer";
    startPauseButton.setAttribute("aria-label", "Restart timer");
    icon.innerHTML = '<path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 3v6h6"></path>';
    return;
  }

  if (isRunning) {
    label.textContent = "Pause";
    startPauseButton.title = "Pause timer";
    startPauseButton.setAttribute("aria-label", "Pause timer");
    icon.innerHTML = '<path d="M10 5v14"></path><path d="M14 5v14"></path>';
    return;
  }

  label.textContent = "Start";
  startPauseButton.title = "Start timer";
  startPauseButton.setAttribute("aria-label", "Start timer");
  icon.innerHTML = '<path d="m8 5 11 7-11 7z"></path>';
};

const currentRehearsalActualSeconds = () => {
  if (!rehearsalRun.active || rehearsalRun.completed) return 0;
  const segment = segments[rehearsalRun.currentIndex];
  if (!segment) return 0;
  return Math.max(0, Math.round(segment.seconds - remainingSeconds));
};

const rehearsalTotalsSnapshot = () => {
  const recordedPlanned = rehearsalRun.entries.reduce((sum, entry) => sum + entry.plannedSeconds, 0);
  const recordedActual = rehearsalRun.entries.reduce((sum, entry) => sum + entry.actualSeconds, 0);
  const currentSegment = rehearsalRun.active && !rehearsalRun.completed ? segments[rehearsalRun.currentIndex] : null;
  const currentPlanned = currentSegment ? currentSegment.seconds : 0;
  const currentActual = currentSegment ? currentRehearsalActualSeconds() : 0;

  return {
    planned: recordedPlanned + currentPlanned,
    actual: recordedActual + currentActual,
    talkPlanned: plannedTalkSeconds(),
    variance: recordedActual + currentActual - (recordedPlanned + currentPlanned),
  };
};

const renderRehearsal = () => {
  const currentSegment = segments[rehearsalRun.currentIndex];
  const totals = rehearsalTotalsSnapshot();
  const hasRun = rehearsalRun.active || rehearsalRun.completed || rehearsalRun.entries.length > 0;
  const forceHours = totals.talkPlanned >= 3600 || totals.actual >= 3600;

  rehearsalStatus.classList.remove("running", "complete");
  if (rehearsalRun.completed) {
    rehearsalStatus.textContent = "Complete";
    rehearsalStatus.classList.add("complete");
  } else if (rehearsalRun.active && isRunning) {
    rehearsalStatus.textContent = "Running";
    rehearsalStatus.classList.add("running");
  } else if (rehearsalRun.active) {
    rehearsalStatus.textContent = "Paused";
  } else {
    rehearsalStatus.textContent = "Idle";
  }

  if (rehearsalRun.active && currentSegment) {
    rehearsalCurrentSegment.textContent = `Section ${rehearsalRun.currentIndex + 1} of ${segments.length}: ${currentSegment.name}`;
    rehearsalStageName.textContent = currentSegment.name;
  } else if (rehearsalRun.completed) {
    rehearsalCurrentSegment.textContent = "Current run complete";
    rehearsalStageName.textContent = "Run Complete";
  } else {
    rehearsalCurrentSegment.textContent = "No run active";
    rehearsalStageName.textContent = selectedSegment()?.name || "Ready";
  }

  rehearsalTotalElapsed.textContent = formatTime(totals.actual, forceHours);
  rehearsalPlannedTotal.textContent = formatTime(totals.talkPlanned, forceHours);
  rehearsalVariance.textContent = formatSignedTime(totals.variance, forceHours);
  rehearsalVariance.classList.toggle("under", totals.variance < 0);
  rehearsalVariance.classList.toggle("over", totals.variance > 0);

  const rehearsalStartLabel = rehearsalRun.active ? (isRunning ? "Pause rehearsal" : "Resume rehearsal") : "Start rehearsal";
  const rehearsalStartIcon = startRehearsalButton.querySelector("svg");
  const rehearsalStartText = startRehearsalButton.querySelector(".sr-only");
  if (rehearsalStartText) rehearsalStartText.textContent = rehearsalStartLabel;
  startRehearsalButton.title = rehearsalStartLabel;
  startRehearsalButton.setAttribute("aria-label", rehearsalStartLabel);
  if (rehearsalStartIcon) {
    rehearsalStartIcon.innerHTML = isRunning && rehearsalRun.active
      ? '<path d="M10 5v14"></path><path d="M14 5v14"></path>'
      : '<path d="m8 5 11 7-11 7z"></path>';
  }
  startRehearsalButton.disabled = !segments.length || rehearsalRun.completed;
  nextSectionButton.disabled = !rehearsalRun.active || rehearsalRun.completed;
  endRunButton.disabled = !rehearsalRun.active || rehearsalRun.completed;
  resetRunButton.disabled = !hasRun;
  plusMinuteButton.disabled = rehearsalRun.active;
  minusMinuteButton.disabled = rehearsalRun.active;

  if (rehearsalRun.entries.length) {
    const latest = rehearsalRun.entries[rehearsalRun.entries.length - 1];
    rehearsalLatest.textContent = `Last: ${latest.name} ${formatSignedTime(latest.varianceSeconds, forceHours)}`;
    rehearsalResults.innerHTML = rehearsalRun.entries.map((entry) => `
      <tr>
        <th scope="row">${escapeHtml(entry.name)}</th>
        <td>${formatTime(entry.plannedSeconds, forceHours)}</td>
        <td>${formatTime(entry.actualSeconds, forceHours)}</td>
        <td class="${entry.varianceSeconds < 0 ? "under" : entry.varianceSeconds > 0 ? "over" : ""}">${formatSignedTime(entry.varianceSeconds, forceHours)}</td>
      </tr>
    `).join("");
  } else {
    rehearsalLatest.textContent = "No sections recorded.";
    rehearsalResults.innerHTML = `
      <tr class="empty-row">
        <td colspan="4">No sections recorded.</td>
      </tr>
    `;
  }

  const recordedPlanned = rehearsalRun.entries.reduce((sum, entry) => sum + entry.plannedSeconds, 0);
  const recordedActual = rehearsalRun.entries.reduce((sum, entry) => sum + entry.actualSeconds, 0);
  const recordedVariance = recordedActual - recordedPlanned;
  rehearsalTotals.innerHTML = `
    <tr>
      <th scope="row">Total</th>
      <td>${formatTime(recordedPlanned, forceHours)}</td>
      <td>${formatTime(recordedActual, forceHours)}</td>
      <td class="${recordedVariance < 0 ? "under" : recordedVariance > 0 ? "over" : ""}">${formatSignedTime(recordedVariance, forceHours)}</td>
    </tr>
  `;
};

const updateUI = () => {
  const elapsed = Math.max(0, totalSeconds - remainingSeconds);
  const progress = totalSeconds > 0 ? elapsed / totalSeconds : 1;
  const percent = Math.min(100, Math.max(0, progress * 100));
  const forceHours = totalSeconds >= 3600;
  const nextState = stateClass();

  timeDisplay.textContent = formatCountdown(remainingSeconds, forceHours);
  targetTime.textContent = formatTime(totalSeconds, forceHours);
  elapsedTime.textContent = formatTime(elapsed, forceHours);
  remainingTime.textContent = formatCountdown(remainingSeconds, forceHours);
  elapsedPercent.textContent = `${Math.round(percent)}%`;
  remainingPercent.textContent = `${Math.round(100 - percent)}%`;

  progressCircle.style.strokeDashoffset = `${ringLength * Math.min(1, Math.max(0, progress))}`;
  linearValue.style.width = `${percent}%`;

  timerRing.classList.remove("warning-state", "final-state", "done-state");
  linearValue.classList.remove("warning-state", "final-state", "done-state");
  if (nextState) {
    timerRing.classList.add(nextState);
    linearValue.classList.add(nextState);
  }

  updateMarkers();
  updateStartButton();
  updateAlertButtons();
  renderRehearsal();
};

const ensureAudio = () => {
  if (!AudioContextClass) return false;
  if (!audioContext) {
    audioContext = new AudioContextClass();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return true;
};

const tone = (frequency, start, duration, gain = 0.12) => {
  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  volume.gain.setValueAtTime(0.0001, start);
  volume.gain.exponentialRampToValueAtTime(gain, start + 0.02);
  volume.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(volume).connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.04);
};

const playCue = (kind = "notice", force = false) => {
  if (!force && !soundCueToggle.checked) return;
  if (!ensureAudio()) return;

  const now = audioContext.currentTime;
  const sound = soundSelect.value;
  const base = kind === "complete" ? 392 : kind === "final" ? 523.25 : 659.25;

  if (sound === "double") {
    tone(base, now, 0.15);
    tone(base * 1.25, now + 0.2, 0.16);
  } else if (sound === "pulse") {
    tone(base, now, 0.09, 0.1);
    tone(base, now + 0.14, 0.09, 0.1);
    tone(base, now + 0.28, 0.12, 0.1);
  } else {
    tone(base, now, 0.18);
    tone(base * 1.5, now + 0.18, 0.24, 0.09);
  }
};

const checkCues = () => {
  if (remainingSeconds <= 0 && !firedComplete) {
    firedComplete = true;
    playCue("complete");
    return;
  }

  if (remainingSeconds <= finalSeconds() && remainingSeconds > 0 && !firedFinal) {
    firedFinal = true;
    if (finalSoundEnabled) playCue("final");
    return;
  }

  if (remainingSeconds <= warningSeconds() && remainingSeconds > finalSeconds() && !firedWarning) {
    firedWarning = true;
    if (warningSoundEnabled) playCue("warning");
  }
};

const tick = (timestamp) => {
  if (!isRunning) return;

  if (!lastTick) lastTick = timestamp;
  const delta = (timestamp - lastTick) / 1000;
  lastTick = timestamp;
  remainingSeconds = rehearsalRun.active ? remainingSeconds - delta : Math.max(0, remainingSeconds - delta);

  checkCues();
  updateUI();

  if (remainingSeconds <= 0 && !rehearsalRun.active) {
    isRunning = false;
    setStatus("Complete");
    lastTick = 0;
    updateUI();
    saveState();
    return;
  }

  frameId = requestAnimationFrame(tick);
};

const start = () => {
  if (remainingSeconds <= 0 && !rehearsalRun.active) {
    remainingSeconds = totalSeconds;
    resetCueFlags();
  }
  isRunning = true;
  lastTick = 0;
  setStatus("Running");
  ensureAudio();
  cancelAnimationFrame(frameId);
  frameId = requestAnimationFrame(tick);
  updateUI();
  saveState();
};

const pause = () => {
  isRunning = false;
  lastTick = 0;
  cancelAnimationFrame(frameId);
  setStatus(remainingSeconds <= 0 && !rehearsalRun.active ? "Complete" : "Paused");
  updateUI();
  saveState();
};

const reset = () => {
  isRunning = false;
  lastTick = 0;
  cancelAnimationFrame(frameId);
  remainingSeconds = totalSeconds;
  resetCueFlags();
  setStatus("Not Running");
  updateUI();
  saveState();
};

const loadRehearsalSegment = (index, shouldRun = true) => {
  const segment = segments[index];
  if (!segment) return;

  syncNotesToSelectedSegment();
  selectedSegmentId = segment.id;
  rehearsalRun.currentIndex = index;
  rehearsalRun.currentSegmentId = segment.id;
  totalSeconds = segment.seconds;
  remainingSeconds = segment.seconds;
  isRunning = shouldRun;
  lastTick = 0;
  resetCueFlags();
  syncEditorFromSegment(segment);
  renderNotesForSelectedSegment();
  renderSegments();
  setStatus(shouldRun ? "Running" : "Paused");
  cancelAnimationFrame(frameId);
  if (shouldRun) frameId = requestAnimationFrame(tick);
  updateUI();
};

const startRehearsal = () => {
  if (!segments.length) return;
  if (rehearsalRun.completed) return;
  setActiveView("rehearsal", false);

  if (!rehearsalRun.active) {
    rehearsalRun = {
      active: true,
      startedAt: Date.now(),
      currentSegmentId: segments[0].id,
      currentIndex: 0,
      entries: [],
      completed: false,
    };
    loadRehearsalSegment(0, true);
  } else {
    isRunning = true;
    lastTick = 0;
    setStatus("Running");
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(tick);
    updateUI();
  }

  ensureAudio();
  saveState();
};

const recordCurrentRehearsalSegment = () => {
  if (!rehearsalRun.active || rehearsalRun.completed) return null;
  const segment = segments[rehearsalRun.currentIndex];
  if (!segment) return null;

  const plannedSeconds = segment.seconds;
  const actualSeconds = Math.max(0, Math.round(plannedSeconds - remainingSeconds));
  const entry = {
    segmentId: segment.id,
    name: segment.name,
    plannedSeconds,
    actualSeconds,
    varianceSeconds: actualSeconds - plannedSeconds,
  };

  rehearsalRun.entries.push(entry);
  return entry;
};

const completeRehearsal = () => {
  rehearsalRun.active = false;
  rehearsalRun.completed = true;
  rehearsalRun.currentSegmentId = null;
  isRunning = false;
  lastTick = 0;
  cancelAnimationFrame(frameId);
  setStatus("Complete");
  renderSegments();
  updateUI();
  saveState();
};

const nextRehearsalSection = () => {
  if (!rehearsalRun.active || rehearsalRun.completed) return;

  recordCurrentRehearsalSegment();
  const nextIndex = rehearsalRun.currentIndex + 1;
  if (nextIndex >= segments.length) {
    completeRehearsal();
    return;
  }

  loadRehearsalSegment(nextIndex, true);
  saveState();
};

const endRehearsalRun = () => {
  if (!rehearsalRun.active || rehearsalRun.completed) return;
  recordCurrentRehearsalSegment();
  completeRehearsal();
};

const resetRehearsalRun = () => {
  rehearsalRun = {
    active: false,
    startedAt: null,
    currentSegmentId: null,
    currentIndex: 0,
    entries: [],
    completed: false,
  };
  reset();
};

const selectSegment = (id, resetTimer = true, syncPreviousNotes = true) => {
  if (rehearsalRun.active) return;
  const segment = segments.find((item) => item.id === id);
  if (!segment) return;

  if (syncPreviousNotes) syncNotesToSelectedSegment();
  selectedSegmentId = id;
  syncEditorFromSegment(segment);
  renderNotesForSelectedSegment();

  if (resetTimer) {
    totalSeconds = segment.seconds;
    remainingSeconds = segment.seconds;
    isRunning = false;
    lastTick = 0;
    cancelAnimationFrame(frameId);
    resetCueFlags();
    setStatus("Not Running");
  }

  renderSegments();
  updateUI();
  saveState();
};

const setTimerFromEditor = () => {
  if (rehearsalRun.active) return;
  const seconds = editorDurationSeconds();
  if (seconds <= 0) return;

  totalSeconds = seconds;
  remainingSeconds = seconds;
  isRunning = false;
  cancelAnimationFrame(frameId);
  resetCueFlags();
  setStatus("Not Running");
  updateUI();
  saveState();
  closeSegmentView();
};

const saveSelectedSegment = () => {
  if (rehearsalRun.active) return;
  const name = segmentNameInput.value.trim() || "Untitled";
  const seconds = Math.max(1, editorDurationSeconds());

  if (editorMode === "add") {
    const id = `segment-${Date.now().toString(36)}`;
    syncNotesToSelectedSegment();
    segments.push({ id, name, seconds, icon: "spark", notes: "" });
    selectedSegmentId = id;
    totalSeconds = seconds;
    remainingSeconds = seconds;
    isRunning = false;
    cancelAnimationFrame(frameId);
    resetCueFlags();
    setStatus("Not Running");
    renderNotesForSelectedSegment();
    renderSegments();
    updateUI();
    saveState();
    closeSegmentView();
    return;
  }

  const segment = segments.find((item) => item.id === editingSegmentId) || selectedSegment();
  segment.name = name;
  segment.seconds = seconds;
  selectedSegmentId = segment.id;
  totalSeconds = seconds;
  remainingSeconds = Math.min(remainingSeconds, totalSeconds);
  if (!isRunning) remainingSeconds = totalSeconds;

  renderSegments();
  renderNotesForSelectedSegment();
  updateUI();
  saveState();
  closeSegmentView();
};

const deleteSelectedSegment = () => {
  if (rehearsalRun.active) return;
  if (segments.length <= 1) return;

  const id = editingSegmentId || selectedSegmentId;
  const currentIndex = segments.findIndex((segment) => segment.id === id);
  segments = segments.filter((segment) => segment.id !== id);
  const next = segments[Math.max(0, currentIndex - 1)] || segments[0];
  selectSegment(next.id, true, false);
  closeSegmentView();
};

const moveSegmentToIndex = (id, requestedIndex) => {
  if (rehearsalRun.active) return;
  const currentIndex = segments.findIndex((segment) => segment.id === id);
  if (currentIndex < 0) return;
  let nextIndex = Math.min(segments.length, Math.max(0, requestedIndex));
  if (nextIndex > currentIndex) nextIndex -= 1;
  if (currentIndex === nextIndex) return;

  const [segment] = segments.splice(currentIndex, 1);
  segments.splice(nextIndex, 0, segment);
  selectedSegmentId = id;
  renderSegments();
  updateUI();
  saveState();
};

const adjustTimer = (deltaSeconds) => {
  if (rehearsalRun.active) return;
  const nextTotal = Math.max(60, Math.round(totalSeconds + deltaSeconds));
  const elapsed = totalSeconds - remainingSeconds;
  totalSeconds = nextTotal;
  remainingSeconds = Math.min(nextTotal, Math.max(0, nextTotal - elapsed));
  if (remainingSeconds > warningSeconds()) firedWarning = false;
  if (remainingSeconds > finalSeconds()) firedFinal = false;
  if (remainingSeconds > 0) firedComplete = false;
  syncEditorFromSegment({ name: segmentNameInput.value, seconds: totalSeconds });
  updateUI();
  saveState();
};

const persistPresentationLibrary = () => {
  localStorage.setItem(presentationsStorageKey, JSON.stringify({
    version: 1,
    activePresentationId,
    presentations,
  }));
  renderPresentationControls();
};

const pauseBeforePresentationChange = () => {
  if (isRunning) pause();
  else saveState();
};

const switchPresentation = (id) => {
  if (id === activePresentationId) return;
  const next = presentations.find((presentation) => presentation.id === id);
  if (!next) return;
  pauseBeforePresentationChange();
  applyPresentation(next);
  persistPresentationLibrary();
};

const createPresentation = () => {
  pauseBeforePresentationChange();
  const next = sanitizePresentation({
    id: createId("presentation"),
    name: `Presentation ${presentations.length + 1}`,
    segments: defaultSegments,
    selectedSegmentId: "custom",
    totalSeconds: 12 * 60,
    remainingSeconds: 12 * 60,
    warningMinutes: "2",
    finalMinutes: "1",
    warningSoundEnabled: true,
    finalSoundEnabled: true,
    soundEnabled: true,
    sound: "chime",
    notes: "",
    activeView: "timer",
    rehearsalRun: emptyRehearsalRun(),
  });
  presentations.push(next);
  applyPresentation(next);
  persistPresentationLibrary();
  setPresentationError("");
};

const duplicatePresentation = () => {
  const source = currentPresentation();
  if (!source) return;
  pauseBeforePresentationChange();
  const copy = sanitizePresentation({
    ...source,
    id: createId("presentation"),
    name: `${source.name} Copy`.slice(0, 40),
    updatedAt: Date.now(),
    segments: source.segments.map((segment) => ({ ...segment })),
    rehearsalRun: {
      ...source.rehearsalRun,
      entries: source.rehearsalRun.entries.map((entry) => ({ ...entry })),
    },
  });
  presentations.push(copy);
  applyPresentation(copy);
  persistPresentationLibrary();
  setPresentationError("");
};

const renamePresentation = () => {
  const active = currentPresentation();
  if (!active) return;
  const nextName = window.prompt("Rename presentation", active.name);
  if (nextName === null) return;
  const trimmed = nextName.trim().slice(0, 40);
  if (!trimmed) return;
  sessionNameInput.value = trimmed;
  saveState();
  setPresentationError("");
};

const deletePresentation = () => {
  if (presentations.length <= 1) return;
  const active = currentPresentation();
  if (!active) return;
  if (!window.confirm(`Delete "${active.name}"?`)) return;
  pauseBeforePresentationChange();
  presentations = presentations.filter((presentation) => presentation.id !== activePresentationId);
  const next = presentations[0];
  applyPresentation(next);
  persistPresentationLibrary();
  setPresentationError("");
};

const openPresentationManager = () => {
  saveState();
  closePresentationMenu();
  setPresentationError("");
  presentationManagerView.setAttribute("aria-hidden", "false");
  document.body.classList.add("segment-view-open");
  renderPresentationControls();
};

const closePresentationManager = () => {
  presentationManagerView.setAttribute("aria-hidden", "true");
  if (segmentView.getAttribute("aria-hidden") === "true" && alertSettingsView.getAttribute("aria-hidden") === "true") {
    document.body.classList.remove("segment-view-open");
  }
};

const exportJson = (payload, filename) => {
  saveState();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "presentation";

const exportLibrary = () => {
  saveState();
  exportJson({
    version: 1,
    activePresentationId,
    presentations,
  }, "speaker-timer-presentations.json");
};

const exportActivePresentation = () => {
  const active = currentPresentation();
  if (!active) return;
  saveState();
  exportJson({
    version: 1,
    activePresentationId: activePresentationId,
    presentations: [currentPresentation()],
  }, `${slug(active.name)}.presentation.json`);
};

const importedPresentationList = (value) => {
  if (Array.isArray(value?.presentations)) return value.presentations;
  if (value && typeof value === "object" && (Array.isArray(value.segments) || value.name || value.sessionName)) return [value];
  return [];
};

const importPresentations = (text) => {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    setPresentationError("Import failed: the file is not valid JSON.");
    return;
  }

  const incoming = importedPresentationList(parsed);
  if (!incoming.length) {
    setPresentationError("Import failed: no presentations were found.");
    return;
  }

  const existingIds = new Set(presentations.map((presentation) => presentation.id));
  const imported = incoming.map((item, index) => {
    const next = sanitizePresentation(item, `Imported Presentation ${index + 1}`);
    if (existingIds.has(next.id)) next.id = createId("presentation");
    existingIds.add(next.id);
    next.updatedAt = Date.now();
    return next;
  });

  pauseBeforePresentationChange();
  presentations.push(...imported);
  applyPresentation(imported[0]);
  persistPresentationLibrary();
  setPresentationError(`Imported ${imported.length} presentation${imported.length === 1 ? "" : "s"}.`);
};

const restoreState = () => {
  try {
    const rawLibrary = localStorage.getItem(presentationsStorageKey);
    if (rawLibrary) {
      const library = JSON.parse(rawLibrary);
      presentations = Array.isArray(library.presentations)
        ? library.presentations.map((presentation, index) => sanitizePresentation(presentation, `Presentation ${index + 1}`))
        : [];
      if (!presentations.length) throw new Error("Empty library");
      activePresentationId = String(library.activePresentationId || presentations[0].id);
      if (!presentations.some((presentation) => presentation.id === activePresentationId)) activePresentationId = presentations[0].id;
      applyPresentation(currentPresentation());
      persistPresentationLibrary();
      return;
    }

    const rawState = localStorage.getItem(storageKey);
    const legacyState = rawState ? JSON.parse(rawState) : {};
    const migrated = sanitizePresentation({
      ...legacyState,
      id: createId("presentation"),
      name: legacyState.sessionName || "Presentation",
      updatedAt: Date.now(),
    });
    presentations = [migrated];
    activePresentationId = migrated.id;
    applyPresentation(migrated);
    persistPresentationLibrary();
  } catch {
    const fallback = sanitizePresentation({
      id: createId("presentation"),
      name: "Presentation",
      segments: defaultSegments,
      selectedSegmentId: "custom",
      totalSeconds: 12 * 60,
      remainingSeconds: 12 * 60,
    });
    presentations = [fallback];
    activePresentationId = fallback.id;
    applyPresentation(fallback);
    persistPresentationLibrary();
  }
};

segmentList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-segment-id]");
  if (!button) return;
  selectSegment(button.dataset.segmentId);
});

segmentList.addEventListener("dragstart", (event) => {
  if (rehearsalRun.active) {
    event.preventDefault();
    return;
  }
  const row = event.target.closest("[data-drag-segment]");
  if (!row) return;

  draggedSegmentId = row.dataset.dragSegment;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", draggedSegmentId);
  row.classList.add("dragging");
});

segmentList.addEventListener("dragover", (event) => {
  const row = event.target.closest("[data-drag-segment]");
  if (!row || !draggedSegmentId || row.dataset.dragSegment === draggedSegmentId) return;

  event.preventDefault();
  row.classList.add("drag-over");
});

segmentList.addEventListener("dragleave", (event) => {
  const row = event.target.closest("[data-drag-segment]");
  if (row) row.classList.remove("drag-over");
});

segmentList.addEventListener("drop", (event) => {
  const row = event.target.closest("[data-drag-segment]");
  if (!row || !draggedSegmentId) return;

  event.preventDefault();
  row.classList.remove("drag-over");
  const rect = row.getBoundingClientRect();
  const targetIndex = segments.findIndex((segment) => segment.id === row.dataset.dragSegment);
  const insertAfterTarget = event.clientY > rect.top + rect.height / 2;
  moveSegmentToIndex(draggedSegmentId, targetIndex + (insertAfterTarget ? 1 : 0));
});

segmentList.addEventListener("dragend", () => {
  draggedSegmentId = null;
  segmentList.querySelectorAll(".dragging, .drag-over").forEach((row) => row.classList.remove("dragging", "drag-over"));
});

[warningMarker, finalMarker].forEach((marker) => {
  marker.addEventListener("focus", () => marker.classList.add("show-detail"));
  marker.addEventListener("blur", () => marker.classList.remove("show-detail"));
  marker.addEventListener("mouseenter", () => marker.classList.add("show-detail"));
  marker.addEventListener("mouseleave", () => marker.classList.remove("show-detail"));
});

startPauseButton.addEventListener("click", () => {
  if (isRunning) pause();
  else start();
});

resetButton.addEventListener("click", reset);
plusMinuteButton.addEventListener("click", () => adjustTimer(60));
minusMinuteButton.addEventListener("click", () => adjustTimer(-60));
timerModeButton.addEventListener("click", () => setActiveView("timer"));
rehearsalModeButton.addEventListener("click", () => setActiveView("rehearsal"));
presentationSelect.addEventListener("change", () => switchPresentation(presentationSelect.value));
presentationMenuButton.addEventListener("click", () => setPresentationMenuOpen(presentationMenu.hidden));
newPresentationButton.addEventListener("click", createPresentation);
duplicatePresentationButton.addEventListener("click", duplicatePresentation);
renamePresentationButton.addEventListener("click", renamePresentation);
deletePresentationButton.addEventListener("click", deletePresentation);
menuImportPresentationButton.addEventListener("click", () => presentationImportInput.click());
menuExportActivePresentationButton.addEventListener("click", exportActivePresentation);
menuExportPresentationButton.addEventListener("click", exportLibrary);
openPresentationManagerButton.addEventListener("click", openPresentationManager);
startRehearsalButton.addEventListener("click", () => {
  if (rehearsalRun.active && isRunning) pause();
  else startRehearsal();
});
nextSectionButton.addEventListener("click", nextRehearsalSection);
endRunButton.addEventListener("click", endRehearsalRun);
resetRunButton.addEventListener("click", resetRehearsalRun);
setCustomButton.addEventListener("click", setTimerFromEditor);
saveSegmentButton.addEventListener("click", saveSelectedSegment);
addSegmentButton.addEventListener("click", () => {
  if (!rehearsalRun.active) openSegmentView("add");
});
editSegmentButton.addEventListener("click", () => {
  if (!rehearsalRun.active) openSegmentView("edit");
});
deleteSegmentButton.addEventListener("click", deleteSelectedSegment);
cancelSegmentButton.addEventListener("click", closeSegmentView);
closeSegmentViewButton.addEventListener("click", closeSegmentView);

[hoursInput, minutesInput, secondsInput, segmentNameInput].forEach((input) => {
  input.addEventListener("input", saveState);
});

[warningInput, finalInput].forEach((input) => {
  input.addEventListener("input", () => {
    resetCueFlags();
    updateUI();
    saveState();
  });
});

sessionNameInput.addEventListener("input", saveState);

[soundCueToggle, soundSelect].forEach((input) => {
  input.addEventListener("input", () => {
    updateAlertButtons();
    saveState();
  });
});

testWarningButton.addEventListener("click", () => playCue("warning", true));
testFinalButton.addEventListener("click", () => playCue("final", true));

toggleWarningSoundButton.addEventListener("click", () => {
  warningSoundEnabled = !warningSoundEnabled;
  updateAlertButtons();
  saveState();
});

toggleFinalSoundButton.addEventListener("click", () => {
  finalSoundEnabled = !finalSoundEnabled;
  updateAlertButtons();
  saveState();
});

openAlertSettingsButton.addEventListener("click", openAlertSettings);
closeAlertSettingsButton.addEventListener("click", closeAlertSettings);
doneAlertSettingsButton.addEventListener("click", closeAlertSettings);
closePresentationManagerButton.addEventListener("click", closePresentationManager);
managerNewPresentationButton.addEventListener("click", createPresentation);
managerDuplicatePresentationButton.addEventListener("click", duplicatePresentation);
managerRenamePresentationButton.addEventListener("click", renamePresentation);
managerDeletePresentationButton.addEventListener("click", deletePresentation);
importPresentationButton.addEventListener("click", () => presentationImportInput.click());
exportActivePresentationButton.addEventListener("click", exportActivePresentation);
exportPresentationButton.addEventListener("click", exportLibrary);

presentationRows.addEventListener("click", (event) => {
  const row = event.target.closest("[data-presentation-id]");
  if (!row) return;
  switchPresentation(row.dataset.presentationId);
});

menuPresentationRows.addEventListener("click", (event) => {
  const row = event.target.closest("[data-presentation-id]");
  if (!row) return;
  switchPresentation(row.dataset.presentationId);
  closePresentationMenu();
});

presentationImportInput.addEventListener("change", async () => {
  const [file] = presentationImportInput.files;
  presentationImportInput.value = "";
  if (!file) return;
  importPresentations(await file.text());
});

notesInput.addEventListener("input", () => {
  notesCount.textContent = String(notesInput.value.length);
  syncNotesToSelectedSegment();
  saveState();
});

fullscreenButton.addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch {
    document.body.classList.toggle("is-fullscreen");
  }
});

document.addEventListener("fullscreenchange", () => {
  document.body.classList.toggle("is-fullscreen", Boolean(document.fullscreenElement));
});

segmentView.addEventListener("click", (event) => {
  if (event.target === segmentView) closeSegmentView();
});

alertSettingsView.addEventListener("click", (event) => {
  if (event.target === alertSettingsView) closeAlertSettings();
});

presentationManagerView.addEventListener("click", (event) => {
  if (event.target === presentationManagerView) closePresentationManager();
});

document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;
  if (event.key === "Escape" && presentationManagerView.getAttribute("aria-hidden") === "false") {
    closePresentationManager();
    return;
  }
  if (event.key === "Escape" && !presentationMenu.hidden) {
    closePresentationMenu();
    presentationMenuButton.focus();
    return;
  }
  if (event.key === "Escape" && alertSettingsView.getAttribute("aria-hidden") === "false") {
    closeAlertSettings();
    return;
  }
  if (event.key === "Escape" && segmentView.getAttribute("aria-hidden") === "false") {
    closeSegmentView();
    return;
  }
  if (isTyping) return;

  if (event.code === "Space") {
    event.preventDefault();
    isRunning ? pause() : start();
  }

  if (event.key.toLowerCase() === "r") reset();
  if (event.key.toLowerCase() === "f") fullscreenButton.click();
  if (event.key === "+") adjustTimer(60);
  if (event.key === "-") adjustTimer(-60);
});

document.addEventListener("click", (event) => {
  if (presentationMenu.hidden) return;
  if (event.target.closest(".presentation-controls")) return;
  closePresentationMenu();
});

restoreState();
